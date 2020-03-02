<template>
  <e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from "components/vue-echarts/ECharts.vue"
import { lineCategory } from "../ChartsOption.js"
export default {
  props: ['pd'],
  components: {
    ECharts,
  },
  data() {
    return {
      option: lineCategory,
      lineData: {},
      colors: {
        // 'STARTED': '#3498db',
        // 'COMPLETED': '#2ecc71',
        // 'FAILED': '#f72e00',
        // 'STOPPED': '#f0db2b',
        // 'TOTAL': '#4834d4'
        '已完成': '#2ecc71',
        '启动中': '#fec007',
        '已启动': '#fe9700',
        '停止中': '#8ac24a',
        '已停止': '#f0db2b',
        '启动失败': '#f72e00',
        '废弃': '#5667ca',
        '未知': '#116ca9',
        '总数':'#4834d4'
      }
    }
  },
  watch: {
    pd: {
      handler(newName, oldName) {
        this.lineData = { ...this.pd }
        let ds = this.common.getDateList(7, "MM-dd");
        this.option.xAxis.data = ds;
        let names = [];
        let dataList = [];
        for (let item of this.pd.data) {
          names.push(item.name);
          let newList = this.getFormateData(item.list, ds)
          dataList.push(newList);
        }
        this.lineData.name = names;
        this.lineData.data = dataList;
        this.getInitData()
      },
      deep: true
    }
  },
  methods: {
    // getDate(day) { //生成近day天的数据
    //   var axis = [];
    //   var myDate = new Date();
    //   for (var i = 0; i < day; i++) {
    //     var lw = new Date(myDate - 1000 * 60 * 60 * 24 * (day - 1 - i)); //最后一个数字30可改，30天的意思
    //     var lastY = lw.getFullYear();
    //     var lastM = lw.getMonth() + 1;
    //     var lastD = lw.getDate();
    //     var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
    //     //      startdate = startdate.substring(startdate.length - 5);
    //     axis.push(startdate);
    //   }
    //   this.option.xAxis.data = axis;
    // },
    getFormateData(list, ds) {
      let newList = [];
      ds.forEach((d) => {
        let n = list.find((u) => {
          return d === u.name;
        })
        if (n === undefined) {
          newList.push(0);
        } else {
          newList.push(n.value);
        }
      })
      return newList;
    },

    getInitData() {
      let obj = JSON.stringify(this.option);
      this.option = JSON.parse(obj);

      var legendData = [];
      var seriesobj = [];

      //生成series对象,判断有无数据
      if (this.lineData.data.length) {
        for (var i = 0; i < this.lineData.data.length; i++) {
          seriesobj.push({
            name: this.lineData.name[i],
            data: this.lineData.data[i],
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: this.colors[this.lineData.name[i]]
              }

            },
            lineStyle: {
              normal: {
                width: 3,
              }
            },
          })
        }
      } else {
        for (var i = 0; i < this.lineData.name.length; i++) {
          seriesobj.push({
            name: this.lineData.name[i],
            data: [0],
            type: 'line',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 3,
              }
            },
          });
          this.option.xAxis.axisLabel.show = false;
        }
      };

      this.option.series = seriesobj;

      //判断X轴坐标是否有值传入，没有则直接使用产生的数组
      if (this.lineData.xaxis.length) {
        this.option.xAxis.data = this.lineData.xaxis;
      }

      let axislen = this.option.xAxis.data.length;
      let tipstr = this.lineData.tip;

      //折线颜色
      // this.option.color = this.lineData.color;

      //legend数据名称以及图例形状
      for (var i = 0; i < this.lineData.name.length; i++) {
        legendData.push({
          name: this.lineData.name[i],
          icon: "circle",
        })
      };
      this.option.legend.data = legendData;

      //x轴显示的间隔
      if (axislen <= 7) {
        this.option.xAxis.axisLabel.interval = 0
      } else {
        this.option.xAxis.axisLabel.interval = (axislen === 0 || axislen % 5 === 0) ? 3 : (axislen % 5);
      }
      //显示在x轴的日期为MM-DD
      this.option.xAxis.axisLabel.formatter = function (value, index) {
        return value.substring(value.length - 5);
      }

      //tooltip显示
      this.option.tooltip.formatter = function (params) {
        var mark = '';
        for (var i = 0; i < params.length; i++) {
          mark += '<br/>' + params[i].marker + params[i].seriesName + ':' + params[i].value;
        }
        return tipstr.timestr + ':' + params[0].name + mark;
      };
    }
  },
  mounted() {

    // this.getInitData();

  },
  created() {
    // this.getDate(30);
  }
}
</script>