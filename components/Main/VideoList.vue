<template>
  <div>
    <QualityVideo v-if="filters.showPage==='3-1-1'" :subject="'语文'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-2'" :subject="'数学'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-3'" :subject="'英语'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-4'" :subject="'科学'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-5'" :subject="'音乐'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-6'" :subject="'美术'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-1-7'" :subject="'劳技'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-1'" :subject="'语文'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-2'" :subject="'数学'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-3'" :subject="'英语'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-4'" :subject="'美术'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-5'" :subject="'音乐'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
    <QualityVideo v-if="filters.showPage==='3-2-6'" :subject="'历史与社会'" :education="'初中'" :data="ctl.classifyData.One"></QualityVideo>
  </div>
</template>

<script>
import QualityVideo from '~/components/Video/QualityVideo.vue';
import videoClassify from '~/static/json/videoClassify.json';

export default {
  inject: ['filters'],
  components: {
    QualityVideo,
  },
  data() {
    return {
      ctl: {
        classifyData: {},
      },
    };
  },
  created() {
    this.ctl.classifyData = videoClassify;
  },
};
</script>

<style>

</style>
