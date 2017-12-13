var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/boot.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: APP_DIR,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use:  [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                autoprefixer(),
                cssnano()
              ]
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
