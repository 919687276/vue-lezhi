<template>
  <div class="bgColor">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="courseTitle">
          <div class="courseTitleOne">课程介绍</div>
          <div class="courseTitleTwo">COURSE INTRODUCTION</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="courseCard">
        <div class="cardItem">
          <div class="cardOne">
            <div class="flex cardTitle">一对一</div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">巩固基础</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">掌握方法</div>
            </div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">培养习惯</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">弱项补缺</div>
            </div>
            <div class="flex btnHeight"><el-button round>咨询详情</el-button></div>
          </div>
        </div>
        <div class="cardItem">
          <div class="cardTwo">
            <div class="flex cardTitle">小班课</div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">1V3</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">1V6</div>
            </div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">精准教学</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">快速提升</div>
            </div>
            <div class="flex btnHeight"><el-button round>咨询详情</el-button></div>
          </div>
        </div>
        <div class="cardItem">
          <div class="cardOne">
            <div class="flex cardTitle">特色课程</div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">快速记词</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">自主招生</div>
            </div>
            <div class="flex cardListHeight">
              <div class="flex leftItem"><img src="~assets/images/courseTrue.png">书法绘画</div>
              <div class="flex rightItem"><img src="~assets/images/courseTrue.png">出国游学</div>
            </div>
            <div class="flex btnHeight"><el-button round>咨询详情</el-button></div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.bgColor{
  background-color: #F5F5F5;
}
.courseTitle{
  height: 200px;
}
.courseTitleOne{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 60%;
  font-size: 26px;
  color: rgb(32, 151, 243);
}
.courseTitleTwo{
  display: flex;
  justify-content: center;
  height: 40%;
  align-items: flex-start;
  font-size: 20px;
  color: rgb(32, 151, 243);
}
.courseCard{
  display:grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  height: 350px;
}
.cardItem{
  display: flex;
  justify-content: center;
  align-items: center;
}
.cardOne{
  width: 100%;
  height: 100%;
  background-image: url('~assets/images/courseBgOne.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.cardTwo{
  width: 100%;
  height: 100%;
  background-image: url('~assets/images/courseBgTwo.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardTitle{
  font-size:20px;
  color:white;
  font-weight: bold;
  height:35%;
  align-items: flex-end;
}
.cardListHeight{
  height:15%;
}
.leftItem{
  width:50%;
  font-size:16px;
  color:white;
  justify-content:
  flex-end;
  padding-right:10px;
}
.rightItem{
  width:50%;
  font-size:16px;
  color:white;
  justify-content:flex-start;
  padding-left:5px;
}
.btnHeight{
  height:20%;
}
</style>
