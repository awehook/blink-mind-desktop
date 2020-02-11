import { BrowserWindow } from 'electron';
import { extname } from 'path';
import { ExtName, ExtNames, I18nTextKey, IpcChannelName } from '../../common';
import { i18n } from '../i18n';

export function regularBlinkPath(path) {
  if (ExtNames.indexOf(extname(path)) === -1) {
    path = path + ExtName;
  }
  return path;
}

export function getUntitledTile() {
  return i18n.t(I18nTextKey.UNTITLED) + ExtName;
}

export function getFileTitle(path, edited) {
  path = path || getUntitledTile();
  return `${path}${edited ? ' -' + i18n.t(I18nTextKey.EDITED) : ''}`;
}

export function ipcMR(arg) {
  const focusWindow = BrowserWindow.getFocusedWindow();
  focusWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, arg);
}
