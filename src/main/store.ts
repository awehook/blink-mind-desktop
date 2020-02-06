import { app } from 'electron';
import { I18nAvailableLngs, StoreItemKey } from '../common';
import debug from 'debug';
const ElectronStore = require('electron-store');
const log = debug('main:store');

const store = new ElectronStore({
  schema: {
    preferences: {
      type: 'object',
      properties: {
        normal: {
          type: 'object',
          properties: {
            language: {
              type: 'string'
            },
            appearance: {
              type: 'string',
              default: 'light'
            }
          }
        }
      }
    },
    recent: {
      type: 'object',
      properties: {
        openedDir: {
          type: 'string',
          default: null
        }
      }
    }
  }
});

export function setStoreItem(key, value) {
  if (value == null) store.delete(key);
  else store.set(key, value);
}

export function getStoreItem(key, defaultValue = undefined) {
  return store.get(key, defaultValue);
}

export function initStore() {
  log('initStore');
  if (getStoreItem(StoreItemKey.preferences.normal.language) == null) {
    let lng = app.getLocale();
    if (!I18nAvailableLngs.includes(lng)) {
      lng = 'en';
    }
    setStoreItem(StoreItemKey.preferences.normal.language, lng);
  }
}
