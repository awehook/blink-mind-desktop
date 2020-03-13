import React from 'react';
import { OpType } from '@blink-mind/core';
export function OLTopicBlockDesc(props) {
  const { controller, block } = props;

  const onDoubleClick = e => {
    controller.run('operation', {
      ...props,
      opType: OpType.START_EDITING_DESC
    });
  };

  return block ? (
    <div
      className="bm-topic-block-desc"
      dangerouslySetInnerHTML={{ __html: block.data.data }}
      onDoubleClick={onDoubleClick}
    />
  ) : null;
}
