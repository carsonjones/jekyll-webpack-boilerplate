/**
 * Webpack Configuration
 * client js, bundle Creation
 * sass to css
 */
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin'

const ROOT = '../';

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  return {
    name: 'js',
    entry: [
      path.resolve(__dirname, ROOT, 'assets/js/main.js'),
    ],
    output: {
      path: path.resolve(__dirname, ROOT, '_site/assets/'),
      filename: '[name].js',
      publicPath: '/assets/'
    },
    module:{
      rules:[
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, ROOT, 'assets/js/main.js'),
          ],
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: false, 
            presets: [
              'babel-preset-es2015',
              'babel-preset-es2016',
              'babel-preset-react'
            ]
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { autoprefixer: false, sourceMap: true, importLoaders: 1 } },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader', options: { sourceMap: (()=>{return !isProduction }) } },
            ]
          }),
          include: [
            path.resolve(__dirname, ROOT, '_sass/main.scss'),
          ]
        }
      ]
    },
    resolve:{
      modules: [
        path.resolve(__dirname, ROOT, '_sass')
      ]
    },
    devtool: (() => {
      if (isProduction) return 'hidden-source-map'
      else return 'cheap-module-eval-source-map'
    })(),
    externals: {
      'jquery': 'jQuery',
    },
    stats: {
      chunks: false,
      modules: false,
      colors: true
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new CopyWebpackPlugin(
        [
          {
            from: path.resolve(__dirname, ROOT, 'assets/img/'),
            to: path.resolve(__dirname, ROOT, '_site/assets/img')
          },
          {
            from: path.resolve(__dirname, ROOT, 'assets/resources')
          },
          {
            from: path.resolve(__dirname, ROOT, 'assets/video')
          },
          {
            from: path.resolve(__dirname, ROOT, 'assets/fonts')
          },
        ],
        {
          ignore: ['*.keep']
        }
      ),
      new ImageminPlugin({ 
        // TODO: optimize these options
        disable: (()=>{
          return !isProduction
        }),
        test: /\.(jpe?g|png|gif|svg)$/i 
      })
    ]
  }
}