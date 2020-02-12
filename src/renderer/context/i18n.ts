import { ipcRenderer } from 'electron';
import * as React from 'react';
import { IpcChannelName } from '../../common';

export let i18nMap = ipcRenderer.sendSync(IpcChannelName.RM_GET_I18N);

export const I18nContext = React.createContext(i18nMap);

export function setI18nMap(m) {
  i18nMap = m;
}

export function getI18nMap() {
  return i18nMap;
}
