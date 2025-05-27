import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './models/index';

const { Sequelize } = require('sequelize');

const umzug = new Umzug({
  storage: new SequelizeStorage({ sequelize }),
  migrations: {
    glob: './migrations/*.ts',
    resolve: ({ name, path, context }) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const migration = require(path ?? '');
      return {
        name,
        up: async () => migration.up.bind(context, Sequelize),
        down: async () => migration.down.bind(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  logger: console,
});


(async () => {
  try {
    const migrated = await umzug.up();
    if (migrated.length === 0) {
      console.log('No pending migrations');
    } else {
      console.log('Migrations applied:', migrated.map(m => m.name));
    }
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1); // Exit with error code
  }
})();

export { umzug };
