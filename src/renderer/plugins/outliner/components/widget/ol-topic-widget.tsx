import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '@blink-mind/renderer-react';
import cx from 'classnames';
import { OLTopicNodeWrapper } from './ol-topic-node-wrapper';
import { olTopicWidgetRefKey } from '../../utils';

const OLTopicWidgetRoot = styled.div``;

export function OLTopicWidget(props: BaseProps) {
  const { controller, model, topicKey, saveRef } = props;

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

  const topicNodeWrapper = <OLTopicNodeWrapper {...propsMore} />;

  const isSelected =
    model.selectedKeys && model.selectedKeys.includes(topicKey);

  return (
    <OLTopicWidgetRoot
      ref={saveRef(olTopicWidgetRefKey(topicKey))}
      className={cx({ 'bm-topic-widget-selected': isSelected })}
      key={topicKey}
    >
      {topicNodeWrapper}
      {renderSubTopics(propsMore)}
    </OLTopicWidgetRoot>
  );
}
