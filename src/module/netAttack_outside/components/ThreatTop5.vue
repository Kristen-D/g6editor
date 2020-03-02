<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <div class="right_c margin_t60" id="flowDayThreatTop5"></div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({
      EventThreatList:state=>state.context.EventThreatList,
   })},

   data(){
   				 return {
              params:{dateRange:'month'},
   				 }
   		 },
    methods: {
      fmtEventThreatList(val){
       // console.log(this.eventTypeList);
         for(var item in this.EventThreatList) {
             if (val==this.EventThreatList[item].id){
               return this.EventThreatList[item].text;
             }
         }

      },

        loadMapChart(){
        // var params = this.params;
        // var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnPie.do", params);
        var myChart = echarts.init(document.getElementById("flowDayThreatTop5"));
        var seriesData=[];
        var yAxis=[];



        // var data = await this.commonAjax.req("/ssa/netAttack/getCountEventThreatTypeTop5.do", this.params);
        this.commonAjax.req('/ssa/netAttack/getCountEventThreatTypeTop5.do', this.params).then((data)=>{

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
          seriesData.push(dataUnit.count);
        };
        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
          yAxis.push(this.fmtEventThreatList(dataUnit.event_threat_type).toString());
        };




        var option  = {
		 title: {
			text: '攻击类型Top5',
			textStyle:{fontSize:16,color: '#9ea3b4'}
		 },
		 tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				textStyle:{fontSize:13,}
		 },
		 grid: {
			left:'30%',
			top:50,
			right:20,
			bottom:20,
		 },
		 calculable : true,
		 xAxis : [{
			type : 'value',
		    splitNumber:5,
       show:false,
			axisLine:{ show:true,lineStyle:{color:'rgba(53,66,94,0.4)'} },
			axisLabel:{
				show:true,
				textStyle: {color:"#9ea3b4",fontSize:12,},
			},
			splitLine:{
				show:true,
				lineStyle:{color:'rgba(53,66,94,0.4)',}
			},

	     }],
		 yAxis : [
			{
				type : 'category',
        inverse:true,
				data:yAxis,
				axisLine:{show:true, lineStyle:{color:'rgba(53,66,94,0.4)'}},
				splitNumber: 5 ,
				axisLabel:{
					textStyle: {color:"#9ea3b4",fontSize:10,},
				},
			}
		],
		 series : [
			{
				name: '数量',
				type: 'bar',
				barWidth : 12,//柱图宽度
				data:seriesData,
				itemStyle: {
					normal: {
						 barBorderWidth: 0,
						 barBorderColor:'#82cbfc',
						 barBorderRadius:[1, 1, 1, 1],
						 color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#868889','#868889','#868889','#868889','#fff'
							];
							return colorList[params.dataIndex];
						},
						 label: {
							show: true,
							position: 'right',
							formatter: '{c}'
						}
					}
				},
			}
		]

};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
  			myChart.on('click', function(params) {
  				  vm.funbs(params.name,params.dataIndex);
  			});

      })

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
