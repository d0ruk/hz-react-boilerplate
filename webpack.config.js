var dev = process.env.NODE_ENV !== "production";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  devtool: dev ? "inline-sourcemap" : null,
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
    new ExtractTextPlugin("style.css", { publicPath: "/", allChunks: true }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
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
      require("autoprefixer")({ browsers: ["last 2 versions"] }),
      // require("postcss-color-rebeccapurple")
    ]
  },
  externals: ["ws"],
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  },
  node: {
    "tls": "empty",
    "fs": "empty",
  }
};
