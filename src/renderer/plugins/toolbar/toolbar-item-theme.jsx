import defaultThemeImg from '../../images/theme-default.jpg';
import theme1Img from '../../images/theme-1.jpg';
import theme2Img from '../../images/theme-2.jpg';
import theme3Img from '../../images/theme-3.jpg';
import theme4Img from '../../images/theme-4.jpg';
import themeRandomColorRoundImg from '../../images/theme-random-color-round.jpg';
import {
  iconClassName,
  ToolbarItem,
  IconName,
  ToolbarItemPopoverTarget
} from '@blink-mind/renderer-react';
import { Popover } from '@blueprintjs/core';
import React from 'react';

export function ToolbarItemTheme(props) {
  const onClickSetTheme = themeKey => e => {
    const { controller } = props;
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
    <ToolbarItem className={iconClassName(IconName.THEME)} {...props}>
      <Popover enforceFocus={false}>
        <ToolbarItemPopoverTarget />
        <div className="bm-popover-theme">
          {themes.map(theme => (
            <div
              key={theme[0]}
              className="bm-theme-item"
              onClick={onClickSetTheme(theme[0])}
            >
              <img className="bm-theme-img" src={theme[1]} alt={theme[0]} />
            </div>
          ))}
        </div>
      </Popover>
    </ToolbarItem>
  );
}
