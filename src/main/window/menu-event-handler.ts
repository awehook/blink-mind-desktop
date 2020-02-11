import debug from 'debug';
import { BrowserWindow } from 'electron';
import { IpcChannelName, IpcType } from '../../common';
import { ipcMR } from '../utils';
const log = debug('main:main-menu');

export function saveAs(windowMgr) {
  windowMgr.saveAs();
}

export function save(windowMgr) {
  const focusWindow = BrowserWindow.getFocusedWindow();
  //@ts-ignore
  focusWindow.setTitleFlag({ edited: false });
  //@ts-ignore
  const windowData = focusWindow.windowData;
  if (windowData) {
    const focusFile = windowData.getFocusFile();
    if (focusFile.path == null) {
      saveAs(windowMgr);
    } else {
      focusWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, {
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

export function undo(windowMgr?) {
  log('undo');
  ipcMR({ type: IpcType.MR_UNDO });
}

export function redo(windowMgr?) {
  log('redo');
  ipcMR({ type: IpcType.MR_REDO });
}
