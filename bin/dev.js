const shell = require('shelljs');
// const path = require('path');
// const del = require('del');

// let arr = del.sync([path.join(__dirname + '/../devtmp/**')]);
// console.log('正在删除目录');

shell.exec('node --max_old_space_size=2048 ./server/server.js --env=dev');
// shell.exec('webpack --watch', { async: true }, (code, stdout, stderr) => {});
