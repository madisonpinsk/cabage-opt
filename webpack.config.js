'use strict';

const path = require('path');
const fs = require('fs');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackChunkHashPlugin = require('webpack-chunk-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

require('dotenv').config({
	path: path.resolve(__dirname, './.env')
});

const WEBSITE_NAME = process.env['WEBSITE_NAME'];

module.exports = (env, argv) => {

	/** @const {string} Режим продашена. */
	const PRODUCTION_MODE = 'production';

	/** @const {string} Режим разработки. */
	const DEVELOPMENT_MODE = 'development';

	/** const {string} Режим. */
	const MODE = argv.mode
		? argv.mode === PRODUCTION_MODE
			? PRODUCTION_MODE
			: DEVELOPMENT_MODE
		: process.env['MODE'] === PRODUCTION_MODE
			? PRODUCTION_MODE
			: DEVELOPMENT_MODE;

	/** @const {Object} Конфигурация для meta-тегов. */
	const metaConfig = require(path.resolve(__dirname, './src/meta.config.js'));

	return {
		mode: MODE,
		context: path.resolve(__dirname, './src'),
		entry: {
			index: [
				'./index.js',
				'./index.scss',
			],
		},
		output: {
			path: path.resolve(__dirname, './public'),
			publicPath: '/',
			filename: 'scripts/[name]' + (MODE === PRODUCTION_MODE ? '.[chunkhash]' : '') + '.js',
			chunkFilename: 'scripts/[name]' + (MODE === PRODUCTION_MODE ? '.[chunkhash]' : '') + '.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						'babel-loader',
					]
				},
				{
					test: /\.s?[ac]ss$/,
					exclude: /node_modules/,
					use: [
						argv.hot === true
							? 'style-loader'
							: MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
						'postcss-loader',
						{
							loader: '@epegzz/sass-vars-loader',
							options: {
								syntax: 'scss',
								files: [
									path.resolve(__dirname, './src/styles.config.js'),
								]
							}
						},
					]
				},
				{
					test: /\.(jpe?g|png|gif|ico|svg)(\?.+)?$/,
					exclude: /node_modules/,
					use: {
						loader: 'file-loader?name=[path][name]' + (MODE === PRODUCTION_MODE ? '.[hash]' : '') + '.[ext]',
					},
				},
				{
					test: /\.(ttf|otf|eot|woff(2)?)(\?.+)?$/,
					use: {
						loader: 'file-loader?name=[path][name]' + (MODE === PRODUCTION_MODE ? '.[hash]' : '') + '.[ext]',
					}
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin([
				'public/images/*',
				'public/scripts/*',
				'public/styles/*',
				'public/favicon.ico',
				'public/index.html',
			], {
				root: __dirname,
			}),
			new DotenvPlugin({
				path: '.env',
				safe: true,
				defaults: false
			}),
			new MiniCssExtractPlugin({
				filename: 'styles/[name]' + (MODE === PRODUCTION_MODE ? '.[chunkhash]' : '') + '.css',
				chunkFilename: 'styles/[id]' + (MODE === PRODUCTION_MODE ? '.[chunkhash]' : '') + '.css',
			}),
			new WebpackChunkHashPlugin({
				algorithm: 'md5',
			}),
			new MomentLocalesPlugin({
				localesToKeep: ['ru'],
			}),
			new HtmlWebpackPlugin(
				{
					title: WEBSITE_NAME,
					template: 'index.html',
					filename: 'index.html',
					inject: true,
					alwaysWriteToDisk: false,
					hash: false,
					cache: false,
					meta: metaConfig || {},
					favicon: path.resolve(__dirname, './src/favicon.ico'),
					minify: {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: false
					},
				}
			),
		],
		stats: {
			colors: true
		},
		devtool: (MODE === DEVELOPMENT_MODE) ? 'source-map' : '',
		watchOptions: {
			ignored: /node_modules/
		},
		target: 'web',
		devServer: {
			port: 9044,
			contentBase: path.resolve(__dirname, './src'),
			watchContentBase: true,
			compress: true,
			historyApiFallback: true,
		}
	};
};
