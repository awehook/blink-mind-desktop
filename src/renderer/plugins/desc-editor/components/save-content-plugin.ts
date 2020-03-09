import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';

export default class SaveContentPlugin  {
  private editor: Editor;

  getName() {
    return 'SaveContent';
  }

  initialize(editor: Editor) {
    this.editor = editor;
  }

  onPluginEvent(e: PluginEvent) {
    if (e.eventType === PluginEventType.ContentChanged) {

    }
  }
}
