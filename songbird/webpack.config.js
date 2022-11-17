const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    watch: !isProduction,
    entry: ['./src/index.js', './src/sass/style.scss'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }, {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        }, {
          test: /\.(png|jpe?g|gif|mp3)$/,
          type: 'asset/resource'
        }, {
          test: /\.html$/i,
          loader: "html-loader",
        } , {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        }
      ]
    },

    plugins: [
      new FaviconsWebpackPlugin('./src/img/favicon-32x32.png'),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }), new HtmlWebpackPlugin({
        filename: 'page.html',
        template: 'page.html'
      }), new HtmlWebpackPlugin({
        filename: 'winner.html',
        template: 'winner.html'
      }), new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ]

  }
  return config;
  
};