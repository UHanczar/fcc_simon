import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
     path.resolve(__dirname, './app/App.js')
  ],
  externals: {
    jquery: 'jQuery',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  // ProvidePlugin loading nessesasy modules when they are required
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      jQuery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
      moment: path.resolve(__dirname, 'node_modules/moment/moment.js')
    },
    modules: [
      "node_modules",
      path.resolve(__dirname, "app/components")
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
