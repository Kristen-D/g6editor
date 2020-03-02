<!--web账户登录页面-->
<template>
  <el-row type="flex" class="login-main">
    <el-col :span="11">
      <el-row class="login-l" type="flex" align="middle">
        <img src="/static/sdsec/image/asiainfo-icon.png"/>
        <h1>安全管理平台</h1>
        <hr />
        <span>严格落实网络安全法与等级保护，实现威胁行为的实时。监测与智能分析，联合威胁情报狩猎追踪，自动响应第一时间降低危害。</span>
      </el-row>
    </el-col>
    <el-col :span="13">
      <el-row type="flex" justify="center" align="middle" class="login-title">
        <span>登录</span>
      </el-row>
      <WebLoginPage></WebLoginPage>
      <!--<el-tabs v-model="tabActiveName" @tab-click="clickTab" stretch="true">
        <el-tab-pane label="账户登录" name="1">
          <WebLoginPage v-if="tabActiveName==='1'"></WebLoginPage>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="2">
          <WebLoginPage v-if="tabActiveName==='2'"></WebLoginPage>
        </el-tab-pane>
      </el-tabs>-->
    </el-col>
  </el-row>
</template>

<script>
    import WebLoginPage from './WebLoginPage';

    export default {
        components: {
            WebLoginPage,
            WebLoginPage
        },
        data() {
            return {
                tabActiveName: "1"
            }
        },
        methods: {
            clickTab: function (tab, event) {

            }
        },
        created: function () {
        }
    }
</script>

<style>
  .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .el-tabs__active-bar {
    left: 25%;
  }
  .login-main {
    height: 100%;
  }
  .login-main > div {
    height: 100%;
  }
  .login-main > div:first-child {
    background:linear-gradient(360deg,rgba(75,67,215,1) 0%,rgba(29,129,218,1) 100%);
    border-radius:10px 0px 0px 10px;
    width: 33em;
  }
  .login-main > div:last-child {
    background:rgba(255,255,255,1);
    width: 42em;
  }
  .login-main .login-l {
    background: url(/static/sdsec/image/login-p1.png) no-repeat center;
    background-size: cover;
    height: 100%;
    flex-direction: column;
  }
  .login-main .login-l img {
    height: 12%;
    margin-top: 7%;
  }
  .login-main .login-l h1 {
    font-size:24px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-top: 10px;
  }
  .login-main .login-l hr {
    height: 1px;
    border: none;
    border-top: 1px solid rgba(255,255,255,0.1);
    width: 73%;
    margin: 10px 0;
  }
  .login-main .login-l span {
    font-size:12px;
    font-family:MicrosoftYaHeiUILight;
    color:rgba(255,255,255,1);
    letter-spacing:1px;
    width: 73%;
    text-align: center;
  }
  .login-main .login-title {
    font-size:36px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(0,123,232,1);
    height: 35%;
  }
  .login-main .el-tabs__nav-wrap::after {
    display: none;
  }
  .login-main .el-tabs__active-bar {
    display: none;
  }
  .login-main .el-tabs__item {
    padding: 0;
    margin: 0 20px;
  }
  .login-main .el-tabs__item.is-active {
    border-bottom: 2px solid #409EFF;
    padding-right: 0px;
  }
</style>

