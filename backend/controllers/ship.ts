import { PaginationInput } from '../common/types/backend';
import { AuthScope } from '../config';
import { db } from '../models';
import { ShipAttributes } from '../models/ship';

const get = async ({ pagination }: { pagination: PaginationInput }, authScope: AuthScope): Promise<ShipAttributes[]> => {
  const ships = await db.Ship.findAll();

  return ships;
};

const shipController = {
  get,
};
export { shipController };
