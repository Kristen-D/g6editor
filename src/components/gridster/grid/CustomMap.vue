

<template >
<!-- :class="setting.width" -->




<div class="panel panel-default  bg-statemap bg-panel" :class="this.params.bgImg"  style="height:100%;width:100%">
  <div class="panel-body" style="height:100%;width:100%">
    <div :id="chartId" style="height:100%;width:100%"></div>
  </div>
</div>
</div>






</template>



<script>
import {
  mapState
} from 'vuex'
import commonAjax from 'components/js/common.js'
export default {
  data() {
    var chartId = "grid_echart_" + this.data.i;
    return {
      data: {},
      url: "",
      params: {
        type: 'pie',
        url: ""
      },
      chartId: chartId,
      option: {},
      dayLegend: [],
      weekLegend: [],
      monthLegend: []

    }
  },
  props: ['data'],

  methods: {
    resize() {
      let vm = this;
      this.$nextTick(() => {
        vm.myChart = echarts.init(document.getElementById(this.chartId));
        vm.myChart.setOption(vm.option);
        vm.myChart.on('click', function(params) {
          params.chartName = "customMap";
          vm.$store.dispatch('drillData', params);
        });
        vm.myChart.on('legendselectchanged', function(params) {
          vm.showLegend(params);
          vm.myChart.setOption(vm.option);
        });
      })
    },

    setCustomMenu: function() {
      var customList = [{
          name: "安全类型",
          url: "/ssa/home/getThreatInfo.do",
          type: "pie",
          bgImg:"bg-statemap1"
        },
        {
          name: "资产状态",
          url: "/ssa/home/getProductInfo.do",
          type: "pie",
          bgImg:"bg-statemap2"
        },
        {
          name: "安全事件",
          url: "/ssa/home/getEventInfo.do",
          type: "pie",
          bgImg:"bg-statemap3"
        }
      ];

      this.$store.commit("addCustomMethods", [this.data.i, customList]);
    },
    customMethod: function(custom) {
      this.params = custom;
      this.getAjaxChartData();
    },
    getAjaxChartData() {
      var vm = this;
      // console.log(this.params.url)
      vm.commonAjax.req(this.params.url, this.params).then((data) => {
        var setting = { ...vm.setting,
          data
        };
        vm.loadMapChart(setting);
      });

    },
    loadMapChart(setting) {
      this.data = setting.data;
      var data = this.data;
      var radius = setting.radius == null ? '65%' : setting.radius;
      var myChart = echarts.init(document.getElementById(this.chartId));
      var dayData = data.day;
      var weekData = data.week;
      var monthData = data.month;
      var le = this.monthLegend;
      this.setLegendData(data);
      setting.type = 'pie';
      this.option = {
        legend: [
          {
            selectedMode: 'single',
            selected: {
              '本日': false,
              '7天': false,
              '30天': true
            },
            left: '1%',
            top: '1%',
            data: [
                  {name:"本日",icon:"pin"},
                  {name:"7天", icon:"pin"},
                  {name:"30天",icon:"pin"}
                ],
            itemGap: 2,
            textStyle:{color:'#fff'}
          },
          {
  					orient: 'vertical',
            selectedMode: true,
  					left: 'right',
  					data: le,
            itemGap: 3,
  					textStyle:{color:'#fff'}
  				}
        ],
        tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
        series: [
          {
            radius: radius,
            center: ['30%', '60%'],
            name: '本日',
            // areaStyle: {
            //   normal: {}
            // },
            type: setting.type,

            data: dayData,
            // itemStyle: {
    				// 				normal:{
    				// 					label:{ show: false},
    				// 					labelLine:{ show:false}
    				// 				}
    				// 			},
						label: {
							normal: {
                show: false,
								textStyle: {
									fontSize:13,
									color: '#fff'
								}
							}
				   		},
						textStyle:{color:'#fff'}

          },
          {
            radius: radius,
            center: ['30%', '60%'],
            name: '7天',
            // areaStyle: {
            //   normal: {}
            // },
            type: setting.type,
            data: weekData,
            // itemStyle: {
						// 		normal:{
						// 			label:{ show: false},
						// 			labelLine:{ show:false}
						// 		}
						// 	},
							label: {
								normal: {
                  show: false,
									textStyle: {
										fontSize:13,
										color: '#fff'
									}
								}
					   		},
							textStyle:{color:'#fff'}
          },
          {
            radius: radius,
            center: ['35%', '60%'],
            name: '30天',
            // areaStyle: {
            //   normal: {}
            // },
            type: setting.type,
            data: monthData,
            // itemStyle: {
						// 		normal:{
						// 			label:{ show: false},
						// 			labelLine:{ show:false}
						// 		}
						// 	},
							label: {
								normal: {
                  show: false,
									textStyle: {
										fontSize:13,
										color: '#fff'
									}
								}
					   		},
							textStyle:{color:'#fff'}
          }
        ]
      };

      if (setting.type == 'line') {
        myChart.on('legendselectchanged', function(params) {
          var name = params.name;
          var xData = data.xData.day;

          if (name == "30天")
            xData = data.xData.month;
          else if (name == "7天")
            xData = data.xData.week;

          var xAxis = {
            type: 'category',
            boundaryGap: false,
            data: xData
          };
          myChart.setOption({
            xAxis: xAxis
          });
        });
        var xData = data.xData.day;
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: xData
        };
        var yAxis = {};

        option.xAxis = xAxis;
        option.yAxis = yAxis;
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);

      //window.onresize = myChart.resize;

      let vm = this
      myChart.on('click', function(params) {
        params.chartName = "customMap";
        vm.$store.dispatch('drillData', params);
      });
      myChart.on('legendselectchanged', function(params) {
        vm.showLegend(params);
        myChart.setOption(vm.option);
      });

    },
    setLegendData(data) {
      data.day.forEach((d)=> {
        this.dayLegend.push(d.name);
      });
      data.week.forEach((w)=> {
        this.weekLegend.push(w.name);
      });
      data.month.forEach((m)=> {
        this.monthLegend.push(m.name);
      });
    },
    showLegend(params) {
      var dateType = params.name;
      if(dateType === '30天'){
        this.option.legend[1].data = this.monthLegend;
        this.option.legend[0].selected = {
          '30天': true
        };
      }else if (dateType === '7天') {
        this.option.legend[1].data = this.weekLegend;
        this.option.legend[0].selected = {
          '7天': true
        };
      }else if (dateType === '本日') {
        this.option.legend[1].data = this.dayLegend;
        this.option.legend[0].selected = {
          '本日': true
        };
      }else {
        return;
      }
    }

  },
  created: function() {
    if (this.data.params) this.params = this.data.params;
  },
  mounted() {
    this.getAjaxChartData();
  }
}
</script>
