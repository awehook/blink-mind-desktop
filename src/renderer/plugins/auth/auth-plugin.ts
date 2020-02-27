import { remote } from 'electron';
import { OP_TYPE_ADD_IMAGE } from '../insert-images';
import { getI18nText, I18nKey } from '@blink-mind/renderer-react';
import { I18nTextKey } from '../../../common';

export function AuthPlugin() {
  return {
    canUseAdvance(ctx) {
      return false;
    },

    operation(ctx, next) {
      const { controller } = ctx;
      if (controller.run('canUseAdvance', ctx)) next();
      const { opType } = ctx;
      let stop = false;
      switch (opType) {
        case OP_TYPE_ADD_IMAGE:
          if (controller.run('getTotalTopicImageCount', ctx) > 5) {
            stop = true;
          }
          break;
        default:
          break;
      }
      stop ? controller.run('showFeatureLockTip', ctx) : next();
    },

    showFeatureLockTip(ctx) {
      const { opType } = ctx;
      let tipContent = getI18nText(ctx, I18nTextKey.FEATURE_LOCK_TIP2);
      switch (opType) {
        case OP_TYPE_ADD_IMAGE:
          tipContent =
            tipContent +
            getI18nText(ctx, I18nTextKey.FEATURE_ADD_IMAGE_LOCK_TIP);
          break;
        default:
          break;
      }

      remote.dialog
        .showMessageBox({
          message: getI18nText(ctx, I18nTextKey.FEATURE_LOCK_TIP1),
          detail: tipContent,
          cancelId: 1,
          buttons: [
            getI18nText(ctx, I18nTextKey.SUBSCRIBE),
            getI18nText(ctx, I18nKey.CANCEL)
          ]
        })
        .then(res => {
          console.log(res.response);
          if (res.response === 0) {
          }
        });
    }
  };
}
