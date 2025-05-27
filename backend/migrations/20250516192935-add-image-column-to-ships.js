module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ships', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('ships', 'active', {
        type: Sequelize.BOOLEAN, // Assuming 'active' is a boolean
        allowNull: true,
      }),
      queryInterface.addColumn('ships', 'home_port', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ships', 'image'),
      queryInterface.removeColumn('ships', 'active'),
      queryInterface.removeColumn('ships', 'home_port'),
    ]);
  },
};