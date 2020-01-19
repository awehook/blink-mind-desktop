import { isMacOS } from './utils';
import { BrowserWindow } from 'electron';
const path = require('path');
const os = require('os');

require('electron-debug')({ showDevTools: false });

function addLocalDevTools(ext) {
  const extDir = isMacOS
    ? '/Library/Application Support/Google/Chrome/Default/Extensions'
    : '/AppData/Local/Google/Chrome/User Data/Default/Extensions';
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), `${extDir}/${ext}`)
  );
}

// Install `react-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.REACT_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `react-devtools`: \n', err);
    });

  // immutable format
  addLocalDevTools('hgldghadipiblonfkkicmgcbbijnpeog/1.9.2_0');
});

require('./index');
