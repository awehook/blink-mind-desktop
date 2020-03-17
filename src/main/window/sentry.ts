import * as Sentry from '@sentry/electron';
import getmac from 'getmac';
Sentry.init({dsn: 'https://e5977ec99f2b45758878491d194687ed@sentry.io/4912125'});

Sentry.configureScope(scope => {
  scope.setUser({ id: getmac() });
  // scope.clear();
});
