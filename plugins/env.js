// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

if (process.client) {
  const {
    config,
  } = window;
  // 在这里描述全局数据
  const env = {
    config, // 写到全局区为了方便界面展示和修改
    dev: config.env !== 'prod', // 没设置 prod=true 一律认为是开发模式
    prod: config.env === 'prod',
    envType: config.env, // 当前配置环境
    session: {
    },
    selected: {
    },
    ctl: {
    },
  };
  export {
    env,
  };
}


Vue.mixin({
  computed: {
    env() {
      return this.$root.$data;
    },
  },
});

export default ({
  app,
}) => {
  // console.log(app, inject);
  // 可以在这里面设计全部全局的数据结构
  // 各个组件使用 this.$root.prop 引用
  app.data = () => env; // eslint-disable-line no-param-reassign
};


