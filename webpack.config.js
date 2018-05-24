const path = require('path');
module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname + "/public",
    filename: 'assets/bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
    },
    node: { fs: "empty" }
}
