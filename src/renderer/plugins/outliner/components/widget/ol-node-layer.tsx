import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '@blink-mind/renderer-react';

export class OlNodeLayer extends React.Component<BaseProps> {
  render() {
    const props = this.props;
    const { model, controller } = props;
    const topicKey = model.editorRootTopicKey;

    const nProps = {
      ...props,
      topicKey
    };

    return controller.run('renderOLTopicWidget', nProps);
  }
}
