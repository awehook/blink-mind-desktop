import { Controller } from '@blink-mind/core';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
// import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  SearchPlugin,
  TagsPlugin,
  ThemeSelectorPlugin,
  TopicReferencePlugin,
  UndoRedoPlugin
} from '@blink-mind/plugins';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import {
  AnaPlugin,
  ExpirePlugin,
  I18nPlugin,
  FontPlugin,
  OutlinerPlugin,
  ToolbarPlugin,
  ExportTopicPlugin,
  InsertImagesPlugin,
  AuthPlugin,
  DebugPlugin,
  RoosterDescEditorPlugin
} from './plugins';
import { ipcRenderer } from 'electron';
import { IpcChannelName } from '../common';

const isDev = ipcRenderer.sendSync(IpcChannelName.RM_GET_IS_DEV);

const plugins = [
  AnaPlugin(),
  ExpirePlugin(),
  isDev && DebugPlugin(),
  // AuthPlugin(),
  SearchPlugin(),
  OutlinerPlugin(),
  RoosterDescEditorPlugin(),
  ToolbarPlugin(),
  I18nPlugin(),
  FontPlugin(),
  ThemeSelectorPlugin(),
  // TopicReferencePlugin(),

  UndoRedoPlugin(),
  TagsPlugin(),
  InsertImagesPlugin(),
  // TopologyDiagramPlugin(),
  ExportTopicPlugin(),
  JsonSerializerPlugin(),
  DefaultPlugin()
];

export function createBlinkMindController(onChange?): Controller {
  return new Controller({ plugins, onChange });
}

export const BlinkMindController: Controller = createBlinkMindController();
