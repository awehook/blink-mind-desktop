import React, { useState } from 'react';
import { ipcRenderer, remote } from 'electron';
import { FileModel, FilesWindowModel, setFileModel } from '../models';
import { MindMap } from '../components';

import { Controller } from '@blink-mind/core';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import RichTextEditorPlugin from '@blink-mind/plugin-rich-text-editor';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
import { ThemeSelectorPlugin } from '@blink-mind/plugin-theme-selector';
import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  SearchPlugin,
  TagsPlugin,
  TopicReferencePlugin,
  UndoRedoPlugin
} from '@blink-mind/plugins';
import { ToolbarPlugin } from '../plugins';
import '@blink-mind/renderer-react/lib/main.css';
import '@blink-mind/plugins/lib/main.css';
import { IpcChannelName, IpcType } from '../../common';
import { List } from 'immutable';
import debug from 'debug';
import { getFileContent, saveFile, saveFileWithFileModel } from '../utils';
import { useTranslation } from '../hooks';

const log = debug('bmd:files-page');

const plugins = [
  ToolbarPlugin(),
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
  const t = useTranslation();
  const initWindowData = remote.getCurrentWindow().windowData;

  const [windowData] = useState(initWindowData);

  const nProps = {
    windowData,
    t
  };
  return <FilesPageInternal {...nProps} />;
}

export class FilesPageInternal extends React.Component {
  constructor(props) {
    super(props);

    const { windowData } = this.props;
    const fileModels = windowData.files.map(file => {
      const controller = createBlinkMindController(this.onChange(file.id));
      let model = null;
      if (file.path == null) {
        model = controller.run('createNewModel');
      } else {
        const content = getFileContent({ path: file.path });
        const obj = JSON.parse(content);
        model = controller.run('deserializeModel', { obj, controller });
      }
      return new FileModel({
        id: file.id,
        path: file.path,
        savedModel: file.path ? model : null,
        model,
        controller
      });
    });

    const filesWindowModel = new FilesWindowModel({
      files: List(fileModels),
      activeFileId: fileModels[0].id
    });

    this.state = {
      filesWindowModel
    };

    log('this.state', this.state);
  }

  getActiveFileModel() {
    return this.state.filesWindowModel.getActiveFile();
  }

  // 菜单的save => MR_SAVE => onSave => RM_SAVE
  // 菜单save: 判断path 是否为null, 是：saveAs 不是：save

  onIpcMR = (e, arg) => {
    const { type } = arg;
    log('onIpcMR', type);
    switch (type) {
      case IpcType.MR_SAVE:
        this.onSave(e, arg);
        break;
      case IpcType.MR_UNDO:
        this.onUndo();
        break;
      case IpcType.MR_REDO:
        this.onRedo();
        break;
      case IpcType.MR_BEFORE_CLOSE_WINDOW:
        this.onBeforeCloseWindow();
        break;
      default:
        break;
    }
  };

  onSave = (e, { path, id }) => {
    log('onSave', path);
    const fileModel = this.state.filesWindowModel.getFile(id);
    const content = fileModel.getContent();
    log('content', content);
    saveFile({ path, id, content });
    const newFileWindowModel = setFileModel(this.state.filesWindowModel, {
      id: id,
      path,
      isSave: true
    });
    this.setState(newFileWindowModel);
  };

  onUndo = () => {
    const fileModel = this.getActiveFileModel();
    const controller = fileModel.controller;
    const model = fileModel.model;
    controller.run('undo', { controller, model });
  };

  onRedo = () => {
    const fileModel = this.getActiveFileModel();
    const controller = fileModel.controller;
    const model = fileModel.model;
    controller.run('redo', { controller, model });
  };

  onBeforeCloseWindow = () => {
    const unsavedFiles = this.state.filesWindowModel
      .getUnsavedFiles()
      .toArray();
    if (unsavedFiles.length > 0) {
      const canceled = unsavedFiles.some(f => {
        const r = saveFileWithFileModel(f, this.props.t);
        return r === 'cancel';
      });
      if (!canceled) {
        remote.getCurrentWindow().destroy();
      }
    } else {
      remote.getCurrentWindow().destroy();
    }
  };

  componentDidMount() {
    ipcRenderer.on(IpcChannelName.MR, this.onIpcMR);
  }

  componentWillUnmount() {
    ipcRenderer.off(IpcChannelName.MR, this.onIpcMR);
  }

  onChange = fileModelId => (model, callback) => {
    console.log('onchange', fileModelId);
    const fileModel = this.state.filesWindowModel.getFile(fileModelId);
    const edited = fileModel.model !== model;
    log('edited', edited);
    log(remote.getCurrentWindow());
    remote.getCurrentWindow().setTitleFlag({ edited });
    if (!edited) return;
    const newFileWindowModel = setFileModel(this.state.filesWindowModel, {
      id: fileModelId,
      model
    });

    this.setState(
      {
        filesWindowModel: newFileWindowModel
      },
      callback
    );
  };

  render() {
    const { filesWindowModel } = this.state;
    const files = filesWindowModel.files;
    if (files.size === 1) {
      const fileModel = files.get(0);
      const mindMapProps = {
        fileModel
      };

      log('renderFilePage', mindMapProps);

      return (
        <>
          <MindMap {...mindMapProps} />
        </>
      );
    }
  }
}
