export function setFileModel(fileWindowModel, { id, model }) {
  const index = fileWindowModel.files.findIndex(v => v.id === id);
  fileWindowModel = fileWindowModel.updateIn(['files', index], fileModel =>
    fileModel.set('model', model)
  );
  return fileWindowModel;
}
