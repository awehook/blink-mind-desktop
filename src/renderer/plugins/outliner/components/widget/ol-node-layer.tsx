import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '@blink-mind/renderer-react';

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

    return controller.run('renderRootTopicWidget', nProps);
  }
}
