import React, { useEffect, useRef } from 'react';
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
  const divRef = useRef<HTMLElement>();
  const setZoomFactor = z => {
    if (divRef.current) {
      divRef.current.style.transform = `scale(${z})`;
      divRef.current.style.transformOrigin = '0 0';
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.transform = `scale(${controller.run('getZoomFactor',props) || 1})`;
      divRef.current.style.transformOrigin = '0 0';
    }
    controller.run('addZoomFactorChangeEventListener', {
      ...props,
      listener: setZoomFactor
    });
    return () => {
      controller.run('removeZoomFactorChangeEventListener', {
        ...props,
        listener: setZoomFactor
      });
    };
  });

  const onWheel = ev => {
    controller.run('setZoomFactorOnWheel', { ...props, ev });
  };

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
    <OLRootTopicWidgetRoot ref={divRef} onWheel={onWheel}>
      <Title style={style}>{controller.run('renderTopicBlockContent', props)}</Title>

      <SubTopics>
        {topic.subKeys.map(subKey => {
          return controller.run('renderOLTopicWidget', {
            ...props,
            key: subKey,
            topicKey: subKey
          });
        })}
      </SubTopics>
      <EmptyDiv />
    </OLRootTopicWidgetRoot>
  );
}
