import { app } from 'electron';
import { StoreItemKey } from '../../common';
import { getStoreItem } from '../store';

export function getRecentOpenedDir() {
  return (
    getStoreItem(StoreItemKey.recent.openedDir) || app.getPath('documents')
  );
}
