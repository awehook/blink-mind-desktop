import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  BlockType,
  FocusMode,
  KeyType,
  OpType,
  ViewModeMindMap
} from '@blink-mind/core';
import { BaseProps, useClickOutside } from '@blink-mind/renderer-react';
import Editor from './editor/editor';
import Ribbon from './ribbon/Ribbon';
import SaveContentPlugin from './save-content-plugin';
import RibbonPlugin from './ribbon/RibbonPlugin';
import SnapshotPlugin from './sidePane/snapshot/SnapshotPlugin';
import EditorOptionsPlugin from './sidePane/editorOptions/EditorOptionsPlugin';
import { on } from 'cluster';

const log = require('debug')('node:topic-desc-editor');

interface Plugins {
  ribbon: RibbonPlugin;
  snapshot: SnapshotPlugin;
  editorOptions: EditorOptionsPlugin;
  saveContent: SaveContentPlugin;
}

const pluginMap = new Map<KeyType, Plugins>();

interface TopicDescEditorProps extends BaseProps {}

function TopicDescEditor_(props: TopicDescEditorProps, ref) {
  const { controller, topic, topicKey, model } = props;
  // const [showToolbar] = useState(false);
  const editorRef = useRef<Editor>();
  const blockData = topic.getBlock(BlockType.DESC).block.data;
  const divRef = useClickOutside(() => {
    log('clickOutside');
    controller.run('operation', {
      ...props,
      opType: OpType.SET_TOPIC_BLOCK,
      blockType: BlockType.DESC,
      data: blockData.set('data', editorRef.current.getContent())
    });
  });

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorRef.current.getContent();
    }
  }));

  if (blockData.kind === 'html') {
    let plugins: Plugins;
    if (pluginMap.has(topicKey)) {
      plugins = pluginMap.get(topicKey);
    } else {
      const ribbon = new RibbonPlugin();
      const snapshot = new SnapshotPlugin();
      const editorOptions = new EditorOptionsPlugin();
      const saveContent = new SaveContentPlugin(controller);
      plugins = {
        ribbon,
        snapshot,
        editorOptions,
        saveContent
      };
      pluginMap.set(topicKey, plugins);
    }

    const onClick = () => {
      if (model.focusMode !== FocusMode.EDITING_DESC) {
        controller.run('operation', {
          ...props,
          opType: OpType.START_EDITING_DESC
        });
      }
    };

    return (
      <div className="bm-desc-editor-root" ref={divRef} onClick={onClick}>
        <Ribbon plugin={plugins.ribbon} ref={plugins.ribbon.refCallback} />
        <Editor
          ref={editorRef}
          className={
            model.config.viewMode === ViewModeMindMap
              ? 'bm-html-editor-mindmap'
              : 'bm-html-editor-outliner'
          }
          plugins={[
            plugins.ribbon,
            plugins.snapshot,
            plugins.editorOptions,
            plugins.saveContent
          ]}
          initState={plugins.editorOptions.getBuildInPluginState()}
          content={blockData.data}
          undo={plugins.snapshot}
        />
      </div>
    );
  }
  return null;
}

export const TopicDescEditor = forwardRef(TopicDescEditor_);
