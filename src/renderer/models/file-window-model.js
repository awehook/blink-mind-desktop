import { Record, List } from 'immutable';

const defaultFileWindowModelRecord = {
  id: null,
  files: List()
};

export class FileWindowModel extends Record(defaultFileWindowModelRecord) {
  get id() {
    return this.get('id');
  }

  get files() {
    return this.get('files');
  }
}
