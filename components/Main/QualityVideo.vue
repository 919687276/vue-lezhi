<template>
  <div>
    <el-dialog
      :title="ctl.title"
      :visible.sync="ctl.dialogVisible">
      <video-player v-if="ctl.dialogVisible" class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions">
      </video-player>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ctl.dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="headerBreadCrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>优质视频</el-breadcrumb-item>
        <el-breadcrumb-item>{{education}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{subject}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="classifyBox">
      <div class="classifyGrid">
        <div v-for="(item,index) in data" :key="index" class="gridItem">
          {{item.name}}：
          <el-radio-group v-model="filters.model[index]" size="medium">
            <el-radio-button v-for="(cate,index) in item.label" :key="index" :label="cate" ></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="videoLine">
      <div class="videoBox" v-if="ts.videoData.o">
        <div class="BoxItem" v-for="(item,index) in ctl.videoResource" :key="index">
          <div class="imgBox"><img src="~assets/images/type-video.png"></div>
          <div class="fontBox">
            <div class="videoTitle">{{item.videoTitle}}</div>
            <div class="smallLine">
              <i class="el-icon-notebook-2"></i>教材：
              <a class="fontItem" v-for="(material,index) in item.teachingMaterial" :key="index">{{material}}</a>
            </div>
            <div class="smallLine">
              <i class="el-icon-price-tag"></i>标签：
              <a class="fontItem" v-for="(label,index) in item.label" :key="index">{{label}}</a>
            </div>
            <div class="otherBox">其他</div>
          </div>
          <div class="seeBox">
            <el-button type="primary" plain @click="showVideo(item)">查看视频</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['filters'],
  props: {
    subject: {
      require: true,
      type: String,
    },
    education: {
      require: true,
      type: String,
    },
    data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      ctl: {
        videoResource: undefined,
        dialogVisible: false,
        title: undefined,
      },
      ts: {
        videoData: this.newStore(),
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 类型
          src: '', // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    };
  },
  created() {
    this.qryVideoData();
  },
  methods: {
    qryVideoData() {
      this.spost(this.ts.videoData, '/SelectedVideo/methods/qryVideoData', {

      }).then((rs) => {
        this.ctl.videoResource = rs.d.videoData;
        console.log(this.ctl.videoResource);
      });
    },
    showVideo(item) {
      this.playerOptions.sources[0].src = '';
      this.playerOptions.sources[0].src = item.src;
      this.ctl.title = item.videoTitle;
      this.ctl.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.headerBreadCrumb{
  height:10vh;
  display:flex;
  margin-left: 4vw;
  align-items: center;
}
.classifyBox{
  background-color:#F5F5F5;
  padding: 6vh 0;
}
.classifyGrid{
  display:grid;
  grid-template-rows:1fr 1fr 1fr;
  height: 120px;
}
.gridItem{
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 15px;
  margin-left: 12vw;
}
.videoLine{
  background-color:#F5F5F5;
  overflow: hidden;
  min-height:200px;
}
.videoBox{
  background-color: white;
  margin: 0vh 10vw;
  border-radius: 10px;
  margin-top: 10px;
}
.BoxItem{
  display:grid;
  grid-template-columns:1fr 4fr 1fr;
  padding: 25px 0 15px;
}
.imgBox{
  justify-content: center;
  display: flex;
  align-items: center;
}
.fontBox{
  display:grid;
  grid-template-rows:1fr 1fr 1fr 1fr;
  height:130px;
}
.videoTitle{
  font-size:16px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
}
.smallLine{
  font-size:12px;
  display: flex;
  justify-content: left;
  align-items: center;
  line-height: 22px;
}
.fontItem{
  display: inline-block;
  padding: 0 10px;
  margin-left: 10px;
  color: #666;
  border-radius: 2px;
  background: #ebf5ff;
}
.otherBox{
  font-size:12px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.seeBox{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
