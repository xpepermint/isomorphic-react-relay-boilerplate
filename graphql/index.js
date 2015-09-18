import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './schema';

let app = express();
app.use('/', graphQLHTTP({schema, pretty: true}));

export default app;
