import * as Sentry from '@sentry/electron';
import { Version } from '../../common/';
import { IsDev } from '../utils';
import getmac from 'getmac';
export const macaddr = getmac();

if (!IsDev) {
  Sentry.init({
    dsn: 'https://e5977ec99f2b45758878491d194687ed@sentry.io/4912125'
  });

  Sentry.configureScope(scope => {
    scope.setUser({ id: macaddr });
    scope.setExtra('version', Version);
    // scope.clear();
  });
}
