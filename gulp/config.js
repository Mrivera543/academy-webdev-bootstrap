var path = require('path')
var webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier')

var publicAssets = 'public/assets'
var sourceFiles = 'gulp/assets'
var env = process.env.ENV || 'development'

module.exports = {
  // Global environment. Tasks watch for changes in development only
  env: env,

  // The public assets folder
  publicAssets: publicAssets,

  // node-sass / libsass configuration
  sass: {
    src: [
      sourceFiles + '/stylesheets/frontend/frontend.sass',
      sourceFiles + '/stylesheets/frontend/frontend-ie.sass',
      sourceFiles + '/stylesheets/frontend/frontend-no-media-queries.sass',
      sourceFiles + '/stylesheets/styleguide/styleguide.sass'
    ],
    allSrc: [
      sourceFiles + '/**/*.sass'
    ],
    dest: publicAssets + '/stylesheets',
    settings: {
      indentedSyntax: true,
      imagePath: '/assets/images',
      sourceComments: true,
      includePaths: [
        'node_modules/compass-mixins/lib'
      ]
    }
  },

  // Source and destination paths for images
  images: {
    src: sourceFiles + '/images/**',
    dest: publicAssets + '/images'
  },

  // Source and destination paths for fonts
  fonts: {
    src: sourceFiles + '/fonts/**',
    dest: publicAssets + '/fonts'
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
      modulesDirectories: ['node_modules'],
      alias: {
        'jquery': path.resolve(sourceFiles + '/javascripts/vendor/jquery-1.11.3-min.js')
      }
    },
    entry: {
      frontend: './frontend/frontend',
      'frontend-vendor': './frontend/vendor',
      styleguide: './styleguide/styleguide',
      'styleguide-vendor': './styleguide/vendor'
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
        path.resolve(path.join('gulp', 'assets', 'javascripts', 'frontend', 'pages')),
        false
      ),
      new WebpackNotifierPlugin()
    ]
  }
}
