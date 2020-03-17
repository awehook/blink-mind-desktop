import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Key } from 'ts-keycode-enum';
import { FocusMode, OpType } from '@blink-mind/core';
import { OlOpType } from '../../op';
import { BaseProps, PropKey } from '@blink-mind/renderer-react';
import { ContextMenu } from '@blueprintjs/core';
import { isDarkTheme } from '@blueprintjs/core/src/common/utils/isDarkTheme';
import { OutlinerSheet_ } from './outliner-sheet';

const OLTopicBlockContentRoot = styled.div`
  width: 100%;
`;

export function OLTopicBlockContent_(props: BaseProps) {
  const { controller, model, topic, topicKey } = props;
  const handleKeyDown = e => {
    // console.log('onKeyDown');
    switch (e.keyCode) {
      case Key.Backspace:
        if (topic.contentData === '') {
          controller.run('operation', {
            ...props,
            opType: OpType.DELETE_TOPIC
          });
          return true;
        }
        break;
      case Key.Enter:
        if (e.shiftKey) return false;
        (topic.subKeys.size > 0 && !topic.collapse) ||
        topicKey === model.editorRootTopicKey
          ? controller.run('operation', {
              ...props,
              opType: OpType.ADD_CHILD,
              addAtFront: true
            })
          : controller.run('operation', {
              ...props,
              opType: OpType.ADD_SIBLING
            });
        return true;

      case Key.Tab:
        controller.run('operation', {
          ...props,
          opType: e.shiftKey ? OlOpType.OUTDENT : OlOpType.INDENT
        });
        return true;
    }
    return false;
  };

  const onMouseDown = () => {
    if (model.editingContentKey !== topicKey || model.selectedKeys != null) {
      controller.run('operation', {
        ...props,
        // // 为什么要这样写？ 因为由于componentAreEqual影响，导致某些时候不进行渲染，从而导致此处的docModel
        // docModel: controller.currentModel,
        // model: controller.currentModel.currentSheetModel,
        opType: OpType.START_EDITING_CONTENT
      });
    }
  };

  const renderContextMenu = e => {
    if (!controller.getValue(PropKey.TOPIC_CONTEXT_MENU_ENABLED, props)) {
      return null;
    }
    return controller.run('renderTopicContextMenu', props);
  };

  const onContextMenuClose = () => {};

  const onContextMenu = e => {
    console.log('onContextMenu');
    controller.run('operation', {
      ...props,
      opType: OpType.FOCUS_TOPIC,
      focusMode: FocusMode.SHOW_POPUP
    });
    const menu = renderContextMenu(e);
    if (menu != null) {
      const darkTheme = isDarkTheme(ReactDOM.findDOMNode(this));
      e.preventDefault();
      ContextMenu.show(
        menu,
        { left: e.clientX, top: e.clientY },
        onContextMenuClose,
        darkTheme
      );
    }
  };

  // 为什么把readOnly 设置为false, 是因为
  return (
    <OLTopicBlockContentRoot
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      {controller.run('renderTopicContentEditor', {
        ...props,
        handleKeyDown,
        className: 'bm-content-editable-ol',
        readOnly: model.focusKey !== topicKey
      })}
    </OLTopicBlockContentRoot>
  );
}

export const OLTopicBlockContent = React.memo(
  OLTopicBlockContent_,
  (prevProps, nextProps) => {
    const { controller } = prevProps;
    return controller.run('componentAreEqual', { prevProps, nextProps });
  }
);
