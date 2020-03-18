import './preload';
import { isWindows } from '../utils';

if(isWindows) {
  window.addEventListener('DOMContentLoaded', event => {
    console.log('titlebar');
    const customTitlebar = require('custom-electron-titlebar');
    new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#fff'),
      menuPosition: 'right'
    });

    document.body.classList.add('bmd-windows');
  });
}

