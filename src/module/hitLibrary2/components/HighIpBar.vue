<template >
  <div>
   <div class="el-panel">
					<div class="el-panel-heading">
						<h4 class="el-panel-title">高危IP</h4>
						<el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
						     <el-tab-pane label="今天" name="day"></el-tab-pane>
						     <el-tab-pane label="近7天" name="week"></el-tab-pane>
						     <el-tab-pane label="近30天" name="month"></el-tab-pane>
					    </el-tabs>
					</div>
					<div class="el-panel-body">
					     <div class="echartbox1"  id="hitbarA"></div>
					</div>
		</div>
  <el-dialog :title="ipTitle" :visible.sync="ipShow" width="85%"  @close="onCloseIp()">
        <div style="height:300px">
      <ipTable :id="ipTableId" :tableUrl="tableUrl" :params="params"></ipTable>
      </div>
  </el-dialog>
 </div>




</template>

<script>
import {mapState,mapActions } from 'vuex'
import ipTable from './IpTable.vue'
import echarts from 'echarts'
export default {
      components: {ipTable},
  computed:{
    ...mapState({
   })},

   data(){
   				 return {
             ipTitle:"IP详情",
             params:{dateRange:'week'},
             activeName:'week',
             ipShow:false,
             ipTableId:"ipBarIpId",
             tableUrl:"",
   				 }
   		 },
    methods: {
      onCloseIp(){

      },
      showIpDetail(src_ip){
        this.ipTitle="高危IP详情--"+src_ip;
        this.params = {...this.params,src_ip};
        this.tableUrl="/ssa/hitLibrary2/getHighRiskIpDetail.do";
        this.ipShow=true;

      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },

      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/hitLibrary2/getHighRiskIp.do", this.params);
        var myChart = echarts.init(document.getElementById("hitbarA"));
        var seriesData=[];
        var xAxis = [];

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            xAxis.push(dataUnit.src_ip);
        };

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            seriesData.push(dataUnit.count);
        };



        var option = {
		tooltip: {
			trigger: 'item',
      formatter: "建议封锁IP:{b}<br/>被撞账户数:{c}",
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
			splitNumber: 5,
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
             vm.showIpDetail(params.name);
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
