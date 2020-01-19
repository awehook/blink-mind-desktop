const program = require('commander');
const chalk = require('chalk');
const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const mainConfig = require('./webpack.main.config');
const { startRenderer } = require('./start-renderer');
let electronProcess = null;
let manualRestart = false;
let hotMiddleware;

program.option('-d, --dbg', 'debug main process');
program.parse(process.argv);

function logStats(proc, data) {
  let log = '';

  log += chalk.yellow.bold(
    `┏ ${proc} Process ${new Array(19 - proc.length + 1).join('-')}`
  );
  log += '\n\n';

  if (typeof data === 'object') {
    data
      .toString({
        colors: true,
        chunks: false
      })
      .split(/\r?\n/)
      .forEach(line => {
        log += '  ' + line + '\n';
      });
  } else {
    log += `  ${data}\n`;
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n';

  console.log(log);
}

function startMain() {
  return new Promise(resolve => {
    mainConfig.entry.main = [
      path.join(__dirname, '../src/main/index.dev.js')
    ].concat(mainConfig.entry.main);
    mainConfig.mode = 'development';

    const compiler = webpack(mainConfig);

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      logStats('Main', stats);

      if (electronProcess && electronProcess.kill) {
        manualRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();

        setTimeout(() => {
          manualRestart = false;
        }, 5000);
      }

      resolve();
    });
  });
}

function startElectron() {
  const env = require('dotenv').config({ path: path.join(__dirname, '.env') })
    .parsed;
  let args = [
    program.dbg ? '--inspect-brk' : '--inspect=5858',
    path.join(__dirname, '../build/electron/main.js')
  ];
  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3));
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2));
  }

  electronProcess = spawn(electron, args, { env });
  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue');
  });
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red');
  });

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

function electronLog(data, color) {
  let log = '';
  data = data.toString().split(/\r?\n/);
  data.forEach(line => {
    log += `  ${line}\n`;
  });
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
        '\n\n' +
        log +
        chalk[color].bold('┗ ----------------------------') +
        '\n'
    );
  }
}

function init() {
  Promise.all([
    // startRenderer(),
    startMain()
  ])
    .then(() => {
      startElectron();
    })
    .then(() => {
      startRenderer();
    })
    .catch(err => {
      console.error(err);
    });
}

init();
