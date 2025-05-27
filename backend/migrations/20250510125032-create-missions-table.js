'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('missions', {
      id: { type: Sequelize.DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.DataTypes.UUIDV4, allowNull: false },
      missionName: { type: Sequelize.DataTypes.STRING, allowNull: false },
      missionObjective: { type: Sequelize.DataTypes.TEXT, allowNull: true },
      launchDate: { type: Sequelize.DataTypes.DATE, allowNull: true },
      landingDate: { type: Sequelize.DataTypes.DATE, allowNull: true },
      missionOutcome: { type: Sequelize.DataTypes.STRING, allowNull: true },
      shipId: { type: Sequelize.DataTypes.UUID, allowNull: false, references: { model: 'ships', key: 'id' } },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('missions');

  }
};
