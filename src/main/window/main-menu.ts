import { Menu, shell } from 'electron';
import {
  I18nTextKey,
  ProductName
} from '../../common';
import { isMacOS, isWindows, IsDev } from '../utils';
import { openFile, redo, save, saveAs, undo } from './menu-event-handler';

const log = require('debug')('bmd:menu');

function getMenu(i18n, windowMgr) {
  const t = key => i18n.t(key);
  const preferencesMenu = {
    label: t(I18nTextKey.PREFERENCES),
    role: 'preferences',
    click() {
      windowMgr.showPreferencesWindow();
    }
  };
  const productName = {
    label: ProductName,
    submenu: [
      preferencesMenu,
      {
        label: `About ${ProductName}`,
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const file = {
    label: t(I18nTextKey.FILE),
    submenu: [
      {
        label: t(I18nTextKey.NEW_FILE),
        click() {
          windowMgr.showWelcomeWindow();
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
        accelerator: 'CmdOrCtrl+S',
        click() {
          console.log('save');
          save(windowMgr);
        }
      },
      {
        id: I18nTextKey.SAVE_AS,
        label: t(I18nTextKey.SAVE_AS),
        accelerator: 'CmdOrCtrl+Shift+S',
        click() {
          console.log('save as');
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
        accelerator: 'CmdOrCtrl+Z',
        click() {
          undo();
        }
      },
      {
        label: t(I18nTextKey.REDO),
        accelerator: 'CmdOrCtrl+Shift+Z',
        click() {
          redo();
        }
      },
      { type: 'separator' },
      {
        label: t(I18nTextKey.SELECT_ALL),
        role: 'selectAll'
      },
      {
        label: t(I18nTextKey.COPY),
        role: 'copy'
      },
      {
        label: t(I18nTextKey.CUT),
        role: 'cut'
      },
      {
        label: t(I18nTextKey.PASTE),
        // role: 'paste as plaintext',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: t(I18nTextKey.PASTE_AS_PLAIN_TEXT),
        // role: 'paste as plaintext',
        accelerator: 'CmdOrCtrl+Shift+V',
        role: 'pasteAndMatchStyle',
      }
    ]
  };
  //@ts-ignore
  isWindows && edit.submenu.push(preferencesMenu);

  const view = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },

      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  };
  const envDevTools = parseInt(process.env.DEV_TOOLS, 10) === 1;
  if (IsDev) {
    view.submenu.push({ role: 'toggledevtools' });
  }



  const help = {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Website',
        click() {
          shell.openExternal('https://github.com/awehook/blink-mind-package');
        }
      },
      {
        label: 'Watch BlinkMindDesktop for update info',
        click() {
          shell.openExternal('https://github.com/awehook/blink-mind-package');
        }
      },
      {
        label: 'Follow @awehook on Github',
        click() {
          shell.openExternal('https://github.com/awehook');
        }
      }
    ]
  };

  const menu = isMacOS
    ? [
        productName,
        file,
        edit,
        view,
        help
      ]
    : [
        file,
        edit,
        view,
        help
      ];
  return menu;
}

export function buildMenu(i18n, windowMgr) {
  //@ts-ignore
  const menu = Menu.buildFromTemplate(getMenu(i18n, windowMgr));
  Menu.setApplicationMenu(menu);
  if (isWindows) {
    windowMgr.welcomeWindow && windowMgr.welcomeWindow.setMenu(null);
    windowMgr.preferenceWindow && windowMgr.preferenceWindow.setMenu(null);
  }
}
