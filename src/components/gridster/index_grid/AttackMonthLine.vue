<template >

   <el-col  :span="10">
       <div class="el-panel-white-subtitle">攻击事件趋势</div>
     <div id="flowDaylineA" class="echartbox2"></div>
   </el-col>


</template>
<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({
       params:state=>state.context.params,
        test:state=>state.context.test,
        eventTypeList:state=>state.context.eventTypeList,
        EventRiskList:state=>state.context.EventRiskList,
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              cacheData:[],
              params:{dateRange:'month'},
              activeName:"3",
   				 }
   		 },


    methods: {
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      fmtEventRiskList(val){

        if(val==1){
          return "低危";
        }else if(val==2){
          return "中危";
        }else if(val==3){
          return "高危";
        }

      },
      async loadMapChart(dateRange){
        this.params.dateRange=dateRange;
        var data = await this.commonAjax.req("/ssa/situationAnaly/getLineByEventType.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDaylineA"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];

        for(var i = 0; i < data.xAxis.length; i++){
            xAxis.push(data.xAxis[i]);
        };

        for(var i = 0; i < data.EventTypePid.length; i++){
          var dataUnit = data.EventTypePid[i];
            lenData.push(dataUnit.name);
        };


        var myLenData=[];
        for(var i = 0; i < lenData.length; i++){
          var childData =  {
                      name: '登出',
                      icon:'circle'
          };
            childData.name=lenData[i];
            myLenData.push(childData);
        };


        for(var i = 0; i < data.lineData.length; i++){
          var dataUnit = data.lineData[i];
          var childData={
          							name:'1',
          							type:'line',
          							smooth:true,
          							lineStyle: { //线条样式
          								   normal: {
          									   width: 1
          								   }
          							   },
          							itemStyle: {normal: {areaStyle: {type: 'default'}}},
          							data:[]
          						};



        for(var j = 0; j < dataUnit.length; j++){
            var list=[];
            list.push(dataUnit[j].days+"");
            list.push(dataUnit[j].count);
            childData.data.push(list);
            childData.name=this.fmtEventTypeList(dataUnit[j].event_type)+"";
        };
        // console.log(childData.data);
        seriesData.push(childData);
        };





        var option =  {
	color: ['#1B55A5', '#00B8FF', '#FDB502','#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
				   legend: {
             top: '18',
     				left: '10',
     				itemWidth: 10,
     				itemHeight: 10,
     				itemGap: 25,
     				textStyle: {
     					color: '#3E4956',
     					fontSize: 12,
     				},
					   data: myLenData,
		            },
				   tooltip : {
							trigger: 'axis',
							 textStyle:{
								fontSize:14,
								color:"#fff",
							  }
						},
				   grid: {
						left: '10%',
					    right:'10%',
						top: '20%',
						bottom: '10%',
						containLabel: true,
					},
					calculable : true,
					xAxis : [
						{
                          type: "category",
              boundaryGap: true, //坐标轴两边留白策略（类目轴）
              splitLine: { //坐标轴在 grid 区域中的分隔线。
                  show: false,
                  lineStyle: {
                    color: '#E1E3E4'
                  }
                },
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
              axisTick:{ //坐标轴刻度相关设置。
                  show:false,
                },
							data :xAxis
						}
					],
					yAxis : [
						{
              type: "value",
    				min: 0,
    				splitNumber: 4,
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
    				axisTick:{ //坐标轴刻度相关设置。
    						show:false,
    					},
						}
					],
					series : seriesData
			}; // option结束



        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        let vm=this;
        myChart.on('click', function(params) {
          let parameters = {};
          let typeObj = vm.eventTypeList.find((obj) => {
            return params.seriesName === obj.text
          });
          parameters.parentEventType_s = typeObj.id;
          parameters.dateRange = vm.params.dateRange;
          parameters.old_total=params.value[1];
          parameters.time=vm.params.dateRange;
          parameters.module = 'threatView1_drilling';
          parameters.detailUrl = '/ssa/situationAnaly/getLineByMonthDetail.do';
          parameters.timeValue = params.value[0];
          vm.$store.commit('openDrillDialogTable', parameters);
          vm.$store.dispatch('getDrillColumns', [vm, params.seriesName+"_"+params.value[0]]);
          vm.$store.dispatch('loadDrillTableData');
            // vm.funbs(params.name,params.dataIndex);
        });
        window.onresize=myChart.resize;


      },

    },
  created :function() {

  },
  mounted: async function() {
    // this.loadMapChart();
  }

}
</script>
