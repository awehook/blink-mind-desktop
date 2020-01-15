import { initI18n } from '../i18n';
import { createMainWindow } from './main-window';
import { buildMenu } from './main-menu';
import { IpcChannelName } from '../../common';

const isDev = require('electron-is-dev');

let mainWindow;

export function initWindowManager() {
  let openingFileWindows = {};

  const i18n = initI18n((err, t) => {
    console.error('initCallback', err, t);
    mainWindow = createMainWindow();
    buildMenu(i18n);
    i18n.on('languageChanged', lng => {
      buildMenu(i18n);
      mainWindow.webContents.send(
        IpcChannelName.I18N_LANG_CHANGED,
        i18n.getDataByLanguage(lng).translation
      );
    });
  });


}

export { mainWindow };
