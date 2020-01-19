import React from 'react';
import { Diagram } from '@blink-mind/renderer-react';


export class MindMap extends React.Component {
  controller;
  constructor(props) {
    super(props);
    const { controller } = props;
    this.controller = controller;
  }

  createModel(fileModel) {
    if (fileModel.path == null) {
      return this.controller.run('createNewModel');
    }
    return null;
  }

  renderDiagram() {
    const { fileModel } = this.props;

    const model = fileModel.model || this.createModel(fileModel);

    const diagramProps = {
      controller: this.controller,
      model
    };
    return <Diagram {...diagramProps} />;
  }

  render() {
    return <div className="mindmap">{this.renderDiagram()}</div>;
  }
}
