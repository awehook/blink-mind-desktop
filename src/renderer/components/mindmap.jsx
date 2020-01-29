import React from 'react';
import { Diagram } from '@blink-mind/renderer-react';
import debug from 'debug';

const log = debug('bmd:mindmap');

export class MindMap extends React.Component {

  createDocModel(fileModel) {
    if (fileModel.path == null) {
      return fileModel.controller.run('createNewDocModel');
    }
    return null;
  }

  renderDiagram() {
    const { fileModel } = this.props;

    const docModel = fileModel.docModel || this.createDocModel(fileModel);
    log('renderDiagram',docModel);
    const diagramProps = {
      controller: fileModel.controller,
      docModel
    };
    return <Diagram {...diagramProps} />;
  }

  render() {
    return <div className="mindmap">{this.renderDiagram()}</div>;
  }
}
