var dev = process.env.NODE_ENV !== "production";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_dashboard = require("webpack-dashboard/plugin");
var browserSync = require("browser-sync-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "/src"),
  devtool: dev ? "#cheap-module-eval-source-map" : null,
  entry: dev ? [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./index"
  ] : "./index",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: dev ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css", { publicPath: "/", allChunks: true }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),
    new webpack_dashboard(),
    // new browserSync({
    //   host: "localhost",
    //   port: 3100,
    //   // proxy the Webpack Dev Server endpoint
    //   // (which should be serving on http://localhost:3000/)
    //   // through BrowserSync
    //   proxy: "http://localhost:3000/"
    // }, {
    //   // prevent BrowserSync from reloading the page
    //   // and let Webpack Dev Server take care of this
    //   reload: false
    // }
    // )
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
        loader: "babel",
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
      }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style", "css?importLoaders=1!stylus")
      }
    ]
  },
  stylus: {
    preferPathResolver: "webpack",
    use: [
      require("rupture")(),
      require("poststylus")(["autoprefixer", "postcss-font-magician", "rucksack-css"])
    ]
  },
  externals: ["ws"],
  resolve: {
    extensions: ["", ".js", ".jsx", ".json", ".styl"],
    root: path.join(__dirname, "node_modules"),
  },
  node: {
    "tls": "empty",
    "fs": "empty",
  }
};
