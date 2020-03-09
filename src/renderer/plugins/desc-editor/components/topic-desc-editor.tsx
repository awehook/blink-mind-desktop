import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { BlockType } from '@blink-mind/core';
import { BaseProps, useClickOutside } from '@blink-mind/renderer-react';
import Editor from './editor/editor';
import { getAllPluginArray, getPlugins } from './plugins';
import Ribbon from './ribbon/Ribbon';
function TopicDescEditor_(props: BaseProps, ref) {
  const divRef = useClickOutside(() => {
    console.log('useClickOutside');
  });
  const editorRef = useRef<Editor>();
  const { topic } = props;
  const block = topic.getBlock(BlockType.DESC).block.data;

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorRef.current.getContent();
    }
  }));
  if (block.kind === 'html') {
    const plugins = getPlugins();
    return (
      <div ref={divRef}>
        <Ribbon plugin={plugins.ribbon} ref={plugins.ribbon.refCallback} />
        <Editor
          ref={editorRef}
          plugins={getAllPluginArray(false)}
          initState={plugins.editorOptions.getBuildInPluginState()}
          content={block.data}
          undo={plugins.snapshot}
        />
      </div>
    );
  }
  return null;
}

export const TopicDescEditor = forwardRef(TopicDescEditor_);
