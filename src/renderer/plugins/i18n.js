import { i18nMap } from '../context';

export function I18nPlugin() {
  return {
    getI18nText(ctx) {
      const { key } = ctx;
      return i18nMap[key];
    }
  };
}
