const shell = require('shelljs');

shell.rm('-rf', './dist');
console.log('已删除dist目录,开始打包');

shell.exec('webpack --config ./webpack.prod.config');
// shell.exec('node ./server/server.js --env=build', { async: true }, (code, stdout, stderr) => { });