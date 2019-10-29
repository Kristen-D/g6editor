<template>
  <div class="el-panel">
    <div class="el-panel-heading">
      <h4 class="el-panel-title">趋势</h4>
    </div>
    <div class="el-panel-body">
      <div style="height:150px">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  components: {
    ECharts,
  },
  data() {
    return {
      option : {}
    }
  },
  methods: {
    async getInitData() {
      let [lineData1, lineData2, lineData3, lineData4, lineData5] = await Promise.all([
        this.common.req('/ssa/pups/getPupsTrend.do', {}, this),
        this.common.req('/ssa/pups/getPupsTrend.do', {malwareSubtype:'Bot'}, this),
        this.common.req('/ssa/pups/getPupsTrend.do', {malwareSubtype:'Trojan'}, this),
        this.common.req('/ssa/pups/getPupsTrend.do', {malwareType:'Network Virus'}, this),
        this.common.req('/ssa/pups/getPupsTrend.do', {malwareType:'Virus'}, this)
      ]);
      // let nowDate = new Date();
      // let ds = [];
      // for (let i = 7; i > 0; i--) {
      //   nowDate.setDate(nowDate.getDate() - 1)
      //   ds.push(this.common.formatDate(nowDate, "MM.dd"))
      // }
      // ds.sort((a, b) => {
      //   return a - b;
      // })
      let ds = this.common.getDateList(7, "MM.dd");
      let mapData = [];
      mapData.push({ name: "总数", list: this.getFormateData(lineData1, ds) });
      mapData.push({ name: "僵尸网络", list: this.getFormateData(lineData2, ds) });
      mapData.push({ name: "蠕虫", list: this.getFormateData(lineData3, ds) });
      mapData.push({ name: "木马", list: this.getFormateData(lineData4, ds) });
      mapData.push({ name: "病毒", list: this.getFormateData(lineData5, ds) });
      this.loadMapChart(mapData, ds)
    },
    getFormateData(list, ds) {
      let newList = [];
      ds.forEach((d) => {
        let n = list.find((u) => {
          return d === u.name;
        })
        if( n === undefined) {
          newList.push(0);
        }else {
          newList.push(n.value);
        }
      })
      return newList;
    },
    loadMapChart(data, timeline) {
      let category = [];
      for (let md of data) {
        category.push({
          name: md.name,
          icon: 'circle'
        })
      }

      // let myChart = echarts.init(document.getElementById('puptrend'));

      this.option = {
        color: ['#ff7d27', '#358ED7', '#4553A5', '#7FC958', '#EF4836'],
        backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          bottom: '0',
          left: 'center',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            color: '#3E4956',
            fontSize: 12,
          },
          data: category
          // [
          //   {
          //     name: '漏洞攻击',
          //     icon: 'circle'
          //   },
          //   {
          //     name: '扫描窃听',
          //     icon: 'circle'
          //   },
          //   {
          //     name: '拒绝服务攻击',
          //     icon: 'circle'
          //   },
          //   {
          //     name: '总数',
          //     icon: 'circle'
          //   }
          //
          // ]
        },
        grid: {
          top: '5',
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#3E4956',
            },
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false,
          },
          data: timeline
          // ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27']
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: {
            textStyle: {
              color: '#3E4956'
            },
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
            name: data[0].name,
            type: 'line',
            // stack: '总量',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#358ED7",
                borderColor: "#fff"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(53, 142, 215, 0.9)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(53, 142, 215, 0.6)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(53, 142, 215, 0.4)'
                  }
                ], false),
              }
            },
            data: data[0].list
            // lineData1
          },
          {
            name: data[1].name,
            type: 'line',
            // stack: '总量',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#4553A5",
                borderColor: "#fff"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(69,83,165,0.9)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(69,83,165,0.6)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(69,83,165,0.4)'
                  },
                ], false),
              }
            },
            data: data[1].list
          },
          {
            name: data[2].name,
            type: 'line',
            // stack: '总量1',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#EF4836",
                borderColor: "#fff"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(239,72,54, 0.9)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(239,72,54, 0.6)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(239,72,54, 0.4)'
                  }
                ], false),
              }
            },
            data: data[2].list
          },
          {
            name: data[3].name,
            type: 'line',
            // stack: '总量2',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#7FC958",
                borderColor: "#fff"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(127, 201, 88, 0.9)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(127, 201, 88, 0.6)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(127, 201, 88, 0.4)'
                  }
                ], false),
              }
            },
            data: data[3].list
          },
          {
            name: data[4].name,
            type: 'line',
            // stack: '总量3',
            smooth: true, //是否平滑曲线显示
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            symbolSize: 6,
            data: data[4].list

          }
        ]
      };
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
    }
  },
  created: function() {
    // this.getInitData();
  },
  mounted: function() {
    this.getInitData();
  }
}
</script>

<style>
</style>
