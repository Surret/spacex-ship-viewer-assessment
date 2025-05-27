import { GraphqlContext } from '../../../config';
import { QueryUserArgs } from '../../../common/types/backend';
import { userController } from '../../../controllers';
import { UserAttributes } from '../../../models/User';

const user = async (rootValue, { input }: QueryUserArgs, context: GraphqlContext): Promise<UserAttributes> => {
  return userController.get(input, context);
};

const addUser = async (rootValue, _, context: GraphqlContext): Promise<UserAttributes | null> => {
  return null;
};

const query = { user };

const mutation = { addUser };

const User = { query, mutation };
export { User };
