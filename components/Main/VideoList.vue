<template>
  <div>
    <QualityVideo v-if="filters.showPage==='3-1-1'" :subject="'语文'" :education="'小学'" :data="ctl.classifyData.One"></QualityVideo>
  </div>
</template>

<script>
import QualityVideo from '~/components/Main/QualityVideo.vue';
import questionClassify from '~/static/json/questionClassify.json';

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
    this.ctl.classifyData = questionClassify;
  },
};
</script>

<style>

</style>
