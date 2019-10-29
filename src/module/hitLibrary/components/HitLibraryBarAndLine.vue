<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->

   <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">撞库趋势</h3>
       <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
          <el-tab-pane label="今天" name="1"></el-tab-pane>
          <el-tab-pane label="近7天" name="2"></el-tab-pane>
          <el-tab-pane label="近30天" name="3"></el-tab-pane>
       </el-tabs>
     </div>
     <div class="el-panel-white-body">
          <!-- <div class="echarts_BoxB1" style="height:260px;" id="flowDayScatterB"></div> -->
          <el-row :gutter="20">
          <el-col :span="8"><div id="ThreatypePie" class="echarts_BoxB1" style="height:150px;!important"></div></el-col>
          <el-col :span="15"><div id="flowDaylineA" class="echarts_BoxB1" style="height:150px;!important"></div></el-col>
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
             params:{dateRange:'month'},
             activeName:'3',
             ipShow:false,
             accountShow:false,
             ipTableId:"hitLibraryIpId",
             accountTableId:"hitLibraryAccountId",
             tableUrl:"/ssa/hitLibrary/getDetail1Detail.do",
   				 }
   		 },


    methods: {
      onCloseIp(){

      },
      onCloseAccount(){

      },
      showIpDetail(days){
        this.ipTitle="撞库趋势折线图详情--"+days;
        this.params.days=days;
        this.tableUrl="/ssa/hitLibrary/getLineHitLibraryDetail.do";
        // this.ipShow=true;
        this.params = {...this.params};
      },
      showIpDetailByPie(){
        // this.ipShow=true;
        this.params = {...this.params};
      },
      showAccountDetail(){
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
      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/hitLibrary/getLineHitLibrary.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDaylineA"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];




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
                 str+="撞库次数：";
                   str+=params[0].data[1];
               return str;
              }

            },
      		},
      		grid: {
      			top: '5%',
      			left: '2%',
      			right: '8%',
      			bottom: '3%',
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

      			data:seriesData
      		}]
      	};




      var data2 = await this.commonAjax.req("/ssa/hitLibrary/getPieHitLibrary.do", this.params);
     var failNum=data2.failNum;
     var sucNum=data2.sucNum;
     var reSave=data2.reSave;

      var myChart2 = echarts.init(document.getElementById('ThreatypePie'));
              var option2= {
        tooltip: {
          trigger: 'item',
           			formatter: "状态:{b}<br/>账户数:{c}<br/>占比:({d}%)"
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
            data:[
              {value:reSave, name:'已挽回'},
              {value:failNum, name:'撞库\n失败'},
              {value:sucNum, name:'撞库\n成功'}

            ]
          }
        ]
        };

     	 myChart2.setOption(option2);




        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;

        let vm=this;
        myChart.on('click', function(params) {
            vm.showIpDetail(params.data[0]);
        });

        myChart2.on('click', function(params) {
          if(params.name=="已挽回"){
            vm.accountTitle="撞库趋势饼图详情--已挽回";
            vm.tableUrl="/ssa/hitLibrary/getPieByReSaveDetail.do";
            vm.showAccountDetail();
          }else if(params.name=="撞库\n失败"){
            vm.ipTitle="撞库趋势饼图详情--撞库失败";
            vm.tableUrl="/ssa/hitLibrary/getPieBySucNumAndFailNumDetail.do";
            vm.showIpDetailByPie();
          }else if(params.name=="撞库\n成功"){
            vm.ipTitle="撞库趋势饼图详情--撞库成功";
            vm.tableUrl="/ssa/hitLibrary/getPieBySucNumAndFailNumDetail.do";
            vm.showIpDetailByPie();
          }

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
