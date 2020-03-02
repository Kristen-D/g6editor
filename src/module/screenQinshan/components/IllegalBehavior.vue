<template>
  <qinshan-component-panel title="违规行为">
    <ul class="attacktype-content irregularities-content">
      <li>
        <div class="el-box" @click="dialogShow('export')">
          <span class="el-box-stl"></span><span class="el-box-str"></span>
          <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
          <p class="number">{{values[1]}}</p>
          <p class="name" id="namevalue">外联数</p>
        </div>
        <div class="el-box" @click="dialogShow('u')">
          <span class="el-box-stl"></span><span class="el-box-str"></span>
          <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
          <p class="number">{{values[0]}}</p>
          <p class="name">U盘数</p>
        </div>
      </li>
      <li class="chart">
        <e-charts :options="option" auto-resize></e-charts>
      </li>
    </ul>
    <qinshan-dialog
        :dialog="dialog"
        @close="dialogClose">
      <el-table
          :data="tableData"
          border
          stripe
          :align="center"
          style="width: 400px">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="IP">
        </el-table-column>
      </el-table>
    </qinshan-dialog>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {illegalBehavior} from "./ChartOptions";
  import QinshanDialog from "./QinshanDialog";
  import dialog from "../../viewPlugins/store/modules/dialog";

  export default {
    components: {
      QinshanDialog,
      ECharts,
      QinshanComponentPanel},
    name: "illegal-behavior",
    data () {
      return {
        option: illegalBehavior,
        dialog: {
          title: '', visible: false
        },
        tableData: [],
        values: [0, 0]
      }
    },
    methods: {
      loadChart(data) {
        let xAxis = data.xAxis;
        let lineData = data.lineData;
        let seriesData = [[], []];

        let values = [0, 0];
        lineData.map((data, index) => {
          data.map((item) => {
            seriesData[index].push([item.days, item.count]);
            values[index] += item.count;
          });
        });
        this.values = values;
        this.option.xAxis.data = xAxis;
        this.option.series[1].data = seriesData[0];
        this.option.series[0].data = seriesData[1];
      },
      dialogShow(type) {
        // switch (type) {
        //   case "export":
        //     this.dialog = {
        //       title: '违规记录-外联', visible: true
        //     };
        //     break;
        //   case "u":
        //     this.dialog = {
        //       title: '违规记录-U盘', visible: true
        //     };
        //     break;
        // }
      },
      dialogClose () {
        dialog.visible = false;
      },
      async refreshData(){
        let data = await this.common.req('/ssa/screenExhibit/getLineAud.do',
            {dataRange: 'month'}, this);
        // let data = {"xAxis":["20171218","20171219","20171220","20171221","20171222","20171223","20171224","20171225","20171226","20171227","20171228","20171229","20171230","20171231","20180101","20180102","20180103","20180104","20180105","20180106","20180107","20180108","20180109","20180110","20180111","20180112","20180113","20180114","20180115","20180116"],"lineData":[[{"logType_s":"U盘","count":2,"days":"20171222"},{"logType_s":"U盘","count":1,"days":"20180105"},{"logType_s":"U盘","count":23,"days":"20180109"},{"logType_s":"U盘","count":11457,"days":"20180110"},{"logType_s":"U盘","count":1265,"days":"20180111"},{"logType_s":"U盘","count":1193,"days":"20180112"},{"logType_s":"U盘","count":31,"days":"20180113"},{"logType_s":"U盘","count":47,"days":"20180114"},{"logType_s":"U盘","count":141,"days":"20180115"},{"logType_s":"U盘","count":97,"days":"20180116"}],[{"logType_s":"外联","count":5,"days":"20180110"},{"logType_s":"外联","count":5,"days":"20180111"},{"logType_s":"外联","count":5,"days":"20180112"},{"logType_s":"外联","count":5,"days":"20180113"},{"logType_s":"外联","count":5,"days":"20180114"},{"logType_s":"外联","count":5,"days":"20180115"}]]}

            this.loadChart(data);
     


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

  ul.irregularities-content li:first-of-type {
    width: calc(35% - 20px);
  }

  ul.irregularities-content li:last-child {
    width: calc(60%);
  }

  ul.irregularities-content li > div.el-box {
    margin: 10px 0 20px;
    padding: 15px 10px;
  }

  ul.irregularities-content li > div.el-box:last-child {
    margin-bottom: 10px;
  }

  ul.irregularities-content li > div.el-box:hover {
    cursor: pointer;
  }

  ul, ul li.chart {
    height: 100%;
  }
</style>
