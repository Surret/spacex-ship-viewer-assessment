import { Sequelize } from 'sequelize';
import { config } from '../config/index';
import { DataTypeAbstract, ModelAttributeColumnOptions } from 'sequelize';
import { User } from './User';
import { Address } from './Address';
import { Ship } from './ship';
import { Mission } from './missions';
import { setupAssociations } from './associations';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
}

console.log('Full Config Object:', config);

// console.log('Sequelize Configuration:', config.mysql); 

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
  logging: true,
  pool: {
    acquire: 30000,
  },
});

const db = {
  sequelize,
  User: User.initModel(sequelize),
  Address: Address.initModel(sequelize),
  Ship: Ship.initModel(sequelize),
  Mission: Mission.initModel(sequelize),
};

setupAssociations(sequelize, db);

Object.keys(db).map(key => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});

const sync = async () => {
  await sequelize.sync({ force: false });
};

export { sync, db, sequelize, User, Address, Ship, Mission };
