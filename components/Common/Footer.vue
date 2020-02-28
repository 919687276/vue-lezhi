<template>
  <div>
    <div class="cloud-banner">
      <div class="cloud-bubble-one"></div>
      <div class="cloud-bubble-two"></div>
      <div class="cloud-bubble-three"></div>
      <div class="cloud-bubble-text">获得最新的学习资料和考试资源</div>
      <div class="cloud-bubble-link">
        <a href="">了解详情</a>
      </div>
    </div>
    <div class="cloud-footer">
      <div class="cloud-footer-box">
        <div class="cloud-footer-feature">
          <ul class="clearfix">
            <li class="feature-item001">
              <a href="#">
                <span>7*24小时服务支持</span>
              </a>
            </li>
            <li class="feature-item002">
              <a href="#">
                <span>快速备考</span>
              </a>
            </li>
            <li class="feature-item003">
              <a href="#">
                <span>名师辅导</span>
              </a>
            </li>
            <li class="feature-item004">
              <a href="#">
                <span>7天无理由退款</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="cloud-footer-nav clearfix">
          <div class="cloud-footer-nav-logo">
            <div class="cloud-comm">
              <div class="cloud-comm-logo">
                <span></span>
              </div>
              <div class="cloud-info">
                <p>乐智教育</p>
                <p>TEl:&nbsp;010-888-4000 (7x24h)</p>
              </div>
            </div>
            <div class="cloud-share">
              <p class="wei-xin" v-show="ctl.weixin">
                <span class="corner wx-corner"></span>
              </p>
              <p class="wei-bo" v-show="ctl.weibo">
                <span class="corner wx-corner"></span>
              </p>
              <ul class="clearfix">
                <li>
                  <a href="#">
                    <span class="icon-blog" @mouseenter="ctl.weibo = true" @mouseleave="ctl.weibo = false"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-wei" @mouseenter="ctl.weixin = true" @mouseleave="ctl.weixin = false"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-qq"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-mail"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="cloud-footer-nav-list clearfix">
            <ul>
              <li class="list-title">新手帮助
              </li>
              <li>
                <a href="#">在线咨询</a>
              </li>
              <li>
                <a href="#">注册登录</a>
              </li>
              <li>
                <a href="#">找回密码</a>
              </li>
              <li>
                <a href="#">资源下载</a>
              </li>
              <li>
                <a href="#">帮助中心</a>
              </li>
            </ul>
            <ul>
              <li class="list-title">会员须知
              </li>
              <li>
                <a href="#">学币规则</a>
              </li>
              <li>
                <a href="#">会员权限</a>
              </li>
              <li>
                <a href="#">会员积分</a>
              </li>
              <li>
                <a href="#">免责声明</a>
              </li>
            </ul>
            <ul>
              <li class="list-title">关于我们
              </li>
              <li>
                <a href="#">公司简介</a>
              </li>
              <li>
                <a href="#">联系我们</a>
              </li>
              <li>
                <a href="#">加入我们</a>
              </li>
              <li>
                <a href="#">发展历程</a>
              </li>
              <li>
                <a href="#">新闻动态</a>
              </li>
              <li>
                <a href="#">友情链接</a>
              </li>
            </ul>
            <ul>
              <li class="list-title">资源上传
              </li>
              <li>
                <a href="#">上传投稿</a>
              </li>
              <li>
                <a href="#">普通资料</a>
              </li>
              <li>
                <a href="#">精品资料</a>
              </li>
              <li>
                <a href="#">上传工具</a>
              </li>
              <li>
                <a href="#">精品模板</a>
              </li>
              <li>
                <a href="#">上传常见问题</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cloud-copyright cloud-copyright-about">
        <p>Copyright © 2018-2022 www.caibo919687276.com. All Rights Reserved. 乐智教育版权所有</p>
        <p class="beian">
          <img src="~assets/images/footer/beiantubiao.png" style="float:left;"/>津公网安备  &nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=12010302001173">12010302001173号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctl: {
        weibo: false,
        weixin: false,
      },
    };
  },
};
</script>

<style scoped>
/* 公共样式表css */
html,body {
    color: #333;
    margin: 0;
    height: 100%;
    font-family: "Myriad Set Pro","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: normal;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: #000;
}

img {
    border: 0;
}

body {
    background: #fff;
    color: #666;
}

html, body, div, dl, dt, dd, ol, ul, li, h1, h2, h3, h4, h5, h6, p, blockquote, pre, button, fieldset, form, input, legend, textarea, th, td {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
    color: #08acee;
}

button {
    outline: 0;
}

img {
    border: 0;
}

button,input,optgroup,select,textarea {
    margin: 0;
    font: inherit;
    color: inherit;
    outline: none;
}

li {
    list-style: none;
}

a {
    color: #666;
}

a:hover {
    color: #eee;
}

.clearfix::after {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
.cloud-banner {
    position: relative;
    background: #0af url(~assets/images/footer/cloud-back.jpg) no-repeat center;
    height: 180px;
    overflow: hidden;
    color: #fff;
    text-align: center;
}

.cloud-bubble-one {
    position: absolute;
    top: -120px;
    left: 50%;
    z-index: 10;
    margin-left: -120px;
    width: 240px;
    height: 240px;
    background: url(~assets/images/footer/cloud-back-bule1.png);
    animation: bubble-animate-1 linear 10s infinite;
}

.cloud-bubble-two {
    position: absolute;
    top: 50px;
    left: 34%;
    z-index: 11;
    width: 360px;
    height: 360px;
    background: url(~assets/images/footer/cloud-back-bule2.png);
    animation: bubble-animate-2 linear 12s infinite;
}

.cloud-bubble-three {
    position: absolute;
    top: 50px;
    left: 48%;
    z-index: 12;
    width: 300px;
    height: 300px;
    background: url(~assets/images/footer/cloud-back-bule3.png);
    animation: bubble-animate-3 linear 11s infinite;
}

@keyframes bubble-animate-1 {
    from {
        top: -120px
    }

    50% {
        top: -180px
    }

    to {
        top: -120px
    }
}

@keyframes bubble-animate-2 {
    from {
        top: 50px;
        left: 34%
    }

    50% {
        top: 80px;
        left: 24%
    }

    to {
        top: 50px;
        left: 34%
    }
}

@keyframes bubble-animate-3 {
    from {
        top: 50px;
        left: 48%
    }

    50% {
        top: 80px;
        left: 58%
    }

    to {
        top: 50px;
        left: 48%
    }
}

.cloud-bubble-text {
    position: relative;
    padding-top: 46px;
    z-index: 20;
    font-size: 24px;
}

.cloud-bubble-link {
    position: relative;
    z-index: 20;
}

.cloud-bubble-link a {
    display: inline-block;
    margin-top: 24px;
    width: 220px;
    height: 44px;
    line-height: 44px;
    border: 1px solid #fff;
    color: #fff;
}

.cloud-bubble-link a:hover {
    color: #333;
    background-color: #fff;
}

.cloud-footer {
    padding: 0 5vw;
    background-color: #2b373d;
    font-family: "Microsoft Yahei";
}

.cloud-footer-box {
    margin: 0 auto;
}

.cloud-footer-feature {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #414b51
}

.cloud-footer-feature ul li {
    float: left;
    width: 25%;
    height: 120px;
}

.cloud-footer-feature ul li a {
    white-space: nowrap;
    display: block;
    line-height: 120px;
    padding-left: 110px;
    background-repeat: no-repeat;
    background-position: 50px center;
    font-size: 18px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.feature-item001 a {
    background-image: url("~assets/images/footer/icon-item001.png")
}

.feature-item002 a {
    background-image: url("~assets/images/footer/icon-item002.png")
}

.feature-item003 a {
    background-image: url("~assets/images/footer/icon-item003.png")
}

.feature-item004 a {
    background-image: url("~assets/images/footer/icon-item004.png")
}

.cloud-footer-nav {
    width: 100%;
    padding: 40px 0 62px;
}

.cloud-footer-nav-logo {
    width: 32%;
    float: left;
}

.cloud-comm {
    padding-left: 20px;
}

.cloud-comm-logo {
    height: 40px;
    background: url(~assets/images/footer/logo-footer.png) no-repeat left;
    background-size: 115px;
}

.cloud-comm-logo span {
    display: inline-block;
    margin-left: 136px;
    margin-top: -5px;
    width: 126px;
    height: 40px;
    background: url(~assets/images/footer/icon-gif.gif) no-repeat left;
}

.cloud-info {
    margin-top: 20px;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
}

.cloud-share {
    width: 100%;
    height: 100%;
    margin-top: 20px;
    position: relative;
}

.cloud-share>p {
    width: 132px;
    height: 132px;
    border: 1px solid #ddd;
    background-color: #fff;
}

.wei-xin {
    position: absolute;
    top: -145px;
    left: 24px;
    background-image: url(~assets/images/footer/icon-ewm.jpg);
    display: block;
    background-size: 132px;
}

.corner {
    border: 10px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    bottom: -20px;
    right: 50%;
    margin-right: -10px;
    z-index: 10;
}

.wei-bo {
    position: absolute;
    top: -145px;
    left: -32px;
    background-image: url(~assets/images/footer/wb.png);
    display: block;
    background-size: 132px;
}

.cloud-share ul li {
    float: left;
    margin-left: 15px;
    width: 40px;
    height: 40px;
}

.cloud-share ul li a {
    display: block;
}

.cloud-share ul li a span {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 40px;
}

.cloud-share ul li .icon-blog {
    background-image: url(~assets/images/footer/wb1.png);
}

.cloud-share ul li .icon-blog:hover {
    background-image: url(~assets/images/footer/wb2.png);
}

.cloud-share ul li .icon-wei {
    background-image: url(~assets/images/footer/wx1.png);
}

.cloud-share ul li .icon-wei:hover {
    background-image: url(~assets/images/footer/wx2.png);
}

.cloud-share ul li .icon-qq {
    background-image: url(~assets/images/footer/qq1.png);
}

.cloud-share ul li .icon-qq:hover {
    background-image: url(~assets/images/footer/qq2.png);
}

.cloud-share ul li .icon-mail {
    background-image: url(~assets/images/footer/yx1.png);
}

.cloud-share ul li .icon-mail:hover {
    background-image: url(~assets/images/footer/yx2.png);
}

.cloud-footer-nav-list {
    width: 68%;
    height: 100%;
    border-left: 1px solid #414b51;
    padding-left: 20px;
    float: left;
}

.cloud-footer-nav-list ul {
    float: left;
    width: 25%;
}

.list-title {
    font-size: 18px;
    color: #fff;
    margin-bottom: 15px;
    line-height: 30px;
}

.cloud-footer-nav-list ul li {
    line-height: 30px;
}

.cloud-footer-nav-list ul li a {
    color: #819199;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
}

.cloud-footer-nav-list ul li a:hover {
    color: #fff;
    text-decoration: underline;
}

.cloud-copyright {
    width: 100%;
    border-top: 1px solid #212a2f;
    padding: 20px 0;
    text-align: center;
}

.cloud-copyright p {
    text-align: center;
    color: #819199;
    font-size: 12px;
    line-height: 25px;
}

.cloud-copyright p a {
    color: #819199;
}

.cloud-copyright p a:hover {
    text-decoration: underline;
}
.beian{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
