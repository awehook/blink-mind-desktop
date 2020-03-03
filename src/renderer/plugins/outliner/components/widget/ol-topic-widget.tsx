import React from 'react';
import styled from 'styled-components';
import { OLTopicNodeWidget } from './ol-topic-node-widget';

const Root = styled.div``;

export function OLTopicWidget(props) {
  const renderSubTopics = props => {};

  const propsMore = {
    ...props
  };

  const topicNode = <OLTopicNodeWidget {...propsMore} />;

  return (
    <Root>
      {topicNode}
      {renderSubTopics(propsMore)}
    </Root>
  );
}
