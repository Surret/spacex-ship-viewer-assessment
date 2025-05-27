import { ensureEnvVars } from '../config';
import { umzug } from '../migrate';

exports.handler = async (event, context) => {
  ensureEnvVars();
  try {
    await umzug.up();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
