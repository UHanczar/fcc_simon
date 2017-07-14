import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// at the end uncomment extractCSS for compiling css file;
const extractCSS = new ExtractTextPlugin('./css/style.bundle.css');

export default {
  context: __dirname,
  entry: [
    // 'babel-polyfill',
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/App.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000,
    historyApiFallback: true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loader: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
      // in case of creating css bundle file
      // use: ExtractTextPlugin.extract({
      //   fallback: 'style-loader',
      //   use: ['css-loader', 'sass-loader']
      // })
    }]
  },
  plugins: [
    // extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
