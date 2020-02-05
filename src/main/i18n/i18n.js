import en from './locales/en/translation';
import zhCN from './locales/zh-CN/translation';

import EventEmitter from 'events';
import {getStoreItem} from "../store";
import {StoreItemKey} from "../../common";

export class I18n extends EventEmitter {
  translations = {
    en: en,
    'zh-CN': zhCN
  };

  language;

  constructor(){
    super();
    this.language = getStoreItem(StoreItemKey.preferences.normal.language);
  }

  changeLanguage(lng) {
    this.language = lng;
    this.emit('languageChanged', {
      language: this.language,
      translation: this.getTranslation()
    });
  }

  t(key){
    return this.getTranslation()[key];
  }

  getTranslation(lng) {
    if (lng) return this.translations[lng];
    return this.translations[this.language];
  }
}

export const i18n = new I18n();
