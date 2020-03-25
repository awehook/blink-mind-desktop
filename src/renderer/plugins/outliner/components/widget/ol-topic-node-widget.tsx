import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '@blink-mind/renderer-react';

const log = require('debug')('node:topic-node-widget');

const OLNodeRows = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2px;
  padding-right: 100px;
`;

export function OLTopicNodeWidgetFC(props: BaseProps) {
  const { controller } = props;
  return (
    <OLNodeRows>{controller.run('renderTopicNodeRows', props)}</OLNodeRows>
  );
}

export const OLTopicNodeWidget = React.memo(
  OLTopicNodeWidgetFC,
  (prevProps, nextProps) => {
    const { controller } = prevProps;
    const componentAreEqual = controller.run('componentAreEqual', {
      ...prevProps,
      prevProps,
      nextProps
    });

    if (!componentAreEqual)
      log('componentAreEqual', componentAreEqual, nextProps.topicKey);
    return componentAreEqual;
  }
);
