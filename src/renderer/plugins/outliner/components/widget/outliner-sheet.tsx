import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { OlNodeLayer } from './ol-node-layer';

const BreadCrumbsDiv = styled.div`
  position: relative;
  height: 80px;
`;

const log = require('debug')('outliner:sheet');

export function OutlinerSheet_(props) {
  log('render');
  const { controller, docModel, model } = props;
  const [diagramState, setDiagramState] = useState(
    controller.run('getInitialSheetState', props)
  );
  const nProps = {
    ...props,
    diagramState,
    setDiagramState
  };

  let breadcrumbs = null;
  if (model.editorRootTopicKey !== model.rootTopicKey) {
    const bcProps = {
      ...props,
      topicKey: model.focusKey,
      topic: model.getTopic(model.focusKey)
    };
    breadcrumbs = (
      <BreadCrumbsDiv>
        {controller.run('renderEditorRootBreadcrumbs', bcProps)}
      </BreadCrumbsDiv>
    );
  }
  useEffect(() => {
    model === docModel.currentSheetModel &&
      controller.run('moveTopicToCenter', {
        ...props,
        topicKey: model.focusKey
      });
  }, []);

  return (
    <div className="bm-outliner">
      {breadcrumbs}
      <OlNodeLayer {...nProps} />
      {controller.run('renderSheetCustomize', nProps)}
    </div>
  );
}

export const OutlinerSheet = React.memo(
  OutlinerSheet_,
  (prevProps, nextProps) => {
    const { controller } = prevProps;
    return controller.run('sheetAreEqual', { prevProps, nextProps });
  }
);
