import { cleanDb } from '../../helpers/testHelpers';

import { db } from '..';
describe('Models: Index', () => {
  beforeAll(async () => {
    await cleanDb();
  });
  it('should use mysql dialect', async () => {
    expect(db.sequelize.getDialect()).toEqual('mysql');
    await db.sequelize.close();
  });
});
