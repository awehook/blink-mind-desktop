import { ipcMain } from 'electron';
import { IpcChannelName } from '../../common';
import { i18n } from '../i18n';
import { mainWindow } from '../window';

ipcMain.on(IpcChannelName.GET_INITIAL_TRANSLATIONS, (event, arg) => {
  const lng = 'en';
  i18n.loadLanguages(lng, (err, t) => {
    const initial = {
      [lng]: {
        translation: i18n.getResourceBundle(lng, 'translation')
      }
    };
    event.returnValue = initial;
  });
});

ipcMain.on(IpcChannelName.GET_I18N, (event, arg) => {
  event.returnValue = i18n.getDataByLanguage(i18n.language).translation;
});

ipcMain.on(IpcChannelName.I18N_CHANGE_LANG, (event, lang) => {
  i18n.changeLanguage(lang);
});
