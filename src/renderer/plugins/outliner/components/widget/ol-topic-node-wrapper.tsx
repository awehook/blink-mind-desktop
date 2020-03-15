import { BaseProps } from '@blink-mind/renderer-react';
import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { OlOpType } from '../../op';
import { OLTopicCollapseIcon } from './ol-topic-collapse-icon';
import { OLTopicNodeWidget } from './ol-topic-node-widget';

const OlTopicNodeWrapperRoot = styled.div`
  display: flex;
  align-content: flex-start;
  padding: 8px 0;
`;
export function OlTopicNodeWrapper(props: BaseProps) {
  const { controller } = props;

  const onMouseEnter = e => {
    // log('onMouseEnter');
    // @ts-ignore
    iconRef.current.setHover(true);

    e.nativeEvent.which === 1 &&
      controller.run('operation', {
        ...props,
        opType: OlOpType.SELECT_WITH_MOUSE_MOVE
      });
  };

  const onMouseLeave = () => {
    // @ts-ignore
    iconRef.current.setHover(false);
  };

  const onPaste = ev => {
    // log('onPaste');
    controller.run('handleTopicPaste', { ...props, ev });
  };

  const rootProps = {
    onMouseEnter,
    onMouseLeave,
    onPaste
  };

  const iconRef = useRef();
  const collpaseProps = {
    ...props,
    ref: iconRef,
  };
  return (
    <OlTopicNodeWrapperRoot {...rootProps}>
      <OLTopicCollapseIcon {...collpaseProps} />
      <OLTopicNodeWidget {...props} />
    </OlTopicNodeWrapperRoot>
  );
}
