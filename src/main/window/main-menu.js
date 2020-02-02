import { changeLang, isMacOS } from '../utils';
import { ProductName, I18nTextKey } from '../../common';
import { Menu } from 'electron';
import { saveAs, save, openFile, undo, redo } from './menu-event-handler';

function getMenu(i18n, windowMgr) {
  const t = key => i18n.t(key);
  const productName = {
    label: ProductName,
    submenu: [
      {
        label: t(I18nTextKey.PREFERENCES),
        click() {}
      },
      {
        label: `About ${ProductName}`,
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        label: t(I18nTextKey.ENGLISH),
        click() {
          changeLang('en');
        }
      },
      {
        label: t(I18nTextKey.CHINESE_SIMPLIFIED),
        click() {
          changeLang('zh-CN');
        }
      }
    ]
  };

  const file = {
    label: t(I18nTextKey.FILE),
    submenu: [
      {
        label: t(I18nTextKey.NEW_FILE),
        click() {
          windowMgr.newFile();
        }
      },
      {
        label: t(I18nTextKey.OPEN_FILE),
        click() {
          openFile(windowMgr);
        }
      },
      {
        id: I18nTextKey.SAVE,
        label: t(I18nTextKey.SAVE),
        accelerator: 'CommandOrControl+S',
        click() {
          save(windowMgr);
        }
      },
      {
        id: I18nTextKey.SAVE_AS,
        label: t(I18nTextKey.SAVE_AS),
        accelerator: 'Shift+CommandOrControl+S',
        click() {
          saveAs(windowMgr);
        }
      }
    ]
  };

  const edit = {
    label: t(I18nTextKey.EDIT),
    submenu: [
      {
        label: t(I18nTextKey.UNDO),
        accelerator: 'CommandOrControl+Z',
        click() {
          undo();
        }
      },
      {
        label: t(I18nTextKey.REDO),
        accelerator: 'Shift+CommandOrControl+Z',
        click() {
          redo();
        }
      },
      { type: 'separator' },
      {
        label: t(I18nTextKey.COPY),
        role: 'copy'
      },
      {
        label: t(I18nTextKey.PASTE),
        role: 'paste'
      }
    ]
  };

  const view = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' }, // !! 这里加入打开调试工具, 如果你不希望打开请去掉这行
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

export function buildMenu(i18n, windowMgr) {
  Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu(i18n, windowMgr)));
}
