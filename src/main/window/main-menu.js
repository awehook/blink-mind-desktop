import { isMacOS } from '../utils';
import { ProductName, I18nTextKey } from '../../common';
import { Menu } from 'electron';

function getMenu(i18n) {
  const t = key => i18n.t(key);
  const productName = {
    label: ProductName,
    submenu: [
      {
        label: t(I18nTextKey.preferences),
        click() {}
      },
      {
        label: `About ${ProductName}`,
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const file = {
    label: t(I18nTextKey.file),
    submenu: [
      {
        label: t(I18nTextKey.newFile)
      },
      {
        label: t(I18nTextKey.save),
        accelerator: 'CommandOrControl+S',
        click() {}
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
        label: 'About BlinkMind',
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const menu = isMacOS
    ? [productName, file, edit, view, help]
    : [file, edit, view, help];
  return menu;
}

export function buildMenu(i18n) {
  Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu(i18n)));
}
