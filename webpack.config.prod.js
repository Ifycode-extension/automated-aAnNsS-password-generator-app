import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
//import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[chunkhash].js'
  },
  plugins: [

    //Generate an external css file with a hash in the file name
    new ExtractTextPlugin('index.[chunkhash].css'),

    //Hash the files using MD5 so that the name(s) changes when the content changes.
    new WebpackMd5Hash(),

    //create HTML file that includes reference to bundled js.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      trackJSToken: '563bbec8d0844c37b8b0e08d350b6570'
    }),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Minify js
    new webpack.optimize.UglifyJsPlugin()
    /*,
    //not able to get any of copy webpack plugin, file loader or url-loader to copy images to dist
    new CopyWebpackPlugin(
      {
        patterns: [
          {from:'src/img',to:'dist/img'}
        ]
      }
     )*/
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}


/*
Check which of these will be useful for your project and add just before inject: true
minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
*/

