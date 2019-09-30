

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Posts', [
    {
      title: 'Mamania',
      content: '測試測試測試',
      imgUrl: '#',
      category: 'work',
    },
    {
      title: 'Sketch Shate',
      content: '測試測試測試',
      imgUrl: '#',
      category: 'fun',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Posts', null, {}),
};
