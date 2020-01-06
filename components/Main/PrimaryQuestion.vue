<template>
  <div>
    <div class="headerBreadCrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>精选试卷</el-breadcrumb-item>
        <el-breadcrumb-item>{{education}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{subject}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="classifyBox">
      <div class="classifyGrid">
        <div v-for="(item,index) in data" :key="index" class="gridItem">
          {{item.name}}：
          <el-radio-group v-model="filters.model[index]" size="medium" @change="freshQuestion()">
            <el-radio-button v-for="(cate,index) in item.label" :key="index" :label="cate" ></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="questionBox" v-loading="!ts.ques.o">
      <div v-if="!ts.ques.d.isExist&&ts.ques.o" class="noQuestion">暂无试题</div>
      <div v-else-if="ts.ques.o" v-for="(item,index) in ts.ques.d.questionData.slice((ctl.currentPage-1)*ctl.pagesize,ctl.currentPage*ctl.pagesize)" :key="index" class="pageBox">
        <div class="questionGrid">
          <div class="questionTitle">
            {{item.testTitle}}
          </div>
          <div class="questionBoxOne">
            <div class="questionBoxTwo">
              <div class="questionBoxThree">
                <div class="questionBoxThreeItem">教材：{{item.knowledgePoint}}</div>
                <div class="questionBoxThreeItem">标签：{{item.label}}</div>
                <div class="questionBoxThreeItem">专辑：{{item.album}}</div>
                <div class="questionBoxThreeItem">难度：{{item.difficult}}</div>
              </div>
              <div class="questionBoxFour">
                <div :class="'picImg'+index" v-viewer="ctl.options">
                  <img v-for="(item,index) in item.img" :key="index" :src="item" v-show="false">
                </div>
                查看详情：<el-button type="primary" icon="el-icon-view" circle
                  @click="showPic(index,item.id)"></el-button>
              </div>
            </div>
            <div class="bottomBox">
              <div class="bottomBoxItem"><i class="el-icon-user">作者：{{item.author}}</i></div>
              <div class="bottomBoxItem"><i class="el-icon-time">时间：{{item.time}}</i></div>
              <div class="bottomBoxItem"><i class="el-icon-search">浏览次数：{{item.browseTimes}}</i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paginationBox">
      <el-pagination
        :page-size="10"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="ctl.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :total="ctl.total"
        background
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
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
        questionData: undefined,
        isExist: false,
        currentPage: 1,
        total: 0,
        pagesize: 10,
        options: {
          inline: false, // inline模式
          button: true, // 右上角关闭按钮
          navbar: true, // 缩略图导航
          title: false, // 当前图片标题
          toolbar: true, // 显示工具栏
          tooltip: true, // 显示缩放百分比
          movable: true, // 图片是否可移动
          zoomable: true, // 图片是否可缩放
          rotatable: true, // 图片是否可旋转
          scalable: true, // 图片是否可翻转
          transition: true, // 使用css3过渡
          fullscreen: true, // 播放时是否全屏
          keyboard: true, // 是否支持键盘
        },
      },
      ts: {
        ques: this.newStore(),
        browseTimes: this.newStore(),
      },
    };
  },
  created() {
    this.qryQuestionData();
  },
  beforeDestroy() {
    this.filters.model = ['不限', '不限', '不限'];
  },
  methods: {
    qryQuestionData() {
      this.ctl.currentPage = 1;
      this.ts.ques.o = false;
      this.spost(this.ts.ques, '/SelectedQuestions/methods/qryQuestionData', {
        subject: this.subject,
        year: this.filters.model[0],
        edition: this.filters.model[1],
        education: this.education,
        grade: this.filters.model[2],
      }).then((rs) => {
        this.ctl.total = rs.d.questionData.length;
      });
    },
    freshQuestion() {
      this.qryQuestionData();
    },
    handleCurrentChange(val) {
      document.documentElement.scrollTop = 0;
      this.ctl.currentPage = val;
    },
    handleSizeChange(val) {
      this.ctl.pagesize = val;
    },
    showPic(index, id) {
      this.spost(this.ts.browseTimes, '/SelectedQuestions/methods/updateBrowseTimes', {
        id,
      });
      const name = `.picImg${index.toString()}`;
      const viewer = this.$el.querySelector(name).$viewer;
      viewer.show();
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
.questionBox{
  background-color:#F5F5F5;
  overflow: hidden;
  min-height:200px;
}
.noQuestion{
  text-align:center;
}
.pageBox{
  background-color: white;
  margin: 0vh 10vw;
  border-radius: 10px;
  margin-top: 10px;
}
.questionGrid{
  display: grid;
  grid-template-rows: 1fr 5fr;
  margin:0 30px;
}
.questionTitle{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  margin: 5px 0;
}
.questionBoxOne{
  display:grid;
  grid-template-rows: 80% 20%;
  font-size:16px;
}
.questionBoxTwo{
  display:grid;
  grid-template-columns:4fr 1fr;
}
.questionBoxThree{
  display:grid;
  grid-template-rows:1fr 1fr 1fr 1fr;
}
.questionBoxThreeItem{
  display: flex;
  align-items: center;
}
.questionBoxFour{
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottomBox{
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.bottomBoxItem{
  display: flex;
  justify-content: center;
  align-items: center;
}
.paginationBox{
  background-color: rgb(245, 245, 245);
  text-align: center;
  padding-top: 20px;
}
</style>
