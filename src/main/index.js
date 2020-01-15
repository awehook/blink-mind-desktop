import { app } from 'electron';
import { initStore } from './store';
import { initWindowManager } from './window/window-manager';
import { ProductName } from '../common';
import './ipc';

const appReadyCallback = () => {
  initStore();
  initWindowManager();
};
app.name = ProductName;

app.on('ready', appReadyCallback);
