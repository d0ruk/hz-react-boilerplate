const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
  contentBase: "./",
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  // lazy: true,
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: { colors: true },
  proxy: {
    "/horizon/**": {
      target: "http://localhost:7001",
      secure: false,
    },
  },
}).listen(3000, "localhost", function (err, result) {
  if (err) {
    return console.log(chalk.bgRed.white.bold(err));
  }
  console.log(`Listening at http://localhost:${chalk.bgGreen.black.bold(3000)}/`);
});
