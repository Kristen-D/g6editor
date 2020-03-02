<template >
<div class="el-panel-white">
  <div class="el-panel-white-heading"><h3 class="el-panel-white-title">高危账户</h3>
    <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
       <el-tab-pane label="今天" name="1"></el-tab-pane>
       <el-tab-pane label="近7天" name="2"></el-tab-pane>
       <el-tab-pane label="近30天" name="3"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="el-panel-white-body">
     <el-row :gutter="20">
     <div class="echarts_BoxB3" style="height:200px;!important"id="highAccountMap"></div>
</el-row>
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
            accountTitle:"高危账户详情",
             accountShow:false,
             accountTableId:"HighAccountId",
              tableUrl:"/ssa/forceCrack/getDetail1Detail.do",
              params:{dateRange:'month',days:''},
              activeName:'3'
   				 }
   		 },


    methods: {
      onCloseAccount(){

      },
      showAccountDetail(days){
        this.accountTitle="高危账户详情--"+days;
        this.params.days=days;
        this.tableUrl="/ssa/forceCrack/getLineHighRiskAccountDetail.do";
        // this.accountShow=true;
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
      fmtProductTypeList(val){
       // console.log(val);
         for(var item in this.ProductTypeList) {
             if (val==this.ProductTypeList[item].id){
               return this.ProductTypeList[item].text;
             }
         }

      },
      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/forceCrack/getHighRiskAccount.do", this.params);
        var myChart = echarts.init(document.getElementById("highAccountMap"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];
        var MyXAxis = [];




        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            xAxis.push(dataUnit.user);
        };

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
            seriesData.push(dataUnit.count);
        };



        var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        formatter: "建议修改账户:{b}<br/>被撞次数:{c}",
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
             vm.showAccountDetail(params.name);
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
