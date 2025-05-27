import fetch from 'node-fetch';
import { db } from '../models';
import { DataTypes } from 'sequelize';

async function populateShips() {
  try {
     await db.sequelize.sync({ alter: true });
    // Check if 'year_built' column exists and add it if not
    const tableInfo = await db.sequelize.getQueryInterface().describeTable('ships');
    if (!tableInfo.year_built) {
      console.log('Adding missing year_built column...');
      await db.sequelize.getQueryInterface().addColumn('ships', 'year_built', {
        type: DataTypes.INTEGER,
        allowNull: true,
      });
      console.log('year_built column added.');
    }

    const response = await fetch('https://spacex-production.up.railway.app/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetShips {
            ships {
              id
              name
              image
              type
              active
              class
              home_port
              year_built
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log('Fetched Ship Data:', JSON.stringify(data?.data?.ships, null, 2));

    const shipsData = data?.data?.ships || [];

    try {
      await db.Ship.bulkCreate(shipsData, {
        ignoreDuplicates: true,
      });
      console.log(`${shipsData.length} ships populated successfully!`);
      process.exit(0);
    } catch (error) {
      console.error('Error during bulk creation of ships:', error);
      process.exit(1);
    }

  } catch (error) {
    console.error('Error fetching and populating ships:', error);
    process.exit(1);
  }
}

populateShips();