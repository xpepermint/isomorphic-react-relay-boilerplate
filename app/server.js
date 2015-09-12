import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './components/App';

const env = process.env;
const assetsPath = `${env.npm_package_config_webpackBaseUrl}/${env.npm_package_version}`;
const publicPath = path.resolve('../public');

let app = express();
app.set('trust proxy', 'loopback');
app.set('x-powered-by', false);
app.use(express.static(publicPath));

app.use((req, res) => {
  let markup = renderToString(<App/>);
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
