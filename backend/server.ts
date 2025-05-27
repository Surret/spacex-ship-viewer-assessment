if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import { ApolloServer } from '@apollo/server';
import { nodeEnv } from './config/nodeEnv'; // Import the nodeEnv variable and its type
import { expressMiddleware } from '@apollo/server/express4';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverlessExpress = require('@vendia/serverless-express');
import * as express from 'express';
import * as core from 'express-serve-static-core';
import { json } from 'body-parser';
import * as cors from 'cors';
import { typeDefs, resolvers } from './routes/graphql';
import shipRoutes from './routes/shipRoutes';
import { jwtController } from './controllers';
import * as Sentry from '@sentry/serverless';
import helmet from 'helmet';
import { RateLimiterMiddleware } from './middlewares';
import { sync } from './models';
import { CreateRoutes } from './controllers/CreateRoutes';

const getIpAddress = (request: express.Request): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return request.clientIp || undefined;
};

const getDeviceUniqueIdentifier = (request: express.Request): string | undefined => {
  if (request?.headers?.deviceUniqueIdentifier) {
    return request.headers.deviceUniqueIdentifier.toString();
  }
  return;
};

export const createApp = async (): Promise<core.Express> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: nodeEnv !== 'production',
  });

  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  const app = express();
  await sync();

  return new Promise((resolve, reject) => {
    const ready = err => {
      if (err) {
        reject(err);
      }
      CreateRoutes(app);

      app.use(
        cors(),
        json(),
        helmet(),
      );
        app.use('/api', shipRoutes);

      app.use(
        expressMiddleware(server, {
          context: async ({ req, res }) => {
            const { event, context } = serverlessExpress.getCurrentInvoke();
            return {
              expressRequest: req,
              expressResponse: res,
              lambdaEvent: event,
              lambdaContext: context,
              ...(await jwtController.createAuthScope(req.headers.authorization)),
              ip: getIpAddress(req),
              deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
              userAgent: req.headers['user-agent'],
            };
          },
        }),
      );
      resolve(app);
    };

    app.use(new RateLimiterMiddleware(ready).middleware);
  });
};

async function setup(event, context) {
  const app = await createApp();
  return serverlessExpress({ app })(event, context);
}

exports.handler = Sentry.AWSLambda.wrapHandler(setup);
