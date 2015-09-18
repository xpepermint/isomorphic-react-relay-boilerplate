# React Setup

The instructions below explain how to setup an isomorphic React application. We'll need two entry points - one for server-side and one for client-side. The **server-side** entry point will be the `app/server.js` file while the **client-side** entry file will be `app/client.js`. Let's start by installing the dependencies.

```
npm i --save react@^0.14.0-beta3 react-dom@^0.14.0-beta3
```

## Client

We've already configured the Webpack so let's just rename the `app/index.js` file to `app/config.js`. We must also update the configuration so it will point to the right entry file.

```js
entry: {
  app: path.resolve('app/client.js')
},
```

Open it and write a startup script, which renders the App component, as shown below.

```js
import './styles/index.styl';

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.render(<App/>, document.getElementById('app'));
```

Now we need to create the `App` component at `app/components/App.js`.

```js
import React from 'react';

class App extends React.Component {
  render() {
    return (<div>App started!</div>);
  }
}

export default App;
```

## Server

We need a server which will render the app on the server and serve the html content. We'll use [Express](http://expressjs.com) for that. We'll also use [nodemon](http://nodemon.io/) for starting the server in development. Continue by installing the dependencies.

```
npm i --save express
npm i --save-dev nodemon
```

Create a new file `app/server.js` and paste the content below.

```js
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from './components/App';

const env = process.env;
const assetsPath = `${env.npm_package_config_webpackBaseUrl}/${env.npm_package_version}`;
const publicPath = path.resolve('../public');

let app = express();
app.set('trust proxy', 'loopback');
app.set('x-powered-by', false);
app.use(express.static(publicPath));

app.use((req, res) => {
  let markup = ReactDomServer.renderToString(<App/>);
  let html = [
    `<!DOCTYPE html>`,
    `<html>`,
      `<head>`,
        `<meta charset="utf-8"/>`,
        `<link rel="stylesheet" href="${assetsPath}/app.css"></link>`,
      `</head>`,
      `<body>`,
        `<div id="app">${markup}</div>`,
      `</body>`,
      `<script type="text/javascript" src="${assetsPath}/app.js"></script>`,
    `</html>`
  ].join('');
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

export default app;
```

Create a server script `scripts/server.js` that will start the server.

```js
import app from '../app/server';

const env = process.env;
const host = env.npm_package_config_serverHost;
const port = env.npm_package_config_serverPort;

let server = app.listen(port, host);

export default server;
```

Update the `package.json` by updating the config and scripts sections.

```json
"config": {
  ...
  "serverHost": "127.0.0.1",
  "serverPort": 4444
},
"scripts": {
  ...
  "server:start": "babel-node scripts/server.js",
  "server:start:dev": "nodemon --exec babel-node -- scripts/server.js"
},
```
