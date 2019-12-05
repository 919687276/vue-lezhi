<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main style="padding:0px;">
      <Swiper></Swiper>
      <CourseIntroduction></CourseIntroduction>
      <SpecialTopic></SpecialTopic>
    </el-main>
    <el-footer>
      Footer
    </el-footer>
    <vueToTop color="#2097F3" :top="200" :type="3" :size="35"></vueToTop>
  </el-container>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Index/Top/Header.vue';
import Swiper from '~/components/Index/Main/Swiper.vue';
import CourseIntroduction from '~/components/Index/Main/CourseIntroduction.vue';
import SpecialTopic from '~/components/Index/Main/SpecialTopic.vue';


export default {
  components: {
    Header,
    Swiper,
    CourseIntroduction,
    SpecialTopic,
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
  },
};
</script>

<style scoped>
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
