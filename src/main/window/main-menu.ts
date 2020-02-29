import { Menu } from 'electron';
import { I18nTextKey, ProductName } from '../../common';
import { isMacOS, isWindows } from '../utils';
import { openFile, redo, save, saveAs, undo } from './menu-event-handler';
import { subscribeMgr } from '../subscribe';

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
        label: t(I18nTextKey.SELECT_ALL),
        role: 'selectAll'
      },
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
  //@ts-ignore
  isWindows && edit.submenu.push(preferencesMenu);

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

  const account = {
    label: 'account',
    submenu: []
  };
  const { user } = subscribeMgr;
  user
    ? account.submenu.push(
        {
          labal: user.email,
          click() {}
        },
        {
          labal: 'Sign Out',
          click() {}
        }
      )
    : account.submenu.push({
        label: 'Sign In',
        click() {
          windowMgr.showSignInWindow();
        }
      });

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
    ? [productName, file, edit, view, account, help]
    : [file, edit, view, account, help];
  // console.log(JSON.stringify(menu,null,2));
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
