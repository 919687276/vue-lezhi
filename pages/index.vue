<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">noc</h1>
      <h2 class="subtitle">My peachy Nuxt.js project</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <input type="button" @click="axiostest()" value="axios" />
        <input type="button" @click="asyncData1()" value="async" />
        <input type="button" @click="test()" value="测试" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      rs: this.newStore(),
    };
  },
  methods: {
    async asyncData1() {
      const [res] = await Promise.all([
        axios.get('/api/index.php/admin/index/welcome'),
      ]);
      console.log(res);
    },
    axiostest() {
      this.$axios
        .get('/api/index.php/admin/index/welcome')
        .then((response) => {
          this.rs.d = response;
          console.log(this.rs);
        })
        .catch((error) => {
          alert(error);
        });
    },
    test() {
      this.spost(this.rs, '/index.php/Admin/Test/index', {
        index: '123',
      }).then((rs) => {
        console.log(rs);
      }).catch(() => {
        // alert('err');
        console.log(this.rs);
      });
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
