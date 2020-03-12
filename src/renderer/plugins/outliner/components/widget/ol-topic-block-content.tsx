import React from 'react';
import styled from 'styled-components';
import { Key } from 'ts-keycode-enum';
import { OpType } from '@blink-mind/core';
import { OlOpType } from '../../op';

const OLTopicBlockContentRoot = styled.div`
  width: 100%;
`;

export function OLTopicBlockContent(props) {
  const { controller, model, topic, topicKey } = props;
  const isEditorRoot = model.editorRootTopicKey === topicKey;
  const handleKeyDown = e => {
    console.log('onKeyDown');
    switch (e.keyCode) {
      case Key.Enter:
        if (e.shiftKey) return false;
        isEditorRoot
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
          opType: e.shiftKey ? OlOpType.OUTDENT : OlOpType.INDENT,
          topicKeys: [topicKey]
        });
        return true;
    }
    return false;
  };

  const onClick = () => {
    if (model.editingContentKey !== topicKey) {
      controller.run('operation', {
        ...props,
        opType: OpType.START_EDITING_CONTENT
      });
    }
  };

  return (
    <OLTopicBlockContentRoot onClick={onClick}>
      {controller.run('renderTopicContentEditor', {
        ...props,
        handleKeyDown,
        className: 'bm-content-editable-ol',
        readOnly: false
      })}
    </OLTopicBlockContentRoot>
  );
}
