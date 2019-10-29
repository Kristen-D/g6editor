<template>
  <div class="el-panel-bigscreen">
   <div class="el-panel-bigscreen-heading">
     <h4 class="el-panel-bigscreen-subtitle2">攻击事件量排行</h4>
   </div>
   <div class="el-panel-bigscreen-body">
     <div class="echartsbox12" id="attackeventsort"></div>
   </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===5) {
        this.loadMapChart();
      }
    }
  },
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('attackeventsort'));
    	let option = {
    		color: ['#50fca8', '#2196f3', '#f53c61'],
    		tooltip: {
    			trigger: 'item',
    			formatter: "{a} <br/>{b} : {c}"
    		},
    		legend: {
    			orient: 'vertical',
    			right: '10%',
    			top: '10%',
    			itemGap: 15,
    			itemWidth: 10,
    			itemHeight: 10,
    			textStyle: {
    				color: 'rgba(255,255,255,0.7)',
    				fontSize: 14,
    			},
    			formatter: function(name) {
    				let oa = option.series[0].data;
    				for(let i = 0; i < option.series[0].data.length; i++) {
    					if(name === oa[i].name) {
    						return '   ' + name + '     ' + oa[i].value;
    					}
    				}
    			},
    			data: [{
    					name: '太原中心医院',
    					icon: 'circle'
    				},
    				{
    					name: '太原武警医院',
    					icon: 'circle'
    				},
    				{
    					name: '太原中北大   ',
    					icon: 'circle'
    				}
    			]
    		},
    		calculable: true,
    		series: [{
    			name: '攻击事件量排行',
    			type: 'funnel',
    			left: '2%',
    			top: '10%',
    			bottom: '1%',
    			width: '40%',
    			//          height:'50%',
    			min: 0,
    			max: 500,
    			minSize: '0%',
    			maxSize: '100%',
    			sort: 'descending',
    			label: {
    				normal: {
    					show: false,
    					position: 'inside'
    				},
    				emphasis: {
    					show: false,
    					textStyle: {
    						fontSize: 20
    					}
    				}
    			},
    			labelLine: {
    				normal: {
    					length: 10,
    					lineStyle: {
    						width: 1,
    						type: 'solid'
    					}
    				}
    			},
    			itemStyle: {
    				normal: {
    					borderColor: '#fff',
    					borderWidth: 0
    				}
    			},
    			data: [{
    					value: 456,
    					name: '太原中心医院'
    				},
    				{
    					value: 365,
    					name: '太原武警医院'
    				},
    				{
    					value: 231,
    					name: '太原中北大   '
    				}
    			]
    		}]
    	};
    	myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
