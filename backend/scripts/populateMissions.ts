import fetch from 'node-fetch';
import { db, Mission } from '../models';

async function populateMissions() {
    try {
        const response = await fetch('https://spacex-production.up.railway.app/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GetFirstLaunch {
                        launches(limit: 1) {
                            id
                            mission_name
                            details
                            launch_date_utc
                            launch_success
                            rocket {
                                rocket_name
                                first_stage {
                                    cores {
                                        land_success
                                    }
                                }
                            }
                            links {
                                article_link
                                wikipedia
                                video_link
                            }
                        }
                    }
                `,
            }),
        });

        console.log('Response Status:', response.status);
        console.log('Response OK:', response.ok);
        const text = await response.text();
        console.log('Raw Response Body:', text);
        try {
            const data = JSON.parse(text);
            console.log('Fetched Launch Data (first 1):', JSON.stringify(data?.data?.launches?.[0], null, 2));

            // Now, if we successfully fetched data, we can proceed with fetching ships and creating missions
            const fetchedShips = await db.Ship.findAll();
            if (!fetchedShips || fetchedShips.length === 0) {
                console.warn('No ships available in the database to link missions to.');
                process.exit(0);
            }
            console.log('Fetched Ships:', JSON.stringify(fetchedShips.map(ship => ({ id: ship.id, name: ship.name })), null, 2));

            const launchesData = data?.data?.launches || [];
            const createdMissions: Mission[] = [];

            for (const launchData of launchesData) {
                if (launchData.mission_name && launchData.id) {
                    const randomShip = fetchedShips[Math.floor(Math.random() * fetchedShips.length)];
                    const newMission = await db.Mission.create({
                        missionName: launchData.mission_name,
                        shipId: randomShip.id,
                        missionObjective: launchData.details || null,
                        launchDate: launchData.launch_date_utc || null,
                        // We don't have a direct 'land_date_utc' anymore, we might need to explore other fields or omit it
                        missionOutcome: launchData.launch_success !== undefined ? (launchData.launch_success ? 'Success' : 'Failure') : null,
                    });
                    createdMissions.push(newMission);
                } else {
                    console.warn('Launch data missing mission name or ID, skipping.');
                }
            }

            console.log('Mission population and linking complete.');
            process.exit(0);

        } catch (error) {
            console.error('Error parsing JSON:', error);
            process.exit(1);
        }

    } catch (error) {
        console.error('Error during mission population and linking:', error);
        process.exit(1);
    }
}

populateMissions();