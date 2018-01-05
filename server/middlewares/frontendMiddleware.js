/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const superagent = require('superagent');
const cookie = require('react-cookies');
const PROXY_TO_API = 'proxy_to_api/';
const API_HOST = 'https://api.github.com';

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename));
    });
  }

  app.get('*', (req, res) => {
		if (req.url.indexOf(PROXY_TO_API) > 0) {
			const redirectUrl = API_HOST + req.url.replace(PROXY_TO_API, '');
			console.info(`redirect to url: ${redirectUrl}`);
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
			superagent.get(redirectUrl)
				.set('Accept', 'application/json')
				.set('Cookie', req.headers.cookies ? req.headers.cookies : '')
				.end((error, data) => {
					res.setHeader('Content-Type', 'application/json');
					data.headers && data.headers['set-cookie'] && res.setHeader('set-cookie', data.headers['set-cookie']);
					res.status(200);
					try {
						const info = JSON.parse(data.text);
						info.session_id = JSON.stringify(data.headers['set-cookie']);
						res.write(JSON.stringify(info));
						res.end();
					} catch (err) {
						console.info(err);
					}
				});
		} else {
			try {
				const unplug = cookie.plugToRequest(req, res);
				fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
					if (err) {
						res.sendStatus(404);
					} else {
						res.send(file.toString());
					}
				});
				unplug();
			} catch (err) {
				console.info(err);
			}
		}
  });
	app.post('*', (req, res) => {
		// 转发请求到leancloud服务器
		if (req.url.indexOf(PROXY_TO_API) > 0) {
			const redirectUrl = API_HOST + req.url.replace(PROXY_TO_API, '');
			console.info(`redirect to url: ${redirectUrl}`);
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
			superagent.post(redirectUrl)
				.send(req.body)
				.set('Accept', 'application/json')
				.set('Cookie', req.headers.cookies ? req.headers.cookies : '')
				.end((error, data) => {
					res.setHeader('Content-Type', 'application/json');
					data.headers && data.headers['set-cookie'] && res.setHeader('set-cookie', data.headers['set-cookie']);
					res.status(200);
					try {
						const info = JSON.parse(data.text);
						info.session_id = JSON.stringify(data.headers['set-cookie']);
						res.write(JSON.stringify(info));
						res.end();
					} catch (err) {
						console.info(err);
					}
				});
		} else {
			res.status(200);
			res.write('not supported');
			res.end();
		}
	});
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
