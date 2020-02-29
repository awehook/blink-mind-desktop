import { getStoreItem } from './store';
import { apiAgent, StoreItemKey } from '../common';
import { hostname } from 'os';
import getmac from 'getmac';
const log = require('debug')('main:subscribe');

type User = {
  id: string;
  email: string;
  status: number;
  token: string;
  subscriptionData: string;
};

// 如何确保订阅用户

class SubscribeMgr {
  user: User;
  constructor() {
    this.user = getStoreItem(StoreItemKey.user._);
    log('user', this.user);
    log('hostname', hostname());
    log('macaddr', getmac());
  }

  signIn({ email, password }) {
    const payload = {
      email,
      password,
      hostname: hostname(),
      macaddr: getmac()
    };

    apiAgent.device
      .signIn(payload)
      .then(res => {

      })
      .catch(err => {
        if (err.response) {

        }
      });
  }

  signOut() {
  }
}

export const subscribeMgr = new SubscribeMgr();
