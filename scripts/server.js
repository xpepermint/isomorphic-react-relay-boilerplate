import app from '../app/server';

const env = process.env;
const host = env.npm_package_config_serverHost;
const port = env.npm_package_config_serverPort;

let server = app.listen(port, host);

export default server;
