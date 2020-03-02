<template >
      <div class="el-panel">
          <div class="el-panel-heading">
            <h4 class="el-panel-title">高危账户</h4>
            <el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
                 <el-tab-pane label="今天" name="day"></el-tab-pane>
                 <el-tab-pane label="近7天" name="week"></el-tab-pane>
                 <el-tab-pane label="近30天" name="month"></el-tab-pane>
              </el-tabs>
          </div>
          <div class="el-panel-body">
               <div class="echartbox1"  id="hitbarB"></div>
          </div>
          <el-dialog :title="accountTitle" :visible.sync="accountShow" width="85%" @close="onCloseAccount()">
            <div style="height:300px">
            <accountTable :id="accountTableId" :tableUrl="tableUrl" :params="params"></accountTable>
            </div>
          </el-dialog>
      </div>

</template>

<script>
import {mapState,mapActions } from 'vuex'
import accountTable from './AccountTable.vue'
import echarts from 'echarts'
export default {
      components: {accountTable},
  computed:{
    ...mapState({
   })},

   data(){
   				 return {
             accountTitle:"账户详情",
             params:{dateRange:'week'},
             activeName:'week',
             accountShow:false,
             accountBarId:"accountBarId",
             tableUrl:"",
   				 }
   		 },
    methods: {
      onCloseAccount(){

      },
      showAccountDetail(account){
        this.accountTitle="高危账户详情--"+account;
        this.params = {...this.params,account};
        this.tableUrl="/ssa/hitLibrary2/getHighRiskAccountBarDetail.do";
        this.accountShow=true;

      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },

      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/hitLibrary2/getHighRiskAccountBar.do", this.params);
        var myChart = echarts.init(document.getElementById("hitbarB"));
        var seriesData=[];
        var xAxis = [];

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            xAxis.push(dataUnit.account);
        };

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            seriesData.push(dataUnit.value);
        };



        var option = {
		tooltip: {
			trigger: 'item',
      formatter: "账户:{b}<br/>数量:{c}",
			axisPointer: {
				type: 'cross',
			}
		},
		grid: {
			top: '10%',
			left: '6%',
			right: '6%',
			bottom: '10%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: xAxis,
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
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			splitNumber: 10,
			splitLine: { //坐标轴在 grid 区域中的分隔线。
					show: true,
					lineStyle: {
						color: '#E1E3E4'
					}
			},
			axisLine: { //坐标轴轴线相关设置。数学上的y轴
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
			axisTick: { //坐标轴刻度相关设置。
					show: false,
				},
		}],
		series: [
		   {
            type: 'bar',
            stack: 'chart',
            //barGap: "10%",//柱间距离，
            barWidth: '26%',
            itemStyle: {
              normal: {
                color: '#0065ba'
              }
            },
            label: {
              normal: {
                position: 'right',
                show: false
              }
            },
            data: seriesData,
          }
		]
	};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
        myChart.on('click', function(params) {
             vm.showAccountDetail(params.name);
        });


      },

    },
  created :function() {

  },
  mounted: async function() {
    this.loadMapChart();
  }

}
</script>
