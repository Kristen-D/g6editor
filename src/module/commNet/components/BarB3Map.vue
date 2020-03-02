<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
  <div class="ad_box" id="flowDayBarB3"></div>
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
        var myChart = echarts.init(document.getElementById("flowDayBarB3"));
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
        //柱状图
      	var xAxisData = [];
      	var data2 = [];
      	var data3 = [];

      	   for (var i = 0; i < 12; i++) {
      			xAxisData.push('Class' + i);
      			data2.push((-Math.random()* 5).toFixed(2));
      			data3.push((Math.random() * 5).toFixed(2));
      	   }

      	   var itemStyle = {
      		normal: {},
      		emphasis: {
      			barBorderWidth: 0,
      			shadowBlur: 10,
      			shadowOffsetX: 0,
      			shadowOffsetY: 0,
      			shadowColor: 'rgba(0,0,0,0.5)'
      		}
      	};


        var option = {
			    color:["#6d6f6f","#fff"],
			    title : {
					text: '电信一',
					x:"6%",
					y:"50%",
					textStyle:{fontSize:14,color: '#9ea3b4'}
				},
			    tooltip:{
					trigger:'axis',
				},
				xAxis: {
					data: xAxisData,
					name: '',
					silent: false,
					axisLabel : {show:false,},
					splitLine: {show: false,}
				},
				yAxis: {
					inverse: false,
					axisLabel : {show:false,},
					splitLine: {show:false,},
					axisTick:{show:false},
					splitArea: {show: false}
				},
				grid: {
					left: 100,
					bottom:0,
					top:30,
				},
				series: [
					{
						name: 'bar2',
						type: 'bar',
						stack: 'one',
						itemStyle: itemStyle,
						data: data2
					},
					{
						name: 'bar3',
						type: 'bar',
						stack: 'two',
						itemStyle: itemStyle,
						data: data3
					},
				]
		  };
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
