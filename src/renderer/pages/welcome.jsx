import React from 'react';
import { ipcRenderer } from 'electron';
import { Icon } from '../components';
import { IconName } from '@blink-mind/renderer-react';
import { I18nTextKey, IpcChannelName } from '../../common';
import './welcome.scss';
import { useTranslation } from '../hooks';

export function WelcomePage(props) {
  const t = useTranslation();

  const onClickNewFile = () => {
    ipcRenderer.send(IpcChannelName.NEW_FILE, { closeWelcome: true });
  };

  const onClickOpenFile = () => {};

  return (
    <div className="welcome">
      <div className="title">{t(I18nTextKey.welcomePageTitle)}</div>
      <div className="container">
        <div className="group">
          <div className="item" onClick={onClickNewFile}>
            <Icon iconName={IconName.NEW_FILE} />
            <div>{t(I18nTextKey.newFile)}</div>
          </div>
        </div>
        <div className="group">
          <div className="item" onClick={onClickOpenFile}>
            <Icon iconName={IconName.OPEN_FILE} />
            <div>{t(I18nTextKey.openFile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
