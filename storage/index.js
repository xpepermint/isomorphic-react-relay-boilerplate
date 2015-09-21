import Sequelize from 'sequelize';

const uri = process.env.npm_package_config_storageDatabaseUri;

export default new Sequelize(uri);
