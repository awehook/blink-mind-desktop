import path from 'path'
// import i18n from '../../lib/i18next';
import i18n from 'i18next';
import i18nextNodeFsBackend from '../../lib/i18next-node-fs-backend';
import LanguageDetector from '../../lib/i18next-electron-language-detector';

export function initI18n(callback) {
  const i18nextOptions = {
    backend: {
      loadPath: path.join(__dirname,'./locales/{{lng}}/{{ns}}.json'),
      jsonIndent: 2
    },
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
    fallbackLng: 'en',
    whiteList: ['en', 'zh-CN'],
    react: {
      wait: false
    },

    debug: process.env.I18N_DEBUG==='true',
    initImmediate: true
  };

  i18n.use(i18nextNodeFsBackend).use(LanguageDetector);
  if (!i18n.isInitialized) {
    i18n.init(i18nextOptions, callback);
  }
  return i18n;
}

export { i18n };
