import axios from 'axios';
import PromiseState from './PromiseState';

const API = axios.create({
  baseURL: 'http://www.noc.com',
  timeout: 15 * 60 * 1000,
});
const Config = {
  APIFormat: 'h5proxy',
};
const debug = require('debug')('ajax');

export default {
  methods: {
    newStore() {
      return new PromiseState();
    },
    spost(store, path, data) {
      debug('path=%s', path);
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        store.b = new Date();
        store.t = 'ajax';
        store.u = path;
        store.r = data;
        store.o = false;
        store.m = '';
        store.d = {};
        store.s += 1;
        // eslint-disable-next-line prefer-object-spread
        data = Object.assign({}, data) || {};
        let post;
        switch (Config.APIFormat) {
          case 'h5proxy':
            data.__action = path;
            post = API.post(path, `data=${encodeURIComponent(JSON.stringify(data))}`);
            break;
          default:
            return;
        }
        post
          .then((res) => {
            const d = res.data;
            store.f = new Date();
            store.d = d || {};
            store.o = true;
            store.m = '服务调用成功';
            reject(store);
          })
          .catch((d) => {
            store.f = new Date();
            store.o = false;
            store.m = '服务调用异常';
            store.d = d;
            this.$message({
              message: store.m,
              type: 'error',
            });
            reject(store);
          });
      });
    },
  },
};
