import { extname } from 'path';
import { ExtName, ExtNames, I18nTextKey } from '../../common';
import { i18n } from '../i18n';

export function regularBlinkPath(path) {
  if (ExtNames.indexOf(extname(path)) === -1) {
    path = path + ExtName;
  }
  return path;
}

export function getUntitledTile() {
  return i18n.t(I18nTextKey.untitled) + ExtName;
}

export function getFileTitle(path, edited) {
  path = path || getUntitledTile();
  return `${path}${edited ? ' -' + i18n.t(I18nTextKey.edited) : ''}`;
}
