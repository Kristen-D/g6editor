<template>
  <div class="el-panel">
          <span class="left-top"></span><span class="left-bottom"></span>
          <span class="right-top"></span><span class="right-bottom"></span>
          <div class="el-panel-heading">
            <h4 class="el-panel-title">IP类型</h4>
          </div>
          <div class="el-panel-body ">
              <div class="text-center" style="margin:10px auto auto">
                            <h4 class="el-subtitle">共挖掘<span class="digital">{{this.ipType.length}}</span>种类型</h4>
              </div>
              <div class="echartsbox1" >
                <chart :options="options" ></chart>
              </div>
             <ipTypeTop></ipTypeTop>

          </div>
  </div>

</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'
import ipTypeTop from './IpTypeTop.vue'

export default {
	components: {chart,ipTypeTop},
	data() {
		return {
      getIpTypeUrl: "/ssa/blackIp/getIpTypeList.do",
			ipType:[],
      options: {
      		tooltip: {
      			trigger: 'item',
      			formatter: "类型:{b} <br/>占比:{d}% <br/>数量:{c} "
      		},
		series: [
        			{
        				name:'访问来源',
        				type:'pie',
        				color:['#0776b8', '#a4cee5', '#3658ff','#3bafff','#00f6ff'],
        				radius: ['52%', '75%'],
        				center: ['50%', '50%'],
        				avoidLabelOverlap: false,
        				label: {
        					normal: {show: false}
        				},
        				labelLine: {
        					normal: {
        						show:false
        					}
        				},
    				itemStyle: { //图形样式
    					normal: {
    						borderWidth: 2,
    						borderColor: '#000',
    					}
    				},
				data:[    ]
			}
		]
    }
		       }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getipType(){
			 this.common.req(this.getIpTypeUrl, {}).then(data => {
				 this.ipType = data;
         this.dataHandle();
			 });
		},
    dataHandle(){
      this.options.series[0].data = this.ipType;
    }
	},
	created:async function() {

	},
	mounted: async function() {this.getipType();}
}
</script>
