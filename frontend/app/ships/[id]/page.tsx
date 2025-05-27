// frontend/app/ships/[id]/page.tsx

import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link';

interface Ship {
  id: string;
  name: string;
  image?: string | null;
  type: string;
  active: boolean;
  class: string;
  home_port?: string | null;
  year_built?: number | null;
  missions?: Mission[];
}

// *** UPDATED MISSION INTERFACE ***
interface Mission {
  name: string;
  flight?: number; // Changed from flight_id to flight based on GraphQL error suggestion
  // Add other mission fields if available
}

const graphqlClient = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/api/graphql',
  cache: new InMemoryCache(),
});

// *** UPDATED GRAPHQL QUERY ***
const GET_SHIP_BY_ID = gql`
  query GetShipById($id: ID!) {
    ship(id: $id) {
      id
      name
      image
      type
      active
      class
      home_port
      year_built
      missions {
        name
        # Changed from flight_id to flight
        flight # If 'flight' is what you want, otherwise remove this line if missions just have a name
      }
    }
  }
`;

export default async function ShipDetailPage({ params }: { params: { id: string } }) {
  const shipId = params.id;

  let ship: Ship | null = null;
  try {
    const { data } = await graphqlClient.query<{ ship: Ship }>({
      query: GET_SHIP_BY_ID,
      variables: { id: shipId },
    });
    ship = data.ship;
  } catch (error) {
    console.error(`Error fetching ship ${shipId}:`, error);
  }

  if (!ship) {
    return (
      <main className="flex justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-7xl bg-white rounded-md shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Ship Not Found</h1>
          <p>The ship with ID: {shipId} could not be found.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 block">
            &larr; Back to all Ships
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Ship Details: {ship.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ship.image && (
            <div className="md:col-span-1">
              <img src={ship.image} alt={ship.name} className="w-full h-auto object-cover rounded shadow" />
            </div>
          )}
          <div className="md:col-span-1 space-y-2">
            <p><strong>ID:</strong> {ship.id}</p>
            <p><strong>Name:</strong> {ship.name}</p>
            <p><strong>Type:</strong> {ship.type || 'N/A'}</p>
            <p><strong>Active:</strong> {ship.active ? 'Yes' : 'No'}</p>
            <p><strong>Class:</strong> {ship.class || 'N/A'}</p>
            <p><strong>Home Port:</strong> {ship.home_port || 'N/A'}</p>
            <p><strong>Year Built:</strong> {ship.year_built || 'N/A'}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Associated Missions</h2>
        {ship.missions && ship.missions.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {ship.missions.map((mission, index) => ( // Added index for key as flight might be optional or null
              <li key={mission.flight || index}> {/* Use flight as key if present, otherwise index */}
                <strong>{mission.name}</strong>
                {mission.flight && ` (Flight: ${mission.flight})`} {/* Display flight if available */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No associated missions found for this ship.</p>
        )}

        <Link href="/" className="text-blue-600 hover:underline mt-8 block">
          &larr; Back to all Ships
        </Link>
      </div>
    </main>
  );
}