import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';
import { setColorAlpha } from '@blink-mind/renderer-react';

const themeItemOutline = `solid 3px  ${Colors.BLUE5}`;
const hoverOutline = `solid 3px  ${setColorAlpha(Colors.BLUE5, 0.5)}`;

export const ThemeItemRoot = styled.div`
  width: ${props => props.zoom * 1000}px;
  height: ${props => props.zoom * 562.5}px;
  margin: ${props => props.margin}px;
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
  zoom: ${props => props.zoom};
`;

const ThemeImg = styled.img`
  display: block;
`;

export function ThemeItem(props) {
  const {
    onClick,
    themeImg,
    themeKey,
    isSelected,
    background,
    zoom,
    margin
  } = props;

  const rootProps = {
    onClick,
    isSelected,
    zoom,
    margin
  };

  const imgContainerProps = {
    zoom,
    background
  };
  return (
    <ThemeItemRoot {...rootProps}>
      <ImgContainer {...imgContainerProps}>
        <ThemeImg src={themeImg} alt={themeKey} />
      </ImgContainer>
    </ThemeItemRoot>
  );
}
