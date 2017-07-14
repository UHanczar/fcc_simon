import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// at the end uncomment extractCSS for compiling css file;
const extractCSS = new ExtractTextPlugin('./css/style.bundle.css');

export default {
  // context: __dirname,
  entry: [
    'babel-polyfill',
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    path.resolve(__dirname, './app/App.js')
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
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
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader'
      ]
    }]
  },
  plugins: [
    // extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
