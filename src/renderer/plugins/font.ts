import { getFontList } from '../utils';

export function FontPlugin() {
  let fontList;
  return {
    getFontList(ctx) {
      if (!fontList) {
        fontList = getFontList();
      }
      return fontList;
    }
  };
}
