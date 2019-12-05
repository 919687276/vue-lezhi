<template>
  <el-carousel :height="ctl.bannerHeight + 'px'">
    <el-carousel-item v-for="(item,index) in ctl.wrapperSrc" :key="index">
      <img :src="item" class="bannerImg">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      ctl: {
        bannerHeight: undefined,
        screenWidth: undefined,
        wrapperSrc: [
          'http://www.caibo919687276.cn/Upload/20191112/wrapperOne.jpg',
          'http://www.caibo919687276.cn/Upload/20191112/wrapperTwo.jpg',
          'http://www.caibo919687276.cn/Upload/20191112/wrapperThree.jpg',
          'http://www.caibo919687276.cn/Upload/20191112/wrapperFour.jpg',
          'http://www.caibo919687276.cn/Upload/20191112/wrapperFive.jpg',
        ],
      },
    };
  },
  mounted() {
    this.setSize();
    this.ctl.screenWidth = document.body.clientWidth;
    window.addEventListener('resize', () => {
      // eslint-disable-next-line no-undef
      this.ctl.screenWidth = document.body.clientWidth;
      this.setSize();
    }, false);
  },
  methods: {
    setSize() {
      this.$nextTick(() => {
        this.ctl.bannerHeight = 740 / 2200 * this.ctl.screenWidth;
        // if (this.bannerHeight > 740) this.bannerHeight = 740;
        // if (this.bannerHeight < 360) this.bannerHeight = 360;
      });
    },
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.bannerImg{
  /* width: 100%;
  height: inherit;
  min-height: 360px;
  min-width: 1400px; */
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: auto;
}
</style>
