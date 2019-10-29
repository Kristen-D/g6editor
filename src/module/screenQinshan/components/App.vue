<template>
  <div class="big-screen">
    <header class="header">
        <img src="/static/images/screen_qs/logo.png" style="margin-left: 100px;" alt="logo">
      <!-- <h2 class="header-title">秦山核电网络安全态势感知平台</h2> -->
    </header>
    <div class="announcement" @click="editAnnouncement">
      <span class="tip-left"></span><span class="tip-right"></span>
      <marquee direction="left" behavior="scroll" scrollamount="30" scrolldelay="200" onMouseOut="this.start()"
               onMouseOver="this.stop()">{{value}}
      </marquee>
    </div>
    <section class="container-wrap">
      <el-row :gutter="18">
        <el-col :span="6">
          <div style="height: 187px;">
            <net-attack></net-attack>
          </div>
          <div style="height: 180px; margin-top: 10px;">
            <attack-level></attack-level>
          </div>
          <div style="height: 159px; margin-top: 10px;">
            <attack-type></attack-type>
          </div>
        </el-col>
        <el-col :span="12">
          <region-mark></region-mark>
        </el-col>
        <el-col :span="6">
          <remote-login></remote-login>
          <terminal-security></terminal-security>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="6">
          <bug-find></bug-find>
        </el-col>
        <el-col :span="5" style="height: 300px">
          <mail-check></mail-check>
        </el-col>
        <el-col :span="7" style="height: 300px;">
          <illegal-behavior></illegal-behavior>
        </el-col>
        <el-col :span="6" style="height: 300px;">
          <cumulative-notification></cumulative-notification>
        </el-col>
      </el-row>
    </section>
    <qinshan-dialog
        :dialog="dialog"
        @close="dialogClose">
      <textarea class="edit-text" v-model="dialog.announcement"></textarea>
      <div>
        <el-button class="float-r" type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </qinshan-dialog>
  </div>
</template>

<script>

  import NetAttack from "./NetAttack";
  import AttackType from "./AttackType";
  import AttackLevel from "./AttackLevel";
  import RegionMark from "./RegionMark";
  import RemoteLogin from "./RemoteLogin";
  import TerminalSecurity from "./TerminalSecurity";
  import BugFind from "./BugFind";
  import MailCheck from "./MailCheck";
  import IllegalBehavior from "./IllegalBehavior";
  import CumulativeNotification from "./CumulativeNotification";
  import QinshanDialog from "./QinshanDialog";

  export default {
    components: {
      QinshanDialog,
      CumulativeNotification,
      IllegalBehavior,
      MailCheck,
      BugFind,
      TerminalSecurity,
      RemoteLogin,
      RegionMark,
      AttackLevel,
      AttackType,
      NetAttack
    },
    id: "app",
    methods: {},
    data() {
      return {
        value: '',
        dialog: {
          title: '编辑公告', visible: false,
          announcement: ''
        }
      }
    },
    methods: {
      editAnnouncement() {
        this.dialog.announcement = this.value;
        this.dialog.visible = true;
      },
      dialogClose () {
        this.dialog.visible = false;
      },
      editConfirm () {
        this.value = this.dialog.announcement;
        this.dialogClose();
      },
      async refreshData(){
        let data = [{"value": "漏洞具体为，Linux内核的内存子系统在处理写入时复制COPY-ON-WRITE"}];
        this.remark = data[0].remark;
        this.value = data[0].value;
      }
    },
    created() {
      // let data = await this.common.req('/ssa/screenExhibit/getSCREEN_QS.do', {}, this);
      this.refreshData();
      setInterval(() => {
        this.refreshData();
      }, 60000);
    },

  }
</script>

<style>
  @font-face {
    font-family: "ElementalEnd";
    src: url('/static/images/screen_qs/ElementalEnd.ttf') format('truetype');
    src: url('/static/images/screen_qs/ElementalEnd-Italic.ttf') format('ttf'),
    url('/static/images/screen_qs/ElementalEnd.ttf') format('truetype');
  }

  .big-screen {
    width: 1920px;
    height: 1080px;
    background: url(/static/images/screen_qs/bigscreen-bg1.png) no-repeat #070c24;
    overflow: auto;
    color: rgba(255, 255, 255, 0.7);
  }

  header.header {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
  }

  header.header > .header-title {
    color: #a7eeff;
    font-size: 29px;
    font-weight: 600;
    padding-left: 9%;
    line-height: 78px;
  }

  .announcement {
    position: relative;
    width: 890px;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    margin-top: 20px;
    color: #7aaebe;
    font-size: 23px;
    font-weight: 600;
  }

  .announcement > span.tip-left, .announcement > span.tip-right {
    position: absolute;
    z-index: 6;
    display: inline-block;
    height: 70px;
    width: 30px;
    margin-top: -8px;
    background-color: rgba(5, 9, 22, 0.92);
  }

  .announcement > span.tip-left {
    margin-left: -3px;
    border-top-left-radius: 1.4em;
    -ms-transform: rotate(45deg); /* IE 9 */
    -moz-transform: rotate(45deg); /* Firefox */
    -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
    -o-transform: rotate(45deg); /* Opera */
    transform: rotate(45deg);
  }

  .announcement > span.tip-right {
    right: 0px;
    margin-right: -3px;
    border-top-right-radius: 1.4em;
    -ms-transform: rotate(-45deg); /* IE 9 */
    -moz-transform: rotate(-45deg); /* Firefox */
    -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
    -o-transform: rotate(-45deg); /* Opera */
    transform: rotate(-45deg);
  }

  .container-wrap {
    margin: 40px 86px 0;
    overflow: hidden;
  }

  .el-box {
    position: relative;
    width: 100%;
    background-color: #081c2c;
    padding: 10px;
    box-sizing: border-box;
  }

  .el-box-stl {
    position: absolute;
    left: 0px;
    top: 0px;
    background: url(/static/images/screen_qs/box-border2.png) no-repeat;
    background-position: 0% 0%;
    width: 20px;
    height: 10px;
  }

  .el-box-str {
    position: absolute;
    right: 0px;
    top: 0px;
    background: url(/static/images/screen_qs/box-border2.png) no-repeat;
    background-position: 100% 0%;
    width: 20px;
    height: 10px;
  }

  .el-box-sbl {
    position: absolute;
    left: 0px;
    bottom: 0px;
    background: url(/static/images/screen_qs/box-border2.png) no-repeat;
    background-position: 0% 100%;
    width: 20px;
    height: 10px;
  }

  .el-box-sbr {
    position: absolute;
    right: 0px;
    bottom: 0px;
    background: url(/static/images/screen_qs/box-border2.png) no-repeat;
    background-position: 100% 100%;
    width: 20px;
    height: 10px;
  }

  .v-modal {
    opacity: 0.7;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }
  .edit-text {
    width: 500px;
    height: 300px;
    background: transparent;
    color: white;
    padding: 10px;
    font-size: 20px;
  }
</style>
