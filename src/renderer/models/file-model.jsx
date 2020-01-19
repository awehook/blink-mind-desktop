import { Record } from 'immutable';

const defaultFileModelRecord = {
  id: null,
  path: null,
  model: null,
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

  get model() {
    return this.get('model');
  }

  get controller() {
    return this.get('controller');
  }

  get isUnsaved() {
    return this.model !== this.savedModel;
  }


  getContent() {
    const controller = this.controller;
    const obj = controller.run('serializeModel', {
      model: this.model,
      controller
    });
    return  JSON.stringify(obj, null, 2);
  }
}
