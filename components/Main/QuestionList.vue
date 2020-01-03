<template>
  <div>
    <PrimaryQuestion v-if="filters.showPage==='2-1-1'" :subject="'语文'" :education="'小学'" :data="ctl.classifyData.One"></PrimaryQuestion>
    <PrimaryQuestion v-if="filters.showPage==='2-1-2'" :subject="'数学'" :education="'小学'" :data="ctl.classifyData.Two"></PrimaryQuestion>
    <PrimaryQuestion v-if="filters.showPage==='2-1-3'" :subject="'英语'" :education="'小学'" :data="ctl.classifyData.One"></PrimaryQuestion>
  </div>
</template>

<script>
import PrimaryQuestion from '~/components/Main/PrimaryQuestion.vue';
import questionClassify from '~/static/json/questionClassify.json';

export default {
  inject: ['filters'],
  components: {
    PrimaryQuestion,
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
