<template>
  <div class="shine">
		<div class="" style="height: 60px; padding: 10px 30px;">
			<el-tabs v-model="activeName" @tab-click="changeType" class="labeltabs">
				<el-tab-pane label="采集趋势" name="first"></el-tab-pane>
				<el-tab-pane label="更新趋势" name="second"></el-tab-pane>
				<el-tab-pane label="发布趋势" name="third"></el-tab-pane>
			</el-tabs>
			<el-radio-group v-model="radiobutton"  @change="changeTime" class="daytabs m-t--45">
			<el-radio-button label="2" >本周</el-radio-button>
			<el-radio-button label="3" >本月</el-radio-button>
		</el-radio-group>
		</div>
		<!-- <div class="echartsbox7" id="line1"></div> -->
    <div class="el-panel-white-body">
      <el-row :gutter="20">
            <div class="echartsbox7" style="height:150px;!important" id="flowDayRadarA"></div>
        </el-row>
</div>

<el-dialog :title="urlTitle" :visible.sync="urlShow" width="85%" @close="onCloseAccount()">
 <div style="height:300px">
 <UrlTable :id="UrlTableId" :tableUrl="tableUrl" :params="params"></UrlTable>
 </div>
</el-dialog>
	</div>
</template>
<script>

// import {UrlCategory} from "./ChartOptions";
import echarts from 'echarts'
import UrlTable from './UrlTable.vue'
export default {
  components: {UrlTable},
  name: "url-relation",
  data () {
    return {
      activeName: 'first',
      registrantList: [],
      urlTitle:"结果详情",
      urlShow:false,
      UrlTableId:"urlTableId",
      tableUrl:"/ssa/hitLibrary/getDetail1Detail.do",
      params:{dateRange:'month',days:'',datetypeRange:'collect_date',},
      radiobutton: 2,
    }
  },
  methods: {
    showAccountDetail(days){
      this.urlTitle="结果详情--"+days;
      this.params.days=days;
      this.tableUrl="/ssa/hitLibrary/getLineReSaveDetail.do";
      this.urlShow=true;
      this.params = {...this.params};
    },
    changeType(value){console.log(value);
      if (value.name=='first'){
        this.params.datetypeRange="collect_date";
      }else if(value.name=='second'){
        this.params.datetypeRange="update_date";
      }else if(value.name=='third'){
        this.params.datetypeRange="date";
      }
      console.log(this.params.datetypeRange);
      this.loadMapChart();

    },
    changeTime(value){
      if(value==2){
        this.params.dateRange="week";
      }else if(value==3){
        this.params.dateRange="month";
      }
      // console.log(this.params.dateRange);
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
      var data = await this.commonAjax.req("/ssa/blackURL/UrlCategory.do", this.params);
      var myChart = echarts.init(document.getElementById("flowDayRadarA"));
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
             str+="数量：";
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
  async  created () {
    this.loadMapChart();
    }
  }
</script>
