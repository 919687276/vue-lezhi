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
          <div class="imgBox"><img src="~assets/images/type-test.png"></div>
          <div class="questionItem">
            <div class="title">{{item.testTitle}}</div>
            <div class="lineItem">
              <i class="el-icon-notebook-2"></i>教材：
              <a class="fontItem" v-for="(material,index) in item.teachingMaterial" :key="index">{{material}}</a>
            </div>
            <div class="lineItem">
              <i class="el-icon-price-tag"></i>标签：
              <a class="fontItem" v-for="(label,index) in item.label" :key="index">{{label}}</a>
            </div>
            <div class="lineItem">
              <i class="el-icon-edit"></i>难度：{{item.difficult}}</div>
            <div class="lineItem">
              <div class="time"><i class="el-icon-time"></i>&nbsp;&nbsp;{{item.time}}</div>
              <div class="browseTimes"><i class="el-icon-view">&nbsp;&nbsp;{{item.browseTimes}}</i></div>
              <div class="browseTimes"><i class="el-icon-c-scale-to-original">&nbsp;&nbsp;{{item.size}}</i></div>
              <div><i class="el-icon-user">&nbsp;&nbsp;{{item.author}}</i></div>
            </div>
          </div>
          <div class="rightBox">
            <div :class="'picImg'+index" v-viewer="ctl.options">
              <img v-for="(item,index) in item.img" :key="index" :src="item" v-show="false">
            </div>
            查看详情：<el-button type="primary" icon="el-icon-view" circle
              @click="showPic(index,item.id)"></el-button>
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
    this.filters.model = ['不限', '不限', '不限', '不限'];
  },
  methods: {
    qryQuestionData() {
      this.ctl.currentPage = 1;
      this.ts.ques.o = false;
      this.spost(this.ts.ques, '/SelectedQuestions/methods/qryQuestionData', {
        subject: this.subject,
        education: this.education,
        year: this.filters.model[0],
        edition: this.filters.model[1],
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
  grid-template-columns: 1fr 4fr 1fr;
  padding: 25px 0 15px;
}
.imgBox{
  justify-content: center;
  display: flex;
  align-items: center;
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
.fontItem{
  display: inline-block;
  padding: 0 10px;
  margin-left: 10px;
  color: #666;
  border-radius: 2px;
  background: #ebf5ff;
}
.fontItem:hover{
  background-color: #4B98FF;
  color: white;
  cursor: pointer;
}
.paginationBox{
  background-color: rgb(245, 245, 245);
  text-align: center;
  padding-top: 20px;
}
.questionItem{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  height: 150px;
}
.title{
  font-size:16px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
}
.lineItem{
  font-size:12px;
  display: flex;
  justify-content: left;
  align-items: center;
  line-height: 22px;
}
.time{
  width:140px;
}
.browseTimes{
  width: 70px;
}
.rightBox{
  display:flex;
  justify-content: left;
  align-items: center;
  font-size: 12px;
}
</style>
