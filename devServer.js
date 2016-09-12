
var path = require('path');
var chalk = require("chalk");
// var app = require("express")();
// var logger = require('morgan');
// var bodyParser = require('body-parser');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
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
    '/horizon/**': {
      target: 'http://localhost:7001',
      // changeOrigin: true,
      secure: false,
    },
  },
}).listen(3000, "localhost", function (err, result) {
  if (err) {
    return console.log(chalk.bgRed.white.bold(err));
  }
  console.log(`Listening at http://localhost:${chalk.bgGreen.black.bold(3001)}/`);
});
