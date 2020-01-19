import { Record } from 'immutable';
import { createKey } from '@blink-mind/core';

const defaultFileModelRecord = {
  id: createKey(),
  path: null,
  model: null
};

export class FileModel extends Record(defaultFileModelRecord) {
  get path() {
    return this.get('path');
  }

  get model() {
    return this.get('model');
  }
}
