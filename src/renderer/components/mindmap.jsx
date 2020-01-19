import React from 'react';
import { Diagram } from '@blink-mind/renderer-react';
import debug from 'debug';

const log = debug('bmd:mindmap');

export class MindMap extends React.Component {

  createModel(fileModel) {
    if (fileModel.path == null) {
      return fileModel.controller.run('createNewModel');
    }
    return null;
  }

  renderDiagram() {
    const { fileModel } = this.props;

    const model = fileModel.model || this.createModel(fileModel);
    log('renderDiagram',model);
    const diagramProps = {
      controller: fileModel.controller,
      model
    };
    return <Diagram {...diagramProps} />;
  }

  render() {
    return <div className="mindmap">{this.renderDiagram()}</div>;
  }
}
