<template>
  <div class="specialTipic">
    <div class="left">
      <div class="leftItem">
        <div class="letfTitle">特供专题</div>
        <div class="leftImgBox">
          <img src="~assets/images/tegs.jpg" class="letfImg">
        </div>
      </div>
      <div class="right" v-loading="!ts.topic.o">
        <el-tabs v-model="ctl.activeName" v-if="ts.topic.o">
          <el-tab-pane :label="item.label" :name="item.name" v-for="(item,x) in ts.topic.d" :key="x">
            <div class="rightBox">
              <div class="rightItem" v-for="i in item.data" :key="i.id">
                <div class="rightImgBox">
                  <img :src="i.img" class="rightImg">
                </div>
                <div class="rightTitle">{{i.title}}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ts: {
        topic: this.newStore(),
      },
      ctl: {
        activeName: 'first',
      },
    };
  },
  created() {
    this.getClassificationData();
  },
  methods: {
    getClassificationData() {
      this.spost(this.ts.topic, '/Home/methods/getClassificationData', {
      });
    },
  },
};
</script>

<style scoped>
.specialTipic{
  padding: 10vh 2vw;
  background-color:#F5F5F5;
}
.left{
  display:grid;
  grid-template-columns:20% 80%;
  background-color: white;
}
.leftItem{
  display:grid;
  grid-template-rows:10% 90%;
}
.letfTitle{
  border-left:5px solid #409EFF;
  padding-left:10px;
  margin-top:10px;
  margin-left:10px;
  font-size: 22px;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding-left:10px;
}
.leftImgBox{
  padding:0px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.letfImg{
  width:100%;
  /* height:100%; */
}
.right{
  padding:5px 20px;
}
.rightBox{
  display:grid;
  grid-template-rows:50% 50%;
  grid-template-columns:25% 25% 25% 25%;
  height:45vh;
}
.rightItem{
  display:grid;
  grid-template-rows:80% 20%;
}
.rightItem:hover{
  cursor: pointer;
}
.rightItem:hover .rightTitle{
  color: #409EFF;
}
.rightImgBox{
  padding:0px 10px;
}
.rightImg{
  width:100%;
  height:100%;
}
.rightTitle{
  font-size: 14px;
  display:flex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
</style>
