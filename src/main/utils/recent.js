import { app } from 'electron';
import { getStoreItem, StoreItemKey } from '../store';

export function getRecentOpenedDir() {
  return (
    getStoreItem(StoreItemKey.recent.openedDir) || app.getPath('documents')
  );
}
