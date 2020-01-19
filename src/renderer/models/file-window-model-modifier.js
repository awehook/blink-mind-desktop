export function setFileModel(filesWindowModel, { id, model, isSave = false }) {
  const index = filesWindowModel.files.findIndex(v => v.id === id);
  filesWindowModel = filesWindowModel.updateIn(['files', index], fileModel => {
    fileModel = fileModel.set('model', model);
    if (isSave) fileModel = fileModel.set('savedModel', model);
    return fileModel;
  });
  return filesWindowModel;
}

export function setFilePath(filesWindowModel, { id, path }) {
  const index = filesWindowModel.files.findIndex(v => v.id === id);
  filesWindowModel = filesWindowModel.updateIn(['files', index], fileModel =>
    fileModel.set('path', path)
  );
  return filesWindowModel;
}
