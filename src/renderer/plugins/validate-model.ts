export function ValidateModelPlugin() {
  return {
    validateModel(ctx) {
      let { docModel, controller } = ctx;
      const sheetModels = docModel.sheetModels;
      sheetModels.forEach((sheetModel, idx) => {
        if (!sheetModel.topics.has(sheetModel.focusKey)) {
          controller.run('captureError', {
            error: new Error('sheet model focus key invalid')
          });
          docModel = docModel.setIn(
            ['sheetModels', idx, 'focusKey'],
            sheetModel.editorRootTopicKey
          );
        }
      });
      return docModel;
    }
  };
}
