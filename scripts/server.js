import express from 'express';
import app from '../app/server'; // React server
import graphQL from '../graphql'; // GraphQL server

const env = process.env;
const host = env.npm_package_config_serverHost;
const port = env.npm_package_config_serverPort;

let router = express();
router.use('/graphql', graphQL);
router.use('/*', app);

let server = router.listen(port, host);

export default server;
