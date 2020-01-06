<template>
  <div>
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
    <div style="background-color:#F5F5F5;overflow: hidden;min-height:200px;">
      123
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
</style>
