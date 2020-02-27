import React from 'react';
import { Tab } from '@blueprintjs/core';
import { DebugPanel } from './debug-panel';

export function DebugPlugin() {
  const tabId = 'debug';
  return {
    renderRightTopPanelTabs(props, next) {
      const res = next();
      const tProps = {
        id: tabId,
        key: tabId,
        title: 'Debug',
        panel: <DebugPanel {...props} />
      };
      const tab = <Tab {...tProps} />;
      res.push(tab);
      return res;
    }
  };
}
