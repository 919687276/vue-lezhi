<template>
  <div>
    <div class="headerBreadCrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <img style="width:100%;" src="~assets/images/p-banner.png">
    </div>
    <div style="margin: 20px 10vw;">
      <div style="display:grid;grid-template-columns: 2fr 1fr;">
        <div style="font-size: 25px;display: flex;align-items: center;">用户留言</div>
        <div>
          <el-tooltip class="item" effect="dark" content="写留言" placement="top">
            <el-button type="warning" round @click="leaveMessage()">我要留言</el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="infinite-list userRate" v-infinite-scroll="load" infinite-scroll-disabled="disabled" style="overflow:auto;max-height: 50vh;display: flex;width: 60%;margin-top: 15px;padding-right: 20px;">
        <el-timeline style="width: 100%;">
          <el-timeline-item :timestamp="item.time" placement="top" v-for="(item,index) in ctl.reviewList" :key="index">
            <el-card>
              <div style="word-break: break-all;word-wrap: break-word;font-size: 16px;">{{item.title}}</div>
              <div style="display:grid;grid-template-rows:1fr 1fr;height: 50px;">
                <div style="display:flex;align-items: center;"><i class="el-icon-user"></i>{{item.nickName}}</div>
                <div style="display: flex;align-items: center;">
                  <el-rate
                    v-model="item.rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
          <div v-if="ctl.loading" style="display: flex;justify-content: center;align-items: center;font-size: 12px;color: #66686C;"><i class="el-icon-loading"></i>拼命加载中...</div>
          <div v-if="noMore" style="display: flex;justify-content: center;align-items: center;font-size: 12px;">没有更多了</div>
        </el-timeline>
        <el-dialog title="留言" :visible.sync="ctl.dialogFormVisible" @closed="closeDialog()">
          <el-form :model="ctl.form">
            <el-form-item label="内容" :label-width="'80px'">
              <el-input v-model="ctl.form.content" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="评分" :label-width="'80px'">
              <el-rate
                style="height: 35px;display: flex;align-items: center;"
                v-model="ctl.form.value"
                show-text
                :colors="ctl.form.colors">
              </el-rate>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancleRate()">取 消</el-button>
            <el-button type="primary" @click="commitRate()">提 交</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  inject: ['session'],
  data() {
    return {
      ctl: {
        form: {
          content: '',
          value: null,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        },
        reviewList: [],
        count: 5,
        loading: false,
        dialogFormVisible: false,
      },
      ts: {
        review: this.newStore(),
        comrate: this.newStore(),
      },
    };
  },
  computed: {
    noMore() {
      if (this.ts.review.o) {
        return this.ctl.count >= this.ts.review.d.review.length;
      }
      return false;
    },
    disabled() {
      return this.ctl.loading || this.noMore;
    },
  },
  created() {
    this.qryAllReview();
  },
  methods: {
    load() {
      this.ctl.loading = true;
      setTimeout(() => {
        for (let i = this.ctl.count; i < this.ctl.count + 1; i += 1) {
          this.ctl.reviewList.push(this.ts.review.d.review[i]);
        }
        this.ctl.count += 1;
        this.ctl.loading = false;
      }, 1000);
    },
    qryAllReview() {
      this.ctl.reviewList = [];
      this.spost(this.ts.review, '/About/methods/selReview', {
      }).then((rs) => {
        for (let i = 0; i < (rs.d.review.length < 5 ? rs.d.review.length : 5); i += 1) {
          this.ctl.reviewList.push(rs.d.review[i]);
        }
      });
    },
    leaveMessage() {
      if (this.session.login) {
        this.ctl.dialogFormVisible = true;
      } else {
        this.$message({
          message: '暂未登录，请登录后进行留言',
          type: 'warning',
        });
      }
    },
    closeDialog() {
      this.ctl.form.value = null;
      this.ctl.form.content = '';
    },
    cancleRate() {
      this.ctl.dialogFormVisible = false;
    },
    commitRate() {
      if (this.ctl.form.content && this.ctl.form.value) {
        this.spost(this.ts.comrate, '/About/methods/addRate', {
          nickName: this.session.user,
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          title: this.ctl.form.content,
          rate: this.ctl.form.value,
        }).then((rs) => {
          this.ctl.dialogFormVisible = false;
          if (rs.d.status) {
            this.qryAllReview();
            this.$message({
              message: '留言成功',
              type: 'success',
            });
          } else {
            this.$message({
              message: '留言失败,请稍后再试',
              type: 'error',
            });
          }
        });
      } else {
        this.$message({
          message: '请输入留言内容及评价',
          type: 'warning',
        });
      }
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
.userRate::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.userRate::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #a2a2a2;
}
.userRate::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
</style>
