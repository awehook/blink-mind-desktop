import debug from 'debug';
import { app } from 'electron';
import { I18nAvailableLngs, StoreItemKey } from '../common';
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
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        email: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
        status: {
          type: 'number',
        },

      }
    }
  },
  encryptionKey: 'ipcRenderer.send(IpcChannelName.RM_SET_STORE_ITEM',
  name: 'blink-mind',
  fileExtension: 'log',
});

export function setStoreItem(key, value) {
  log('setStoreItem', key, value);
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
