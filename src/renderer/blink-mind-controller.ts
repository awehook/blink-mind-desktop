import { Controller } from '@blink-mind/core';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
// import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  SearchPlugin,
  TagsPlugin,
  ThemeSelectorPlugin,
  TopicReferencePlugin,
  ExportTopicPlugin,
  InsertImagesPlugin,
  DebugPlugin,
  UndoRedoPlugin
} from '@blink-mind/plugins';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import {
  BugCollectPlugin,
  // AnaPlugin,
  I18nPlugin,
  FontPlugin,
  OutlinerPlugin,
  ToolbarPlugin,

  RoosterDescEditorPlugin,
  ValidateModelPlugin
} from './plugins';
import { isDev } from './utils';
const plugins = [
  BugCollectPlugin(),
  // AnaPlugin(),
  isDev && DebugPlugin(),
  ValidateModelPlugin(),
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
