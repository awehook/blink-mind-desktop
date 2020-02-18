import { getFileTitle } from '../utils';

let id = 0;

export class FileData {
  id: number;
  path: string;
  edited: boolean;
  themeKey: string;
  constructor({ path, edited, themeKey }) {
    this.id = ++id;
    this.path = path;
    this.edited = edited;
    this.themeKey = themeKey;
  }

  getTitle = () => {
    return getFileTitle(this.path, this.edited);
  };
}

export class WindowData {
  files: FileData[];
  focusFileId: number;

  constructor(files, focusFileId) {
    this.files = files;
    this.focusFileId = focusFileId;
  }

  getFileIndex = ({ id = null, path = null }) => {
    if (id) {
      return this.files.findIndex(f => f.id === id);
    }
    if (path) {
      return this.files.findIndex(f => f.path === path);
    }
  };

  getFocusFile = () => {
    return this.files.find(f => f.id === this.focusFileId);
  };

  setFocusFileEdited = edited => {
    this.getFocusFile().edited = edited;
  };

  setFocusFileId = id => {
    this.focusFileId = id;
  };

  setPath = (id, path) => {
    const idx = this.getFileIndex({ id });
    this.files[idx].path = path;
  };

  saveAs = newPath => {
    this.setPath(this.focusFileId, newPath);
  };

  pushFile = path => {
    const fileData = new FileData(path);
    this.files.push(fileData);
  };
}
