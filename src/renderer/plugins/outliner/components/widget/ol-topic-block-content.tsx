import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Key } from 'ts-keycode-enum';
import { FocusMode, OpType } from '@blink-mind/core';
import { BaseProps, PropKey } from '@blink-mind/renderer-react';
import { ContextMenu } from '@blueprintjs/core';
import { isDarkTheme } from '@blueprintjs/core/src/common/utils/isDarkTheme';

const OLTopicBlockContentRoot = styled.div`
  //width: 100%;
  //flex-grow: 1;
`;

export function OLTopicBlockContent_(props: BaseProps) {
  // 为什么这里不能用controller.model 呢？用了之后outliner输入光标会出现问题,添加一个sibling的时候光标没有聚焦在sibling上面
  const { controller, model, topic, topicKey } = props;
  const handleKeyDown = e => {
    // console.log('onKeyDown');
    switch (e.keyCode) {
      case Key.Backspace:
        if (topic.contentData === '' || model.selectedKeys) {
          controller.run('operation', {
            ...props,
            opType: OpType.DELETE_TOPIC
          });
          return true;
        }
        break;
    }
    return false;
  };

  const onMouseDown = () => {
    if (model.editingContentKey !== topicKey || model.selectedKeys != null) {
      controller.run('operation', {
        ...props,
        // // 为什么要这样写？ 因为由于componentAreEqual影响，导致某些时候不进行渲染，从而导致此处的docModel
        // docModel: controller.docModel,
        // model: controller.docModel.currentSheetModel,
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
