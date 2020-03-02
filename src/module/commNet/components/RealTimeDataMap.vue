<template >
  <div class="col-lg-6">
           <div class="panel">
             <div class="panel-heading">
             </div>
             <div class="panel-body">
           <div id="mymap5" style="height:250px;"></div>
           </div>
           </div>


           <el-dialog :title="title" :visible.sync="myShow"   width="85%" @close="onCloseIp()" >
           <div  style="height:300px">
              <eventDetailTable :id="eventDetailTable"  ></eventDetailTable>
           </div>
           </el-dialog>
    </div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
import eventDetailTable from './EventDetailTable.vue'
export default {
    components: {eventDetailTable} ,
    data(){
      return{
        resultData:[],
        total:"",
        myShow:true,
        //initIpShow:false,
        eventDetailTable:"eventDetailTable",
        isOpen:false,
        currentIndex:-1,
        title:"事件趋势详情",
        params:{}
      }
    },
  computed:{
    ...mapState({
       params:state=>state.context.params,
   })},
  watch:{
    params:function(params){
      this.loadMapChart();
    }
	 },
  methods: {
    async loadMapChart() {
      var params = this.params;
      var data = await this.commonAjax.req("/statsReports/getEventTrends.do", params);
      var myChart = echarts.init(document.getElementById("mymap5"));

      var hourData = [];
      var hourValue = [];

      for(var i = 0; i < data.length; i++) {
        var dataUnit = data[i];
        hourData.push(dataUnit.time);
        hourValue.push(dataUnit.value);
      }
      var option = {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            right: 7,
            feature : {
                mark : {show: true},
                // dataView : {show: true, readOnly: true},
                saveAsImage : {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },

        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : hourData,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgb(135,135,135)',
                        width: 1.5,
                    }
                },
                axisLabel: { //坐标轴刻度标签的相关设置。
    						textStyle: {
    							color: 'rgba(255,255,255,0.83)',
    							fontFamily: "微软雅黑",
    							fontSize: 12
    						},
    					}
            }
        ],

        yAxis : [
            {
                type : 'value',
                minInterval: 1,
                position: ['left', 'right'],
                splitLine: {
                    show: false
                },
                axisLabel: { //坐标轴刻度标签的相关设置。
    						textStyle: {
    							color: 'rgba(255,255,255,0.83)',
    							fontFamily: "微软雅黑",
    							fontSize: 12
    						},
    					}
            }
        ],

        series : [
            {
                name:'值',
                type:'line',
                stack: '总量',
                smooth:true,
                areaStyle: {normal: {color: 'rgb(173, 234, 226)'}},
                lineStyle: {normal: {color: 'rgb(175, 236, 214)'}},
                data: hourValue
            }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      // alert(111111);
      myChart.setOption(option);
      window.onresize=myChart.resize;
      let vm=this;
      myChart.on('click', function(params) {
          vm.funbs(params.name,params.dataIndex);
      });

    },
  onCloseIp(){

  },
  funbs(names,index){
    if(this.currentIndex==-1){
      // this.$store.state.context.params.threat_desc=names;
      this.isOpen=true;
      this.currentIndex=index;//初始化进来的第一次点击
      // this.$store.state.context.qryTableName1="-"+names;
    }else if (this.currentIndex==index&&this.isOpen){
      // this.$store.state.context.params.threat_desc=null;
      this.isOpen=false;
      this.currentIndex=-1;//打开一个机构，又把它关回去，相当于初始化
      // this.$store.state.context.qryTableName1="";
    }else{
      // this.$store.state.context.params.threat_desc=names;
      this.isOpen=true;
      this.currentIndex=index;//打开了一个机构，又去打开其他机构
      // this.$store.state.context.qryTableName1="-"+names;
    }
    this.myShow = this.isOpen;
    this.title="事件趋势详情-"+names+":00:00";
    this.params.myStartTime=names+":00:00";
    this.params.myEndTime=names+":00:00";
    this.$store.commit('setParams',[this.eventDetailTable, this.params]);
    this.$store.dispatch('reloadTable',this.eventDetailTable);

    // console.log(this.params);

  }
  },
  created :function() {

  },
  mounted:  function() {
    this.myShow =false;
    this.loadMapChart();
  }

}
</script>
