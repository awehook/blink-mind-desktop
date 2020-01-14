const ElectronStore = require('electron-store');
let store = new ElectronStore();

export function setUserDefault(key, value) {
  store.set(key, value);
}

export function getUserDefault(key, defaultValue = null) {
  return store.get(key, defaultValue);
}

export const userDefault = {
  mainWindowWidth: 800,
  mainWindowHeight: 600,
  fileWindowWidth: 800,
  fileWindowHeight: 600
};

export function initUserDefault() {
  for (let key in userDefault) {
    let value = store.get(key);
    if (value) userDefault[key] = value;
  }

  console.log(userDefault);
}
