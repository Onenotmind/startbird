'use strict'
const HtmlWepackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpritePlugin = require(`svg-sprite-loader/plugin`)

function resolve (...any) {
  return path.resolve(__dirname, '..', ...any)
}

module.exports = {
  context: resolve(),
  // node: {
  //   __dirname: false,
  //   __filename: false
  // },
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  // 本地服务的相关配置
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3003
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      { // TODO 暂时加这个
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, '../src/styles/common/common.scss')
          }
        }],

      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {extract: true}
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 打包所需的入口html文件
    new HtmlWepackPlugin({
      template: './src/index.html'
    }),
    // 打包前清除之前的打包目录
    new CleanWebpackPlugin(),
    // vue 打包需要
    new VueLoaderPlugin(),
    new SpritePlugin()
  ]
}
