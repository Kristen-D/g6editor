<template>
  <qinshan-component-panel title="远程登录">
    <ul class="attacktype-content clearfloat">
      <li class="float-l">
        <div class="el-box el-box-bg-trans"><i class="telnet-icon"></i></div>
      </li>
      <li class="float-l">
        <div class="el-box" style="padding: 20px 0;">
          <span class="el-box-stl"></span><span class="el-box-str"></span>
          <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
          <p class="number">{{count}}</p>
          <p class="name">用户登录次数</p>
        </div>
      </li>
    </ul>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";

  export default {
    components: {QinshanComponentPanel},
    name: "remote-login",
    data () {
      return {
        count: 0
      }
    },
    methods: {
      async refreshData(){

        let data = await this.common.req('/ssa/screenExhibit/getVpnOther.do',
            {dataRange: 'month'}, this);
        // let data = [{"count":2058}];
      if(data[0]!=undefined){
        this.count = data[0].count;
      }


      }

    },
      created () {
        this.refreshData();
        setInterval(() => {
          this.refreshData();
        }, 60000);
    },

  }
</script>

<style scoped>
  .telnet-icon {
    background: url(/static/images/screen_qs/telnet-icon.png) no-repeat center center;
    display: inline-block;
    height: 80px;
    width: 80px;
  }

  .el-box-bg-trans {
    background-color: transparent;
  }

  ul.attacktype-content li {
    float: left;
    display: inline-block;
    text-align: center;
    margin: 0 10px;
    width: calc(50% - 20px);
    color: #23ffff;
  }

  ul.attacktype-content li p.number {
    text-align: center;
    font-family: "ElementalEnd";
    font-size: 26px;
    line-height: 40px;
  }

</style>
