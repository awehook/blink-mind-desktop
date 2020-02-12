import { ToolbarItemGroup } from './toolbar-item-group';
import * as React from 'react';
import {ToolbarItemViewMode} from "../../plugins/outliner/components/widget";
import {BaseProps} from "@blink-mind/renderer-react";
import {
  ToolbarItemLayout,
  ToolbarItemMore
} from "../../../blink-mind/packages/renderer-react/src/components/widgets/toolbar";
import {ToolbarItemTheme} from "../../plugins/toolbar/toolbar-item-theme";
import {ToolbarItemSearch} from "../../../blink-mind/packages/plugins/src/search/toolbar-item-search";
import {ToolbarGroupItemUndoRedo, ToolbarItemRedo, ToolbarItemUndo} from "@blink-mind/plugins";

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
