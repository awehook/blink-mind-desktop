import { BrowserWindow } from 'electron';
import { IpcChannelName } from '../../../common';

export function edit(win: BrowserWindow, arg) {
  if (win && win.webContents) {
    win.webContents.send(IpcChannelName.MR_FILE_WINDOW, arg);
  }
}
