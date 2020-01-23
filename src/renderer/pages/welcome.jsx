import React from 'react';
import { Icon } from '../components';
import { IconName } from '@blink-mind/renderer-react';
import { I18nTextKey } from '../../common';
import './welcome.scss';
import { useTranslation } from '../hooks';
import { newFile, openFile } from '../utils';

export function WelcomePage(props) {
  let onClickNewFile;
  const t = useTranslation();

  onClickNewFile = () => {
    newFile();
  };

  const onClickOpenFile = () => {
    openFile();
  };

  return (
    <div className="welcome">
      <div className="title">{t(I18nTextKey.WELCOME_PAGE_TITLE)}</div>
      <div className="container">
        <div className="group">
          <div className="item" onClick={onClickNewFile}>
            <Icon iconName={IconName.NEW_FILE} />
            <div>{t(I18nTextKey.NEW_FILE)}</div>
          </div>
        </div>
        <div className="group">
          <div className="item" onClick={onClickOpenFile}>
            <Icon iconName={IconName.OPEN_FILE} />
            <div>{t(I18nTextKey.OPEN_FILE)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
