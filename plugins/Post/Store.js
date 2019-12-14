import axios from 'axios';
import PromiseState from './PromiseState';


const API = axios.create({
  // baseURL: 'http://www.caibo919687276.cn',
  baseURL: 'http://123.206.89.141:3000',
  timeout: 15 * 60 * 1000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // withCredentials: true,
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
            // data.__action = path;
            // post = API.post(path, JSON.stringify(data));
            // post = API.post(path, encodeURIComponent(JSON.stringify(data)));
            post = API.post(path, data);
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
            resolve(store);
            this.$emit(`ajax:${store.u}`, store);
          })
          .catch((d) => {
            console.log('catch');
            store.f = new Date();
            store.o = false;
            store.m = '服务调用异常';
            store.d = d;
            this.$message({
              message: store.m,
              type: 'error',
            });
            reject(store);
            this.$emit(`ajax:${store.u}`, store);
          });
      });
    },
  },
};
