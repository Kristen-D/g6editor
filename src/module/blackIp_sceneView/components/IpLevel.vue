<template>
  <div class="el-panel">
      <span class="left-top"></span><span class="left-bottom"></span>
        <span class="right-top"></span><span class="right-bottom"></span>
    <div class="el-panel-heading">
      <h4 class="el-panel-title">IP等级</h4>
    </div>
    <div class="el-panel-body shine">
      <div class="echartsbox2">
        <chart :options="options" ></chart>
      </div>
      <ipLevelTop></ipLevelTop>
    </div>
  </div>
</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'
import ipLevelTop from './IpLevelTop.vue'

export default {
	components: {chart,ipLevelTop},
	data() {
		return {
      getipLevelUrl: "/ssa/blackIp/getIpLevelList.do",
			ipLevel:[],
      options: {
		      color:['#c0392b','#fe5722','#feea3b','#fe9700'],
      		tooltip : {
      			trigger: 'item',
      			formatter: "等级:{b} <br/>占比:{d}% <br/>数量:{c} "
      		},

		      calculable : true,
		      series :
          		{
          			name:'半径模式',
          			type:'pie',
          			radius : ['40%', '70%'],
          			center : ['50%', '50%'],
          			roseType : 'radius',
                label: {
          				normal: {
          					show:true,
          					textStyle: {
                              fontSize: 12,
                              color: '#47a8f1'
                          }
          				}
          			},
                labelLine:{//标签的视觉引导线样式
          				normal:{
          					length:6,
          					length2:15,
          					lineStyle:{color:'#47a8f1',opacity:'0.6'}, 		}
    			         },
          			data:[   	]
          		}
	       }
		  }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getipLevel(){
			 this.common.req(this.getipLevelUrl, {}).then(data => {
				 this.ipLevel = data;
         this.dataHandle();
			 });
		},
    dataHandle(){
      this.options.series.data = this.ipLevel;
    }
	},
	created: async function() {

	},
	mounted: async  function() {this.getipLevel();}
}
</script>
