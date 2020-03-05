<template>
  <div>
    <el-row>
      <el-col :span="2" class="logo_col"><img src="~assets/images/LogoOne.png" class="logo_col"></el-col>
      <el-col :span="17">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          active-text-color="#2097F3" :router="false">
          <!-- background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"> -->
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">精选试题</template>
            <el-submenu index="2-1">
              <template slot="title">小学</template>
              <el-menu-item index="2-1-1">语文</el-menu-item>
              <el-menu-item index="2-1-2">数学</el-menu-item>
              <el-menu-item index="2-1-3">英语</el-menu-item>
              <el-menu-item index="2-1-4">科学</el-menu-item>
              <el-menu-item index="2-1-5">音乐</el-menu-item>
              <el-menu-item index="2-1-6">美术</el-menu-item>
              <el-menu-item index="2-1-7">劳技</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">初中</template>
              <el-menu-item index="2-2-1">语文</el-menu-item>
              <el-menu-item index="2-2-2">数学</el-menu-item>
              <el-menu-item index="2-2-3">英语</el-menu-item>
              <el-menu-item index="2-2-4">美术</el-menu-item>
              <el-menu-item index="2-2-5">音乐</el-menu-item>
              <el-menu-item index="2-2-6">历史与社会</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">优质视频</template>
            <el-submenu index="3-1">
              <template slot="title">小学</template>
              <el-menu-item index="3-1-1">语文</el-menu-item>
              <el-menu-item index="3-1-2">数学</el-menu-item>
              <el-menu-item index="3-1-3">英语</el-menu-item>
              <el-menu-item index="3-1-4">科学</el-menu-item>
              <el-menu-item index="3-1-5">音乐</el-menu-item>
              <el-menu-item index="3-1-6">美术</el-menu-item>
              <el-menu-item index="3-1-7">劳技</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">初中</template>
              <el-menu-item index="3-2-1">语文</el-menu-item>
              <el-menu-item index="3-2-2">数学</el-menu-item>
              <el-menu-item index="3-2-3">英语</el-menu-item>
              <el-menu-item index="3-2-4">美术</el-menu-item>
              <el-menu-item index="3-2-5">音乐</el-menu-item>
              <el-menu-item index="3-2-6">历史与社会</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4">名师辅导</el-menu-item>
          <el-menu-item index="5">关于我们</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="5" v-if="session.login" class="top_style">
        <div class="login_grid">
          <div class="head_portrait"><img class="portrait_img" v-loading="!userImg" :src="userImg"></div>
          <div class="login_or_regist">
            <el-link type="primary">{{session.user}}</el-link>
            <el-link type="danger" class="logout_style" @click="logout">退出</el-link>
          </div>
        </div>
      </el-col>
      <el-col :span="4" :offset="1" class="top_style" v-else>
        <div class="login_grid">
          <div class="head_portrait"><img class="portrait_img" src="~/assets/userPortrait/user_logo.png"></div>
          <div class="login_or_regist">
            <el-link type="primary" class="login" @click="dialogFormVisible = true">登录</el-link>
            <el-link type="primary" @click="toRegister">注册</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 登录表单dialog开始 -->
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :center="true" class="loginDialog">
      <el-form>
        <el-form-item label="手机号:" label-width="200px">
          <el-col :span="16">
            <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码:" label-width="200px">
          <el-col :span="16">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-col>
          <el-col :span="6" style="min-width: 70px;">
            <el-link type="primary" @click="RetrievePwd" class="forgetpwd">忘记密码？</el-link>
          </el-col>
        </el-form-item>
      </el-form>
      <el-col :span="24" class="goRegist">
        <el-link type="primary" @click="toRegister">还没有账号？立即去注册</el-link>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login()" :disabled="!form.phone || !form.password">登录</el-button>
      </div>
    </el-dialog>
    <!-- 登录表单dialog结束 -->
  </div>
</template>

<script>
import md5 from 'js-md5';

export default {
  inject: ['session', 'filters'],
  data() {
    return {
      activeIndex: '/',
      dialogFormVisible: false,
      form: {
        phone: '',
        password: '',
      },
      lg: this.newStore(),
      userImg: undefined,
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ path: '/Register' });
    },
    RetrievePwd() {
      this.$router.push({ path: '/RetrievePwd' });
    },
    handleSelect(key) {
      this.filters.showPage = undefined;
      this.$nextTick(() => {
        this.filters.showPage = key;
      });
    },
    login() {
      this.spost(this.lg, '/Home/methods/login', {
        phone: this.form.phone,
        password: md5(this.form.password),
      }).then(() => {
        if (this.lg.d.isExist) {
          this.dialogFormVisible = false;
          this.session.login = true;
          this.session.user = this.lg.d.nickname;
          this.userImg = this.lg.d.userimg;
          this.$message({
            message: '登录成功',
            type: 'success',
          });
        } else {
          this.$message.error('用户不存在或密码错误');
        }
      }).catch((rs) => {
        console.log(rs);
      });
    },
    logout() {
      this.session.login = false;
      this.session.user = undefined;
      this.$message({
        message: '退出成功',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped>

.logo_col{
  height: 58.8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head_portrait{
  display:flex;
  justify-content:center;
  align-items:center;
}
.portrait{
  vertical-align: bottom;
}
.portrait_img{
  vertical-align: bottom;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.top_style{
  display:flex;
  height:58.8px;
}
.login_grid{
  display:grid;
  grid-template-columns:30% 70%;
  width: 100%;
}
.login_or_regist{
  display:flex;
  justify-content:left;
  align-items:center;
}
.login{
  margin-right: 10px;
}
.forgetpwd{
  margin-left: 6px;
}
.goRegist{
  text-align: center;
}
.logout_style{
  margin-left: 5px;
}
.loginDialog{
  min-width: 550px;
}
</style>
