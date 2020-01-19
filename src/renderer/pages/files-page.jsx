import React, { useState } from 'react';
import { remote } from 'electron';
import { FileWindowModel, FileModel, setFileModel } from '../models';
import { List } from 'immutable';
import { MindMap } from '../components';

import { Controller } from '@blink-mind/core';
import { DefaultPlugin } from '@blink-mind/renderer-react';
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
import '@blink-mind/renderer-react/lib/main.css';
import '@blink-mind/plugins/lib/main.css';

const plugins = [
  RichTextEditorPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  UndoRedoPlugin(),
  TagsPlugin(),
  TopologyDiagramPlugin(),
  JsonSerializerPlugin(),
  DefaultPlugin()
];

function createBlinkMindController(onChange) {
  return new Controller({ plugins, onChange });
}

export function FilesPage(props) {
  const windowData = remote.getCurrentWindow().windowData;

  const files = windowData.files.map(file => {
    return new FileModel({
      path: file
    });
  });

  const initFileWindowModel = new FileWindowModel({
    files: List(files)
  });

  const [fileWindowModel, setFileWindowModel] = useState(initFileWindowModel);

  console.log(fileWindowModel);

  const fileModel = fileWindowModel.files.get(0);

  console.log(fileModel);

  const onChange = fileModel => (model, callback) => {
    const newFileWindowModel = setFileModel(fileWindowModel, {
      id: fileModel.id,
      model
    });
    setFileWindowModel(newFileWindowModel);
  };

  const controller = createBlinkMindController(onChange(fileModel));

  const mindMapProps = {
    fileModel,
    controller
  };

  console.log('renderFilePage');

  return (
    <>
      <MindMap {...mindMapProps} />
    </>
  );
}
