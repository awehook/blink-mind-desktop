import { Controller, DocModel } from '@blink-mind/core';
import { Record } from 'immutable';

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
    const obj = controller.run('serializeDocModel', {
      docModel: this.docModel,
      controller
    });
    return JSON.stringify(obj, null, 2);
  }
}
