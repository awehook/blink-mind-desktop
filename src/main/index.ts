import { app } from 'electron';
import { initStore } from './store';

import debug from 'debug';
import { ProductName } from '../common';
import { i18n } from './i18n';
import './ipc';
import { isWindows } from './utils';
import { createWindowMgr, windowMgr } from './window/window-manager';
const log = debug('main:index');

// log('env:', process.env);

const appReadyCallback = () => {
  log('appReadyCallback');
  app.name = ProductName;
  initStore();
  i18n.init();
  require('./sentry');
  require('./subscribe');
  createWindowMgr();
};
log('app on ready');
app.on('ready', () => {
  log('app ready');
  appReadyCallback();
});
if (!isWindows) {
  log("app.on('ready', appReadyCallback);");
  app.on('window-all-closed', () => {});
}

app.on('before-quit',()=>{
  windowMgr.destroyWelcomeWindow();
});

app.on('will-finish-launching', () => {
  log('will-finish-launching');
  // initStore();
  // createWindowMgr();
});

app.on('activate', () => {
  log('activate');
  if (windowMgr.getOpenedFileWindows().size === 0) {
    windowMgr.showWelcomeWindow();
  }
});

app.setAboutPanelOptions({applicationName: 'BlinkMind(Insider Preview)'});
