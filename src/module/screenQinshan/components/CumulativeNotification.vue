<template>
  <qinshan-component-panel title="通报累计">
    <div class="chart-container" @click="chartClick">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
    <qinshan-dialog
    :dialog="dialog"
    @close="dialogClose">
      <el-table
          :data="tableData"
          border
          stripe
          :align="center"
          style="width: 600px">
        <el-table-column
            prop="name"
            label="通报文件">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="发布源">
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间">
        </el-table-column>
      </el-table>
    </qinshan-dialog>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {cumulative} from "./ChartOptions";
  import QinshanDialog from "./QinshanDialog";

  export default {
    components: {
      QinshanDialog,
      ECharts,
      QinshanComponentPanel},
    name: "cumulative-notification",
    data() {
      return {
        option: cumulative,
        dialog: {
          title: '通报累计', visible: false
        }
      }
    },
    methods: {
      dialogClose () {
        this.dialog.visible = false;
      },
      chartClick () {
        // this.dialog.visible = true;
      },
      loadChart(data) {
        let seriesData = [];
        let total = 0;
        seriesData = data.lineData.map((item) => {
          total += item.count;
          return item.count;
        });
        this.option.title.text[1] = `{x|${total}}`;
        this.option.xAxis[0].data = data.xAxis;
        this.option.series[0].data = seriesData;
      }
    },
    created () {
      let data = {"xAxis":["20190118","20190119","20190120","20190121","20190122","20190123","20190124"],
        "lineData": [{count: 33},{count: 22},{count: 32},{count: 22},{count: 56},{count: 32},{count: 23}]}
      this.loadChart(data);
    },
 
  }
</script>

<style scoped>

</style>
