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

const ROOT = '../';
const paths = {
  src: path.join(__dirname, ROOT, './src'),
  dist: path.join(__dirname, ROOT, './dist'),
  js: path.join(__dirname, ROOT, './src/assets/js'),
  sass: path.join(__dirname, ROOT, './src/assets/sass'),
  images: path.join(__dirname, ROOT, './src/assets/images'),
  fonts: path.join(__dirname, ROOT, './src/assets/fonts'),
  resources: path.join(__dirname, ROOT, './src/assets/resources'),
}

const getPlugins = (isProduction) => {
  const env = (isProduction) ? 'production' : 'development';
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
      filename: isProduction ? 'assets/vendor.js' : 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new webpack.NamedModulesPlugin(),
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
        context: paths.src,
      },
      minimize: isProduction ? true : false,
      debug: isProduction ? false : true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, ROOT, 'src/assets/images/'),
          to: path.resolve(__dirname, ROOT, 'dist/assets/images')
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
        }
      ],
      {
        ignore: ['*.keep', '*.psd', '*.sketch']
      }
    ),
    new ExtractTextPlugin({
      filename: (isProduction) ? 'assets/main.css' : 'main.css',
      allChunks: !isProduction,
    })
  ]

  if(isProduction){
    plugins.push(
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
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return plugins;
}

const getRules = (isProduction) => {
  const rules = [
    {
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/],
      use: [
        'babel-loader',
      ],
    },
    {
      test: /\.(png|gif|jpg)$/,
      include: paths.images,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
      test: /\.svg$/,
      include: paths.images,
      use: 'svg-inline-loader?classPrefix',
    },
    {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      include: paths.fonts,
      loader: 'url-loader',
      options: {
        limit: 50000,
        mimetype: 'application/font-woff',
        name: './assets/fonts/[name].[ext]',
        publicPath: '../',
      }
    }
  ]

  if(isProduction) {
    rules.push(
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!resolve-url-loader!sass-loader',
        }),
      }
    )
  } else {
    rules.push(
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { autoprefixer: false, sourceMap: true, importLoaders: 1 } },
            { loader: 'postcss-loader' },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader', options: { sourceMap: (()=>{return !isProduction }) } },
          ]
        }),
      }
    );
  }

  return rules;
} 

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  const envInfo = (isProduction) ? 'production' : 'development';
  console.log(`Running Webpack: ${envInfo}`);
  return { 
    devtool: (()=>{
      if (isProduction) return 'hidden-source-map';
      else return 'eval-source-map';
    })(),
    context: paths.src,
    entry: {
      js: paths.js
    },
    output: {
      path: paths.dist,
      publicPath: '/',
      filename: isProduction ? 'assets/main.js' : 'main.js',
    },
    module: {
      rules: getRules(isProduction)
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, ROOT, 'node_modules'),
        paths.sass,
        paths.js,
        paths.fonts
      ],
    },
    plugins: getPlugins(isProduction),
    stats: {
      excludeAssets: [
        /.*assets\/images/,
        /.*assets\/fonts/,
        /.*assets\/resources/,
        /\.(png|jpg)$/
      ],
      modules: false,
      children: false,
    },
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
        maxModules: 15,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        },
        exclude: [
          "node_modules",
          "*/assets/images",
          "*/assets/fonts",
        ]
      }
    }
  };
}