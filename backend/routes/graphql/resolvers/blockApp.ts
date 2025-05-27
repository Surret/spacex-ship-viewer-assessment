import { GraphqlContext } from '../../../config';
import { blockAppController } from '../../../controllers/blockApp';
import { QueryBlockAppArgs, BlockApp } from '../../../common/types/backend';

const blockApp = async (rootValue, { input }: QueryBlockAppArgs, context: GraphqlContext): Promise<BlockApp> => {
  return await blockAppController.blockApp(input, context);
};

const query = { blockApp };
const mutation = {};

const BlockApp = { query, mutation };
export { BlockApp };
