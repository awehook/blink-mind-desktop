process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const fs = require('fs-extra');
const mainConfig = require('./webpack.main.config');

function build() {
  fs.emptyDirSync('./build/electron');
  fs.copySync('./src/main/i18n/locales','./build/electron/locales');
  pack(mainConfig)
    .then(result => {
      console.log(`build main process ${result}`);
    })
    .catch(err => {
      console.error(`\n${err}\n`);
      process.exit(1);
    });
}

function pack(config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production';
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err);
      else if (stats.hasErrors()) {
        let err = '';

        stats
          .toString({
            chunks: false,
            colors: true
          })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`;
          });

        reject(err);
      } else {
        resolve(
          stats.toString({
            chunks: false,
            colors: true
          })
        );
      }
    });
  });
}

build();
