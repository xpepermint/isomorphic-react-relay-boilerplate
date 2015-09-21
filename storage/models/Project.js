import Sequelize from 'sequelize';
import db from '..';

let Project = db.define('Project', {
  name: {type: Sequelize.STRING}
}, {
  timestamps: false
});

export default Project;
