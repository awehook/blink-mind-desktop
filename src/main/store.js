const ElectronStore = require('electron-store');
const store = new ElectronStore({
  schema: {
    preferences: {
      type: 'object',
      properties: {
        normal: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              default: ''
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

export const StoreItemKey = {
  preferences: {
    normal: {
      language: 'preferences.normal.language'
    }
  },
  recent: {
    openedDir: 'recent.openedDir'
  }
};

export function setStoreItem(key, value) {
  store.set(key, value);
}

export function getStoreItem(key, defaultValue = null) {
  console.log('getStoreItem',key);
  return store.get(key, defaultValue);
}

export function initStore() {
  console.log('StoreItemKey.preferences.normal.language:');
}


