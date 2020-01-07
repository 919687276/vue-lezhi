<template>
  <div v-if="filters.showPage==='1'">
    <Swiper></Swiper>
    <CourseIntroduction></CourseIntroduction>
    <SpecialTopic></SpecialTopic>
    <HotResources></HotResources>
  </div>
</template>

<script>
import Swiper from '~/components/Index/Swiper.vue';
import CourseIntroduction from '~/components/Index/CourseIntroduction.vue';
import SpecialTopic from '~/components/Index/SpecialTopic.vue';
import HotResources from '~/components/Index/HotResources.vue';

export default {
  inject: ['filters'],
  components: {
    Swiper,
    CourseIntroduction,
    SpecialTopic,
    HotResources,
  },
};
</script>

<style>

</style>
