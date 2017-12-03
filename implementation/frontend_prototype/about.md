# Notes
## Purpose of this folder
- I will be setting up the react stuff in this folder
- The primary goal is to get an overview of react, webpack and babel
- I will also document the important parts, so that I can set up a react envoirnement in the feature
on my own
- The set-up-process is done by following
[this](https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel) online resource

## Setting up webpack
- `yarn add webpack webpack-dev-server path`
- `touch webpack.config.js`
- configuring the webpack.config.js file:
```javascript
const path = require('path');
module.exports = {
  // specifies, the entry file, where the bundler starts the bundling process
  entry: './client/index.js',   
  // specifies where the bundled content is to be outputted to
  output: {                   
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    // transpilers and bundlers are defined here
    // specifies that the babel loader transpiles all files, which end with 'js' or 'jsx'
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
```

## setting up babel
- `yarn add babel-loader babel-core babel-preset-es2015 babel-preset-react --dev`
- `touch .babelrc`
- configuring the .babelrc file:
```js
{
  "presets":[
    "es2015", "react"
  ]
}
```

## setting up react components
- creating the input folder:
```bash
mkdir client
cd client
touch index.js
touch index.html
cd ..
```

## setting up html-webpack-plugin
- `yarn add html-webpack-plugin`
- configuring webpack.config.js:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
module: {
  loaders: [
    ...
  ]
},
plugins: [HtmlWebpackPluginConfig]
}
```

## configuring package.json
- add the dev server command to package.json:
```json
"license": "MIT",
"scripts": {
  "start": "webpack-dev-server"
},
"dependencies": {
}
```
