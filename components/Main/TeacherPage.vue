<template>
  <div>
    <div class="headerBreadCrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>名师辅导</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-carousel height="350px" direction="vertical">
      <el-carousel-item v-for="(item,index) in ctl.wrapperSrc" :key="index">
        <img :src="item" style="width:100%;height:100%;">
      </el-carousel-item>
    </el-carousel>
    <div class="centerClass">
      <div class="title">中心授课</div>
      <div class="line"></div>
      <p class="describ">良好学习环境，制定专属学习计划</p>
      <div class="desBox">
        <div class="imgBox"><img src="~assets/images/teacher01.jpg"></div>
        <div class="fontBox">
          <div class="boxLine">
            <div class="labelOne">“1对1”重点冲刺</div>
            <div class="descOne">“1对1”个性化教学针对学生的性格、能力、学习习惯及个性化特点进行分析、评估，量身定制教育目标、教学计划、辅导方案和执行管理系统，并组织专业教师进行辅导培训。</div>
          </div>
          <div class="boxLine">
            <div class="labelOne">“1对2/1对3”互动教学</div>
            <div class="descOne">模块化课程精讲，查漏补缺，准确定位薄弱环节，完善知识体系；通过提升课堂互动体验，激发持久自主学习力，培养学习习惯</div>
          </div>
          <div class="freeBtn">2小时学科精品试听课  免费领取</div>
        </div>
      </div>
    </div>
    <div class="online">
      <div class="title">线上教学</div>
      <div class="line"></div>
      <p class="describ">随时随地，知识轻松学</p>
      <div class="desBox">
        <div class="imgBox"><img src="~assets/images/teacher02.jpg"></div>
        <div class="onlineRight">
          <div style="display:grid;">
            <div class="labelOne">乐智教育在线课堂搭载使用教学客户端，真人在线1对1授课，电脑/手机端/Pad设备轻松登录。</div>
            <div>
              <p class="onlineItem">
                <span></span>
                PPT备课课件演示，随时随地划重点
              </p>
              <p class="onlineItem">
                <span class="onlinePoint"></span>
                PPT备课课件演示，随时随地划重点
              </p>
              <p class="onlineItem">
                <span class="onlinePoint"></span>
                考点难点精细化讲解
              </p>
              <p class="onlineItem">
                <span class="onlinePoint"></span>
                答题器可记录当堂练习做题正确率
              </p>
              <p class="onlineItem">
                <span class="onlinePoint"></span>
                全程课程录制，随时回看，巩固学习效果
              </p>
            </div>
          </div>
          <div class="freeBtn">2小时线上教学体验课  免费领取</div>
        </div>
      </div>
    </div>
    <div class="goldTeacher">
      <div>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="(item,index) in ctl.teacher" :key="index">
            <img :src="item" style="width:100%;height:100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <div class="title">金牌老师</div>
        <div class="line"></div>
        <p class="describ">懂沟通、懂考点、更懂孩子</p>
        <div class="teacher">
          <div class="flexCenter">层层筛选</div>
          <div class="flexCenter">严控10%老师招聘录取率</div>
          <div class="flexCenter">教学紧扣当地教材与考点</div>
          <div class="flexCenter">老师每月月考达标</div>
          <div class="flexCenter">100%接受过家庭教育培训，更懂孩子成绩背后的问题所在！</div>
        </div>
      </div>
    </div>
    <div class="individualization">
      <div class="individualBox">
        <div>
          <div class="title">开创个性化教育模式</div>
          <div class="line"></div>
        </div>
        <div class="indLeft">
          <div class="indLeftFontBox">
            <div class="indLeftFontTitle">让学生学会 - 知识与技能</div>
            <div class="indLeftFontContent">每一次的辅导知识自成体系，前后连贯，知识一环扣一环，有利于学生系统的知识和技能的形成</div>
          </div>
          <div class="indLeftFontBox">
            <div class="indLeftFontTitle">让学生会学 - 过程与方法</div>
            <div class="indLeftFontContent">了解科学探究的过程方法，学会运用观察、实验、查阅资料等多种手段获取信息，并运用比较、分类、归纳、概括等方法对信息进行加工</div>
          </div>
          <div class="indLeftFontBox">
            <div class="indLeftFontTitle">让学生乐学 - 情感态度与价值观</div>
            <div class="indLeftFontContent">建立学生的各种素质在学科课程培养中的有机联系，对学生的基础性学习能力、发展性学习能力和创新性学习能力进行培养</div>
          </div>
        </div>
      </div>
      <div v-if="ts.map.o">
        <ve-map :legend-visible="false" :data="ts.map.d" :settings="ctl.chartSettings"
          mapGrid="{left: 40%,right: 40%,top: auto,bottom: auto}"></ve-map>
      </div>
    </div>
    <div class="promitBox">
      <div>
        <div class="title">我们的承诺</div>
        <div class="line"></div>
      </div>
      <div class="promitColumns">
        <div v-for="(item,index) in ctl.promitData" :key="index" class="promitItem">
          <div class="promitImg">
            <img :src="`${item.img}`">
          </div>
          <div class="promitLineOne">{{item.title}}</div>
          <div class="promitLineTwo">{{item.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // inject: ['filters'],
  data() {
    return {
      ts: {
        map: this.newStore(),
      },
      ctl: {
        wrapperSrc: [
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_1.jpg',
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_2.jpg',
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_3.jpg',
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_4.jpg',
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_5.jpg',
          'http://www.caibo919687276.cn/images/swiper/teacher_wrapper_6.jpeg',
        ],
        teacher: [
          'http://www.caibo919687276.cn/images/swiper/tc-1.png',
          'http://www.caibo919687276.cn/images/swiper/tc-2.png',
          'http://www.caibo919687276.cn/images/swiper/tc-3.png',
          'http://www.caibo919687276.cn/images/swiper/tc-5.png',
          'http://www.caibo919687276.cn/images/swiper/tc-6.png',
          'http://www.caibo919687276.cn/images/swiper/tc-7.png',
          'http://www.caibo919687276.cn/images/swiper/tc-8.png',
        ],
        promitData: [
          {
            img: 'http://www.caibo919687276.cn/images/swiper/section7_1.jpg',
            title: '免费试听，满意再报名',
            desc: '0元领取精品课，学科年级任选，体验满意再报名',
          }, {
            img: 'http://www.caibo919687276.cn/images/swiper/section7_2.jpg',
            title: '随时换班型/授课老师',
            desc: '孩子所在班型不合适，老师授课风格不喜欢，可随时更换',
          }, {
            img: 'http://www.caibo919687276.cn/images/swiper/section7_3.jpg',
            title: '没效果，退余额',
            desc: '对于课程不满意，支持退款，退款会扣除已上课时费和讲义工本费',
          },
        ],
        chartSettings: {
          position: 'china',
          label: true,
          labelMap: {
            num: '学生人数',
          },
          itemStyle: {
            normal: {
              borderColor: '#e53964',
              areaColor: '#FFC6FF',
            },
          },
        },
      },
    };
  },
  mounted() {
    this.mapServ();
  },
  methods: {
    mapServ() {
      this.spost(this.ts.map, '/Common/methods/MapServ', {
      });
    },
  },
};
</script>

<style scoped>
.centerClass{
  margin-top: 60px;
  overflow: hidden;
}
.headerBreadCrumb{
  height:10vh;
  display:flex;
  margin-left: 4vw;
  align-items: center;
}
.title{
  display: block;
  text-align: center;
  color: #e2005c;
  font-size: 36px;
}
.line{
  display: block;
  background-color: #e53964;
  width: 170px;
  height: 6px;
  margin: 13px auto;
}
.describ{
  text-align: center;
  color: #383637;
  font-size: 30px;
}
.desBox{
  display:grid;
  grid-template-columns: 1fr 1fr;
  padding: 65px 0 75px;
}
.imgBox{
  display: flex;
  justify-content: center;
  align-items: center;
}
.fontBox{
  display: grid;
  grid-template-rows: 2fr 2fr 1fr;;
  margin-left: 2vw;
  width:90%;
}
.boxLine{
  display: grid;
  grid-template-rows: 1fr 3fr;
}
.labelOne{
  display: flex;
  align-items: center;
  font-size: 0.857143rem;
  color: #383637;
  text-align: left;
}
.descOne{
  font-size: 0.514286rem;
  color: #626262;
  display: flex;
  font-weight: normal;
  justify-content: center;
  align-items: center;
}

.freeBtn{
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  background-color: #e53964;
  border-radius: 50px;
  color: white;
  height: 66px;
  line-height: 66px;
  text-align: center;
  font-size: 22px;
}
.freeBtn:hover{
  cursor: pointer;
  background-color: white;
  color: #e53964;
  border: 2px solid #e53964;
}
.online{
  padding-top: 60px;
  background-color:#F5F5F5;
}
.onlineRight{
  display:grid;
  grid-template-rows: 4fr 1fr;
  margin-left: 2vw;
  width: 90%;
}
.onlineItem{
  font-size: 18px;
  color: #626262;
  text-align: left;
  font-weight: normal;
  line-height: 30px;
}
.onlinePoint{
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 10px;
}
.flexCenter{
  display:flex;
  justify-content: center;
  align-items: center;
}
.teacher{
  display:grid;
  font-size:18px;
  margin-top: 15px;
}
.promitBox{
  display:grid;
  grid-template-rows:1fr 3fr;
  padding: 50px 100px;
}
.promitColumns{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
}
.promitItem{
  padding: 0 20px;
  display:grid;
  grid-template-rows:2fr 1fr 2fr;
}
.promitImg{
  display: flex;
  justify-content: center;
  align-items: center;
}
.promitLineOne{
  display:flex;
  font-size: 22px;
  font-weight: 500;
  color: rgba(51,51,51,1);
  justify-content: center;
  align-items: center;
}
.promitLineTwo{
  display:flex;
  font-size: 18px;
  font-weight: 400;
  color: rgba(102,102,102,1);
  justify-content: center;
  align-items: center;
  text-align:center;
}
.goldTeacher{
  display:grid;
  grid-template-columns:1fr 1fr;
  padding: 50px 0px;
}
.individualization{
  background-color:#F5F5F5;
  padding:50px 100px;
  display:grid;
  grid-template-columns: 1fr 1fr;
}
.individualBox{
  display:grid;
  grid-template-rows:1fr 4fr;
}
.indLeft{
  display:grid;
  grid-template-rows:1fr 1fr 1fr;
}
.indLeftFontBox{
  display:grid;
  grid-template-rows:1fr 3fr;
  font-size:18px;
}
.indLeftFontTitle{
  color:#e53964;
  display:flex;
  align-items: center;
}
.indLeftFontContent{
  color:#383637;
  display:flex;
}
</style>
