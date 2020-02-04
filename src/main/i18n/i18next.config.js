import path from 'path';
// import i18n from '../../lib/i18next';
import i18n from 'i18next';
import i18nextNodeFsBackend from '../../lib/i18next-node-fs-backend';
import LanguageDetector from '../../lib/i18next-electron-language-detector';
import { getStoreItem } from '../store';
import { StoreItemKey } from '../../common';

import debug from 'debug';

const log = debug('main:i18n');

export function initI18n(callback) {
  const lng = getStoreItem(StoreItemKey.preferences.normal.language);
  const i18nextOptions = {
    backend: {
      loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.json'),
      jsonIndent: 2
    },
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
    lng,
    fallbackLng: 'en',
    // whiteList: ['en', 'zh-CN', 'zh-TW'],
    react: {
      wait: false
    },
    debug: process.env.I18N_DEBUG === 'true',
    initImmediate: true
  };
  // log('i18nextOptions', i18nextOptions);
  i18n.use(i18nextNodeFsBackend).use(LanguageDetector);
  if (!i18n.isInitialized) {
    i18n.init(i18nextOptions, callback);
  }
  return i18n;
}

export function getTranslation() {
  return i18n.getDataByLanguage(i18n.language).translation;
}



export { i18n };
