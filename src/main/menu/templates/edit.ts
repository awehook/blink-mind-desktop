import { MenuItemConstructorOptions } from 'electron';
import { KeyBindings } from '../../key-bindings';
import { I18n } from '../../i18n';
import { I18nTextKey, IpcType } from '../../../common';
import * as handler from '../handlers/edit';

export function editMenu(
  keybindings: KeyBindings,
  i18n: I18n
): MenuItemConstructorOptions {
  const t = key => i18n.t(key);
  return {
    label: t(I18nTextKey.EDIT),
    submenu: [
      {
        label: t(I18nTextKey.UNDO),
        accelerator: 'CmdOrCtrl+Z',
        click(menu, win) {
          handler.edit(win, {
            type: IpcType.MR_UNDO
          });
        }
      },
      {
        label: t(I18nTextKey.REDO),
        accelerator: 'CmdOrCtrl+Shift+Z',
        click(menu, win) {
          handler.edit(win, {
            type: IpcType.MR_REDO
          });
        }
      }
    ]
  };
}
