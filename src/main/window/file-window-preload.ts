import './preload';
import { isMacOS, isWindows, FeatureSwitch } from '../utils';

window.addEventListener('DOMContentLoaded', event => {
  if (isWindows && FeatureSwitch.isUseCustomTitleBar()) {
    console.log('titlebar');
    const customTitlebar = require('../custom-electron-titlebar');
    new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#fff'),
      menuPosition: 'right'
    });

    document.body.classList.add('bmd-windows');
  }
  if (isMacOS) {
    document.body.classList.add('bmd-mac');
  }
});
