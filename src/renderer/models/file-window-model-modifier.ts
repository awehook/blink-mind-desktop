import { FilesWindowModel } from './files-window-model';

export function setFileModel(
  filesWindowModel: FilesWindowModel,
  { id, docModel, isSave = false }
): FilesWindowModel {
  const index = filesWindowModel.files.findIndex(v => v.id === id);
  filesWindowModel = filesWindowModel.updateIn(['files', index], fileModel => {
    fileModel = fileModel.set('docModel', docModel);
    if (isSave) fileModel = fileModel.set('savedModel', docModel);
    return fileModel;
  });
  return filesWindowModel;
}

export function setFilePath(
  filesWindowModel: FilesWindowModel,
  { id, path }
): FilesWindowModel {
  const index = filesWindowModel.files.findIndex(v => v.id === id);
  filesWindowModel = filesWindowModel.updateIn(['files', index], fileModel =>
    fileModel.set('path', path)
  );
  return filesWindowModel;
}
