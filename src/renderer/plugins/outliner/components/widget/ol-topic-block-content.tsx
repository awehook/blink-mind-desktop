import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Key } from 'ts-keycode-enum';
import { FocusMode, OpType } from '@blink-mind/core';
import {
  BaseProps,
  PropKey,
  op,
  selectToEnd,
  selectToStart
} from '@blink-mind/renderer-react';
import { ContextMenu } from '@blueprintjs/core';
import { isDarkTheme } from '@blueprintjs/core/src/common/utils/isDarkTheme';

const OLTopicBlockContentRoot = styled.div`
  //width: 100%;
  //flex-grow: 1;
`;
interface Props extends BaseProps {
  addRowClickHandler: (handler) => () => void;
}
export function OLTopicBlockContent_(props: Props) {
  // 为什么这里不能用controller.model 呢？用了之后outliner输入光标会出现问题,添加一个sibling的时候光标没有聚焦在sibling上面
  const { controller, model, topic, topicKey, addRowClickHandler } = props;

  const innerEditorDivRef = useRef<HTMLElement>();
  // 由于在执行cut的时候, ReactContentEditable 会先执行onInput, 加这个变量可以避免这种情况
  let _handleOnInput = false;

  const handleOnInput = e => {
    return _handleOnInput;
  };

  const handleRowClick = e => {
    onMouseDown();
  };
  useEffect(() => {
    if (addRowClickHandler) {
      const res = addRowClickHandler(handleRowClick);
      return () => {
        res();
      };
    }
  });

  const handleKeyDown = e => {
    // console.log('onKeyDown');
    const innerEditorDiv = innerEditorDivRef.current;
    const sel = window.getSelection();
    let hasText = false;
    const callback = () => () => {
      if (hasText) {
        document.execCommand('paste');
        navigator.clipboard.writeText('');
      }
    };
    switch (e.keyCode) {
      case Key.Enter:
        if (!e.shiftKey) {
          selectToEnd(innerEditorDiv, sel);
          hasText = !!sel.toString();
          document.execCommand('cut');
          (topic.subKeys.size > 0 && !topic.collapse) ||
          topic.key === model.editorRootTopicKey
            ? op(controller, {
                ...props,
                opType: OpType.ADD_CHILD,
                addAtFront: true,
                callback
              })
            : op(controller, {
                ...props,
                opType: OpType.ADD_SIBLING,
                callback
              });
          return true;
        }
        break;
      case Key.Backspace:
        console.log('backspace');
        if (model.selectedKeys) {
          _handleOnInput = true;
          controller.run('operation', {
            ...props,
            opType: OpType.DELETE_TOPIC
          });
          _handleOnInput = false;
          return true;
        }
        if (sel.isCollapsed) {
          const oldRange = sel.getRangeAt(0);
          selectToStart(innerEditorDiv, sel);
          if (sel.toString().length === 0) {
            _handleOnInput = true;
            const range = new Range();
            range.setStartBefore(innerEditorDiv.firstChild);
            range.setEndAfter(innerEditorDiv.lastChild);
            sel.removeAllRanges();
            sel.addRange(range);
            console.log('cut');
            document.execCommand('cut');
            console.log('operation');
            controller.run('operation', {
              ...props,
              opType: OpType.DELETE_TOPIC,
              callback
            });
            _handleOnInput = false;
            return true;
          } else {
            sel.removeAllRanges();
            sel.addRange(oldRange);
          }
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
        handleOnInput,
        innerEditorDivRef,
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
