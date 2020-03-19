import React from 'react';
import { BaseProps } from '@blink-mind/renderer-react';
import styled from 'styled-components';
const OLRootTopicWidgetRoot = styled.div`
  width: 100%;
`;
const Title = styled.div`
  font-size: 24px;
  width: 100%;
  padding-left: 25px;
  margin-bottom: 20px;
`;
const SubTopics = styled.div``;

const EmptyDiv = styled.div`
  height: 80vh;
`;

export function OLRootTopicWidget(props: BaseProps) {
  const { controller, topic } = props;

  return (
    <OLRootTopicWidgetRoot>
      <Title>{controller.run('renderTopicBlockContent', props)}</Title>

      <SubTopics>
        {topic.subKeys.map(subKey => {
          return controller.run('renderOLTopicWidget', {
            ...props,
            key: subKey,
            topicKey: subKey
          });
        })}
      </SubTopics>
      <EmptyDiv/>
    </OLRootTopicWidgetRoot>
  );
}
