import { Record } from 'immutable';

const defaultFileModelRecord = {
  id: null,
  path: null,
  docModel: null,
  savedModel: null,
  controller: null,
};

export class FileModel extends Record(defaultFileModelRecord) {
  get id(){
    return this.get('id');
  }
  get path() {
    return this.get('path');
  }

  get savedModel() {
    return this.get('savedModel');
  }

  get docModel() {
    return this.get('docModel');
  }

  get controller() {
    return this.get('controller');
  }

  get isUnsaved() {
    return this.docModel !== this.savedModel;
  }


  getContent() {
    const controller = this.controller;
    const obj = controller.run('serializeDocModel', {
      docModel: this.docModel,
      controller
    });
    return  JSON.stringify(obj, null, 2);
  }
}
