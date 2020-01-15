import React, { useEffect, useState } from 'react';
import { WelcomePage } from './pages/welcome';
import { I18nContext, i18n } from './context';
import { ipcRenderer } from 'electron';
import './App.css';
import { IpcChannelName } from '../common';

function App() {
  const [i18nValue, setI18nValue] = useState(i18n);
  const i18nLangChanged = (e, v) => {
    setI18nValue(v);
  };
  useEffect(() => {
    ipcRenderer.on(IpcChannelName.I18N_LANG_CHANGED, i18nLangChanged);
    return () => {
      ipcRenderer.off(IpcChannelName.I18N_LANG_CHANGED, i18nLangChanged);
    };
  });
  return (
    <I18nContext.Provider value={i18nValue}>
      <WelcomePage />
    </I18nContext.Provider>
  );
}

export default App;
