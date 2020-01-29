export function setFileModel(filesWindowModel, { id, docModel, isSave = false }) {
  const index = filesWindowModel.files.findIndex(v => v.id === id);
  filesWindowModel = filesWindowModel.updateIn(['files', index], fileModel => {
    fileModel = fileModel.set('docModel', docModel);
    if (isSave) fileModel = fileModel.set('savedModel', docModel);
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
