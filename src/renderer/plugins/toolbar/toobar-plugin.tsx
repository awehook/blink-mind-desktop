import * as React from 'react';
import { ToolbarItems } from '../../components/toolbar/toolbar-items';

export function ToolbarPlugin() {
  return {
    renderToolbarItems(props) {
      return <ToolbarItems {...props} />;
    }
  };
}
