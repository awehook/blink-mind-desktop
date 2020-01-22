import { BrowserWindow } from 'electron';
import { IpcChannelName, IpcType } from '../../common';
import debug from 'debug';
import { ipcMR } from '../utils';
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
      focusWindow.webContents.send(IpcChannelName.MR, {
        type: IpcType.MR_SAVE,
        id: focusFile.id,
        path: focusFile.path
      });
    }
  }
}

export function openFile(windowMgr) {
  windowMgr.openFile();
}

export function undo(windowMgr) {
  console.log('undo');
  ipcMR({ type: IpcType.MR_UNDO });
}

export function redo(windowMgr) {
  console.log('redo');
  ipcMR({ type: IpcType.MR_REDO });
}
