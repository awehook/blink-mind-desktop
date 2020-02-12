import { OpType, ViewModeMindMap } from '@blink-mind/core';
import { BaseProps, getI18nText, I18nKey } from '@blink-mind/renderer-react';
import cx from 'classnames';
import * as React from 'react';
import { ViewModeOutliner } from '../../utils';

export function ToolbarItemViewMode(props: BaseProps) {
  const { controller, model } = props;

  const onClickSetViewMode = viewMode => () => {
    if (model.config.viewMode !== viewMode) {
      controller.run('operation', {
        ...props,
        opType: OpType.SET_CONFIG,
        allowUndo: false,
        config: {
          viewMode
        }
      });
    }
  };

  const mindmapBtnProps = {
    className: cx('bm-switch-btn', {
      'bm-switch-btn-selected': model.config.viewMode === ViewModeMindMap
    }),
    onClick: onClickSetViewMode(ViewModeMindMap)
  };

  const outlinerBtnProps = {
    className: cx('bm-switch-btn', {
      'bm-switch-btn-selected': model.config.viewMode === ViewModeOutliner
    }),
    onClick: onClickSetViewMode(ViewModeOutliner)
  };

  return (
    <span>
      <div {...mindmapBtnProps}>{getI18nText(props, I18nKey.MIND_MAP)}</div>
      <div {...outlinerBtnProps}>{getI18nText(props, I18nKey.OUTLINER)}</div>
    </span>
  );
}
