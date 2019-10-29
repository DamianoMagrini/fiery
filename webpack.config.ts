import './webpack.config.d';

import fs from 'fs';
import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { Configuration, Module, Plugin } from 'webpack';

/**
 * Either of the two modes that can be used while building the app.
 */
type Mode = 'development' | 'production';

/**
 * A function that generates the `module` property of Webpack's
 * `Configuration`, based on the provided build mode.
 *
 * @param mode The build mode.
 */
const generate_module = (mode: Mode): Module => ({
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            ...(mode === 'production'
              ? { plugins: ['@babel/plugin-transform-react-inline-elements'] }
              : {})
          }
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'src', 'tsconfig.json')
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: ExtractCssChunks.loader,
          options: {
            hot: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
              localIdentName: '[hash]',
              context: path.resolve(__dirname, 'src')
            }
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.svg$/,
      use: 'file-loader'
    }
  ]
});

/**
 * A function that generates the `plugins` property of Webpack's
 * `Configuration`, based on the provided build mode.
 *
 * @param mode The build mode.
 */
const generate_plugins = (mode: Mode): Plugin[] => [
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'src', 'client', 'resources'),
      to: path.resolve(__dirname, 'build')
    }
  ]),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'client', 'index.html'),
    excludeChunks: ['service_worker'],
    minify: {
      collapseWhitespace: mode === 'production'
    }
  }),
  new ExtractCssChunks({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  ...(mode === 'production'
    ? [
        new OptimizeCssAssetsPlugin({
          // @ts-ignore
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    : [])
];

/**
 * A function that generates a complete Webpack `Configuration`, based on the
 * provided build mode.
 *
 * @param mode The build mode.
 */
const generate_config = (mode: Mode): Configuration => ({
  name: mode,
  mode,

  devtool: mode === 'production' ? undefined : 'inline-source-map',
  target: 'web',

  entry: {
    main: path.resolve(__dirname, 'src', 'client', `index.${mode}.tsx`),
    ...(mode === 'production'
      ? {
          service_worker: path.resolve(
            __dirname,
            'src',
            'service-worker',
            'index.ts'
          )
        }
      : {})
  },

  module: generate_module(mode),
  plugins: generate_plugins(mode),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[contenthash].bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src', 'client', 'resources'),
    historyApiFallback: true,
    hot: true,
    compress: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'certificate.crt'))
    },

    overlay: true,
    open: true
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
});

export default [
  /*
    The development configuration, used for development builds by Webpack Dev
    Server. It is not minified and does not include the service worker.
  */
  generate_config('development'),
  /*
    The production configuration, only used for production builds. It is
    minified and includes the service worker.
  */
  generate_config('production')
] as Configuration[];
