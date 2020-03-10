import React from 'react';
import { TopicDescEditor } from './components';
import { BlockType } from '@blink-mind/core';

export function DescEditorPlugin() {
  return {
    renderTopicDescEditor(props) {
      return <TopicDescEditor {...props} />;
    },

    serializeBlockData(props, next) {
      const { block } = props;
      if (block.type === BlockType.DESC) {
        if (block.data.kind === 'html') return block.data;
      }
      return next();
    }


  };
}
