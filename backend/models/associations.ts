import { Sequelize } from 'sequelize';
import { Ship } from './ship';
import { Mission } from './missions';

export const setupAssociations = (sequelize: Sequelize ,db :any) => {
  Mission.belongsTo(Ship, {
    foreignKey: 'shipId',
    as: 'ship',
  });

  db.Ship.hasOne(db.Mission, {
    foreignKey: 'shipId',
    as: 'mission',
  });
};