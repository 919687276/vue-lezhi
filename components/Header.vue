<template>
  <div>
    <el-row>
      <el-col :span="2" class="logo_col"><img src="~assets/images/Logo.jpg" class="logo_col"></el-col>
      <el-col :span="17">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="5">
        <div v-if="filters.loggedIn">
          <div class="head_portrait"><img class="portrait_img" :src="userImg"></div>
          <div class="login_or_regist">
            <el-link type="primary">欢迎您，{{filters.user}}</el-link>
            <el-link type="danger" @click="logout">退出</el-link>
          </div>
        </div>
        <div v-else>
          <div class="head_portrait"><img class="portrait_img" src="~/assets/userPortrait/user_logo.png"></div>
          <div class="login_or_regist">
            <el-link type="primary" class="login" @click="dialogFormVisible = true">登录</el-link>
            <el-link type="primary" @click="toRegister">注册</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 登录表单dialog开始 -->
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :center="true">
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
          <el-col :span="6">
            <el-link type="primary" @click="toRegister" class="forgetpwd">忘记密码？</el-link>
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
export default {
  inject: ['filters'],
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
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
      this.$router.push({ path: './Register' });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.mypost(this.lg, '/index.php/Admin/Login/login', {
        phone: this.form.phone,
        password: this.form.password,
      }).then(() => {
        console.log(this.lg);
        if (this.lg.d.isExist) {
          this.dialogFormVisible = false;
          this.filters.loggedIn = true;
          this.filters.user = this.lg.d.name;
          this.userImg = this.lg.d.userimg;
          this.$message({
            message: '登录成功',
            type: 'success',
          });
        } else {
          this.$message.error('用户不存在或密码错误');
        }
      }).catch((rs) => {
        // console.log('err');
        console.log(rs);
      });
    },
    logout() {
      this.filters.loggedIn = false;
      this.filters.user = undefined;
      this.$message({
        message: '退出成功',
        type: 'success',
      });
    },
  },
};
</script>

<style>
.logo_col{
  height: 58.8px;
}
.head_portrait{
  display:table-cell;
  vertical-align:middle;
  height: 60.99px;
  padding: 0px 20px;
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
.login_or_regist{
  display:table-cell;
  vertical-align:middle;
  height: 60.99px;
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
</style>
