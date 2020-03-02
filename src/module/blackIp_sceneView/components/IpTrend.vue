<template>
  <div class="el-panel">
      <span class="left-top"></span><span class="left-bottom"></span>
      <span class="right-top"></span><span class="right-bottom"></span>
      <div class="el-panel-heading">
        <div class="" >
          <h4 class="el-panel-title">趋势</h4>
          <el-radio-group v-model="activeName"  class="daytabs  labeltabs float-r">
            <el-radio-button label="week">近7天</el-radio-button>
            <el-radio-button label="month">近30天</el-radio-button>
          </el-radio-group>
        </div>
      </div>
        <div class="el-panel-body shine" >
            <div class="echartsbox8">
                <chart :options="options"></chart>
            </div>
        </div>
  </div>

</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts'

export default {
	components: {chart},
  watch:{
    activeName:async function(val, oldVal){
      await this.getIpTrendUnit();

    },
  },
	data() {
		return {
      getIpTrendListUrl: "/ssa/blackIp/getIpTrendList.do",
			ipTrendList:[],
			activeName:'month',
      categoryData : [],
      linecolor :{show:true,lineStyle:{color:'#17334e'}},
      dateData:'',
      options:{
            tooltip: {
      	            trigger: 'axis',
          	        position: function (point, params, dom, rect, size) {
          		       	// 鼠标右上
          		      	return [point[0]+10, point[1] - 90];
          		        },
          	        axisPointer: {
          	        	type:'line',
          	            lineStyle: {
          	                color: 'rgba(0,0,0,0)'
          	            }
          	        },

                    formatter: function(params) {

                        var res = "";
                        var value = params[0].value;
                        var name = params[0].axisValue;
                        res = "<p>时间："
                            + name+ "</p><p>数量："
                            + value+ "</p>";
                        return res;
                    },

      	              backgroundColor: 'rgba(0,0,0,0.85)',
      	              padding: [10, 10],
            	        textStyle: {
            	        	fontSize:14,
            	            color: '#fff',
            	        },

          	        extraCssText: 'border-top:6px solid #0066cc;border-radius:0;'
	               },
          		grid: {
          			left: '1%',
          			right: '2%',
          			top:'6%',
          			bottom: '5%',
          			containLabel: true
          		},
        		xAxis: {
        			type: 'category',
        			name: '',
        			splitLine: '',
        			axisTick:{show:false},
        			axisLine:'',
        			axisLabel:{color:'#47a8f1'},
        			data: ''
        		},
        		yAxis: {
        			type: 'value',

        			name: '',
        			axisTick:{show:false},
        			axisLine:'',
        			splitLine: '',
        			axisLabel:{color:'#47a8f1'},


        		},
          		series: [
          			{
          				type: 'line',
          				lineStyle:{normal:{color:'#3ea9f4',width:2}},
          				smooth:true,
          				symbol:'image:///static/images/cd/echarts-line.png',
          				symbolSize:10,
          				showSymbol:false,
          				data: [],
          			},
          		]
	       }


     }
	},
	computed: {
		...mapState({

		})
	},
	methods: {

    getIpTrendUnit(){
			var params = {dateRange:this.activeName};
			 this.common.req(this.getIpTrendListUrl, params).then(data => {
				 this.ipTrendList = data.data;
         this.categoryData=data.date;
         this.dataHandle();
			 });
		},
    dataHandle(){
       this.options.xAxis.splitLine=this.linecolor;
       this.options.xAxis.axisLine=this.linecolor;
       this.options.yAxis.axisLine=this.linecolor;
       this.options.yAxis.splitLine=this.linecolor;
       this.options.xAxis.data=this.categoryData;

      this.options.series[0].data= this.ipTrendList;
	},
},
	created:async function() {

	},
  mounted: async function() {this.getIpTrendUnit();}

}
</script>
