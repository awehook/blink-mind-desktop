import { getFontList } from '../utils';

export function FontPlugin() {
  return {
    getFontList(ctx) {
      return getFontList();
    }
  };
}
