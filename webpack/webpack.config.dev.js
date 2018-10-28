var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    port: 5555,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    inline: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: "file-loader?name=[name].[ext]&outputPath=assets/fonts/"
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: "file-loader?name=[name].[ext]&outputPath=assets/images/"
      },
      {
        test: /\.(wav)$/i,
        use: "file-loader?name=[name].[ext]&outputPath=assets/sounds/"
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home Page',
      filename: 'index.html',
      hash: false,
      template: './src/public/index.html'
    })
  ]
}