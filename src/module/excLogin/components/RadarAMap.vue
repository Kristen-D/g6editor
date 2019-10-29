<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
<div class="echarts_BoxB3" id="flowDayRadarA"></div>
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
              cacheData:[]
   				 }
   		 },

   watch:{
		 params:function(params){
      //  alert("111");
      this.loadMapChart();
    },
    test:function(test){
    //  alert(test);
    //  this.loadMapChart();
   },
	 },
    methods: {
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      async loadMapChart(){
        // var params = this.params;
        // var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnPie.do", params);
        var myChart = echarts.init(document.getElementById("flowDayRadarA"));
        // var lenData = [];
        // var seriesData=[];
        // for(var i = 0; i < data.length; i++){
        //   var dataUnit = data[i];
        //   var childData = {};
        //   childData.value=dataUnit.total;
        //   childData.name=this.fmtEventTypeList(dataUnit.event_type);
        //   lenData.push(this.fmtEventTypeList(dataUnit.event_type));
        //   this.cacheData.push(dataUnit.event_type);
        //   seriesData.push(childData);
        // };
        // // console.log(this.eventTypeList);



        var option  = {
			       color:["#00ff00","#ff0000"],
			       title: {
							text: '登录耗用次数异常',
							x:"10px",
								y:"0",
								textStyle:{
										fontSize:14,
										color: '#9ea3b4'
										}
							},
							tooltip: {},
              legend: {
                 top:'20px',
    data: ['标准', '异常'],
    textStyle:{
      color:'#ffffff'
    }
},

							radar: {
								// shape: 'circle',
								center: ['50%', '60%'],
								indicator: [
								   { name: '', max: 3000},
								   { name: '', max: 3000},
								   { name: '', max: 3000},
								   { name: '', max: 3000},
								   { name: '', max: 3000},
								   { name: '', max: 3000}
								],
								name: {
								textStyle: {
									color:'#9ea3b4'
								}
							},
							splitArea: {
								areaStyle: {
									color: ['#9fc5e8'],
									shadowColor: 'rgba(0, 0, 0, 0.3)',
									shadowBlur: 10
								}
							},
							axisLine: {
								lineStyle: {
									color: '#2e3031'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.3)'
								}
							}
							},
							series: [{
								name: '',
								type: 'radar',
								// areaStyle: {normal: {}},
								data : [
									{
										value : [
                      // 1000, 1000, 1000, 1000, 1000, 1000
                    ],
										name : '标准',
										areaStyle: {
											normal: {
												color: 'rgba(255, 255, 255, 0.55)'
											}
										}
									},
									 {
										value : [
                      // 2000, 1400, 2400, 2500, 2300, 2100
                    ],
										name : '异常',
										areaStyle: {
											normal: {
												color: 'rgba(255, 255, 255, 0.75)'
											}
										}
									}
								]
							}]
			   }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
  			myChart.on('click', function(params) {
  				  vm.funbs(params.name,params.dataIndex);
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
