import { Record, List } from 'immutable';
import { FileModel } from './file-model';

type FilesWindowModelRecordType = {
  id: string;
  activeFileId: string;
  files: List<FileModel>;
};

const defaultFileWindowModelRecord: FilesWindowModelRecordType = {
  id: null,
  activeFileId: null,
  files: List()
};

export class FilesWindowModel extends Record(defaultFileWindowModelRecord) {
  get id(): string {
    return this.get('id');
  }

  get activeFileId(): string {
    return this.get('activeFileId');
  }

  get files(): List<FileModel> {
    return this.get('files');
  }

  getFile(id): FileModel {
    return this.files.find(f => f.id === id);
  }

  getUnsavedFiles(): List<FileModel> {
    return this.files.filter(f => f.isUnsaved);
  }

  getActiveFile(): FileModel {
    return this.getFile(this.activeFileId);
  }
}
