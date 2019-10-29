<template>
  <e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">

import ECharts from "components/vue-echarts/ECharts.vue"
import { BasePie } from "../ChartsOption.js"

export default {
  props: ['pd'],
  components: {
    ECharts,
  },
  watch: {
    pd: {
      handler() {
        this.getInitData();
      },
      // immediate: true,
      deep: true
    }

  },
  data() {
    return {
      option: BasePie,
      colors: {
        '已完成': '#2ecc71',
        '启动中': '#fec007',
        '已启动': '#fe9700',
        '停止中': '#8ac24a',
        '已停止': '#f0db2b',
        '启动失败': '#f72e00',
        '废弃': '#5667ca',
        '未知': '#116ca9',
        '总数': '#4834d4'
      }
    }
  },
  methods: {
    getInitData() {
      let obj = JSON.stringify(this.option);
      this.option = JSON.parse(obj);

      this.option.series.name = this.pd.name;
      this.option.title.text = this.pd.text;
      this.option.title.subtext = this.pd.subtext;

      var piedata = this.pd.piedata
      var total = 0;

      
      if (this.pd.piedata.length > 0) {
        for (var i = 0; i < this.pd.piedata.length; i++) {
          if (!this.pd.assign) {
            this.option.series.data.push({
              name: this.pd.piedata[i].name,
              value: this.pd.piedata[i].value,
              itemStyle: {
                normal: {
                  color: this.colors[this.pd.piedata[i].name]
                }
              },
            });
          }
          this.option.legend.data[i] = this.pd.piedata[i].name;
          total += this.pd.piedata[i].value;
        };
        if (this.pd.assign) {
          this.option.series.data = this.pd.piedata;
          this.option.color = this.pd.color;
        }
        this.option.series.itemStyle.normal.color = null;
        this.option.series.itemStyle.normal.borderWidth = 2;
        this.option.series.silent = false;
        this.option.tooltip.show = true;
        this.option.legend.selectedMode = true;
      } else {
        this.option.series.data = [0];
        this.option.series.itemStyle.normal.color = ['#eef1f6'];
        this.option.series.itemStyle.normal.borderWidth = 0;
        this.option.series.silent = true;
        this.option.tooltip.show = false;
        this.option.legend.selectedMode = false;
        this.option.title.text = 0;
        total = 0;
      }

      if (this.pd.piedata.length < 3) {
        this.option.legend.y = "82%";
      };

      let self = this;
      let list = this.pd.piedata.map((item) => {
        return item.value;
      })
      this.option.legend.formatter = function (name) {
        for (var i = 0; i < piedata.length; i++) {
          if (name == piedata[i].name && total != 0) {
            // return name +' '+ (piedata[i].value / total * 100).toFixed(2) + '%';
            let percent = self.common.getPercentWithPrecision(list,i,2)
            return name +' '+ percent + '%';
          } else if (total == 0) {//数据为0时图例处理
            return name + '0.00%';
          }
        }
      };

    }

  },
  created() {

  },
  mounted() {
    // this.getInitData();
  }
}
</script>
