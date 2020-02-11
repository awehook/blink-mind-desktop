import * as React from 'react';
import styled from 'styled-components';
import {BaseProps, COLORS, getI18nText, I18nKey} from '@blink-mind/renderer-react';
import { Colors } from '@blueprintjs/core';
import { OpType, ViewModeMindMap } from '@blink-mind/core';
import { ViewModeOutliner } from '../../utils';

const Btn = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${props => (props.selected ? COLORS.LIGHT.ITEM_BG : null)};
  color: ${props => props => (!props.selected ? COLORS.LIGHT.ITEM : Colors.BLACK)};
  cursor: pointer;
  &:hover {
    color: ${props => props => (!props.selected ? COLORS.LIGHT.ITEM_ACTIVE : null)};
  }

  .bp3-dark & {
    background-color: ${props => (props.selected ? COLORS.DARK.ITEM_BG : null)};
    color: ${props => props => (!props.selected ? COLORS.DARK.ITEM : COLORS.DARK.ITEM_ACTIVE)};
    &:hover {
      color: ${props => props => (!props.selected ? COLORS.DARK.ITEM_ACTIVE : null)};
    }
  }
`;

export function ToolbarItemViewMode(props: BaseProps) {
  const { controller, model } = props;

  const onClickSetViewMode = viewMode => () => {
    if (model.config.viewMode !== viewMode) {
      controller.run('operation', {
        ...props,
        opType: OpType.SET_CONFIG,
        config: {
          viewMode
        }
      });
    }
  };

  const mindmapBtnProps = {
    selected: model.config.viewMode === ViewModeMindMap,
    onClick: onClickSetViewMode(ViewModeMindMap)
  };

  const outlinerBtnProps = {
    selected: model.config.viewMode === ViewModeOutliner,
    onClick: onClickSetViewMode(ViewModeOutliner)
  };

  return (
    <span>
      <Btn {...mindmapBtnProps}>{getI18nText(props, I18nKey.MIND_MAP)}</Btn>
      <Btn {...outlinerBtnProps}>{getI18nText(props, I18nKey.OUTLINER)}</Btn>
    </span>
  );
}
