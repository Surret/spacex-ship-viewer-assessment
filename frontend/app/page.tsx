// frontend/app/page.tsx

import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link';

// Define the Ship type based on the fields we need
interface Ship {
  id: string;
  name: string;
  image?: string | null;
  type: string;
  active: boolean;
  class: string;
  home_port?: string | null;
  year_built?: number | null;
}

// *** UPDATED INTERFACE for the backend response format ***
interface ShipMissingAttribute {
  id: string;
  missingAttributesCount: number;
}

// Create an Apollo Client instance for server-side fetching
const graphqlClient = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/api/graphql',
  cache: new InMemoryCache(),
});

// Define the GraphQL query to fetch the required ship data
const GET_SHIPS = gql`
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
`;

// 'page.tsx' in the 'app' directory is a Server Component by default
export default async function Home() {
  // 1. Fetch Ship Data from GraphQL (as before)
  const { data: shipData } = await graphqlClient.query<{ ships: Ship[] }>({
    query: GET_SHIPS,
  });
  const ships = shipData?.ships || [];

  // 2. Fetch Missing Attribute Counts from YOUR backend
  const attributesToCheck = ['home_port', 'year_built', 'image', 'type', 'active', 'class'];
  const backendBaseUrl = 'http://localhost:3000';
  const missingAttributesUrl = `${backendBaseUrl}/api/ships/missing-attributes?attributes=${attributesToCheck.join(',')}`;

  let shipMissingAttributeCounts: ShipMissingAttribute[] = [];
  try {
    const res = await fetch(missingAttributesUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Error fetching missing counts: ${res.status} ${res.statusText}`);
      shipMissingAttributeCounts = []; // Default to empty array on error
    } else {
      const jsonResponse: ShipMissingAttribute[] = await res.json();
      shipMissingAttributeCounts = jsonResponse;
      // console.log("Raw Backend Response:", jsonResponse); // Keep for debugging if needed
    }
  } catch (error) {
    console.error('Failed to fetch missing attribute counts:', error);
    shipMissingAttributeCounts = []; // Default to empty array on network error
  }

  // *** NEW: Create a Map for easy lookup of missing counts by ship ID ***
  const missingCountsMap = new Map<string, number>();
  shipMissingAttributeCounts.forEach(item => {
    missingCountsMap.set(item.id, item.missingAttributesCount);
  });

  return (
    <main className="flex justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Ships</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Home Port</th>
                <th className="px-4 py-2">Year Built</th>
                <th className="px-4 py-2">Missing Attributes</th> {/* Re-added New Column Header */}
              </tr>
            </thead>
            <tbody>
              {ships.map((ship) => {
                // Look up the missing count for the current ship using the map
                const currentShipMissingCount = missingCountsMap.get(ship.id) || 0; // Default to 0 if not found

                return (
                  <tr key={ship.id} className="border-b">
                    <td className="px-4 py-2">{ship.id}</td>
                    <td className="px-4 py-2"> <Link href={`/ships/${ship.id}`} className="text-blue-600 hover:underline">
                    {ship.name}</Link></td>
                    <td className="px-4 py-2">
                      {ship.image ? (
                        <img src={ship.image} alt={ship.name} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="px-4 py-2">{ship.type}</td>
                    <td className="px-4 py-2">{ship.active ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2">{ship.class}</td>
                    <td className="px-4 py-2">{ship.home_port || 'N/A'}</td>
                    <td className="px-4 py-2">{ship.year_built || 'N/A'}</td>
                    {/* Displaying the actual per-ship missing count from backend */}
                    <td className="px-4 py-2 text-center font-bold text-red-600">
                      {currentShipMissingCount > 0 ? currentShipMissingCount : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}