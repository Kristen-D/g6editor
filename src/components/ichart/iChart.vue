<template>
<div style="width:1200px;height:700px;">
  <chart :options="opt" :init-options="initOptions" :theme="this.chartTheme" auto-resize />
</div>
</template>
<script>
import pie from './chartType/pie.js'
import line from './chartType/line.js'
import 'echarts/theme/dark'
import ECharts from "components/vue-echarts/ECharts.vue"
import aaa from './theme/theme.json'
ECharts.registerTheme('ovilia-green', aaa)
export default {
  data() {
    return {

      opt: null,
      pie,
      line,
      initOptions: {
        renderer: 'canvas'
      }
    }
  },
  props: {
    chartTheme: [String, Object],
    chartData: Object,
    chartType: String,
    options: Object
  },
  components: {
    chart: ECharts
  },

  watch: {
    chartTheme(val) {
      this.chartTheme= val;
    },
    chartData(val) {
      switch (this.chartType) {
        case 'line':
          this.createLine(val);
          break;
        case 'bar':
          this.createLine(val);
          break;
        case 'pie':
          this.createPie(val);
          break;
        default:

      }
    },
    chartType(val) {
      this.chartType = val;
    }
  },
  methods: {
    createLine(val) {

      this.chartData = val;
      this.opt = this.line;
      for (var key in this.options) {
        this.opt[key] = this.options[key]
      }
      if (this.chartData.legend != "null") {
        this.opt.legend.data = this.chartData.legend;
      }




      this.opt.xAxis.data = this.chartData.xAxis;
      var arr = [];
      for (var i = 0; i < this.chartData.series.length; i++) {
        var obj = {};
        if (this.chartData.legend != "null") {
          obj.name = this.opt.legend.data[i];
        }


        //是否堆叠
        if (this.options.isAreaStyle) {
          obj.areaStyle = {
            normal: {}
          };
        }


        obj.type = this.chartType;
        obj.data = this.chartData.series[i];
        this.opt.series.push(obj);
      }
    },
    createPie(val) {
      this.chartData = val;
      this.opt = this.pie;
      for (var key in this.options) {
        this.opt[key] = this.options[key]
      }
      this.opt.legend.data = this.chartData.xAxis;
      var arr = [];
      for (var i = 0; i < this.opt.legend.data.length; i++) {
        var obj = {};
        if (this.opt.legend != "null") {
          obj.name = this.opt.legend.data[i];
        }
        obj.value = this.chartData.series[0][i];
        arr.push(obj);
      }
      var serie = {};
      serie.data = arr;
      serie.type = this.chartType;
      //    serie.radius = ['50%', '70%'];
      this.opt.series.push(serie);



    }



  },
  mounted: function() {}
}
</script>
