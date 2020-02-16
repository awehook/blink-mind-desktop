import {ToolbarGroupItemUndoRedo, ToolbarItemRedo, ToolbarItemUndo} from "@blink-mind/plugins";
import {BaseProps} from "@blink-mind/renderer-react";
import * as React from 'react';
import {ToolbarItemSearch} from "../../../blink-mind/packages/plugins/src/search/toolbar-item-search";
import {
  ToolbarItemLayout,
  ToolbarItemMore
} from "../../../blink-mind/packages/renderer-react/src/components/widgets/toolbar";
import {ToolbarItemViewMode} from "../../plugins/outliner/components/widget";
import {ToolbarItemTheme} from "../../plugins/toolbar/toolbar-item-theme";
import { ToolbarItemGroup } from './toolbar-item-group';

export function ToolbarItems(props:BaseProps) {
  return (
    <>
      <ToolbarItemGroup>
        <ToolbarItemViewMode {...props}/>
      </ToolbarItemGroup>

      <ToolbarItemGroup>
        <ToolbarItemMore {...props}/>
        <ToolbarItemTheme {...props}/>
        <ToolbarItemLayout {...props}/>
        <ToolbarItemSearch {...props}/>

        <ToolbarGroupItemUndoRedo {...props}/>
      </ToolbarItemGroup>
      <ToolbarItemGroup/>
    </>
  );
}
