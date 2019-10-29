<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->

   <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">挽回结果</h3>
       <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
          <el-tab-pane label="今天" name="1"></el-tab-pane>
          <el-tab-pane label="近7天" name="2"></el-tab-pane>
          <el-tab-pane label="近30天" name="3"></el-tab-pane>
       </el-tabs>
     </div>
     <div class="el-panel-white-body">
       <el-row :gutter="20">
             <div class="echarts_BoxB3" style="height:250px;!important" id="flowDayRadarA"></div>
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
             accountTitle:"挽回结果详情",
             accountShow:false,
             accountTableId:"reSaveLineAccountId",
              tableUrl:"/ssa/forceCrack/getDetail1Detail.do",
              params:{dateRange:'month',days:''},
              activeName:'3'
   				 }
   		 },


    methods: {
      onCloseAccount(){

      },
      showAccountDetail(days){
        this.accountTitle="挽回结果详情--"+days;
        this.params.days=days;
        this.tableUrl="/ssa/forceCrack/getLineReSaveDetail.do";
        this.accountShow=true;
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
        var data = await this.commonAjax.req("/ssa/forceCrack/getLineReSave.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayRadarA"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];




        // for(var i = 0; i < data[0].length; i++){
        //   var dataUnit = data[0][i];
        //     xAxis.push(dataUnit.event_src_ip);
        // };
        for(var i = 0; i < data.xAxis.length; i++){
            xAxis.push(data.xAxis[i]);
        };

        for(var i = 0; i < data.lineData.length; i++){
          var dataUnit = data.lineData[i];
            var list=[];
            list.push(dataUnit.days.toString());
            list.push(dataUnit.count);
            seriesData.push(list);
        };

      var  option = {
        tooltip: {
          trigger: 'axis',
          formatter:function (params, ticket, callback) {
            // console.log(params);
            if (params[0].dataIndex!=-1){
              var str="时间：";
              str+=params[0].data[0];
                str+="<br/>";
               str+="账户数：";
                 str+=params[0].data[1];
             return str;
            }
          }
        },
     		grid: {
     			top: '10%',
     			left: '10%',
     			right: '8%',
     			bottom: '10%',
     			containLabel: true,
     		},
     		xAxis: [{
     			type: 'category',
     			boundaryGap: false,
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
     			data: xAxis,
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
     					show: true,
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
     			areaStyle: { //区域填充样式
                     normal: {
                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
     					   { offset: 0,  color: 'rgba(53,142,215, 0.9)'},
     					   { offset: 0.7,  color: 'rgba(53,142,215, 0.3)'}
     				   ], false),

                      shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                      shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  }
              },


     			data:seriesData
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
