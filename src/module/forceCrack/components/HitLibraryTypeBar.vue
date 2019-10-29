<template >
<div class="el-panel-white">
  <div class="el-panel-white-heading"><h3 class="el-panel-white-title">撞库类型</h3>
    <!-- <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
       <el-tab-pane label="今天" name="1"></el-tab-pane>
       <el-tab-pane label="近7天" name="2"></el-tab-pane>
       <el-tab-pane label="近30天" name="3"></el-tab-pane>
    </el-tabs> -->
  </div>
  <div class="el-panel-white-body">
     <el-row :gutter="20">
     <div class="echarts_BoxB3" style="height:150px;!important" id="hitLibraryTypeMap"></div>
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
            accountTitle:"撞库类型详情",
             accountShow:false,
             accountTableId:"hitLibraryTypeId",
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
        var data = await this.commonAjax.req("/ssa/forceCrack/getRadarHitLibraryType.do", this.params);
        var myChart = echarts.init(document.getElementById("hitLibraryTypeMap"));
        var indicatorData = [];
        var seriesData=[];


        for(var i = 0; i < data.length; i++){
            seriesData.push(data[i].count);
        };
        seriesData.push(0);
        seriesData.push(0);

        for(var i = 0; i < data.length; i++){
            var dataUnit = data[i];
            var child={ name: 'cookies撞库', max: 100};
            child.name=dataUnit.v_type;
            indicatorData.push(child);
        };

        var child1={ name: '僵尸', max: 100};
        var child2={ name: '突破验证码', max: 100};
        indicatorData.push(child1);
        indicatorData.push(child2);


        // console.log(lenData);
        // console.log(xAxis);
        // console.log(seriesData);


        // var myLenData=[];
        // for(var i = 0; i < lenData.length; i++){
        //     myLenData.push(this.fmtEventTypeList(lenData[i]).toString());
        // };


        var option  = {
			       color:["#33CC66","#ff0000"],

							tooltip: {},


							radar: {
								// shape: 'circle',
								center: ['50%', '50%'],
								indicator:indicatorData,
								name: {
								textStyle: {
									color:'#696969'
								}
							},
							splitArea: {
								areaStyle: {
									color: ['#FFFFFF'],
									shadowColor: 'rgba(0, 0, 0, 0.3)',
									shadowBlur: 10
								}
							},

							},
							series: [{
								name: '',
								type: 'radar',
								// areaStyle: {normal: {}},
								data : [
									{
										value : seriesData,
										name : '暴破类型',
										areaStyle: {
											normal: {
												color: 'rgba(51, 204, 102, 1)'
											}
										}
									}
								]
							}]
			   };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
        myChart.on('click', function(params) {
            vm.showAccountDetail(params.data[0]);
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
