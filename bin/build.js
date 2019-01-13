const shell = require('shelljs');

shell.rm('-rf', './dist');
console.log('正在删除dist目录');

shell.exec('webpack --config ./webpack.prod.config --watch');
shell.exec('node ./server/server.js --env=build', { async: true }, (code, stdout, stderr) => { });