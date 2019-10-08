

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: '111',
      password: '111',
      nickname: '111',
    },
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
