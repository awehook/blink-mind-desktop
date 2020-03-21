import { app } from 'electron';
import './ipc';
import { App } from './app';
import { Cli } from "./cli";
const log = require('debug')('main:index');

// log('env:', process.env);
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.exit();
}

const cli = new Cli();

const blinkApp = new App(cli);
blinkApp.init();
