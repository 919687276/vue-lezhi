<template>
  <el-container>
    <el-header>
      <el-col :span="16" :offset="4"><div class="retrieve">找回密码</div></el-col>
      <el-col :span="4"><div class="top-right"><i class="el-icon-back"></i><el-link type="primary" class="back" :underline="false" href="/lz/">返回首页</el-link></div></el-col>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-steps :active="active" finish-status="success" process-status="finish" :align-center="true">
            <el-step title="填写手机号"></el-step>
            <el-step title="身份验证"></el-step>
            <el-step title="设置新密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row class="stepOne" v-if="step === 1">
        <el-col :span="8" :offset="8">
          <el-form label-width="80px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm"
            label-position="left" :rules="rules">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
            </el-form-item>
          </el-form>
          <el-button style="margin-top: 12px;" :disabled="isnext" @click="next">下一步</el-button>
        </el-col>
      </el-row>
      <el-row class="stepOne" v-if="step === 2">
        <el-col :span="8" :offset="8">
          <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm"
            class="demo-ruleForm" label-position="left">
            <el-form-item label="验证码" prop="verificationCode">
              <el-input v-model="ruleForm.verificationCode" maxlength="6" placeholder="请输入验证码" class="codeStyle"></el-input>
              <el-button icon="el-icon-mobile-phone" @click="sendCode" type="primary" v-if="!timershow">
                <span>再次获取</span>
              </el-button>
              <el-button icon="el-icon-mobile-phone" type="primary"
                :disabled="true" v-if="timershow">
                <span class="count">{{count}} s</span>
              </el-button>
            </el-form-item>
          </el-form>
          <el-button style="margin-top: 12px;" :disabled="isnext" @click="next">下一步</el-button>
        </el-col>
      </el-row>
      <el-row class="stepOne" v-if="step === 3">
        <el-col :span="8" :offset="8">
          <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm"
            class="demo-ruleForm" label-position="left">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button style="margin-top: 12px;" :disabled="isnext" @click="next">下一步</el-button>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="stepOne" v-if="step === 4">
        <el-col :span="8" :offset="8" class="checkpwdsucc">
          密码修改成功，点击<a class="back" @click="back">立即返回</a>
        </el-col>
        <el-col :span="8" :offset="8" class="checkpwdsucc">
          系统将在{{succcount}}s后自动返回首页
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { isvalidPhone } from '~/plugins/validate.js';

export default {
  name: 'retrievePwd',
  data() {
    const validPhone = (rule, value, callback) => {
      this.isnext = true;
      if (!value) {
        callback(new Error('请输入手机号'));
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'));
      } else {
        this.spost(this.ru, '/index.php/Admin/Register/isExistUser', {
          phone: value,
        }).then((rs) => {
          if (!rs.d.isExist) {
            callback(new Error('该手机号未被注册'));
          } else {
            this.isnext = false;
          }
        });
      }
    };
    const validCode = (rule, value, callback) => {
      this.isnext = true;
      if (value.length !== 6) {
        callback(new Error('请输入6位验证码'));
      } else {
        this.isnext = false;
      }
    };
    const validatePass1 = () => {
      this.isnext = true;
      this.ruleForm.checkPass = '';
    };
    const validatePass2 = (rule, value, callback) => {
      this.isnext = true;
      if (this.ruleForm.checkPass !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.spost(this.rpw, '/index.php/Admin/Retrievepwd/checkpwd', {
          phone: this.ruleForm.phone,
          password: this.ruleForm.pass,
        }).then(() => {
          // console.log(this.rpw);
          if (!this.rpw.d.status) {
            callback(new Error('新密码不能与原密码相同'));
          } else {
            this.isnext = false;
          }
        });
      }
    };
    return {
      active: 0,
      ruleForm: {
        phone: '',
        verificationCode: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        phone: [
          { required: true, trigger: 'change', validator: validPhone },
        ],
        verificationCode: [
          { required: true, trigger: 'change', validator: validCode },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: validatePass1, trigger: 'change' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: ['change', 'blur'] },
          // { validator: validatePass2, trigger: 'blur' },
        ],
      },
      ru: this.newStore(),
      cd: this.newStore(),
      cp: this.newStore(),
      rpw: this.newStore(),
      isnext: true,
      step: 1,
      code: undefined,
      timershow: true,
      count: '',
      timer: null,
      succcount: '',
      succtimer: null,
    };
  },
  methods: {
    next() {
      if (this.step === 1) {
        this.spost(this.cd, '/index.php/Admin/Alisms/code', {
          accessKeyId: 'LTAI4FmVqXcTMohVHcH67xVY',
          accessKeySecret: 'DDVjfAidj3W1A6nlFA1kfYIjAZphLM',
          SignName: 'Noc',
          TemplateCode: 'SMS_177547161',
          phone: this.ruleForm.phone,
        }).then(() => {
          this.active = 1;
          this.step = 2;
          this.isnext = true;
          this.code = this.cd.d.code;
          // 计时器
          const TIME_COUNT = 60; // 倒计时时间
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count = this.count - 1;
            } else {
              this.timershow = false;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000);
        });
      } else if (this.step === 2) {
        if (this.code === parseInt(this.ruleForm.verificationCode, 10)) {
          this.active = 2;
          this.step = 3;
          this.isnext = true;
        } else {
          this.$message({
            message: '验证码错误,请稍后再试',
            type: 'warning',
          });
        }
      } else if (this.step === 3) {
        this.spost(this.cp, '/index.php/Admin/Retrievepwd/updatepwd', {
          phone: this.ruleForm.phone,
          password: this.ruleForm.pass,
        }).then(() => {
          if (this.cp.d.status) {
            this.active = 4;
            this.step = 4;
            const TIME_COUNT = 5; // 倒计时时间
            this.succcount = TIME_COUNT;
            this.succtimer = setInterval(() => {
              if (this.succcount > 0 && this.succcount <= TIME_COUNT) {
                this.succcount = this.succcount - 1;
              } else {
                clearInterval(this.succtimer); // 清除定时器
                this.succtimer = null;
                this.$router.push({ path: '/' });
              }
            }, 1000);
          } else {
            this.$message({
              message: '密码修改失败，请稍后重试',
              type: 'error',
            });
          }
        });
      }
    },
    back() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped>
.top-right{
  padding-top: 10px;
  min-height: 36px;
  text-align: center;
}
.el-icon-back{
  color: #409EFF;
  font-size: 18px;
}
.retrieve{
  padding-top: 10px;
  text-align: center;
}
.stepOne{
  margin-top: 70px;
}
.codeStyle{
  width: 50%;
}
.checkpwdsucc{
  text-align: center;
}
.back{
  cursor: pointer;
  text-decoration: none;
}
.back:hover{
  color: #409EFF;
}
</style>
