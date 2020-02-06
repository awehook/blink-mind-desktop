import { BrowserWindow } from 'electron';
export function ipcSendToAllWindow(channel, arg) {
  BrowserWindow.getAllWindows().forEach(w => w.webContents.send(channel, arg));
}

export function ipcSendToWindow(window, channel, arg) {
  window.webContents.send(channel, arg);
}
