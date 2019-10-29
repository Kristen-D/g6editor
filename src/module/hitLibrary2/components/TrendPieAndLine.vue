<template >
  <div class="el-panel">
         <div class="el-panel-heading">
           <h4 class="el-panel-title">撞库趋势</h4>
           <el-tabs class="float-r day-tabs"   @tab-click="changeTime" v-model="activeName">
                  <el-tab-pane label="今天" name="day"></el-tab-pane>
                  <el-tab-pane label="近7天" name="week"></el-tab-pane>
                  <el-tab-pane label="近30天" name="month"></el-tab-pane>
             </el-tabs>
         </div>
         <div class="el-panel-body">
             <el-row>
                 <el-col :span="8">
                   <div class="echartbox7" id="hitpieA" ></div>
                  </el-col>
                 <el-col :span="16">
                   <div class="echartbox7" id="hitlineA" > </div>
                  </el-col>
               </el-row>
         </div>
         <el-dialog :title="ipTitle" :visible.sync="ipShow" width="85%"  @close="onCloseIp()">
               <div style="height:300px">
             <ipTable :id="ipTableId" :tableUrl="tableUrl" :params="params"></ipTable>
             </div>
         </el-dialog>
         <el-dialog :title="accountTitle" :visible.sync="accountShow" width="85%" @close="onCloseAccount()">
           <div style="height:300px">
           <accountTable :id="accountTableId" :tableUrl="tableUrl" :params="params"></accountTable>
           </div>
         </el-dialog>
    </div>


</template>

<script>
import {mapState,mapActions } from 'vuex'
import ipTable from './IpTable.vue'
import accountTable from './AccountTable.vue'
import echarts from 'echarts'
export default {
    components: {ipTable,accountTable},
  computed:{
    ...mapState({

   })},

   data(){
   				 return {
             ipTitle:"IP详情",
             accountTitle:"账户详情",
             params:{dateRange:'week'},
             activeName:'week',
             ipShow:false,
             accountShow:false,
             ipTableId:"hitLibraryIpId",
             accountTableId:"hitLibraryAccountId",
             tableUrl:"",
             pieData:[],
             lineData:[],
             categoryData:[],
   				 }
   		 },


    methods: {
      onCloseIp(){

      },
      onCloseAccount(){

      },
      showIpDetail(days){
        if (this.activeName=="day") {
          var today =new Date();
          var name = today.toLocaleDateString()+"-"+days+"点"
          this.ipTitle="撞库趋势折线图详情--"+name;
        }else {
          this.ipTitle="撞库趋势折线图详情--"+days;
        }

        this.params = {...this.params,days};
        this.tableUrl="/ssa/hitLibrary2/getLineHitLibraryDetail.do";
        this.ipShow=true;
      },
      showAccountDetail(){
        this.accountShow=true;
        this.params = {...this.params};
      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },
      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/hitLibrary2/getTrendLineData.do", this.params);
        var myChart = echarts.init(document.getElementById("hitlineA"));
        this.lineData = data.data;
        this.categoryData = data.date;

      var  option = {
             tooltip: {
               trigger: 'item',
               axisPointer: {
                 type: 'cross',
               }
             },
             formatter: function(params) {

               var res = "";
                 if (params.name.indexOf("-")==-1) {
                   var today =new Date();
                   var name = today.toLocaleDateString()+"-"+params.name+"点"
                 }else {
                   var name = params.name;
                 }

                 var value = params.value;
                 res = "<p>时间："
                     + name+ "</p><p>撞库次数："
                     + value+ "</p>";
                 return res;
             },
             grid: {
               top: '5%',
               left: '2%',
               right: '3%',
               bottom: '3%',
               containLabel: true,
             },
             xAxis: [{
               type: 'category',
               data: this.categoryData,
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
           series: [{
             name: '事件级别',
             type: 'line',
             smooth: true, //是否平滑曲线显示
             symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
             symbolSize:6,
             itemStyle: {
               normal: {
                 color: "#2980b9",  // 会设置点和线的颜色，所以需要下面定制 line
                 borderColor: "#fff"  // 点边线的颜色
               }
             },
             lineStyle: {
               normal: {
                 color: "#2980b9"   // 线条颜色
               }
             },

             data: this.lineData
           }]
         };




      var data2 = await this.commonAjax.req("/ssa/hitLibrary2/getTrendPieData.do", this.params);
      var myChart2 = echarts.init(document.getElementById('hitpieA'));
      this.pieData = data2;
              var option2= {
                    		tooltip: {
                    			trigger: 'item',
                    			formatter: "状态：{b} <br/>占比数：{d}%<br/> 账户数: {c}"
                    		},
                    		series: [
                    			{
                    				name:'访问来源',
                    				type:'pie',
                    				color:['#12CBF6', '#0065BA', '#028BFF'],
                    				radius: ['54%', '76%'],
                    				center: ['45%', '50%'],
                    				avoidLabelOverlap: false,
                    				label: {
                    					normal: {
                    						show: true,
                    						textStyle: { fontSize: 12, color: '#3E4956', }
                    					},
                    				},
                    				labelLine: {
                    					normal: {
                    						show: true,
                    						length:6,
                    					}
                    				},
                    				itemStyle: { //图形样式
                    					normal: {
                    						borderWidth: 2,
                    						borderColor: '#ffffff',

                    					}
                    				},
                    				data:this.pieData,
                    			}
                    		]
        	            };

     	 myChart2.setOption(option2);


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;

        let vm=this;
        myChart.on('click', function(params) {

            vm.showIpDetail(params.name);
        });

        myChart2.on('click', function(params) {

          if(params.name=="已挽回"){
            // vm.accountTitle="撞库趋势饼图详情--已挽回";
            // vm.tableUrl="/ssa/hitLibrary2/getPieByReSaveDetail.do";
            // vm.showAccountDetail();
          }else if(params.name=="撞库\n失败"){
            vm.accountTitle="撞库趋势饼图详情--撞库失败";
            vm.tableUrl="/ssa/hitLibrary2/getPieByFailNumDetail.do";
            vm.showAccountDetail();
          }else if(params.name=="撞库\n成功"){
            vm.accountTitle="撞库趋势饼图详情--撞库成功";
            vm.tableUrl="/ssa/hitLibrary2/getPieBySucNumDetail.do";
            vm.showAccountDetail();
          }

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
