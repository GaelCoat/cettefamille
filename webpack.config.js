"use strict";
var path = require("path");
var webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/[name].css",
  allChunks: true
});

var options = {

  entry: {
    // Le coeur de l'application
    app: ["./app/src/site/main.js"],
    handler: ["./app/src/handler/main.js"],
    // Les librairies externes
    vendor: [
      "underscore",
      "jquery",
      "backbone",
      "backbone.marionette",
      "q",
    ]

  },

  output: {
    path: path.join(__dirname, "app/build"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  resolve: {
    extensions: [
      ".js",
      ".json",
    ],
    modules: ["./app/src", "./app/src/libs", "node_modules"]
  },

  devtool: "eval",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        include: /\.pug/,
        loader: 'pug-html-loader'
      },

      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader", options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader", options: {
              sourceMap: true
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },

    ],
  },

  plugins: (
    [
      extractSass,
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
      new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.bundle.js"}),
      // On expose des proxy pour les dépendances des librairies
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        _: 'underscore',
        q: 'q',
        Backbone: 'backbone',
        Marionette: 'backbone.marionette',
      }),
    ]
  ),

}

module.exports = options;
