import * as Sentry from '@sentry/electron';
import { Version } from '../../common/constants';
import getmac from 'getmac';

Sentry.init({
  dsn: 'https://e5977ec99f2b45758878491d194687ed@sentry.io/4912125'
});

export const macaddr = getmac();

Sentry.configureScope(scope => {
  scope.setUser({ id: macaddr });
  scope.setExtra('version', Version);
  // scope.clear();
});
