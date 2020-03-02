<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->

    <el-col  :span="10">
      <div class="el-panel-subtitle">资产受威胁TOP5</div>
   <el-row :gutter="16">
     <el-col  :span="8">
         <!-- <div id="flowDayScatterA" class="echartbox2" ></div> -->
         <div class="pie">
           <e-charts :options="option" auto-resize></e-charts>
         </div>
     </el-col>

     <el-col  :span="8">

         <el-table :data="tableDataBehavior"  border class="white-table table_item"  max-height="250"  :row-class-name="tableRowClassName">
           <el-table-column :show-overflow-tooltip="true" prop="name" align="center" min-width="120" label="行为类型" >
           </el-table-column>
           <el-table-column :show-overflow-tooltip="true" prop="count" align="center" min-width="60" label="数量"  >
           </el-table-column>
         </el-table>


     </el-col>
      <el-col  :span="8">
        <el-table :data="tableDataDevice"  border class="white-table table_item"  max-height="250"  :row-class-name="tableRowClassName"> <!-- :row-class-name="tableRowClassName" -->
          <el-table-column :show-overflow-tooltip="true" prop="name" align="center" label="设备数据量"  >
          </el-table-column>
          <el-table-column  prop="count" align="center"  min-width="60"  label="数量"  >
          </el-table-column>
        </el-table>

       </el-col>
   </el-row>

  </el-col>

</template>
<style media="screen">
.white-table{font-size: 12px}
.white-table .el-table__header tr { color: #3e4956;font-weight: normal;background-color: #f5f6fa;}
.white-table .el-table__header tr > th{padding: 6px 0px;}
.white-table .el-table__body tr >td{ padding:8px 0;  color: #3e4956;}

/*table scroll hide*/
.white-table .el-table__body-wrapper{overflow: hidden;}
.white-table .el-table__body{width: 100% !important;}

.table_item.el-table .even-row {
  background-color: rgba(255,255,255,0.05);
}
.table_item.el-table .odd-row{
  background-color: rgba(10,17,30,0.05) !important;
}
.item {
  /* display: inline; */
  height: 100%;
  width: 100%;
}
.pie {
  height:250px;
  width:200px;
  display: inline-block;
}

</style>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
import ECharts from "components/vue-echarts/ECharts.vue";
import {pieAssetTop5} from './ChartOptions.js'
export default {
  props:['day'],
  watch:{
    day:function(){
      this.getData();
    }
  },
  components: {
    ECharts
  },
  computed:{
    ...mapState({
        test:state=>state.context.test,
        eventTypeList:state=>state.context.eventTypeList,
   })},

   data(){
				 return {
           dayParam:'',
           tableDataBehavior:[],
           tableDataDevice:[],
	          isOpen:false,
						currentIndex:-1,
          cacheData:[],
          params:{dateRange:'month'},
          option:pieAssetTop5
				 }
   	},
    methods: {

      getData(){

        if(this.day!='month'){
          this.dayParam = this.day;
        }else {
          this.dayParam = '';
        }
        this.getEventTypeTop5PieSave();
        this.getEventTypeTop5EventType();
          this.getEventTypeTop5DeviceType();
      },
      getEventTypeTop5EventType(){
        var params = {day:this.dayParam};
        this.common.reqDef("/ssa/situationAnaly/getEventTypeTop5EventType.do",params).then(data => {
          this.tableDataBehavior = data.data;

        })
      },
      getEventTypeTop5DeviceType(){
        var params = {day:this.dayParam};
        this.common.reqDef("/ssa/situationAnaly/getEventTypeTop5DeviceType.do",params).then(data => {
          this.tableDataDevice = data.data;
        })
      },
      getEventTypeTop5PieSave(){
        var params = {day:this.dayParam};
				this.common.reqDef("/ssa/situationAnaly/getEventTypeTop5PieSave.do",params).then(data => {
          

            var data1 = [];
  					// console.log(data.data);
            var name = ['安全行为','非安全行为'];
            var value = [];
            value.push(data.data.save[0].count);
            value.push(data.data.unsave[0].count);
            for(var i = 0; i<name.length; i++){
              var a =  {
                value:'',
                name:''
              }
              a.name = name[i];
              a.value = value[i];
              data1.push(a);
            }
            this.option.legend.data = name;
            this.option.series[0].data = data1;


				})
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1 ) {
          return 'even-row';
        } else if (rowIndex % 2 == 0) {
          return 'odd-row'
        }
      }
   //    fmtEventTypeList(val){
   //
   //       for(var item in this.eventTypeList) {
   //           if (val==this.eventTypeList[item].id){
   //             return this.eventTypeList[item].text;
   //           }
   //       }
   //
   //    },
   //    async loadMapChart(dateRange){
   //      this.params.dateRange=dateRange;
   //      var data = await this.commonAjax.req("/ssa/situationAnaly/getEventTypeTop5.do", this.params);
   //      var myChart = echarts.init(document.getElementById("flowDayScatterA"));
   //      var lenData = [];
   //      var seriesData=[];
   //      var xAxis = [];
   //      var MyXAxis = [];
   //
   //
   //
   //
   //      for(var i = 0; i < data[0].length; i++){
   //        var dataUnit = data[0][i];
   //          xAxis.push(dataUnit.event_dest_ip);
   //
   //      };
   //      for(var i = 0; i < data[0].length; i++){
   //        var dataUnit = data[0][i];
   //          MyXAxis.push(dataUnit.assert_name+"\n"+dataUnit.event_dest_ip);
   //          // console.log(dataUnit.event_dest_ip);
   //      };
   //
   //
   //      for(var i = 0; i < data[1].length; i++){
   //        var dataUnit = data[1][i];
   //          lenData.push(dataUnit.event_type);
   //      };
   //
   //      for(var i = 0; i < lenData.length; i++){
   //        var childData = {
   //          name: "1",
  	// 				type: "bar",
  	// 				stack: "总量",
  	// 				barMaxWidth:'35%',
  	// 				itemStyle: {
  	// 					normal: {
  	// 						barBorderRadius: 0,
  	// 						label: {
  	// 							show: false,
  	// 							position: "top",
  	// 							formatter: function(p) {
  	// 								return p.value > 0 ? (p.value) : '';
  	// 							}
  	// 						}
  	// 					}
  	// 				},
  	// 				data: []
   //        };
   //         childData.name=this.fmtEventTypeList(lenData[i]);
   //           for(var j = 0; j < xAxis.length; j++){
   //              var isOk=0;
   //                 for(var k = 0; k< data[2].length; k++){
   //                   var dataUnit = data[2][k];
   //                   if(dataUnit.event_type==lenData[i]&&dataUnit.event_dest_ip==xAxis[j]){
   //                       childData.data.push(dataUnit.count);
   //                       isOk=1;
   //                   }
   //                 };
   //
   //                 if(isOk==0){
   //                    childData.data.push(0);
   //                 }
   //
   //
   //           };
   //
   //      // console.log(childData.data);
   //     seriesData.push(childData);
   //      };
   //
   //
   //
   //      // console.log(lenData);
   //      // console.log(xAxis);
   //      // console.log(seriesData);
   //
   //
   //      var myLenData=[];
   //      for(var i = 0; i < lenData.length; i++){
   //        var childData =  {
   //                    name: '登出',
   //                    icon:'circle'
   //        };
   //          childData.name=this.fmtEventTypeList(lenData[i])+"";
   //          myLenData.push(childData);
   //          // console.log(childData);
   //      };
   //
   //
   //
   //      var option = {
		// color: ['#1B55A5', '#00B8FF', '#FDB502','#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
		// 	title: {
		// 		// text: "重要资产Top5",
		// 		left:'20',
		// 		textStyle: {
		// 			color: '#9ea3b4',
		// 			fontSize: 14,
		// 			fontweight: 100,
		// 		},
		// 	},
		// 	legend: {
		// 		top:'30',
		// 		left:'20',
		// 		itemWidth:10,
		// 		itemHeight:10,
		// 		itemGap:25,
		// 		textStyle: {color: '#9ea3b4',fontSize: 14,},
		// 		data:myLenData
		// 	},
		// 	tooltip: {
		// 		trigger: "axis",
		// 		axisPointer: {
		// 			type: "shadow",
		// 			textStyle: {
		// 				color: "#fff"
		// 			}
		// 		},
		// 	},
		// 	grid: {
		// 		  top:'15%',
		// 		  left: '3%',
		// 		  right: '10%',
   //       		  bottom: '4%',
		// 		  containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
		// 	},
		// 	calculable: true,
		// 	xAxis: [{
   //      type: "category",
   //      				boundaryGap: true, //坐标轴两边留白策略（类目轴）
   //      				splitLine: { //坐标轴在 grid 区域中的分隔线。
   //      						show: false,
   //      						lineStyle: {
   //      							color: '#E1E3E4'
   //      						}
   //      					},
   //      				axisLine: { //坐标轴轴线相关设置。数学上的x轴
   //      						show: true,
   //      						lineStyle: {
   //      							color: '#E1E3E4'
   //      						},
   //      					},
   //      				axisLabel: { //坐标轴刻度标签的相关设置
   //      						textStyle: {
   //      							color: '#3E4956',
   //      						},
   //      					},
   //      				axisTick:{ //坐标轴刻度相关设置。
   //      						show:false,
   //      					},
   //
		// 		data: MyXAxis,
		// 	}],
		// 	yAxis: [{
   //      type: "value",
  	// 			min: 0,
  	// 			splitNumber: 4,
  	// 			splitLine: { //坐标轴在 grid 区域中的分隔线。
  	// 					show: true,
  	// 					lineStyle: {
  	// 						color: '#E1E3E4'
  	// 					}
  	// 				},
  	// 			axisLine: { //坐标轴轴线相关设置。数学上的y轴
  	// 					show: false,
  	// 					lineStyle: {
  	// 						color: '#E1E3E4'
  	// 					},
  	// 				},
  	// 			axisLabel: {
  	// 					textStyle: {
  	// 						color: '#3E4956'
  	// 					},
  	// 				},
  	// 			axisTick:{ //坐标轴刻度相关设置。
  	// 					show:false,
  	// 				},
		// 	}],
		// 	series:seriesData
	 // };
   //
   //      // 使用刚指定的配置项和数据显示图表。
   //      myChart.setOption(option);
   //      window.onresize=myChart.resize;
   //      let vm=this;
  	// 		myChart.on('click', function(params) {
   //        let v = params.name.split('\n');
   //        let parameters = {};
   //        for(var item in vm.eventTypeList) {
   //            if (params.seriesName==vm.eventTypeList[item].text){
   //              parameters.parentEventType_s = vm.eventTypeList[item].id;
   //            }
   //        }
   //        parameters.module = 'assetOfThreatTop5_drilling';
   //        parameters.dateRange = vm.params.dateRange;
   //        parameters.time = vm.params.dateRange;
   //        parameters.old_total=params.data;
   //        parameters.detailUrl = '/ssa/situationAnaly/getEventTypeTop5Detail.do';
   //        parameters.typeName = v[0];
   //        parameters.ip = v[1];
   //        vm.$store.commit('openDrillDialogTable', parameters);
   //        vm.$store.dispatch('getDrillColumns', [vm, params.seriesName]);
   //        vm.$store.dispatch('loadDrillTableData');
  	// 			  // vm.funbs(params.name,params.dataIndex);
  	// 		});
   //
   //    },
   //  	funbs(names,index){
   //  		if(this.currentIndex==-1){
   //  			this.$store.state.context.params.threat_desc=names;
   //  			this.isOpen=true;
   //  			this.currentIndex=index;//初始化进来的第一次点击
   //        this.$store.state.context.qryTableName1="-"+names;
   //        this.$store.state.context.params.event_type=this.cacheData[index];
   //        this.$parent.activeName=this.cacheData[index];
   //  		}else if (this.currentIndex==index&&this.isOpen){
   //  			this.$store.state.context.params.threat_desc=null;
   //  			this.isOpen=false;
   //  			this.currentIndex=-1;//打开一个机构，又把它关回去，相当于初始化
   //        this.$store.state.context.qryTableName1="";
   //        this.$store.state.context.params.event_type="";
   //        this.$parent.activeName="all";
   //  		}else{
   //  			this.$store.state.context.params.threat_desc=names;
   //  			this.isOpen=true;
   //  			this.currentIndex=index;//打开了一个机构，又去打开其他机构
   //        this.$store.state.context.qryTableName1="-"+names;
   //        this.$store.state.context.params.event_type=this.cacheData[index];
   //        this.$parent.activeName=this.cacheData[index];
   //  		}
   //
   //      this.$parent.$refs.totalHeatMap.loadMapChart();
   //
   //  		this.$store.commit('setParams',["qryTable", this.$store.state.context.params]);
   //  		this.$store.dispatch('reloadTable',"qryTable");
   //      this.$store.state.context.test=names;
   //
   //
   //  	}
    },
  created :function() {
    this.getEventTypeTop5PieSave();
    this.getEventTypeTop5EventType();
    this.getEventTypeTop5DeviceType();
  },
  mounted: async function() {
      $(".table_item div.el-table__body-wrapper").myScroll({
         speed:100,  //滚动速度,值越大速度越慢
     rowHeight:59 //每行的高度
      });
  }


}
</script>
