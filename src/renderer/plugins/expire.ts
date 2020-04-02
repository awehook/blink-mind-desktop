import { remote } from 'electron';
import { getI18nText } from '@blink-mind/renderer-react';
import { I18nTextKey } from '../../common';

export function ExpirePlugin() {
  const now = new Date();
  const expireDate = new Date(2020, 9, 30);
  const expire = now > expireDate;
  let totalNum = 0;
  return {
    operation(ctx, next) {
      if (expire) {
        totalNum++;
        remote.dialog.showMessageBox({
          message: getI18nText(ctx, I18nTextKey.NOT_IN_TEST_TIME_TITLE),
          detail: getI18nText(ctx, I18nTextKey.NOT_IN_TEST_TIME)
        });

        if (totalNum > 10) {
          return;
        }
      }

      next();
    }
  };
}
