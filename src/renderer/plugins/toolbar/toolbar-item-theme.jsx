import defaultThemeImg from '../../images/theme-default.jpg';
import theme1Img from '../../images/theme-1.jpg';
import theme2Img from '../../images/theme-2.jpg';
import theme3Img from '../../images/theme-3.jpg';
import theme4Img from '../../images/theme-4.jpg';
import themeRandomColorRoundImg from '../../images/theme-random-color-round.jpg';
import {
  ToolbarItem,
  IconName,
  ToolbarItemPopoverTarget
} from '@blink-mind/renderer-react';
import { Popover } from '@blueprintjs/core';
import React from 'react';
import { ThemeItem } from '../../components/theme';
import styled from 'styled-components';

const PopoverContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 500px;
  height: 480px;
  overflow: auto;
`;

export function ToolbarItemTheme(props) {
  const { controller } = props;
  const onClickSetTheme = themeKey => e => {
    controller.run('setTheme', { ...props, themeKey });
  };
  const themes = [
    ['default', defaultThemeImg],
    ['theme1', theme1Img],
    ['theme2', theme2Img],
    ['theme3', theme3Img],
    ['theme4', theme4Img],
    ['random-color-round', themeRandomColorRoundImg]
  ];

  return (
    <ToolbarItem
      key="theme-selector"
      iconName={IconName.THEME}
      {...props}
    >
      <Popover enforceFocus={false}>
        <ToolbarItemPopoverTarget />
        <PopoverContent>
          {themes.map(theme => {
            const themeKey = theme[0];
            const t = controller.run('getTheme', { ...props, themeKey });
            const themeItemProps = {
              key: themeKey,
              themeKey,
              themeImg: theme[1],
              onClick: onClickSetTheme(themeKey),
              background: t.background,
              zoom: 0.2,
              margin: 20
            };
            return <ThemeItem {...themeItemProps} />;
          })}
        </PopoverContent>
      </Popover>
    </ToolbarItem>
  );
}
