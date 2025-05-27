import * as jwt from 'jsonwebtoken';
import { config, AuthScope } from '../config';
import * as jwksClient from 'jwks-rsa';

const createAuthScope = async (token?: string): Promise<AuthScope> => {
  if (!token) {
    return {};
  }

  const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.jwksUri,
  });

  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      callback(null, key?.publicKey || key?.rsaPublicKey);
    });
  };

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: config.jwksAudience,
        issuer: config.jwksIssuer,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          reject({});
        }
        resolve({ userId: decoded?.sub?.toString() });
      },
    );
  });
};

const jwtController = { createAuthScope };
export { jwtController };
