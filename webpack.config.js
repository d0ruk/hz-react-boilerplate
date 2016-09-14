var dev = process.env.NODE_ENV !== "production";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_dashboard = require("webpack-dashboard/plugin");

module.exports = {
  context: __dirname + "/src",
  devtool: dev ? "#cheap-module-eval-source-map" : null,
  entry: dev ? [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./index"
  ] : "./index",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: dev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack_dashboard(),
    new ExtractTextPlugin("style.css", { publicPath: "/", allChunks: true }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
  ],
  module: {
    noParse: ["ws"],
    loaders: [
      // {
      //   test: /\.html$/,
      //   loader: "file?name=[name].[ext]"
      // },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, "src"),
        loaders: ["babel"]
      },
      { test: /\.css$/,
        include: path.join(__dirname, "src"),
        loader: ExtractTextPlugin.extract("style","css?importLoaders=1!postcss")
      },
      {
        test: /\.png$/,
        include: path.join(__dirname, "src"),
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        include: path.join(__dirname, "src"),
        loader: "file-loader"
      },
    ]
  },
  postcss: function() {
    return [
      // require("postcss-flexbox"),
      require("postcss-nested"),
      require("postcss-import"),
      require("postcss-apply"),
      require("postcss-color-function"),
      require("rucksack-css")({
        autoprefixer: true
      }),
      require("postcss-font-magician"),
      require("lost"),
      require("css-mqpacker"),
    ]
  },
  externals: ["ws"],
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
    root: path.join(__dirname, "node_modules"),
  },
  node: {
    "tls": "empty",
    "fs": "empty",
  }
};
