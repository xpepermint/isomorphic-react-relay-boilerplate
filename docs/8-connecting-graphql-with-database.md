# Connecting GraphQL With Database

For the database layer we'll use the popular [Sequalize](http://docs.sequelizejs.com) ORM. It works with different SQL databases, including [MySQL](http://www.mysql.com) which we'll use here.

Before we continue let's stop for a moment and think about our application structure. More features means more code. More code eventually kills simplicity and we are soon off the road. A serious platform must be long-term sustainable. As soon as our code gets big and complex, it's time to split the project into smaller pieces. A real-world GraphQL server could consist of many related and unrelated parts, different databases, different private and public APIs, even different code bases. A GraphQL server should consequently be treated more like a proxy layer combining different sub-sistems into a single gateway.

## Models

Based on the bigger picture explained above, let's create a `storage` directory and write an app which will serve as a permanent data store for our project. Start by installing the dependencies.

```
npm i --save sequelize mysql
```

Add configuration variables into `package.json` file (change the data to match your configuration).

```json
"config": {
  "storageDatabaseUri": "mysql://user:password@localhost:3306/dbname",
  ...
}
```

Create `storage/index.js` file and initialize the database connection.

```js
import Sequelize from 'sequelize';

const uri = process.env.npm_package_config_storageDatabaseUri;

export default new Sequelize(uri);
```

Create a model file `storage/models/Project.js`.

```js
import Sequelize from 'sequelize';
import db from '..';

let Project = db.define('Project', {
  name: {type: Sequelize.STRING}
}, {
  timestamps: false
});

export default Project;
```

## Migrations

Installing the command-line tool (ES6 version).

```
npm i --save git+https://github.com/xpepermint/cli.git
```

Open `package.json` file and define new commands.

```json
"scripts": {
  "storage:db:migrate": "sequelize db:migrate --url $npm_package_config_storageDatabaseUri --models-path ./storage/models --migrations-path ./storage/migrations",
  "storage:db:rollback": "sequelize db:migrate:undo --url $npm_package_config_storageDatabaseUri --models-path ./storage/models --migrations-path ./storage/migrations",
  "storage:db:seed": "babel-node ./storage/seed.js",
  ...
}
```

Create a migration file `storage/migrations/0-create-project.js` for `Project` model.

```js
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
```

Create a `storage/seed.js` file with some data to populate the database.

```js
import Project from './models/Project';

Project.bulkCreate([
  {name: 'Project 1'},
  {name: 'Project 2'}
]).then(records => {
  Project.sequelize.close();
});
```

## GraphQL

Install the dependencies.

```
npm i --save graphql-sequelize
```

Open `graphql/schema.js` and update the code according to the example below.

```js
...
import {resolver} from 'graphql-sequelize';
import Project from '../storage/models/Project';
...
const RootType = new GraphQLObjectType({
  ...
  fields: {
    projects: {
      ...
      resolve: resolver(Project)
    }
  }
});
...
```
