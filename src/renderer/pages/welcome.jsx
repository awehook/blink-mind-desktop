import React from 'react';
import styled from 'styled-components';
import {CreateFromTheme, Icon} from '../components';
import { IconName } from '@blink-mind/renderer-react';
import { I18nTextKey } from '../../common';
import './welcome.scss';
import { useTranslation } from '../hooks';
import { newFile, openFile } from '../utils';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

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
    <Root>
      <CreateFromTheme {...props}/>
    </Root>
  );
}
