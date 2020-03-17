import { macaddr } from './preload';
import { Version } from '../../common/constants';

async function initMta() {
  const MtaH5 = require('mta-h5-analysis');
  MtaH5.init({
    sid: '500713631', //必填，统计用的appid
    cid: '500713655',
    autoReport: 0, //是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
    senseHash: 1, //hash锚点是否进入url统计
    senseQuery: 0, //url参数是否进入url统计
    performanceMonitor: 0, //是否开启性能监控
    ignoreParams: [] //开启url参数上报时，可忽略部分参数拼接上报
  });

  MtaH5.clickStat('start_app', {
    macaddr: macaddr,
    version: Version
  });
}

initMta();
