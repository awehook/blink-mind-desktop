import './preload';
import { isMacOS, isWindows } from '../utils';

window.addEventListener('DOMContentLoaded', event => {
  if (isWindows) {
    console.log('titlebar');
    const customTitlebar = require('custom-electron-titlebar');
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
