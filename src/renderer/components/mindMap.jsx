import React from 'react';
import { Diagram } from '@blink-mind/renderer-react';
import RichTextEditorPlugin from '@blink-mind/plugin-rich-text-editor';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
import { ThemeSelectorPlugin } from '@blink-mind/plugin-theme-selector';
import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  TopicReferencePlugin,
  SearchPlugin,
  UndoRedoPlugin,
  TagsPlugin
} from '@blink-mind/plugins';
// import { ToolbarPlugin } from './toolbar';
import '@blink-mind/renderer-react/lib/main.css';
import '@blink-mind/plugins/lib/main.css';

const plugins = [
  // ToolbarPlugin(),
  RichTextEditorPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  UndoRedoPlugin(),
  TagsPlugin(),
  TopologyDiagramPlugin(),
  JsonSerializerPlugin()
];



export class MindMap extends React.Component {
  constructor(props) {
    super(props);
    this.initModel();
  }

  componentWillMount() {}

  componentDidMount() {}

  initModel() {
    this.state = { model: null };
  }

  renderDiagram() {
    return (
      <Diagram
        model={this.state.model}
        //@ts-ignore
        onChange={this.onChange}
        plugins={plugins}
      />
    );
  }

  onChange = (model, callback) => {
    this.setState(
      {
        model
      },
      callback
    );
  };

  render() {
    return <div className="mindmap">{this.renderDiagram()}</div>;
  }
}
