import { app, remote } from 'electron';

export default {
  'init' : Function.prototype,
  'type' : 'languageDetector',
  'detect' : () => (app || remote.app).getLocale(),
  'cacheUserLanguage' : Function.prototype
};
