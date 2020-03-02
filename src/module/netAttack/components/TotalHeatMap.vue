<template >
<div id="totalHeatMap" class="echartbox1">
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import echarts from 'echarts'
export default {
  computed: {
    ...mapState({
      test: state => state.context.params.test,
    })
  },
  watch: {
    test: function(test) {
    }
  },
  data() {
    return {
      isOpen: false,
      currentIndex: -1,
    }
  },

  methods: {

    async loadMapChart() {
      let params = this.$store.state.context.params;
      let data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnLine.do", params);
      let seriesData = this.fmtData(data);
      // let lenData = [];
      // let seriesData = [];
      // for (let i = 0; i < data.length; i++) {
      //   let dataUnit = data[i];
      //   // var childData = {};
      //   // childData.value=dataUnit.total;
      //   // childData.name=dataUnit.event_type;
      //   lenData.push(dataUnit.days);
      //   seriesData.push(dataUnit.total);
      // };

      let myChart = echarts.init(document.getElementById("totalHeatMap"));



      let option = {
        color: ['rgba(18,134,253,0.7)', 'rgba(80,252,168,0.7)'],
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 15,
            color: "#fff",
          }
        },
        grid: {
          show: true,
          left: 30,
          top: 34,
          right: 10,
          bottom: 42,
          borderColor: 'rgba(53,66,94,0.4)',
        },
        calculable: false,
        xAxis: [{
          type: 'category',
          boundaryGap: false, //坐标轴两边留白策略（类目轴）
          //在（type: 'category'）中设置data有效
          data: seriesData.lenData,

          splitLine: { //坐标轴在 grid 区域中的分隔线；
            show: true,
            lineStyle: { //分割线颜色，可设单个，也可以设置数组。
              color: 'rgba(53,66,94,0.4)'
            }
          },
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: false,
            lineStyle: {
              color: 'rgba(53,66,94,0.4)'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#9ea3b4',
            },
          },
        }],
        yAxis: [{
          type: 'value',
          show:false,
          splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: 'rgba(53,66,94,0.4)'
            }
          },
          axisLine: { //坐标轴轴线相关设置。数学上的y轴
            show: true,
            lineStyle: {
              color: 'rgba(53,66,94,0.4)'
            },
          },
          axisLabel: {
            textStyle: {
              color: '#9ea3b4'
            },
          },

        }],
        series: [
          {
            name: '高危',
            type: 'line',
            smooth: true, //是否平滑曲线显示
            lineStyle: { //线条样式
              normal: {
                width: 1
              }
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(18,134,253,0.7)'
                }, {
                  offset: 0.7,
                  color: 'rgba(18,134,253,0.7)'
                }], false),

                // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色
                //shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            itemStyle: { //折现拐点标志的样式
              normal: {
                color: 'rgba(18,134,253,0.7)'
              }
            },
            data: seriesData.h
          },
          {
            name: '中危',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(80,252,168,0.7)'
                }, {
                  offset: 0.8,
                  color: 'rgba(80,252,168,0.7)'
                }], false),
                // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色。支持的格式同color。
                //shadowBlur: 10 ,//图形阴影的模糊大小。
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(80,252,168,0.7)'

              }
            },
            data: seriesData.m
          },
          {
              name: '低危',
              type: 'line',
              smooth: true, //是否平滑曲线显示
              lineStyle: { //线条样式
                normal: {
                  width: 1
                }
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(	255,105,180,0.7)'
                  }, {
                    offset: 0.7,
                    color: 'rgba(	255,105,180,0.7)'
                  }], false),

                  // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色
                  //shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              itemStyle: { //折现拐点标志的样式
                normal: {
                  color: 'rgba(	255,105,180,0.7)'
                }
              },
              data: seriesData.d
            },
        ] //series结束
      };



      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      // myChart.on('click', function(params) {
      // 	  vm.funbs(params.name,params.dataIndex);
      // });

    },
    funbs(names, index) {
      if (this.currentIndex == -1) {
        this.$store.state.context.params.org_name = names;
        this.isOpen = true;
        this.currentIndex = index; //初始化进来的第一次点击
        this.$store.state.context.qryTableName2 = "-" + names;
      } else if (this.currentIndex == index && this.isOpen) {
        this.$store.state.context.params.org_name = null;
        this.isOpen = false;
        this.currentIndex = -1; //打开一个机构，又把它关回去，相当于初始化
        this.$store.state.context.qryTableName2 = "";
      } else {
        this.$store.state.context.params.org_name = names;
        this.isOpen = true;
        this.currentIndex = index; //打开了一个机构，又去打开其他机构
        this.$store.state.context.qryTableName2 = "-" + names;
      }

      this.$store.commit('setParams', ["threatReports", this.$store.state.context.params]);
      this.$store.dispatch('reloadTable', "threatReports");
      this.$store.state.context.test = names;

    },
    fmtData(data) {
      let lData0 = [];
      let lData1 = [];
      let lData2 = [];
      let dMap = new Map();
      let mMap = new Map();
      let hMap = new Map();
      data.dRisk.forEach((d) => {
        lData0.push(d.days);
        dMap.set(d.days, d.total);
      });
      data.mRisk.forEach((m) => {
        lData1.push(m.days);
        mMap.set(m.days, m.total);
      });
      data.hRisk.forEach((h) => {
        lData2.push(h.days);
        hMap.set(h.days, h.total);
      });
      let lenData = this.getArray(lData1.concat(lData2).concat(lData0));
      let d = [];
      let m = [];
      let h = [];
      lenData.sort().forEach((l) => {
        if (dMap.get(l)) {
          d.push(dMap.get(l));
        } else {
          d.push(0);
        }
        if (mMap.get(l)) {
          m.push(mMap.get(l));
        } else {
          m.push(0);
        }
        if (hMap.get(l)) {
          h.push(hMap.get(l));
        } else {
          h.push(0);
        }
      });
      let sData = {
        lenData: lenData,
        d: d,
        m: m,
        h: h

      };
      return sData;
    },
    getArray(a) {
      let hash = {},
        len = a.length,
        result = [];

      for (let i = 0; i < len; i++) {
        if (!hash[a[i]]) {
          hash[a[i]] = true;
          result.push(a[i]);
        }
      }
      return result;
    }
  },
  created: function() {

  },
  mounted: async function() {
    this.loadMapChart();

  }

}
</script>
