import Project from './models/Project';

Project.bulkCreate([
  {name: 'Project 1'},
  {name: 'Project 2'}
]).then(records => {
  Project.sequelize.close();
});
