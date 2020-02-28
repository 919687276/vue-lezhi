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
    <div style="display:grid;grid-template-rows:1fr 4fr;">
      <div style="display:flex;justify-content:center;align-items:center;">联系我们</div>
      <div style="width:80vw;margin:auto;">
        <ve-amap
          :settings="chartSettings"
          :series="chartSeries"
          :tooltip="chartTooltip"
          :after-set-option-once="getMap"
        >
        </ve-amap>
      </div>
    </div>
    <div style="display:grid;grid-template-rows:1fr 5fr;">
      <div style="display: flex;justify-content: center;align-items: center;">访客统计</div>
      <div style="display: flex;justify-content: center;align-items: center;">
        <ve-line :data="ts.record.d" :settings="ctl.chartSettings" :extend="ctl.extens" width="80vw"></ve-line>
      </div>
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
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=c87eb384e2a929b87f7d9dcfa04f38ed&plugin=AMap.Driving"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
import moment from 'moment';

export default {
  inject: ['session'],
  data() {
    return {
      chartSettings: {
        key: 'c87eb384e2a929b87f7d9dcfa04f38ed',
        v: '1.4.3',
        amap: {
          resizeEnable: true,
          center: [116.39, 39.9],
          zoom: 8,
          lang: 'zh_en',
          scrollWheel: false,
          viewMode: '3D',
        },
      },
      chartTooltip: { show: true },
      chartSeries: [
        {
          type: 'scatter',
          coordinateSystem: 'amap',
        },
      ],
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
        chartSettings: {
          labelMap: {
            accessUser: '访问用户',
            newMember: '新增会员',
          },
          axisSite: { right: ['20'] },
        },
        extens: {
          xAxis: {
            axisLabel: { interval: 0 },
          },
        },
      },
      ts: {
        review: this.newStore(),
        comrate: this.newStore(),
        record: this.newStore(),
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
    this.qryVisitorRecord();
  },
  methods: {
    getMap(echarts) {
      const amap = echarts.getModel().getComponent('amap').getAMap();
      // eslint-disable-next-line no-undef
      const marker = new AMap.Marker({
        // eslint-disable-next-line no-undef
        position: new AMap.LngLat(117.1993700000, 39.0851000000), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '天津',
      });
      amap.add(marker);
      amap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.Geolocation',
      ], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        // eslint-disable-next-line no-undef
        amap.addControl(new AMap.ToolBar());
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        // eslint-disable-next-line no-undef
        amap.addControl(new AMap.Scale());
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        // eslint-disable-next-line no-undef
        amap.addControl(new AMap.OverView({ isOpen: true }));
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        // eslint-disable-next-line no-undef
        amap.addControl(new AMap.Geolocation());
      });
      // amap.plugin([
      //   'AMap.Driving',
      // ], () => {
      //   // eslint-disable-next-line no-undef
      //   const driving = new AMap.Driving({
      //     map: amap,
      //     panel: 'panel',
      //   });
      //   // console.log(driving.search());
      //   // eslint-disable-next-line no-undef
      //   driving.search(new AMap.LngLat(116.39, 39.9), new AMap.LngLat(117.1993700000, 39.0851000000), (status, result) => {
      //   // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //     if (status === 'complete') {
      //       console.log('绘制驾车路线完成');
      //     } else {
      //       console.log(`获取驾车数据失败：${result}`);
      //     }
      //   });
      // });
    },
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
    qryVisitorRecord() {
      this.spost(this.ts.record, '/About/methods/qryVisitorRecord', {
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
