import qs from 'qs'; // 使用qs将请求从参数转化为字符串

// eslint-disable-next-line no-unused-vars
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.data = qs.stringify(config.data, {
      allowDots: true, // Option allowDots can be used to enable dot notation
    });
    return config;
  });
  $axios.onResponse((response) => Promise.resolve(response.data));
  $axios.onError((error) => Promise.reject(error));
}
