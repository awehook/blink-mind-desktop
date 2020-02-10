import en from './locales/en/translation.json';
import zhCN from './locales/zh-CN/translation.json';

import { EventEmitter } from 'events';
import { getStoreItem } from '../store';
import { StoreItemKey } from '../../common';
import debug from 'debug';

const log = debug('main:i18n');

export class I18n extends EventEmitter {
  translations = {
    en: en,
    'zh-CN': zhCN
  };

  language;

  constructor() {
    super();
    log('constructor:', this.language);
  }

  init() {
    log('init');
    this.language = getStoreItem(StoreItemKey.preferences.normal.language);
  }

  changeLanguage(lng) {
    this.language = lng;
    this.emit('languageChanged', {
      language: this.language,
      translation: this.getTranslation()
    });
  }

  t(key) {
    return this.getTranslation()[key];
  }

  getTranslation(lng?) {
    if (lng) return this.translations[lng];
    return this.translations[this.language];
  }
}

export const i18n = new I18n();
