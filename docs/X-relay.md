[GraphQL](http://facebook.github.io/graphql/) is a language used to query application servers for data. [Relay]() is a library for React.


GraphQL:
https://github.com/graphql/graphql-js/tree/master/src
https://github.com/facebook/relay/issues/180
https://medium.com/@frikille/moving-from-rest-to-graphql-e3650b6f5247

Relay:
https://github.com/graphql/graphql-relay-js

Examples:
https://gitlab.com/andrew-codes/presentation-demo-relay-graphql/tree/master


# GraphQL Server

```
npm i --save express-graphql
```

Create `graphql/index.js` file and write some code.

```js
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './data/schema';

let app = express();
app.use('/', graphQLHTTP({schema, pretty: true}));

export default app;
```

Create `graphql/data/schema.js`.

```js
import {GraphQLSchema, GraphQLObjectType, GraphQLInt} from 'graphql/type';

let count = 0;

let rootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    count: {
      type: GraphQLInt,
      description: 'The count!',
      resolve: () => {
        return count;
      }
    }
  }
});

let rootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    updateCount: {
      type: GraphQLInt,
      description: 'Updates the count',
      resolve: () => {
        count += 1;
        return count;
      }
    }
  }
});

let schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
});

export default schema;
```

Change `scripts/server.js` to this.

```js
import express from 'express';
import app from '../app/server';
import graphQL from '../graphql';

const env = process.env;
const host = env.npm_package_config_serverHost;
const port = env.npm_package_config_serverPort;

let router = express();
router.use('/graphql', graphQL);
router.use('/*', app);

let server = router.listen(port, host);

export default server;
```
