import * as React from 'react';
import { ContextMenuExportTopic } from './context-menu-export-topic';
import { EXT_KEY_EXPORT_TOPIC } from './utils';

export function ExportTopicPlugin() {
  return {
    customizeTopicContextMenu(ctx, next) {
      const res = next();
      res.push(<ContextMenuExportTopic key={EXT_KEY_EXPORT_TOPIC} {...ctx} />);
      return res;
    }
  };
}
