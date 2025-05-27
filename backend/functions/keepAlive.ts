import { ensureEnvVars, config } from '../config';
import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  ensureEnvVars();
  try {
    const response = await fetch(config.apiUrl + '/health');
    const results = await response.json();
    console.info(results);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
