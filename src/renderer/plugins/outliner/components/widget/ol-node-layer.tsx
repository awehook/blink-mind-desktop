import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '@blink-mind/renderer-react';

const OLNodeLayerRoot = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0 0 50px;
  overflow: auto;
  flex-grow: 1;
`;

export class OlNodeLayer extends React.Component<BaseProps> {
  render() {
    const props = this.props;
    const { model, controller } = props;
    const topicKey = model.editorRootTopicKey;
    const topic = model.getTopic(topicKey);
    const nProps = {
      ...props,
      topicKey,
      topic
    };

    return (
      <OLNodeLayerRoot>
        {controller.run('renderRootTopicWidget', nProps)}
      </OLNodeLayerRoot>
    );
  }
}
