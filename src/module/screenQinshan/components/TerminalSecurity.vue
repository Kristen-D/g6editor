<template>
  <qinshan-component-panel title="终端安全">
    <e-charts :options="option" auto-resize style="height: 100px;"></e-charts>
    <ul class="list-bar">
      <li>
        <div class="progressbar">
          <div class="progress-bar animated progress-animated" style="width: 90%"></div>
        </div>
        <div class="progresstext">
          <label>一厂区</label>
          <span class="float-r">90%</span>
        </div>
      </li>
      <li>
        <div class="progressbar">
          <div class="progress-bar animated progress-animated" style="width: 85%"></div>
        </div>
        <div class="progresstext">
          <label>二厂区</label>
          <span class="float-r">85%</span>
        </div>
      </li>
      <li>
        <div class="progressbar">
          <div class="progress-bar animated progress-animated" style="width: 78%"></div>
        </div>
        <div class="progresstext">
          <label>三厂区</label>
          <span class="float-r">78%</span>
        </div>
      </li>
    </ul>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {terminalSecurity} from "./ChartOptions";

  export default {
    components: {
      ECharts,
      QinshanComponentPanel},
    name: "terminal-security",
    data() {
      return {
        option: terminalSecurity
      }
    },
    methods: {
      async refreshData(){

        let data = await this.common.req('/ssa/screenExhibit/getInstallNum.do', {}, this);
        // let data = [{"install_num":1969,"terminal_num":2448}];

          let value = Math.floor(data[0]["install_num"] / data[0]["terminal_num"] * 100);
          this.option.series[0].data[0].value = value;
          this.option.title.text = `{x|${value}%}\n{a|杀毒软件安装率}`
       


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
  ul.list-bar {
    padding: 12px 0 15px;
  }

  ul.list-bar li {
    padding: 10px 18px;
    color: #fff;
  }

  .progressbar {
    vertical-align: baseline;
    height: 30px;
    overflow: hidden;
    background-color: #232734;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
  }

  .progress-bar {
    width: 0;
    height: 100%;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    background-color: #027fd4;
  }

  .progress-animated {
    -webkit-transition: 5s all;
    -webkit-animation-duration: 5s;
    -webkit-animation-name: animationProgress;
    transition: 5s all;
    animation-duration: 5s;
    animation-name: animationProgress;
  }

  @-webkit-keyframes animationProgress {
    from {
      width: 0;
    }
  }

  @keyframes animationProgress {
    from {
      width: 0;
    }
  }

  .progresstext {
    margin-top: -25px;
    padding: 0 10px 0 5px;
  }
</style>
