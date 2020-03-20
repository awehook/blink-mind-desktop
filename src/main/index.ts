import { app } from 'electron';
import './ipc';
import { App } from './app';
const log = require('debug')('main:index');

// log('env:', process.env);
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.exit();
}

const blinkApp = new App();
blinkApp.init();
