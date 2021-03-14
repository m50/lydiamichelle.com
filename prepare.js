/* eslint-disable */
require('node-fetch');
const fs = require('fs');
const { join } = require('path');
const chalk = require('chalk');

const nextPath = join(process.cwd(), '.next');
const cachePath = join(nextPath, 'cache');
const buildPath = join(cachePath, 'image-optimize-api');
const publicPath = join(process.cwd(), 'public', 'build');

if (!fs.existsSync(nextPath)) {
  fs.mkdirSync(nextPath);
  console.log(`${chalk.cyan('info')}  - Created folder ${nextPath}`);
}
if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath);
  console.log(`${chalk.cyan('info')}  - Created folder ${cachePath}`);
}
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
  console.log(`${chalk.cyan('info')}  - Created folder ${buildPath}`);
}

if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
  console.log(`${chalk.cyan('info')}  - Created folder ${publicPath}`);
}
if (!fs.existsSync(join(publicPath, '400'))) {
  fs.mkdirSync(join(publicPath, '400'));
  console.log(`${chalk.cyan('info')}  - Created folder ${join(publicPath, '400')}`);
}
if (!fs.existsSync(join(publicPath, '800'))) {
  fs.mkdirSync(join(publicPath, '800'));
  console.log(`${chalk.cyan('info')}  - Created folder ${join(publicPath, '800')}`);
}
