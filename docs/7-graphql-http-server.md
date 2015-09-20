# GraphQL HTTP Server

[GraphQL](http://graphql.org) is a language used to query application servers for data. The easies way to create a GraphQL HTTP server is to use the [express-graphql](https://github.com/graphql/express-graphql) middleware. Let's install the dependencies.

```
npm i --save express-graphql
```

Next, we need to define a `schema` which describes our API's data model - data structure, available fields, associations, how we run queries and mutations. The following example explains how to `query` for a list of `projects`. Check the    [graphql-nested-schema-example](https://gist.github.com/xpepermint/7376b8c67caa926e19d2) gist for more advanced schema. Create a `graphql/schema.js` file and paste the code below.

```js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql/type';

const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  }
});

const RootType = new GraphQLObjectType({ // fields on the root type are your public API
  name: 'RootType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() { // you'll replace this with a promise from a database
        return [
          {id: 1, name: `Project 1`},
          {id: 2, name: `Project 2`}
        ];
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootType
});

export default schema;
```

Continue by creating `graphql/index.js` file and write a GraphQL HTTP server app.

```js
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './schema';

let app = express();
app.use(graphQLHTTP({schema, pretty: true}));

export default app;
```

We now have all the pieces so let's write a script which will run the server. We could write a new file and start listening on a new port but let use the existing server's port by updating the update the `scripts/server.js` file.

```js
import express from 'express';
import app from '../app/server';
import graphQL from '../graphql';

const env = process.env;
const host = env.npm_package_config_appServerHost;
const port = env.npm_package_config_appServerPort;

let router = express();
router.use('/graphql', graphQL);
router.use('/*', app);

export default router.listen(port, host);
```

Start the server with the `npm run app:server:start:dev` command and navigate to `http://localhost:4444/graphql?query={projects{name}}` to see the response.
