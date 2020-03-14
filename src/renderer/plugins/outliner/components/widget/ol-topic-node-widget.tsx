import React, { useState } from 'react';
import styled from 'styled-components';
import { OLTopicCollapseIcon } from './ol-topic-collapse-icon';
import { BaseProps } from '@blink-mind/renderer-react';
import { OlOpType } from '../../op';

const log = require('debug')('node:topic-node-widget');

const OLTopicNodeWidgetRoot = styled.div`
  display: flex;
  align-content: flex-start;
  padding: 8px 0;
`;

const OLNodeRows = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2px;
`;

export function OLTopicNodeWidget(props: BaseProps) {
  const { controller, model, topicKey } = props;

  const [hover, setHover] = useState(false);

  const onMouseEnter = e => {
    // log('onMouseEnter');
    setHover(true);

    e.nativeEvent.which === 1 &&
      controller.run('operation', {
        ...props,
        opType: OlOpType.SELECT_WITH_MOUSE_MOVE
      });
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onPaste = ev => {
    // log('onPaste');
    this.run('handleTopicPaste', { ...this.props, ev });
  };

  const rootProps = {
    onMouseEnter,
    onMouseLeave,
    onPaste
  };
  const collpaseProps = {
    ...props,
    hover
  };
  return (
    <OLTopicNodeWidgetRoot {...rootProps}>
      <OLTopicCollapseIcon {...collpaseProps} />
      <OLNodeRows>{controller.run('renderTopicNodeRows', props)}</OLNodeRows>
    </OLTopicNodeWidgetRoot>
  );
}
