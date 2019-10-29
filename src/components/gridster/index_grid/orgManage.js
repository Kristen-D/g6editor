export default {
  data() {
    return {
            orgChartOption : {
                    color: ['#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
                    title: {
                        // text: '重要单元受威胁Top5',
                		left:'20',
                        textStyle: {
                            color: '#9ea3b4',
                            fontSize: 14,
                			fontweight:'normal',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' }
                    },
                    legend: {
                		top:'28',
                		itemWidth:10,
                		itemHeight:10,
                		itemGap:25,
                        textStyle: {color: '#9ea3b4',fontSize: 14,},
                        data:[]
                    },
                    grid: {
                		top:'22%',
                        left: '3%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
                    },
                    xAxis: {
                      show:false,
                      type: 'value',
                    			min: 0,
                    			splitNumber: 5,
                    			splitLine: { //坐标轴在 grid 区域中的分隔线。
                    				show: true,
                    				lineStyle: {
                    					color: '#E1E3E4'
                    				}
                    			},
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
                    			axisTick:{ //坐标轴刻度相关设置。
                    				show:false,
                    			},


                    },
                      yAxis: {
                        inverse:'true',
                        type: 'category',
                      			splitLine: { //坐标轴在 grid 区域中的分隔线。
                      				show: false,
                      				lineStyle: {
                      					color: '#E1E3E4'
                      				}
                      			},
                      			axisLine: { //坐标轴轴线相关设置。数学上的y轴
                      				show: true,
                      				lineStyle: {
                      					color: '#E1E3E4'
                      				},
                      			},
                      			axisLabel: {
                      				textStyle: {
                      					color: '#3E4956'
                      				},
                      			},
                      			axisTick:{ //坐标轴刻度相关设置。
                      				show:false,
                      			},
                           data: []
                      },
                    series:[]
      }

    }
  }
}
