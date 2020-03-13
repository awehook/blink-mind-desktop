import React from 'react';
import styled from 'styled-components';
const OLTopicBlockDescRoot = styled.div`
  user-select: text;
  padding: 5px;
  margin-top: 10px;
  max-height: 60vh;
  width: auto;
  max-width: 80vw;
  overflow: auto;
  border: #00bbcc 1px solid;
`;
export function OLTopicBlockDesc(props) {
  const { block } = props;

  return block ? (
    <OLTopicBlockDescRoot
      dangerouslySetInnerHTML={{ __html: block.data.data }}
    />
  ) : null;
}
