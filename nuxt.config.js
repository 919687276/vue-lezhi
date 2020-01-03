
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: './js/flexible.js', type: 'text/javascript', charset: 'utf-8' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'viewerjs/dist/viewer.css',
  ],
  router: {
    // base: '/lz/',
    mode: 'history',
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~plugins/env.js', ssr: true }, // env全局变量
    { src: '~plugins/Totop.js', ssr: true }, // 返回顶部插件
    { src: '~plugins/axios.js', ssr: true }, // 原生axios方法
    { src: '~plugins/ElementUi.js', ssr: true }, // Element UI
    { src: '~plugins/Post', ssr: true },
    { src: '~plugins/ImgInputer.js', ssr: true }, // 图片上传组件
    { src: '~plugins/viewer.js', ssr: true }, // 图片查看插件
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // 请求代理配置，解决跨域
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  proxy: [
    [
      '/api/', // 拦截目录
      {
        target: 'http://www.caibo919687276.cn', // 代理api主机
        changeOrigin: true,
        pathRewrite: { '^/api/': '' },
      },
    ],
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {
    },
    postcss: [
      // eslint-disable-next-line global-require
      require('postcss-px2rem')({
        remUnit: 35,
      }),
    ],
    // postcss: {
    //   'postcss-px2rem': {
    //     remUnit: 100,
    //   },
    // },
  },
};
