<template>
  <div>
    <div class="titleBox">
      <div class="titleOne">热门资源</div>
      <div class="titleTwo">Hot Resources</div>
    </div>
    <div class="resourceBox">
      <div class="resourceItem" v-loading="!ts.source.o">
        <el-tabs v-model="ctl.activeName" v-if="ts.source.o">
          <el-tab-pane :label="item.label" :name="item.name" v-for="(item,x) in ts.source.d" :key="x">
            <div class="liBox">
              <li v-for="i in item.data" :key="i.id" class="liItem">{{i.title}}</li>
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
      ctl: {
        activeName: 'first',
      },
      ts: {
        source: this.newStore(),
      },
    };
  },
  created() {
    this.getHotSourceData();
  },
  methods: {
    getHotSourceData() {
      this.spost(this.ts.source, '/Home/methods/HotResources', {});
    },
  },
};
</script>

<style scoped>
.titleBox{
  display:grid;
  grid-template-rows:50% 50%;
  height:200px;
  font-size: 26px;
  color: rgb(32, 151, 243);
  background-color: #F5F5F5;
}
.titleOne{
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.titleTwo{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.resourceBox{
  padding: 0 5vw;
  background-color: #F5F5F5;
  min-height:36vh;
}
.resourceItem{
  background-color: white;
  padding: 0px 20px;
  border-radius: 20px;
}
.liBox{
  display:grid;
  grid-template-rows:20% 20% 20% 20% 20%;
  grid-template-columns:33.3% 33.3% 33.3%;
}
.liItem{
  margin-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  padding-bottom: 10px;
  color:#808080;
}
.liItem:hover{
  cursor: pointer;
  color: #409EFF;
}
</style>
