import { app } from 'electron';
import { initUserDefault } from './store-util';
import { initWindowManager } from './window-manager';
import { ProductName } from '../common';

initUserDefault();

const appReadyCallback = () => {
  initWindowManager();
};
app.name = ProductName;

app.on('ready', appReadyCallback);
