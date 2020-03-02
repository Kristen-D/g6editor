<template >
  <div class="el-panel">
          <div class="el-panel-heading">
            <h4 class="el-panel-title">撞库成功趋势图</h4>
            <el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
                 <el-tab-pane label="今天" name="day"></el-tab-pane>
                 <el-tab-pane label="近7天" name="week"></el-tab-pane>
                 <el-tab-pane label="近30天" name="month"></el-tab-pane>
              </el-tabs>
          </div>
          <div class="el-panel-body">
               <el-row>
                  <div class="echartbox4" id="hitlineB"></div>
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
             accountTitle:"撞库成功详情",
             accountShow:false,
             accountTableId:"sucLineAccountId",
             tableUrl:"",
             params:{dateRange:'week',days:''},
             activeName:'week',
             sucLineData:[],
             categoryData : [],
   				 }
   		 },


    methods: {
      onCloseAccount(){

      },
      showAccountDetail(days){
        if (this.activeName=="day") {
          var today =new Date();
          var name = today.toLocaleDateString()+"-"+days+"点"
          this.accountTitle="撞库成功详情--"+name;
        }else {
          this.accountTitle="撞库成功详情--"+days;
        }
        this.params = {...this.params,days};
        this.tableUrl="/ssa/hitLibrary2/getSucLineDetail.do";
        this.accountShow=true;
      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },
      async loadMapChart(){
        var data = await this.commonAjax.req("/ssa/hitLibrary2/getSucLineData.do", this.params);
        var myChart = echarts.init(document.getElementById("hitlineB"));
        this.sucLineData = data.data;
        this.categoryData = data.date;

      var  option = {
            		tooltip: {
            			trigger: 'item',
            			axisPointer: {
            				type: 'cross',
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
                      res = "<p>撞库时间："
                          + name+ "</p><p>成功账户数："
                          + value+ "</p>";
                      return res;
                  },
            		},
            		grid: {
            			top: '5%',
            			left: '2%',
            			right: '3%',
            			bottom: '2%',
            			containLabel: true,
            		},
            		xAxis: [{
                			type: 'category',
                			boundaryGap: false,
                			axisLine: {
                					show: true,
                					lineStyle: {color: '#E1E3E4'},
                				},
                			axisLabel: {
                				textStyle: {color: '#3E4956',},
                			},
                		    axisTick: { show: false,},
                			data: this.categoryData,
            		}],
            		yAxis: [{
                			type: 'value',
                			splitNumber: 5,
                			splitLine: {
                					show: true,
                					lineStyle: {color: '#E1E3E4'}
                			},
                			axisLine: {
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
                			data: this.sucLineData,
            		}]
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
