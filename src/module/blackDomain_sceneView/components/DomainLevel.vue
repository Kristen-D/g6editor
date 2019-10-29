<template>
  <div class="el-panel">
          <span class="left-top"></span><span class="left-bottom"></span>
          <span class="right-top"></span><span class="right-bottom"></span>
        <div class="el-panel-heading">
          <h4 class="el-panel-title">Domain等级</h4>
        </div>
        <div class="el-panel-body shine">
              <div class="echartsbox2" >
                <chart :options="options" ></chart>
              </div>
         </div>
  </div>

</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'

export default {
	components: {chart},
	data() {
		return {
      getDomainLevelUrl: "/ssa/blackDomain/getDomainLevel.do",
			domainLevel:[],
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
			            data:[			]
		        }
	       }
		  }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getDomainLevel(){
			 this.common.req(this.getDomainLevelUrl, {}).then(data => {
				 this.domainLevel = data;
         this.options.series.data = this.domainLevel;
			 });
		},

	},
	created:async function() {
    this.getDomainLevel();
	},
	mounted:  function() {}
}
</script>
