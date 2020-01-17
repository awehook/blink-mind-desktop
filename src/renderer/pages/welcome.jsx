import React from 'react';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { I18nTextKey, IpcChannelName } from '../../common';
import './welcome.scss';
import { useTranslation } from '../hooks';

export function WelcomePage(props) {
  const t = useTranslation();

  return (
    <div className="welcome">
      <div className="title">{t(I18nTextKey.welcomePageTitle)}</div>
      <div className="container">
        <div className="group">
          <div className='item'>
            <Icon
              icon={IconNames.DOCUMENT}
              iconSize={80}
              intent={Intent.PRIMARY}
            />
            <div>{t(I18nTextKey.newFile)}</div>
          </div>
        </div>
        <div className="group">
          <div className='item'>
            <Icon
              icon={IconNames.DOCUMENT_OPEN}
              iconSize={80}
              intent={Intent.PRIMARY}
            />
            <div>{t(I18nTextKey.openFile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
