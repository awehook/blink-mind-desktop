import { Record, List } from 'immutable';

const defaultFileWindowModelRecord = {
  id: null,
  files: List()
};

export class FilesWindowModel extends Record(defaultFileWindowModelRecord) {
  get id() {
    return this.get('id');
  }

  get files() {
    return this.get('files');
  }

  getFile(id) {
    return this.files.find(f => f.id === id);
  }

  getUnsavedFiles() {
    return this.files.filter(f => f.isUnsaved);
  }
}
