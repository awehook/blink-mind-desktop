import { BrowserWindow } from 'electron';
import { IpcChannelName } from '../../common';
import debug from 'debug';
const log = debug('main:main-menu');

export function saveAs(windowMgr) {
  windowMgr.saveAs();
}

export function save(windowMgr) {
  const focusWindow = BrowserWindow.getFocusedWindow();
  focusWindow.setTitleFlag({ edited: false });
  const windowData = focusWindow.windowData;
  if (windowData) {
    const focusFile = windowData.getFocusFile();
    if (focusFile.path == null) {
      saveAs(windowMgr);
    } else {
      focusWindow.webContents.send(IpcChannelName.MR_SAVE, {
        id: focusFile.id,
        path: focusFile.path
      });
    }
  }
}

export function openFile(windowMgr) {
  windowMgr.openFile();
}
