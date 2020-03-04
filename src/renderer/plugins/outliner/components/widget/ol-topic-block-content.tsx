import React from 'react';
import styled from 'styled-components';

export function OLTopicBlockContent(props) {
  const { controller, model, topicKey } = props;
  const readOnly = model.editingContentKey !== topicKey;

  const editor = controller.run('renderTopicContentEditor', {
    ...props,
    readOnly: false
  });

  return editor;
}
