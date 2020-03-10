import React, { SyntheticEvent } from 'react';
import { Key } from 'ts-keycode-enum';
import { OpType } from '@blink-mind/core';
export function OLTopicBlockContent(props) {
  const { controller } = props;
  const handleKeyDown = e => {
    console.log('onKeyDown');
    if (e.keyCode === Key.Enter) {
      controller.run('operation', {
        ...props,
        opType: OpType.ADD_SIBLING
      });
      return true;
    }
    return false;
  };
  return controller.run('renderTopicContentEditor', {
    ...props,
    handleKeyDown,
    className: 'bm-content-editable-ol',
    readOnly: false
  });
}
