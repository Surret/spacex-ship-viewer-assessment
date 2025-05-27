import { RateLimiterMySQL } from 'rate-limiter-flexible';
import { Handler, Request } from 'express';
import { sequelize } from '../../models';
import { config } from '../../config/';
import * as requestIp from 'request-ip';

class RateLimiterMiddleware extends RateLimiterMySQL {
  constructor(ready) {
    super(
      {
        storeClient: sequelize,
        dbName: config.mysql.database,
        points: 20,
        duration: 1,
      },
      ready,
    );
  }
  middleware: Handler = async (request: Request, response, next) => {
    const ip: string = requestIp.getClientIp(request);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.clientIp = ip;

    try {
      if (ip) {
        await this.consume(ip);
      }
      next();
    } catch (error) {
      response.status(429).send('Too Many Requests');
    }
  };
}

export { RateLimiterMiddleware };
