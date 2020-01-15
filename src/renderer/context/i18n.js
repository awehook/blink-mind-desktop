import React from "react";
import { ipcRenderer } from 'electron';
import { IpcChannelName } from '../../common';

export const i18n = ipcRenderer.sendSync(IpcChannelName.GET_I18N);

export const I18nContext = React.createContext(i18n);
