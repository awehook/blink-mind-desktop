import { app } from 'electron';
import { initStore } from './store';
import { createWindowMgr, windowMgr } from './window/window-manager';
import { ProductName } from '../common';
import './ipc';
import debug from 'debug';
const log = debug('main:app');

console.log('env:',process.env);

const appReadyCallback = () => {
  initStore();
  createWindowMgr();
};
app.name = ProductName;

app.on('ready', appReadyCallback);
app.on('window-all-closed', () => {});

app.on('activate', () => {
  log('activate');
  if(windowMgr.getOpenedFileWindows().size === 0) {
    windowMgr.createWelcomeWindow();
  }
});
