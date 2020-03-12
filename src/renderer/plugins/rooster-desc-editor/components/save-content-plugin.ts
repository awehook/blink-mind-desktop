import {Editor} from 'roosterjs-editor-core';
import {PluginEvent, PluginEventType} from 'roosterjs-editor-types';
import {Controller} from '@blink-mind/core';
import {TempValueKey} from '@blink-mind/renderer-react';

const log = require('debug')('rooster:save-content-plugin');

export default class SaveContentPlugin {
  private editor: Editor;

  private controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  getName() {
    return 'SaveContent';
  }

  initialize(editor: Editor) {
    log('initialize');
    this.editor = editor;
  }

  dispose() {
    this.editor = null;
  }

  onPluginEvent(e: PluginEvent) {
    //@ts-ignore
    // log('onPluginEvent',e.eventType);
    const content = this.editor.getContent(false);
    this.controller.run('setTempValue', {
      key: TempValueKey.EDITOR_CONTENT,
      value: content
    });
  }
}
