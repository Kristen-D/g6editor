<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <div class="echarts_BoxA margin_t20" id="flowDayBarA"></div>
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
        var myChart = echarts.init(document.getElementById("flowDayBarA"));
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



        var option = {
			  color:["#fff","#6d6f6f"],
			  title: {
					text: '登录／出耗时异常',
					x:"3%",
					y:"18%",
					textStyle:{
										fontSize:14,
										color: '#9ea3b4'
										}
						},
			   tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							top:"28%",
							left:"10",
							data: [
							{name:'登录',icon:'circle'},
							{name:'登出',icon:'circle'},
							],
							textStyle: {
							color: '#9ea3b4'
						     },

						},
						grid: {
							top: '43%',
							left: '3%',
							right: '4%',
							bottom: '1%',
							containLabel: true
						},
						xAxis:  {
							type: 'value',
							axisLine:{
											show:true
												},
										splitLine:{
											show:false,
										    lineStyle:{
										        color:'#fff'
													}
												},
										axisLabel:{
											show:true,
											textStyle: {
												color:"#9ea3b4",
												fontSize:12,
											},
										},
						},
						yAxis: {
							type: 'category',
							data: ['192.168.32.11','192.168.32.22','192.168.32.41','192.168.32.44','192.168.32.31'],
							axisLabel:{
											show:true,
											textStyle: {
												color:"#9ea3b4",
												fontSize:12,
											},
										},
						},
						series: [
							{
								name: '登录',
								type: 'bar',
								barWidth : 12,
								stack: '总量',
								label: {
									normal: {
										show: false,
										position: 'insideRight'
									}
								},
								data: [320, 101, 134, 230, 210]
							},
							{
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
								data: [120,134, 90, 230, 210]
							},

						]
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
