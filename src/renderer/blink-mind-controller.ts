import { I18nPlugin, ToolbarPlugin, OutlinerPlugin } from './plugins';
import RichTextEditorPlugin from '@blink-mind/plugin-rich-text-editor';
import {
  ExportTopicPlugin,
  InsertImagesPlugin,
  SearchPlugin,
  TagsPlugin,
  TopicReferencePlugin,
  UndoRedoPlugin,
  ThemeSelectorPlugin
} from '@blink-mind/plugins';
import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import { Controller } from '@blink-mind/core';

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
