import { ensureEnvVars } from './ensureEnvVars';
import { nodeEnv, NodeEnv } from './nodeEnv';

interface AuthScope {
  userId?: string;
  ip?: string;
  userAgent?: string;
  deviceUniqueIdentifier?: string;
}

interface Config {
  apiUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  jwtSecret: string;
  nodeEnv: NodeEnv;
  mysql: {
    database: string;
    host: string;
    username: string;
    password: string;
  };
  sentryDsn: string;
  jwksUri: string;
  jwksAudience: string;
  jwksIssuer: string;
}

interface GraphqlContext {
  userId?: string;
  ip?: string;
  userAgent?: string;
  deviceUniqueIdentifier?: string;
}

const config: Config = {
  apiUrl: process.env.API_URL || '',
  accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY || '',
  bucketName: process.env.S3_BUCKET || '',
  jwtSecret: process.env.JWT_SECRET || '',
  nodeEnv,
  mysql: {
    database: process.env.MYSQL_DATABASE || 'spacex', 
    host: process.env.MYSQL_HOST || 'localhost',
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
  },
  sentryDsn: process.env.SENTRY_DSN || '',
  jwksUri: process.env.JWKS_URI || '',
  jwksAudience: process.env.JWT_AUDIENCE || '',
  jwksIssuer: process.env.JWT_ISSUER || '',
};

if (parseInt(process.env.DEBUG_CONFIG || '0', 10)) {
  console.info(JSON.stringify({ config }, null, 2));
}

export { config, ensureEnvVars, GraphqlContext, AuthScope };

import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Adjust the path to your .env file if needed

