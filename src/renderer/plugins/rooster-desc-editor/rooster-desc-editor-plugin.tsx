import React from 'react';
import { RoosterDescEditor } from './components';
import { BlockType, DescBlockData } from '@blink-mind/core';

export function RoosterDescEditorPlugin() {
  return {
    renderTopicDescEditor(props) {
      return <RoosterDescEditor {...props} />;
    },

    serializeBlockData(props, next) {
      const { block } = props;
      if (block.type === BlockType.DESC) {
        if (block.data.kind === 'html') return block.data;
      }
      return next();
    },

    deserializeBlockData(ctx, next) {
      const { block } = ctx;
      if (block.type === BlockType.DESC) {
        if (typeof block.data === 'string') {
          return null;
          //return new DescBlockData({ kind: 'markdown', data: block.data });
        }
        return new DescBlockData(block.data);
      }
      return next();
    }
  };
}
