import React from 'react';
import styled from 'styled-components';
const OLTopicBlockDescRoot = styled.div``;
export function OLTopicBlockDesc(props) {
  const { block } = props;

  return block ? (
    <OLTopicBlockDescRoot>{block.data.data}</OLTopicBlockDescRoot>
  ) : null;
}
