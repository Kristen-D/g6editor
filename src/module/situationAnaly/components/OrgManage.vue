<template >
  <el-col :span="14">
    <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">部门视图</h3>
      <el-tabs class="float-r day-tabs" v-model="activeName" @tab-click="changeTime">
         <el-tab-pane label="今天" name="1" ></el-tab-pane>
         <el-tab-pane label="近7天" name="2" ></el-tab-pane>
         <el-tab-pane label="近30天" name="3" ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-white-body">
      <el-row :gutter="10">
        <el-col :span="14">
          <div class="el-panel-white-subtitle">重要部门受威胁TOP5</div>
          <div id="flowDayBarA" class="echartbox1"></div>
        </el-col>
        <el-col :span="10">
            <div class="el-panel-white-subtitle">安全评分</div>
          <div style="margin-top: 18px; padding-left: 8px;">
             <label style="font-size: 12px;">按分数高低排名</label>
             <!-- <ul class="safe-mark">
               <li class=""><i class="ion-ios7-arrow-thin-up"></i></li>
               <li><i class="ion-ios7-arrow-thin-down"></i></li>
             </ul> -->
             <ul class="safe-mark-content">
               <li v-for="(m, index) in orgScorelist"><div>{{index+1}}</div><label>{{fmtOrgList(m.org_id)}}</label><span>{{m.score}}</span></li>
              </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
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
        orgList:state=>state.context.orgList,
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              cacheData:[],
              params:{dateRange:'month'},
              orgScorelist:[],
              activeName:"3",
   				 }
   		 },


    methods: {
      changeTime(value){
        if (value.name=="1"){
          this.params.dateRange="day";
        }else if(value.name=="2"){
          this.params.dateRange="week";
        }else if(value.name=="3"){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },

      getColor(){
        return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);
      },
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      fmtOrgList(val){

         for(var item in this.orgList) {
             if (val==this.orgList[item].id){
               return this.orgList[item].text;
             }
         }

      },
      async loadMapChart(){

        var data = await this.commonAjax.req("/ssa/situationAnaly/getOrgEventType.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayBarA"));
        var lenData = [];
        var seriesData=[];
        var yAxis = [];
        var colorData=[];




        for(var i = 0; i < data[0].length; i++){
          var dataUnit = data[0][i];
            yAxis.push(dataUnit.org_name);
        };

        for(var i = 0; i < data[1].length; i++){
          var dataUnit = data[1][i];
            lenData.push(dataUnit.event_type);
        };

        for(var i = 0; i < lenData.length; i++){
          var yLength=0;
          var childData =  {
                      name: '登出',
                      type: 'bar',
                      barWidth : 12,
                      stack: '总量',
                      label: {
                        normal: {
                          show: false,
                          position: 'insideRight'
                        }
                      },
                      data:[]
          };
           childData.name=this.fmtEventTypeList(lenData[i]);
             for(var j = 0; j < yAxis.length; j++){
                 var isOk=0;
                   for(var k = 0; k< data[2].length; k++){
                     var dataUnit = data[2][k];
                     if(dataUnit.event_type==lenData[i]&&dataUnit.org_name==yAxis[j]){
                         isOk=1;
                           if(yLength<5){
                           childData.data.push(dataUnit.count);
                           yLength=yLength+1;
                          }
                     }
                   };

             if(isOk==0){
                if(yLength<5){
                childData.data.push(0);
                yLength=yLength+1;
               }
             }

             };

        // console.log(childData.data);

            seriesData.push(childData);



        };



        // console.log(lenData);
        // console.log(yAxis);
        // console.log(seriesData);


        var myLenData=[];
        for(var i = 0; i < lenData.length; i++){
          var childData =  {
                      name: '登出',
                      icon:'circle'
          };
            childData.name=this.fmtEventTypeList(lenData[i]).toString();
            myLenData.push(childData);
            colorData.push(this.getColor());
            // console.log(childData);
        };



        var option =  {
    color: ['#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
    title: {
        // text: '重要单元受威胁Top5',
		left:'20',
        textStyle: {
            color: '#9ea3b4',
            fontSize: 14,
			fontweight:'normal',
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    legend: {
		top:'28',
		itemWidth:10,
		itemHeight:10,
		itemGap:25,
        textStyle: {color: '#9ea3b4',fontSize: 14,},
        data:myLenData
    },
    grid: {
		top:'22%',
        left: '3%',
        right: '10%',
        bottom: '10%',
        containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
    },
    xAxis: {
      show:false,
      type: 'value',
    			min: 0,
    			splitNumber: 5,
    			splitLine: { //坐标轴在 grid 区域中的分隔线。
    				show: true,
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


    },
    yAxis: {
      inverse:'true',
      type: 'category',
    			splitLine: { //坐标轴在 grid 区域中的分隔线。
    				show: false,
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
    			axisTick:{ //坐标轴刻度相关设置。
    				show:false,
    			},
        data: yAxis
    },
    series:seriesData
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;


        let vm = this;
        myChart.on('click', function(params) {
            
          let parameters = {};
          for(var item in vm.eventTypeList) {
              if (params.seriesName==vm.eventTypeList[item].text){
                parameters.parentEventType_s = vm.eventTypeList[item].id;
              }
          }
          parameters.module = 'threatDepartment_drilling';
          parameters.detailUrl = '/ssa/situationAnaly/getOrgEventTypeDetail.do';
          parameters.time=vm.params.dateRange;
          parameters.dateRange = vm.params.dateRange;
          parameters.title=params.name;
          parameters.old_total=params.value;
          vm.$store.commit('openDrillDialogTable', parameters);
          vm.$store.dispatch('getDrillColumns', [vm, parameters.title]);
          vm.$store.dispatch('loadDrillTableData');
        });
      },

    },
  created :function() {

  },
  mounted: async function() {
    // this.loadMapChart();
      var data = await this.commonAjax.req("/ssa/situationAnaly/getScoreList.do", this.params);
      this.orgScorelist=data.orgScorelist;
  }

}
</script>
