import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env;
const version = env.npm_package_version;
const buildPath = env.npm_package_config_webpackBuildPath;
const baseUrl = env.npm_package_config_webpackBaseUrl;

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
