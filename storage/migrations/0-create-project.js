export default {
  up(migration, Sequelize) {
    return migration.createTable('Projects', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
      name: {type: Sequelize.STRING}
    });
  },
  down(migration, Sequelize) {
    return migration.dropTable('Projects');
  }
};
