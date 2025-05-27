import { ensureEnvVars } from '../config';
import { populate } from '../helpers/productionPopulate';

exports.handler = async (event, context) => {
  ensureEnvVars();
  try {
    await populate();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
