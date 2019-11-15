<template>
  <div>
    <img-inputer v-model="file1" theme="light" size="5px" type="file"
      accept="image/*" placeholder="请上传您的图片" :on-change="chooseImg" />
    <el-button @click="submit()">确认上传</el-button>
  </div>
</template>
<style>
</style>


<script>
import moment from 'moment';

export default {
  data() {
    return {
      imageUrl: '',
      file1: undefined,
      rg: this.newStore(),
      ruleForm1: '',
    };
  },
  methods: {
    chooseImg() { // 上传照片时将图片转为base64
      const file = this.file1; // file1是绑定的file对象
      const reader = new FileReader();
      const img = new Image();
      // 读取图片
      reader.readAsDataURL(file);
      // 读取完毕后的操作
      reader.onloadend = (e) => {
        img.src = e.target.result;
        // 这里的e.target就是reader
        // console.log(reader.result)
        // reader.result就是图片的base64字符串
        this.ruleForm1 = reader.result;
      };
    },
    submit() {
      this.mypost(this.rg, '/index.php/Admin/Upload/upload', {
        name: moment().format('YYYYMMDDHHmmss'),
        img: this.ruleForm1,
      }).then((rs) => {
        console.log(rs);
      });
    },
    // 将数据post给后台：
    // axios.post('/api/test01/register.php',{
    //   num: this.ruleForm1.num,
    //   name: this.ruleForm1.name,
    //   code: this.ruleForm1.code,
    //   driverNum: this.ruleForm1.driverNum,
    //   pass: this.ruleForm1.pass,
    //   img1: this.ruleForm1.base1,
    //   img2: this.ruleForm1.base2,
    //   img3: this.ruleForm1.base3
    // }).then(response=> {
    //   let res = response.data;
    //   if(res.message==1){
    //     this.loginModalFlag = false;
    //     this.resetForm('ruleForm1');
    //     this.$message({
    //       type: 'success',
    //       message: '注册成功，登录账号等后台验证通过即刻租车啦！'
    //     });
    //   }else if(res.message==0){
    //     this.$message({
    //       type: 'warning',
    //       message: '您的账号已经被注册啦，请直接登录'
    //     });
    //   }else{
    //     this.$message.error( '信息提交失败，请重新注册');
    //   }

    // })
  },
};
</script>
