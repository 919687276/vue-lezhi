<template>
  <div>
    <SelectedQuestions v-if="filters.showPage==='2-1-1'" :subject="'语文'" :education="'小学'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-2'" :subject="'数学'" :education="'小学'" :data="ctl.classifyData.Two"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-3'" :subject="'英语'" :education="'小学'" :data="ctl.classifyData.Three"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-4'" :subject="'科学'" :education="'小学'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-5'" :subject="'音乐'" :education="'小学'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-6'" :subject="'美术'" :education="'小学'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-1-7'" :subject="'劳技'" :education="'小学'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-1'" :subject="'语文'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-2'" :subject="'数学'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-3'" :subject="'英语'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-4'" :subject="'美术'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-5'" :subject="'音乐'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
    <SelectedQuestions v-if="filters.showPage==='2-2-6'" :subject="'历史与社会'" :education="'初中'" :data="ctl.classifyData.One"></SelectedQuestions>
  </div>
</template>

<script>
import SelectedQuestions from '~/components/Questions/SelectedQuestions.vue';
import questionClassify from '~/static/json/questionClassify.json';

export default {
  inject: ['filters'],
  components: {
    SelectedQuestions,
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
