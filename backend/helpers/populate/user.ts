import { db } from '../../models';
import { UserAttributes } from '../../models/User';

const createUser = async (args?: UserAttributes): Promise<UserAttributes> => {
  return db.User.create({
    ...args,
  });
};

export { createUser };
