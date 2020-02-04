import React, { useEffect, useState } from 'react';
import { Classes } from '@blueprintjs/core';
import { I18nContext, i18nMap, setI18nMap } from './context';
import { ipcRenderer } from 'electron';
import { IpcChannelName, MrGlobalType, StoreItemKey } from '../common';
import { PageRouter } from './route/page-router';
import './App.css';

import debug from 'debug';
import { getStoreItem } from './utils';

const log = debug('bmd:app');

function App() {
  const [i18nValue, setI18nValue] = useState(i18nMap);

  const setI18nTransaction = v => {
    log('i18nLangChanged', v);
    setI18nMap(v);
    setI18nValue(v);
  };

  const setAppearance = v => {
    const darkMode = v === 'dark';
    if (darkMode) {
      if (!document.body.classList.contains(Classes.DARK)) {
        document.body.classList.add(Classes.DARK);
      }
    } else {
      if (document.body.classList.contains(Classes.DARK)) {
        document.body.classList.remove(Classes.DARK);
      }
    }
  };

  const appearance = getStoreItem(StoreItemKey.preferences.normal.appearance);
  setAppearance(appearance);

  const onIpcMrGlobal = (e, arg) => {
    switch (arg.type) {
      case MrGlobalType.SET_LANG:
        setI18nTransaction(arg.translation);
        break;
      case MrGlobalType.SET_APPEARANCE:
        setAppearance(arg.appearance);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    ipcRenderer.on(IpcChannelName.MR_GLOBAL, onIpcMrGlobal);
    return () => {
      ipcRenderer.off(IpcChannelName.MR_GLOBAL, onIpcMrGlobal);
    };
  });
  return (
    <I18nContext.Provider value={i18nValue}>
      <PageRouter />
    </I18nContext.Provider>
  );
}

export default App;
