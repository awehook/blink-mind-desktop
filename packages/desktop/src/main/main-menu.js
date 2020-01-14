import { mainWindow } from './main-window';
import { isMacOS } from './utils';
import { ProductName } from '../common';

const awesome = {
  label: ProductName,
  submenu: [
    {
      label: 'Preferences',
      click() {}
    },
    {
      label: `About ${ProductName}`,
      selector: 'orderFrontStandardAboutPanel:'
    }
  ]
};

const file = {
  label: 'File',
  submenu: [
    {
      label: 'Save',
      accelerator: 'CommandOrControl+S',
      click() {
        console.log('onClick Save');
        mainWindow.webContents.send('file:save');
      }
    }
  ]
};

const edit = {
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'pasteandmatchstyle' }
    // {role: 'delete'},
    // {role: 'selectall'}
  ]
};

const view = {
  label: 'View',
  submenu: [
    { role: 'reload' },
    { role: 'forcereload' },
    { role: 'toggledevtools' }, // !! 这里加入打开调试工具, 如果你不希望打开请去掉这行
    { type: 'separator' },
    { role: 'resetzoom' },
    { role: 'zoomin' },
    { role: 'zoomout' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
};

const help = {
  label: 'Help',
  role: 'help',
  submenu: [
    {
      label: 'About AwesomeOutliner',
      selector: 'orderFrontStandardAboutPanel:'
    }
  ]
};

const menu = isMacOS
  ? [awesome, file, edit, view, help]
  : [file, edit, view, help];

export { menu };
