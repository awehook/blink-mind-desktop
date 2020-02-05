import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import defaultThemeImg from '../images/theme-default.jpg';
import theme1Img from '../images/theme-1.jpg';
import theme2Img from '../images/theme-2.jpg';
import theme3Img from '../images/theme-3.jpg';
import theme4Img from '../images/theme-4.jpg';
import themeRandomColorRoundImg from '../images/theme-random-color-round.jpg';
import { BlinkMindController } from '../blink-mind-controller';
import { Button, Colors } from '@blueprintjs/core';
import { setColorAlpha } from '@blink-mind/renderer-react';
import { useTranslation } from '../hooks';
import { I18nTextKey } from '../../common';
import { newFile, openFile } from '../utils';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  .bp3-dark & {
    background-color: ${Colors.DARK_GRAY1};
  }
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 750px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: ${Colors.LIGHT_GRAY5};
  border-top: solid 1px ${Colors.LIGHT_GRAY2};
  
  .bp3-dark & {
  border-top: solid 1px ${Colors.DARK_GRAY2};
    background-color: ${Colors.DARK_GRAY3};
  }
`;

const themeItemOutline = `solid 3px  ${Colors.BLUE5}`;
const hoverOutline = `solid 3px  ${setColorAlpha(Colors.BLUE5, 0.5)}`;

const ThemeItem = styled.div`
  width: 200px;
  height: 112.5px;
  margin: 20px;
  outline: ${props => props.isSelected && themeItemOutline};
  &:hover {
    outline: ${props => !props.isSelected && hoverOutline};
  }
`;

const ImgContainer = styled.div`
  background-color: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: 562.5px;
  zoom: 0.2;
`;

const ThemeImg = styled.img`
  display: block;
`;

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
    <Root>
      <ThemeContainer>
        {themes.map(themeConfig => {
          const themeKey = themeConfig[0];
          const theme = controller.run('getTheme', {
            controller,
            themeKey
          });
          const background = theme.background;
          return (
            <ThemeItem
              onClick={onClickThemeItem(themeKey)}
              isSelected={selectedThemeKey === themeKey}
            >
              <ImgContainer background={background}>
                <ThemeImg src={themeConfig[1]} alt={themeKey} />
              </ImgContainer>
            </ThemeItem>
          );
        })}
      </ThemeContainer>
      <ButtonContainer>
        <Button onClick={onClickOpenFile}>{t(I18nTextKey.OPEN_FILE)}</Button>
        <Button onClick={onClickNewFile}>{t(I18nTextKey.NEW_FILE)}</Button>
      </ButtonContainer>
    </Root>
  );
}
