import {
  ToolbarGroupItemUndoRedo,
  ToolbarItemSearch
} from '@blink-mind/plugins';
import {
  BaseProps,
  ToolbarItemLayout,
  ToolbarItemMore
} from '@blink-mind/renderer-react';
import * as React from 'react';
import { ToolbarItemViewMode } from '../../plugins/outliner/components/widget';
import { ToolbarItemTheme } from '../../plugins/toolbar/toolbar-item-theme';
import { ToolbarItemGroup } from './toolbar-item-group';
import { ViewModeMindMap } from '@blink-mind/core';

export function ToolbarItems(props: BaseProps) {
  const { model } = props;
  const viewMode = model.config.viewMode;
  return (
    <>
      <ToolbarItemGroup>
        <ToolbarItemViewMode {...props} />
      </ToolbarItemGroup>

      <ToolbarItemGroup>
        <ToolbarItemMore {...props} />
        {viewMode === ViewModeMindMap && <ToolbarItemTheme {...props} />}
        {viewMode === ViewModeMindMap && <ToolbarItemLayout {...props} />}
        {viewMode === ViewModeMindMap && <ToolbarItemSearch {...props} />}

        <ToolbarGroupItemUndoRedo {...props} />
      </ToolbarItemGroup>
      <ToolbarItemGroup />
    </>
  );
}
