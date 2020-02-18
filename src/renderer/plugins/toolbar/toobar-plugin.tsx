import * as React from 'react';
import { ToolbarItems, Toolbar } from '../../components';


export function ToolbarPlugin() {
  return {
    renderToolbar(props) {
      return <Toolbar {...props} />;
    },
    renderToolbarItems(props) {
      return <ToolbarItems {...props} />;
    }
  };
}
