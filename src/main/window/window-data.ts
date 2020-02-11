import { getFileTitle } from '../utils';

let id = 0;

export function FileData({ path, themeKey }) {
  this.id = ++id;
  this.path = path;
  this.themeKey = themeKey;
}

export function WindowData(files, focusFileId) {
  this.files = files;
  this.focusFileId = focusFileId;

  this.getFileIndex = ({ id, path }) => {
    if (id) {
      return this.files.findIndex(f => f.id === id);
    }
    if (path) {
      return this.files.findIndex(f => f.path === path);
    }
  };

  this.getFocusFile = () => {
    return this.files.find(f => f.id === this.focusFileId);
  };

  this.getFocusFileTitle = edited => {
    const focusFile = this.getFocusFile();
    return getFileTitle(focusFile.path, edited);
  };

  this.setFocusFileId = id => {
    this.focusFileId = id;
  };

  this.setPath = (id, path) => {
    const idx = this.getFileIndex({ id });
    this.files[idx].path = path;
  };

  this.saveAs = newPath => {
    this.setPath(this.focusFileId, newPath);
  };

  this.pushFile = path => {
    const fileData = new FileData(path);
    this.files.push(fileData);
  };
}
