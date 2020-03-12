import {
  Controller,
  DocModel,
  FocusMode,
  DocModelModifier,
  BlockType
} from '@blink-mind/core';
import { Record } from 'immutable';
import { TempValueKey } from '@blink-mind/renderer-react';

type FileModelRecordType = {
  id: string;
  path: string;
  docModel: DocModel;
  savedModel: DocModel;
  controller: Controller;
};

const defaultFileModelRecord: FileModelRecordType = {
  id: null,
  path: null,
  docModel: null,
  savedModel: null,
  controller: null
};

export class FileModel extends Record(defaultFileModelRecord) {
  get id(): string {
    return this.get('id');
  }
  get path(): string {
    return this.get('path');
  }

  get savedModel(): DocModel {
    return this.get('savedModel');
  }

  get docModel(): DocModel {
    return this.get('docModel');
  }

  get controller(): Controller {
    return this.get('controller');
  }

  get isUnsaved(): boolean {
    return this.docModel !== this.savedModel;
  }

  getContent(): string {
    const controller = this.controller;
    let docModel = this.docModel;
    const model = docModel.currentSheetModel;
    const focusMode = model.focusMode;
    // TODO 这里也不是很保险
    if (focusMode === FocusMode.EDITING_DESC) {
      const data = controller.run('getTempValue', {
        key: TempValueKey.EDITOR_CONTENT
      });
      console.log(data);
      docModel = DocModelModifier.setTopicBlockData({
        docModel,
        topicKey: docModel.currentSheetModel.focusKey,
        blockType: BlockType.DESC,
        data: model
          .getTopic(model.focusKey)
          .getBlock(BlockType.DESC)
          .block.data.set(
            'data',
            controller.run('getTempValue', {
              key: TempValueKey.EDITOR_CONTENT
            })
          )
      });
    }
    const obj = controller.run('serializeDocModel', {
      docModel,
      controller
    });
    return JSON.stringify(obj, null, 2);
  }
}
