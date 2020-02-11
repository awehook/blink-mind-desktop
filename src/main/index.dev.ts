import debug from 'debug';
import { app, BrowserWindow } from 'electron';
import { isMacOS } from './utils';
const path = require('path');
const os = require('os');

const electronDebug = require('electron-debug');

const log = debug('main:index.dev');

electronDebug({ showDevTools: false });

function addLocalDevTools(ext) {
  const extDir = isMacOS
    ? '/Library/Application Support/Google/Chrome/Default/Extensions'
    : '/AppData/Local/Google/Chrome/User Data/Default/Extensions';
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), `${extDir}/${ext}`)
  );
}

// Install `react-devtools`
app.on('ready', () => {
  log('app.ready');
  const installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.REACT_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      log('Unable to install `react-devtools`: \n', err);
    });

  // immutable format
  addLocalDevTools('hgldghadipiblonfkkicmgcbbijnpeog/1.9.2_0');
});

require('./index');
