import * as React from 'react';
import { ipcRenderer } from 'electron';
import { IpcChannelName } from '../../common';

export let i18nMap = ipcRenderer.sendSync(IpcChannelName.RM_GET_I18N);

export const I18nContext = React.createContext(i18nMap);

export function setI18nMap(m) {
  i18nMap = m;
}
