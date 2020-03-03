import React from 'react';
import styled from 'styled-components';

const log = require('debug')('outliner:sheet');

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  position: relative;
`;

export function OutlinerSheet(props) {
  log('render');
  return (
    <Container>
      Outliner
    </Container>
  )
}
