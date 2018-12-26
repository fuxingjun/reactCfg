const path = require('path');
const argv = require('yargs').argv;

const express = require('express');

const app = new express();

const column = argv.env === 'dev' ? '../devtmp' : '../dist';
if (argv.env === 'dev') {
    const webpack = require('webpack');
    const webpackDevServer = require('webpack-dev-server');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.dev.config.js');
    const compiler = webpack(config);
    const options = {
        contentBase: column,
        publicPath: '/',
        // noInfo: true,
        stats: {
            colors: true
        }
    };
    const ComReadFile = (res, next, filename) => {
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return (next(err))
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    };

    let devMiddleware = webpackDevMiddleware(compiler, options);
    let hotMiddleware = webpackHotMiddleware(compiler);

    app.use(devMiddleware);
    app.use(hotMiddleware);

    app.get("/*", (req, res, next) => {
        const filename = path.resolve(__dirname, column + '/index.html');
        ComReadFile(res, next, filename);
    });
} else {
    app.use(express.static(path.resolve(__dirname, column)));
    app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, column + '/index.html')));
}

const server = app.listen(8082, () => {
    console.log(`${argv.env} model running at http://localhost:8082`);
});