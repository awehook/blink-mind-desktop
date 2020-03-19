import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { OlNodeLayer } from './ol-node-layer';
import { olTopicWidgetRefKey } from '../../utils';

const BreadCrumbsDiv = styled.div`
  position: relative;
  height: 80px;
`;

const log = require('debug')('outliner:sheet');

export function OutlinerSheet_(props) {
  log('render');
  const { controller, model, getRef } = props;
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
    const focusTopicDiv: HTMLElement = getRef(
      olTopicWidgetRefKey(model.focusKey)
    );

    focusTopicDiv && focusTopicDiv.scrollIntoView();
  }, []);

  return (
    <div className="bm-outliner">
      {breadcrumbs}
      <OlNodeLayer {...props} />
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
