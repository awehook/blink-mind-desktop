import { Controller } from '@blink-mind/core';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
import RichTextEditorPlugin from '@blink-mind/plugin-rich-text-editor';
import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  ExportTopicPlugin,
  InsertImagesPlugin,
  SearchPlugin,
  TagsPlugin,
  ThemeSelectorPlugin,
  TopicReferencePlugin,
  UndoRedoPlugin
} from '@blink-mind/plugins';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import { I18nPlugin, OutlinerPlugin, ToolbarPlugin } from './plugins';

const plugins = [
  OutlinerPlugin(),
  ToolbarPlugin(),
  I18nPlugin(),
  RichTextEditorPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  UndoRedoPlugin(),
  TagsPlugin(),
  InsertImagesPlugin(),
  TopologyDiagramPlugin(),
  ExportTopicPlugin(),
  JsonSerializerPlugin(),
  DefaultPlugin()
];

export function createBlinkMindController(onChange?): Controller {
  return new Controller({ plugins, onChange });
}

export const BlinkMindController: Controller = createBlinkMindController();
