

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tags', [
    {
      name: 'ux',
    },
    {
      name: 'service',
    },
    {
      name: 'workshop',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tags', null, {}),
};
