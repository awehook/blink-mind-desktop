import axios from 'axios';
import { ApiServerUrl } from './constants';

const instance = axios.create({
  baseURL: ApiServerUrl,
  timeout: 10000
});

export const apiAgent = {
  user: {
    async signUp(user: any) {
      return await instance.post('/user/signup', user);
    },

    async signIn(user: any) {
      return await instance.post('/user/signin', user);
    },

    async signOut(payload: any) {
      return await instance.post('/user/signout', payload);
    },

    async get() {
      return await instance.get('/user');
    }
  },

  device: {
    async signIn(user: any) {
      return await instance.post('/device/signin', user);
    }
  },

  utils: {
    async getCaptcha(user: any) {
      return await instance.post('/get_captcha', user);
    }
  }
};

export function setApiAgentToken(token) {
  instance.defaults.headers['authorization'] = `Token ${token}`;
}
