var path                  = require('path')
var webpack               = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier')

var publicAssets = 'build'
var sourceFiles  = 'src'
var env          = process.env.ENV || 'development'

module.exports = {
  // Global environment. Tasks watch for changes in development only
  env: env,

  // The public assets folder
  publicAssets: publicAssets,

  // node-sass / libsass configuration
  sass: {
    src: [
      sourceFiles + '/stylesheets/application.scss'
    ],
    allSrc: [
      sourceFiles + '/**/*.scss'
    ],
    dest: publicAssets + '/stylesheets',
    settings: {
      imagePath: '/assets/images',
      sourceComments: true,
      includePaths: [
        'node_modules/compass-mixins/lib'
      ]
    }
  },

  // Source and destination paths for html
  html: {
    src: sourceFiles + '/**/*.html',
    dest: publicAssets
  },

  // Source and destination paths for assets
  assets: {
    src: sourceFiles + '/assets/**',
    dest: publicAssets + '/assets'
  },


  // Source and destination paths for javascripts
  js: {
    src: sourceFiles + '/javascripts/*.js',
    // The files that should be checked by the `standard` linter
    standardSrc: [
      sourceFiles + '/javascripts/**/*.js',
      '!' + sourceFiles + '/javascripts/vendor/**/*.js'
    ],
    dest: publicAssets + '/javascripts/'
  },

  // Webpack configuration
  webpack: {
    watch: env === 'development',
    devtool: '#inline-source-map',
    context: path.resolve(sourceFiles + '/javascripts'),
    output: {
      filename: '[name].js',
      path: path.resolve(publicAssets + '/javascripts')
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: path.resolve(sourceFiles + '/javascripts'),
      modulesDirectories: ['node_modules']
    },
    entry: {
      application: 'application.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(vendor\/)/,
          loader: 'babel-loader?loose=all' }
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /pages$/,
        path.resolve(path.join('src', 'javascripts')),
        false
      ),
      new WebpackNotifierPlugin()
    ]
  }
}
