import React from 'react';
import { I18nTextKey, IpcChannelName } from '../../common';
import './welcome.scss';
import { useTranslation } from '../hooks';
import { ipcRenderer } from 'electron';

export function WelcomePage(props) {
  const t = useTranslation();

  const changeLangEn = () => {
    ipcRenderer.send(IpcChannelName.I18N_CHANGE_LANG, 'en');
  };

  const changeLangCn = () => {
    ipcRenderer.send(IpcChannelName.I18N_CHANGE_LANG, 'zh-CN');
  };

  return (
    <div className="welcome">
      <div className="title">{t(I18nTextKey.welcomePageTitle)}</div>
      <button onClick={changeLangEn}>en</button>
      <button onClick={changeLangCn}>zh-CN</button>
      <div className="container">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
