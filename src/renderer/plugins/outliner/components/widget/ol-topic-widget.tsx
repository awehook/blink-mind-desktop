import React from 'react';
import styled from 'styled-components';
import { OLTopicNodeWidget } from './ol-topic-node-widget';
import { BaseProps } from '@blink-mind/renderer-react';

const OLTopicWidgetRoot = styled.div``;

export function OLTopicWidget(props: BaseProps) {
  const { controller, model, topicKey } = props;

  const topic = model.getTopic(topicKey);

  const renderSubTopics = props => {
    if (topic.collapse || topic.subKeys.size === 0) return null;
    return (
      <div className="bm-sub-topics">
        {topic.subKeys.map(subKey => {
          return controller.run('renderOLTopicWidget', {
            ...props,
            key: subKey,
            topicKey: subKey
          });
        })}
      </div>
    );
  };

  const propsMore = {
    ...props,
    topic
  };

  const topicNode = <OLTopicNodeWidget {...propsMore} />;

  return (
    <OLTopicWidgetRoot key={topicKey}>
      {topicNode}
      {renderSubTopics(propsMore)}
    </OLTopicWidgetRoot>
  );
}
