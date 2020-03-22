import * as Sentry from '@sentry/electron';
import { isDev } from '../utils';
export function BugCollectPlugin() {
  return {
    captureError(ctx) {
      const { error } = ctx;
      if (isDev) console.log(error);
      else Sentry.captureException(error);
    }
  };
}
