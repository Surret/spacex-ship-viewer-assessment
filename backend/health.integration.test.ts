import * as supertest from 'supertest';
import { createApp } from './server';
import { db } from './models';
describe('Health:Integration', () => {
  let agent: supertest.SuperTest<supertest.Test>;
  beforeAll(async () => {
    const app = await createApp();
    agent = supertest(app);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('should get health status', async () => {
    const results = await agent.get('/health').set('Accept', 'application/json').expect(200);
    expect(results.body.ok).toBe(1);
  });
});
