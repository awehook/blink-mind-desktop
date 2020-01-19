import { ipcRenderer, remote } from 'electron';
import { IpcChannelName, I18nTextKey } from '../../common';

export function getFileContent({ path }) {
  return ipcRenderer.sendSync(IpcChannelName.RM_GET_FILE_CONTENT, {
    path
  });
}

export function newFile() {
  ipcRenderer.send(IpcChannelName.RM_NEW_FILE);
}

export function openFile() {
  ipcRenderer.send(IpcChannelName.RM_OPEN_FILE);
}

export function saveFile({ id, path, content }) {
  ipcRenderer.send(IpcChannelName.RM_SAVE, { id, path, content });
}

export function saveFileWithFileModel(fileModel, t) {
  const dialog = remote.dialog;
  let res = dialog.showMessageBoxSync(remote.getCurrentWindow(), {
    type: 'question',
    title: t(I18nTextKey.saveTipTitle),
    message: t(I18nTextKey.saveTipContent),
    buttons: [
      t(I18nTextKey.save),
      t(I18nTextKey.cancel),
      t(I18nTextKey.dontSave)
    ]
  });

  switch (res) {
    case 0:
      const path = fileModel.path;
      const id = fileModel.id;
      const content = fileModel.getContent();
      return ipcRenderer.sendSync(IpcChannelName.RM_SAVE_SYNC, {
        id,
        path,
        content
      });
    case 1:
      return 'cancel';
    case 2:
      return 'dontSave';
    default:
      break;
  }
}
