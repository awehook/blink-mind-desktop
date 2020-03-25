export const ProductName = "BlinkMind";

export const Version = '0.1.2';

export const ApiServerUrl = "http://localhost:8008/api/v1";

export const ApiRoute = {
  User: '/user',
  SignIn: '/user/signin',
  SignUp: '/user/signup',
  SignOut: 'user/signout',
  ForgotPassword: '/user/forgotpassword',
};

export const WebsiteUrl = "http://localhost:8080";

export const WebsiteRoute = {
  SignIn: '/user/signin',
  SignUp: '/user/signup',
  SignOut: 'user/signout',
  ForgotPassword: '/user/forgotpassword',
};

export const BlinkMindExtName = '.bmind';

export const BlinkMindExtNames = ['.bmind','.blinkmind'];

export const I18nAvailableLngs = ['en','zh-CN'];

export const StoreItemKey = {
  preferences: {
    normal: {
      appearance: 'preferences.normal.appearance',
      language: 'preferences.normal.language'
    }
  },
  recent: {
    openedDir: 'recent.openedDir'
  },

  user: {
    _: 'user',
    id: 'user.id',
    email: 'user.email',
    status: 'user.status',
    token: 'user.token'
  }
};
