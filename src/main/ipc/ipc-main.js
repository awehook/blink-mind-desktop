import { ipcMain, BrowserWindow, dialog } from 'electron';
import { IpcChannelName } from '../../common';
import { i18n } from '../i18n';
import fs from 'fs-extra';
import { getRecentOpenedDir ,regularBlinkPath} from '../utils';

ipcMain.on(IpcChannelName.GET_INITIAL_TRANSLATIONS, (event, arg) => {
  const lng = 'en';
  i18n.loadLanguages(lng, (err, t) => {
    const initial = {
      [lng]: {
        translation: i18n.getResourceBundle(lng, 'translation')
      }
    };
    event.returnValue = initial;
  });
});

ipcMain.on(IpcChannelName.GET_I18N, (event, arg) => {
  event.returnValue = i18n.getDataByLanguage(i18n.language).translation;
});

ipcMain.on(IpcChannelName.RM_CHANGE_LANG, (event, lang) => {
  i18n.changeLanguage(lang);
});


ipcMain.on(IpcChannelName.RM_SAVE_SYNC, (event, arg) => {
  let { path, content } = arg;
  if (path == null) {
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: getRecentOpenedDir()
    });
  }

  if (path == null) {
    event.returnValue = 'cancel';
    return;
  }

  path = regularBlinkPath(path);

  fs.writeFileSync(path, content);
  event.returnValue = 'save';
});

ipcMain.on(IpcChannelName.RM_SAVE, (event, arg) => {
  let { path, content } = arg;
  if (path == null) {
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: getRecentOpenedDir()
    });
  }
  if (path == null) {
    return;
  }
  path = regularBlinkPath(path);
  fs.writeFile(path, content);
});

ipcMain.on(IpcChannelName.RM_GET_FILE_CONTENT, (event, { path }) => {
  event.returnValue = fs.readFileSync(path);
});
