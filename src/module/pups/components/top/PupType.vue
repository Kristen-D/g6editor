<template>
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">{{puptype.title}}</h4>
  </div>
  <div class="el-panel-body">
    <div class="echartbox13">
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
  props: ['puptype'],
  data() {
    return {
      option: {}
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/pups/getPupTypeStatistics.do', this.puptype, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let length = data.bar.length;
      if(length<3) {
        for(let i=0; i<3-length; i++) {
          data.bar.push({name: 'N/A', value: 0})
        }
      }
      data.bar = data.bar.sort((a, b) => {
        return a.value-b.value;
      })
      let datax = [];
      let datav = [];
      for(let b of data.bar) {
        datax.push(b.name)
        datav.push(b.value);
      }
      let maxValue = datav[datav.length-1]===0?3:datav[datav.length-1]*1.3;
      let maxdata = [maxValue, maxValue, maxValue]
      // let myChart = echarts.init(document.getElementById(this.puptype.eid));
      let totalLength = data.total.toString().length;
      let se = totalLength<3?24:(22-2*totalLength);
      this.option = {
        backgroundColor: '#ffffff',
        title: {
          text: ['{a|'+data.total+'}' + '{b|/\x20 '+data.asset+'}\n' + '{c|总数}' + '{d|'+this.puptype.name+'}'],
          textStyle: {
            rich: {
              a: {
                color: '#028bff',
                fontSize: se,
                width: 40,
                lineHeight: 40,
              },
              b: {
                color: '#747a82',
                fontSize: 16,
                lineHeight: 40
              },
              c: {
                color: '#028bff',
                fontSize: 12,
                fontWeight: 500,
                width: 40,
              },
              d: {
                color: '#747a82',
                fontSize: 12,
                fontWeight: 500,
                padding: [0, 0, 0, 10]
              },
            }
          },
          left: '2%',
          bottom: '12%'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c}"
        },
        grid: {
          top: '5%',
          left: '38%',
          right: '2%',
          bottom: '20',
          containLabel: false
        },
        xAxis: [{
          type: 'value',
          position: 'top',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
          },
        }],
        yAxis: [{
            type: 'category',
            data: datax,
            // ['IRC', 'P2P', 'HTTP'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#747a82',
              fontSize: '14',
              fontWeight: '500',
              formatter: function(val) {
                return (val.length > 15 ? (val.slice(0, 14) + "...") : val);
              },
              inside: true,
              padding: [-40, 0, 0, -5]
            }
          },
          {
            type: 'category', //辅助x轴
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['1', '2', '3'],
          }
        ],
        series: [
          {//当所有数据为0时，则画一个底色饼图。不画第二个图。否则反之
    	 			name:'输助底色',
    	 			type:'pie',
            center: ['15%', '35%'],
    	 			radius: ['26%', '40%'],
    	 			//roseType: 'radius',
    	 			startAngle: 0,
    	 			hoverOffset:0,
    	 			itemStyle:{
    	 				normal:{color: "#e1e3e4"},
    	 				emphasis:{color:"#e1e3e4"}
    	 			},
    	 			labelLine:{normal:{show:false}},
    	 			data:[{value:1,name:'',tooltip: {show:false}}]
    	 		},
          {
            name: '有害程序',
            type: 'pie',
            color: ['#ff2a00', '#ffdd3f', '#ff8400'],
            center: ['15%', '35%'],
            radius: ['26%', '40%'],
            avoidLabelOverlap: false,
            itemStyle: { //图形样式
              normal: {
                borderWidth: 2,
                borderColor: '#ffffff',
              }
            },
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.pie
          },
          {
            name: '辅助',
            type: 'bar',
            barWidth: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: 'rgba(229, 242, 253,0.9)',
              }
            },
            label: {
              normal: {
                show: true,
                color: '#747a82',
                fontSize: '14',
                position: 'insideRight',
                offset: [0, -20],
                formatter: function(d) {
                  return datav[d.dataIndex] === undefined? 0 : datav[d.dataIndex];
                }
              }
            },
            tooltip: {
              show: false
            },
            data: maxdata //背景值

          },
          {
            name: this.puptype.title,
            type: 'bar',
            color: ['#0066cc'],
            barWidth: 10,
            data: datav
          },
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
