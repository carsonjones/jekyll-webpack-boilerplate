/**
 * Webpack Configuration
 * client js, bundle Creation
 * sass to css
 */

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const ROOT = '../';

const jsSourcePath = path.join(__dirname, ROOT, './src/js');
const cssSourcePath = path.join(__dirname, ROOT, './src/sass');
const buildPath = path.join(__dirname, ROOT, './dist');
const imgPath = path.join(__dirname, ROOT, './src/assets/img');
const sourcePath = path.join(__dirname, ROOT, './src');

/**
 * Plugins
 */
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: isProduction ? 'assets/vendor.js' : 'vendor.js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  // new HtmlWebpackPlugin({
  //   template: path.join(buildPath, 'index.html'),
  //   inject: 'body',
  //   path: buildPath,
  //   filename: 'index.html',
  // }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: sourcePath,
    },
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new CopyWebpackPlugin(
    [
      {
        from: path.resolve(__dirname, ROOT, 'src/assets/img/'),
        to: path.resolve(__dirname, ROOT, 'dist/assets/img')
      },
      {
        from: path.resolve(__dirname, ROOT, 'src/assets/resources'),
        to: path.resolve(__dirname, ROOT, 'dist/assets/resources')
      },
      {
        from: path.resolve(__dirname, ROOT, 'src/assets/video'),
        to: path.resolve(__dirname, ROOT, 'dist/assets/video')
      },
      {
        from: path.resolve(__dirname, ROOT, 'src/assets/fonts'),
        to: path.resolve(__dirname, ROOT, 'dist/assets/fonts')
      },
      // {
      //   from: path.resolve(__dirname, ROOT, '_pages/404.html'),
      //   to: path.resolve(__dirname, ROOT, '_site/404.html')
      // },
    ],
    {
      ignore: ['*.keep', '*.psd']
    }
  ),
];

/**
 * Rules
 */
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
];

if (isProduction){
  // Production Plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('assets/main.css')
  );
  //Production Rules
  rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
    }
  );
} else{
  // Dev Plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    })
  );
  //Dev Rules
  rules.push(
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
    }
  );
} 

module.exports = {
  devtool: isProduction ? 'eval' : 'source-map',
  context: sourcePath,
  entry: {
    js: path.resolve(__dirname, ROOT, jsSourcePath, 'main.js')
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: isProduction ? 'assets/main.js' : 'main.js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, ROOT, 'node_modules'),
      cssSourcePath,
      jsSourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: isProduction ? './dist' : './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  }
}