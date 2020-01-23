import React, { useEffect, useState } from 'react';
import { I18nContext, i18nMap, setI18nMap } from './context';
import { ipcRenderer } from 'electron';
import { IpcChannelName } from '../common';
import { PageRouter } from './route/page-router';
import './App.css';

import debug from 'debug';

const log = debug('bmd:app');

function App() {
  const [i18nValue, setI18nValue] = useState(i18nMap);
  const i18nLangChanged = (e, v) => {
    log('i18nLangChanged', v);
    setI18nMap(v);
    setI18nValue(v);
  };
  useEffect(() => {
    ipcRenderer.on(IpcChannelName.MR_LANG_CHANGED, i18nLangChanged);
    return () => {
      ipcRenderer.off(IpcChannelName.MR_LANG_CHANGED, i18nLangChanged);
    };
  });
  return (
    <I18nContext.Provider value={i18nValue}>
      <PageRouter />
    </I18nContext.Provider>
  );
}

export default App;
