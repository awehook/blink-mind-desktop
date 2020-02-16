import React from 'react';
import { useState } from 'react';
import defaultThemeImg from '../../images/theme-default.jpg';
import theme1Img from '../../images/theme-1.jpg';
import theme2Img from '../../images/theme-2.jpg';
import theme3Img from '../../images/theme-3.jpg';
import theme4Img from '../../images/theme-4.jpg';
import themeRandomColorRoundImg from '../../images/theme-random-color-round.jpg';
import { BlinkMindController } from '../../blink-mind-controller';
import { Button } from '@blueprintjs/core';
import { useTranslation } from '../../hooks';
import { I18nTextKey } from '../../../common';
import { newFile, openFile } from '../../utils';
import { ThemeItem } from './theme-item';

export function CreateFromTheme(props) {
  const controller = BlinkMindController;
  const t = useTranslation();
  const [selectedThemeKey, setSelectedThemeKey] = useState('default');
  const themes = [
    ['default', defaultThemeImg],
    ['theme1', theme1Img],
    ['theme2', theme2Img],
    ['theme3', theme3Img],
    ['theme4', theme4Img],
    ['random-color-round', themeRandomColorRoundImg]
  ];
  const onClickThemeItem = themeKey => () => {
    setSelectedThemeKey(themeKey);
  };
  const onClickNewFile = () => {
    newFile({ themeKey: selectedThemeKey });
  };

  const onClickOpenFile = () => {
    openFile();
  };
  return (
    <div className='bm-column bm-card'>
      <div className='theme-container'>
        {themes.map(themeConfig => {
          const themeKey = themeConfig[0];
          const theme = controller.run('getTheme', {
            controller,
            themeKey
          });
          const background = theme.background;
          const themeItemProps = {
            onClick: onClickThemeItem(themeKey),
            isSelected: selectedThemeKey === themeKey,
            themeImg: themeConfig[1],
            themeKey,
            background,
            zoom: 0.2,
            margin: 20
          };
          return <ThemeItem {...themeItemProps} />;
        })}
      </div>
      <div className='btn-container'>
        <Button onClick={onClickOpenFile}>{t(I18nTextKey.OPEN_FILE)}</Button>
        <Button onClick={onClickNewFile}>{t(I18nTextKey.NEW_FILE)}</Button>
      </div>
    </div>
  );
}
