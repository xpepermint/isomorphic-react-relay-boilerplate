# Webpack Setup

We'll use [Webpack](http://webpack.github.io) bundler for serving client-side assets (e.g. javascript, styles) in development and for precompiling assets for production. Let's start by installing the dependencies.

```
npm i --save-dev webpack webpack-dev-server extract-text-webpack-plugin babel-loader css-loader react-hot-loader style-loader stylus-loader nib
```

Create a configuration file `webpack.config.babel.js` with the content below.

```js
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env;
const version = env.npm_package_version;
const buildPath = env.npm_package_config_appWebpackBuildPath;
const baseUrl = env.npm_package_config_appWebpackBaseUrl;

let config = {
  entry: {
    app: path.resolve('app/client.js')
  },
  output: {
    path: path.resolve(`${buildPath}/${version}`),
    filename: '[name].js',
    publicPath: `${baseUrl}/${version}/`
  },
  module: {
    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')},
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(env)),
    new ExtractTextPlugin('[name].css')
  ]
};

export default config;
```

Create the entry file `app/index.js`, which we specified above.

```js
import './styles/index.styl';
console.log('App started!');
```

Create the main file for styles `app/styles/index.styl`, which we include in the entry file above.

```css
@import "~nib/index.styl"
body
  background: #c0c0c0
```

Open `package.json` and set scripts and config keys.

```json
"config": {
  ...
  "appWebpackBaseUrl": "http://localhost:8080",
  "appWebpackBuildPath": "public/assets"
},
"scripts": {
  ...
  "app:webpack:start": "webpack-dev-server --hot --inline --progress --colors",
  "app:webpack:build": "webpack -p"
},
```

The build command will create precompiled files which we don't want to store into the GIT repository so let's add these into the `.gitignore` file.

```
echo public/assets >> .gitignore
```

This configuration will produce the files `app.js` and `app.css`. You can run the development webpack server with the `npm run app:webpack:start` command and then access these files from `http://localhost:8080/{version}/app.{extension}`. To precompile assets for production, run the `npm run app:webpack:build` command.
