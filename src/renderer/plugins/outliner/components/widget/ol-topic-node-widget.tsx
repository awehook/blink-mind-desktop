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
  const { controller, topic } = props;
  const topicContentStyle = controller.run('getTopicContentStyle', props);
  const { fontSize, fontFamily, lineHeight } = topicContentStyle;
  const style: any = { fontSize, fontFamily, lineHeight };
  if (topic.style) {
    const topicStyle = JSON.parse(topic.style);
    const { contentStyle = {} } = topicStyle;
    const { color } = contentStyle;
    style.color = color;
  }
  return (
    <OLNodeRows style={style}>
      {controller.run('renderTopicNodeRows', props)}
    </OLNodeRows>
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
