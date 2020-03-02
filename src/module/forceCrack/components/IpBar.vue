<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->

   <div class="el-panel-white">
    <div class="el-panel-white-heading"><h3 class="el-panel-white-title">高危IP</h3>
      <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
         <el-tab-pane label="今天" name="1"></el-tab-pane>
         <el-tab-pane label="近7天" name="2"></el-tab-pane>
         <el-tab-pane label="近30天" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-white-body">
      <el-row :gutter="20">
   <div class="echarts_BoxB1" style="height:250px;" id="flowDayScatterA"></div>
   </el-row>
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
             params:{dateRange:'month'},
             activeName:'3',
             ipShow:false,
             ipTableId:"ipBarIpId",
             tableUrl:"/ssa/forceCrack/getDetail1Detail.do",
   				 }
   		 },
    methods: {
      onCloseIp(){

      },
      showIpDetail(src_ip){
        this.ipTitle="高危IP详情--"+src_ip;
        this.params.src_ip=src_ip;
        this.tableUrl="/ssa/forceCrack/getHighRiskIpDetail.do";
        // this.ipShow=true;
        this.params = {...this.params};
      },
      changeTime(value){
        if (value.name==1){
          this.params.dateRange="day";
        }else if(value.name==2){
          this.params.dateRange="week";
        }else if(value.name==3){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/forceCrack/getHighRiskIp.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayScatterA"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];
        var MyXAxis = [];




        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            xAxis.push(dataUnit.src_ip);
        };

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            seriesData.push(dataUnit.count);
        };



        var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        formatter: "建议封锁IP:{b}<br/>被撞次数:{c}",
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : xAxis,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'数量',
            type:'bar',
            barWidth: '26%',
            data:seriesData
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
    // this.loadMapChart();
  }

}
</script>
