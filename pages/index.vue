<template>
  <el-container style="min-width:1000px;">
    <el-header height="auto">
      <Header></Header>
    </el-header>
    <el-main style="padding:0px;">
      <IndexPage></IndexPage>
      <QuestionList></QuestionList>
      <VideoList></VideoList>
      <TeacherPage v-if="ctl.filters.showPage==='4'"></TeacherPage>
      <About v-if="ctl.filters.showPage==='5'"></About>
    </el-main>
    <el-footer style="padding:0px;height:auto;background-color: #F5F5F5;">
      <Footer></Footer>
    </el-footer>
    <vueToTop color="#2097F3" :top="200" :type="3" :size="35"></vueToTop>
  </el-container>
</template>

<script>
// import axios from 'axios';
// import moment from 'moment';
import Header from '~/components/Common/Header.vue';
import IndexPage from '~/components/Main/IndexPage.vue';
import Footer from '~/components/Common/Footer.vue';
import QuestionList from '~/components/Main/QuestionList.vue';
import VideoList from '~/components/Main/VideoList.vue';
import TeacherPage from '~/components/Main/TeacherPage.vue';
import About from '~/components/Main/About.vue';

export default {
  components: {
    Header,
    IndexPage,
    Footer,
    QuestionList,
    VideoList,
    TeacherPage,
    About,
  },
  data() {
    return {
      ctl: {
        session: {
          login: false,
          user: undefined,
        },
        filters: {
          showPage: '1',
          model: ['不限', '不限', '不限', '不限'],
        },
      },
      ts: {
        addDays: this.newStore(),
        record: this.newStore(),
      },
    };
  },
  created() {
    this.updateVisitRecord();
  },
  provide() {
    return {
      filters: this.ctl.filters,
      session: this.ctl.session,
    };
  },
  methods: {
    async updateVisitRecord() {
      await this.spost(this.ts.addDays, '/About/methods/addVisitDays', {});
      await this.spost(this.ts.record, '/About/methods/updateAccessUser', {});
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
.el-header {
  padding: 0 0px 0 20px;
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
.minwidth{
  min-width:1000px;
}
.headerHeight{
  height:60px;
}
</style>
