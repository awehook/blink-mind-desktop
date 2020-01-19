import { app } from 'electron';
import { initStore } from './store';
import { createWindowMgr } from './window/window-manager';
import { ProductName } from '../common';
import './ipc';

const appReadyCallback = () => {
  initStore();
  createWindowMgr();
};
app.name = ProductName;

app.on('ready', appReadyCallback);
