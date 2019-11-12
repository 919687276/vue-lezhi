<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <el-button @click="test()">测试</el-button>
      Main
    </el-main>
    <el-footer>
      <Upload></Upload>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Header.vue';
import Upload from '~/components/Upload.vue';

export default {
  components: {
    Header,
    Upload,
  },
  data() {
    return {
      filters: {
        loggedIn: false,
        user: undefined,
      },
      rs: this.newStore(),
    };
  },
  provide() {
    return {
      filters: this.filters,
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
      this.mypost(this.rs, '/index.php/Admin/Test/index', {
        index: '111122223333',
        test: '1234',
      }).then(() => {
        alert('ok');
      }).catch((rs) => {
        console.log(rs);
        alert('err');
        // console.log(this.rs);
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
