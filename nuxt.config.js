
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
  ],
  router: {
    base: '/lz/',
    mode: 'hash',
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/Totop.js', ssr: true },
    { src: '~plugins/axios.js', ssr: true },
    { src: '~plugins/ElementUi.js', ssr: true },
    { src: '~plugins/Post', ssr: true },
    { src: '~plugins/ImgInputer.js', ssr: true },
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
      // require('postcss-px2rem')({
      //   remUnit: 35,
      // }),
    ],
  },
};
