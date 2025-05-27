import { db } from '../models';
//import { Ship } from '../models/ship';
//import { Op } from 'sequelize';

interface MissingAttributeResult { // Define an interface for the result objects
  id: string;
  missingAttributesCount: number;
}

async function countMissingShipAttributes(attributes: string[]): Promise<MissingAttributeResult[]> { // Explicitly define the return type as an array of our interface
  const ships = await db.Ship.findAll();
  const results: MissingAttributeResult[] = []; // Explicitly define the type of the results array

  for (const ship of ships) {
    let missingCount = 0;
    for (const attribute of attributes) {
      if (ship[attribute] === null || ship[attribute] === undefined) {
        missingCount++;
      }
    }
    results.push({ id: ship.id, missingAttributesCount: missingCount });
  }

  return results;
}

// Example usage:
// async function example() {
//   const attributesToCheck = ['home_port', 'year_built', 'image', 'active'];
//   const missingCounts = await countMissingShipAttributes(attributesToCheck);
//   console.log(missingCounts);
// }

// example();

export { countMissingShipAttributes }; // Make sure this is exported