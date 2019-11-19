<template>
  <el-container>
    <el-header>
      <el-col :span="16" :offset="4"><div class="register">注册</div></el-col>
      <el-col :span="4"><div class="top-right"><i class="el-icon-back"></i><el-link type="primary" class="back" :underline="false" href="/">返回首页</el-link></div></el-col>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="ruleForm.nickname" style="ime-mode:disabled;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <img-inputer v-model="ruleForm.userimg" theme="light" size="small" type="file"
                accept="image/*" placeholder="请上传您的头像" :on-change="chooseImg" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="输入验证码" prop="verificationCode">
              <el-col :span="6">
                <el-input v-model="ruleForm.verificationCode" maxlength="6" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="1"><div style="height:1px;"></div></el-col>
              <el-col :span="8">
                <el-button icon="el-icon-mobile-phone" @click="sendCode" type="primary" v-if="timershow">
                  <span>获取验证码</span>
                </el-button>
                <el-button icon="el-icon-mobile-phone" type="primary"
                  :disabled="true" v-if="!timershow">
                  <span class="count">{{count}} s</span>
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="出生年月" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                    style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="个人简介" prop="desc">
              <el-input type="textarea" maxlength="100" show-word-limit v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import moment from 'moment';
import { isvalidPhone } from '~/plugins/validate.js';

export default {
  // created() {
  //   // eslint-disable-next-line no-undef
  //   console.log($nuxt.$route.name);
  // },
  name: 'register',
  data() {
    const validateNickname = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入昵称'));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error('长度在 6 到 12 个字符'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'));
        this.iscansend = false;
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'));
        this.iscansend = false;
      } else {
        this.mypost(this.ru, '/index.php/Admin/Register/isExistUser', {
          phone: value,
        }).then((rs) => {
          if (rs.d.isExist) {
            callback(new Error('该手机号已被注册'));
          } else {
            this.iscansend = true;
            callback();
          }
        });
      }
    };
    return {
      ruleForm: {
        nickname: '',
        pass: '',
        checkPass: '',
        userimg: undefined,
        phone: '',
        verificationCode: '',
        date1: '',
        desc: '',
      },
      rules: {
        nickname: [
          { validator: validateNickname, required: true, trigger: 'blur' },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone },
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        date1: [
          {
            type: 'date', required: true, message: '请选择日期', trigger: 'blur',
          },
        ],
        desc: [
          { required: true, message: '请填写个人简介', trigger: 'blur' },
        ],
      },
      base64img: undefined, // 64位图像编码
      sm: this.newStore(),
      ru: this.newStore(),
      cd: this.newStore(),
      // 验证码
      iscansend: false,
      timershow: true,
      count: '',
      timer: null,
      code: undefined,
    };
  },
  methods: {
    // changeUserName() {
    //   this.$nextTick(() => {
    //     if (this.ruleForm.username !== null) {
    //       // eslint-disable-next-line no-useless-escape
    //       this.ruleForm.username = this.ruleForm.username.replace(/[\u4e00-\u9fa5]/g, '');
    //       // eslint-disable-next-line no-useless-escape
    //       this.ruleForm.username = this.ruleForm.username.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im, '');
    //     }
    //   });
    // },
    resetForm(formName) {
      this.timershow = true;
      this.ruleForm.userimg = undefined;
      this.$refs[formName].resetFields();
    },
    chooseImg() { // 上传照片时将图片转为base64
      const file = this.ruleForm.userimg;
      const reader = new FileReader();
      const img = new Image();
      // 读取图片
      reader.readAsDataURL(file);
      // 读取完毕后的操作
      reader.onloadend = (e) => {
        img.src = e.target.result;
        // reader.result就是图片的base64字符串
        this.base64img = reader.result;
      };
    },
    sendCode() {
      if (this.iscansend) {
        this.timershow = false;
        const TIME_COUNT = 60; // 更改倒计时时间
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count = this.count - 1;
          } else {
            this.timershow = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
        this.mypost(this.cd, '/index.php/Admin/Alisms/code', {
          accessKeyId: 'LTAI4FmVqXcTMohVHcH67xVY',
          accessKeySecret: 'DDVjfAidj3W1A6nlFA1kfYIjAZphLM',
          SignName: 'Noc',
          TemplateCode: 'SMS_177243468',
          phone: this.ruleForm.phone,
        }).then(() => {
          this.code = this.cd.d.code;
        }).catch((err) => {
          console.log(err);
        });
      } else if (!this.ruleForm.phone) {
        this.$message({
          message: '请输入您的手机号',
          type: 'warning',
        });
      }
    },
    submitForm(formName) {
      if (this.ruleForm.userimg) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.code === parseInt(this.ruleForm.verificationCode, 10)) {
              this.mypost(this.sm, '/index.php/Admin/Register/saveUserInfo', {
                imgname: moment().format('YYYYMMDDHHmmss'),
                base64img: this.base64img,
                nickname: this.ruleForm.nickname,
                password: this.ruleForm.pass,
                phone: this.ruleForm.phone,
                date: moment(this.ruleForm.date1).format('YYYY-MM-DD'),
                desc: this.ruleForm.desc,
              }).then(() => {
                if (this.sm.d.isregister) {
                  this.registerSuccess();
                } else {
                  this.$message.error('注册失败,请联系后台管理员');
                }
              }).catch((err) => {
                console.log(err);
              });
            } else {
              this.$message({
                message: '验证码错误',
                type: 'warning',
              });
            }
          }
        });
      } else {
        this.$message({
          message: '请上传您的头像',
          type: 'warning',
        });
      }
    },
    registerSuccess() {
      this.$message({
        message: '恭喜您,注册成功',
        type: 'success',
      });
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style>
.top-left{
  padding-top: 10px;
  min-height: 36px;
}
.top-right{
  padding-top: 10px;
  min-height: 36px;
  text-align: center;
}
.el-icon-back{
  color: #409EFF;
  font-size: 18px;
}
.register{
  padding-top: 10px;
  text-align: center;
}
</style>
