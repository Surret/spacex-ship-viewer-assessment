'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ships', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      home_port: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      year_built: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
      // 'model' should NOT be here in createTable
    });

    // Conditionally add 'class' if it doesn't exist
    const tableInfo = await queryInterface.describeTable('ships');
    if (!tableInfo.class) {
      await queryInterface.addColumn('ships', 'class', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      });
    }

    // Conditionally remove 'model' if it exists
    if (tableInfo.model) {
      await queryInterface.removeColumn('ships', 'model');
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ships'); // Simplest way to rollback the whole table
    // Or, if you prefer to rollback column by column:
    // await queryInterface.removeColumn('ships', 'class');
    // await queryInterface.removeColumn('ships', 'year_built');
    // await queryInterface.addColumn('ships', 'model', { type: Sequelize.DataTypes.STRING });
  }
};