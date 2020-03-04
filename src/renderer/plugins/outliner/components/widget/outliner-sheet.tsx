import React from 'react';
import styled from 'styled-components';
import { OlNodeLayer } from './ol-node-layer';
import './outliner.scss';

const log = require('debug')('outliner:sheet');

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0 0 50px;
  overflow: auto;
  flex-grow: 1;
  position: relative;
  background-color: white;
`;

export function OutlinerSheet(props) {
  log('render');
  return (
    <Container>
      <OlNodeLayer {...props} />
    </Container>
  );
}
