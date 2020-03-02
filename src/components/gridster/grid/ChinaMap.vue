<template>
<div class="panel panel-default bg-panel" style="height:100%;">
  <div class="panel-body" style="height:100%;">
    <div class="sys_grade clearfix">
                            	<p>系统安全评级<span>{{rate}}</span></p>
                              <p>  <el-rate
                                  v-model="rateValue"
                                  allow-half="true"
                                  disabled>
                                </el-rate>
                                </p>
                            </div>
    <div :id="chartId" style="height:100%;"></div>
  </div>
</div>
</template>
<script>
import * as geoCoordMap from 'components/js/geoCoordMap'
export default {
  data() {
    var chartId = "grid_echart_" + this.data.i;
    return {
      dialogVisible: false,
      detailTrendData: [],
      chartId: chartId,
      option: null,
      eventThreatTypes: "",
      rateValue:89/100*5,
      rate:"89"
    }
  },
  props: ['data'],
  computed: {

  },
  methods: {
    resize() {
      let vm = this;
      this.$nextTick(() => {
        vm.myChart = echarts.init(document.getElementById(this.chartId));
        vm.myChart.setOption(vm.option);
        vm.myChart.on('click', function(params) {
          params.chartName = "chinaMap";
          params.eventThreatTypes = vm.eventThreatTypes;
          vm.$store.dispatch('drillData', params);

        });
      })
    },
    loadMapBar(data) {
      var regionslist=[
				{
					name: '广东',
					itemStyle: {
						normal: {areaColor: '#00a2e9',color: '#00a2e9' },
						//emphasis:{ areaColor:'#0276a9'}
					}
				},
				{
					name: '福建',
					itemStyle: {
						normal: { areaColor: '#00a2e9' }
					}
				},
				{
					name: '广西',
					itemStyle: {
						normal: { areaColor: '#00a2e9' }
					}
				},
				{
					name: '海南',
					itemStyle: {
						normal: { areaColor: '#00a2e9' }
					}
				},
				{
					name: '台湾',
					itemStyle: {
						normal: { areaColor: '#fbe6ef' }
					}
				},
				{
					name: '云南',
					itemStyle: {
						normal: { areaColor: '#a0d9f6' }
					}
				},
				{
					name: '贵州',
					itemStyle: {
						normal: { areaColor: '#a0d9f6' }
					}
				},
				{
					name: '四川',
					itemStyle: {
						normal: { areaColor: '#a0d9f6' }
					}
				},
				{
					name: '重庆',
					itemStyle: {
						normal: { areaColor: '#a0d9f6' }
					}
				},
				{
					name: '西藏',
					itemStyle: {
						normal: { areaColor: '#a0d9f6' }
					}
				},
				{
					name: '湖南',
					itemStyle: {
						normal: { areaColor: '#ffef00' }
					}
				},
				{
					name: '湖北',
					itemStyle: {
						normal: { areaColor: '#ffef00' }
					}
				},
				{
					name: '江西',
					itemStyle: {
						normal: { areaColor: '#ffef00' }
					}
				},
				{
					name: '河南',
					itemStyle: {
						normal: { areaColor: '#ffef00' }
					}
				},
				{
					name: '浙江',
					itemStyle: {
						normal: { areaColor: '#dcff53' }
					}
				},
			    {
					name: '安徽',
					itemStyle: {
						normal: { areaColor: '#dcff53' }
					}
				},
				{
					name: '江苏',
					itemStyle: {
						normal: { areaColor: '#dcff53' }
					}
				},
				{
					name: '山东',
					itemStyle: {
						normal: { areaColor: '#dcff53' }
					}
				},
			   {
					name: '黑龙江',
					itemStyle: {
						normal: { areaColor: '#f08519' }
					}
				},
				{
					name: '吉林',
					itemStyle: {
						normal: { areaColor: '#f08519' }
					}
				},
				{
					name: '辽宁',
					itemStyle: {
						normal: { areaColor: '#f08519' }
					}
				},
				{
					name: '内蒙古',
					itemStyle: {
						normal: { areaColor: '#d2cde6' }
					}
				},
				{
					name: '河北',
					itemStyle: {
						normal: { areaColor: '#d2cde6' }
					}
				},
				{
					name: '山西',
					itemStyle: {
						normal: { areaColor: '#d2cde6' }
					}
				},
				{
					name: '陕西',
					itemStyle: {
						normal: { areaColor: '#d2cde6' }
					}
				},
				{
					name: '宁夏',
					itemStyle: {
						normal: { areaColor: '#00789b' }
					}
				},
				{
					name: '甘肃',
					itemStyle: {
						normal: { areaColor: '#00789b' }
					}
				},
				{
					name: '青海',
					itemStyle: {
						normal: { areaColor: '#00789b' }
					}
				},
				{
					name: '新疆',
					itemStyle: {
						normal: { areaColor: '#00789b' }
					}
				},

		];











      this.eventThreatTypes = data.eventThreatTypes;
      var myChart = echarts.init(document.getElementById(this.chartId));
      var series = [{
        name: '安全漏洞',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'fill'
        },
        tooltip: {
          formatter: function(obj) {
            return obj.name;
          }
        },

        symbolSize: 6,
        itemStyle: {
          normal: {
            color: '#ff0000'
          }
        },
        data: data.geoDataList
      }]
      var barList = data.barDataList;
      for (var i = 0; i < barList.length; i++) {
        var bar = barList[i]

        var item = {
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          }
        }
        item.name = bar.name;
        item.data = bar.data;
        series.push(item);
      }
      this.option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        tooltip: {
          trigger: 'item'
        },
        color:['#e3e8c5','#e6b64f','#d8742b','#994c51','#355270'],
        legend: {
          top: '70%',
          left: 'left',
          data: data.legendData,
          textStyle: {
            color: 'rgba(255,255,255,0.86)'
          }
        },
        geo: {
          show: true, //是否显示地理坐标系组件
          map: 'china', //地图类型
          top: 0,
          right: 10,
          width: '52%',
          height: '75%',
          roam: false, //是否开启鼠标缩放和平移漫游
          label: {
            emphasis: {
              show: true,
              textStyle: {
                color: '#282828'
              }
            }
          },
          regions: regionslist,
          itemStyle: {
            normal: {
              //  areaColor: '#23b7e5',
              borderColor: '#ffffff'
            },
            emphasis: {
              areaColor: '#9393d4'
            }
          }
        },
        grid: {
          top: 40,
          left: 52,
          width: '36%',
          height: '56%'
        },
        xAxis: {
          type: 'value',
          splitNumber: 5,
          offset: '10',
          splitLine: { //坐标轴在 grid 区域中的分隔线；
            show: false,
          },
          axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }

        },
        yAxis: {
          type: 'category',
          axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
            show: true,
            lineStyle: {
              color: '#fff'
            },
          },
          axisTick: {
            alignWithLabel: 'true', //保证刻度线和标签对齐。
          },
          nameTextStyle: {
            color: 'red'
          },
          data: data.yAxisData
        },
        series: series
      };
      var vm = this;
      myChart.on('click', function(params) {
        params.chartName = "chinaMap";
        params.eventThreatTypes = vm.eventThreatTypes;
        vm.$store.dispatch('drillData', params);
      });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    //  window.onresize = myChart.resize
    }

  },
  created: function() {


  },
  mounted() {
    this.commonAjax.req("/ssa/home/getGeoMapData.do").then((mapBarData) => {
      this.loadMapBar(mapBarData);
    });


    this.commonAjax.req("/ssa/home/getRateValue.do").then((Data) => {

      this.rate=Data;
      this.rateValue=Data/100*5;
    });
  }
}
</script>
