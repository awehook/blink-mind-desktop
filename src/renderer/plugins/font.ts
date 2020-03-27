import { getFontList } from '../utils';
let fontList;
getFontList().then(res => {
  fontList = res;
});

export function FontPlugin() {
  return {
    getFontList(ctx) {
      return fontList;
    }
  };
}
