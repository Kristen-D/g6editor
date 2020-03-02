<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <el-col  :span="10">
     <div class="el-panel-white-subtitle">重要资产受威胁TOP5</div>
     <div id="flowDayScatterA" class="echartbox2" ></div>
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
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              cacheData:[],
              params:{dateRange:'month'}
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
      async loadMapChart(dateRange){
        this.params.dateRange=dateRange;
        var data = await this.commonAjax.req("/ssa/situationAnaly/getEventTypeTop5.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayScatterA"));
        var lenData = [];
        var seriesData=[];
        var xAxis = [];
        var MyXAxis = [];




        for(var i = 0; i < data[0].length; i++){
          var dataUnit = data[0][i];
            xAxis.push(dataUnit.event_dest_ip);

        };
        for(var i = 0; i < data[0].length; i++){
          var dataUnit = data[0][i];
            MyXAxis.push(dataUnit.assert_name+"\n"+dataUnit.event_dest_ip);
            // console.log(dataUnit.event_dest_ip);
        };


        for(var i = 0; i < data[1].length; i++){
          var dataUnit = data[1][i];
            lenData.push(dataUnit.event_type);
        };

        for(var i = 0; i < lenData.length; i++){
          var childData = {
            name: "1",
  					type: "bar",
  					stack: "总量",
  					barMaxWidth:'35%',
  					itemStyle: {
  						normal: {
  							barBorderRadius: 0,
  							label: {
  								show: false,
  								position: "top",
  								formatter: function(p) {
  									return p.value > 0 ? (p.value) : '';
  								}
  							}
  						}
  					},
  					data: []
          };
           childData.name=this.fmtEventTypeList(lenData[i]);
             for(var j = 0; j < xAxis.length; j++){
                var isOk=0;
                   for(var k = 0; k< data[2].length; k++){
                     var dataUnit = data[2][k];
                     if(dataUnit.event_type==lenData[i]&&dataUnit.event_dest_ip==xAxis[j]){
                         childData.data.push(dataUnit.count);
                         isOk=1;
                     }
                   };

                   if(isOk==0){
                      childData.data.push(0);
                   }


             };

        // console.log(childData.data);
       seriesData.push(childData);
        };



        // console.log(lenData);
        // console.log(xAxis);
        // console.log(seriesData);


        var myLenData=[];
        for(var i = 0; i < lenData.length; i++){
          var childData =  {
                      name: '登出',
                      icon:'circle'
          };
            childData.name=this.fmtEventTypeList(lenData[i]).toString();
            myLenData.push(childData);
            // console.log(childData);
        };



        var option = {
		color: ['#1B55A5', '#00B8FF', '#FDB502','#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
			title: {
				// text: "重要资产Top5",
				left:'20',
				textStyle: {
					color: '#9ea3b4',
					fontSize: 14,
					fontweight: 100,
				},
			},
			legend: {
				top:'30',
				left:'20',
				itemWidth:10,
				itemHeight:10,
				itemGap:25,
				textStyle: {color: '#9ea3b4',fontSize: 14,},
				data:myLenData
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
					textStyle: {
						color: "#fff"
					}
				},
			},
			grid: {
				  top:'24%',
				  left: '3%',
				  right: '10%',
         		  bottom: '10%',
				  containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
			},
			calculable: true,
			xAxis: [{
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

				data: MyXAxis,
			}],
			yAxis: [{
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
			}],
			series:seriesData
	 };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
  			myChart.on('click', function(params) {
          let v = params.name.split('\n');
          let parameters = {};
          for(var item in vm.eventTypeList) {
              if (params.seriesName==vm.eventTypeList[item].text){
                parameters.parentEventType_s = vm.eventTypeList[item].id;
              }
          }
          parameters.module = 'assetOfThreatTop5_drilling';
          parameters.dateRange = vm.params.dateRange;
          parameters.time = vm.params.dateRange;
          parameters.old_total=params.data;
          parameters.detailUrl = '/ssa/situationAnaly/getEventTypeTop5Detail.do';
          parameters.typeName = v[0];
          parameters.ip = v[1];
          vm.$store.commit('openDrillDialogTable', parameters);
          vm.$store.dispatch('getDrillColumns', [vm, params.seriesName]);
          vm.$store.dispatch('loadDrillTableData');
  				  // vm.funbs(params.name,params.dataIndex);
  			});

      },
    	funbs(names,index){
    		if(this.currentIndex==-1){
    			this.$store.state.context.params.threat_desc=names;
    			this.isOpen=true;
    			this.currentIndex=index;//初始化进来的第一次点击
          this.$store.state.context.qryTableName1="-"+names;
          this.$store.state.context.params.event_type=this.cacheData[index];
          this.$parent.activeName=this.cacheData[index];
    		}else if (this.currentIndex==index&&this.isOpen){
    			this.$store.state.context.params.threat_desc=null;
    			this.isOpen=false;
    			this.currentIndex=-1;//打开一个机构，又把它关回去，相当于初始化
          this.$store.state.context.qryTableName1="";
          this.$store.state.context.params.event_type="";
          this.$parent.activeName="all";
    		}else{
    			this.$store.state.context.params.threat_desc=names;
    			this.isOpen=true;
    			this.currentIndex=index;//打开了一个机构，又去打开其他机构
          this.$store.state.context.qryTableName1="-"+names;
          this.$store.state.context.params.event_type=this.cacheData[index];
          this.$parent.activeName=this.cacheData[index];
    		}

        this.$parent.$refs.totalHeatMap.loadMapChart();

    		this.$store.commit('setParams',["qryTable", this.$store.state.context.params]);
    		this.$store.dispatch('reloadTable',"qryTable");
        this.$store.state.context.test=names;


    	}
    },
  created :function() {

  },
  mounted: async function() {
    // this.loadMapChart();
  }

}
</script>
