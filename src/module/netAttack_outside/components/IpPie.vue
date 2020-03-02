<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <div class="right_b margin_t60" id="flowDayIpPie"></div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({

   })},

   data(){
   				 return {
              params:{dateRange:'month'},
   				 }
   		 },
    methods: {

       loadMapChart(){
        // var params = this.params;
        // var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnPie.do", params);
        var myChart = echarts.init(document.getElementById("flowDayIpPie"));
        var seriesData=[];



        // var data = await this.commonAjax.req("/ssa/netAttack/getEventSrcIpOnPie.do", this.params);
       this.commonAjax.req('/ssa/netAttack/getEventSrcIpOnPie.do', this.params).then((data)=>{
         data=data.result;

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
          var childData=	{ value: 15, name: '其他'};

            childData.value=dataUnit.total;
            childData.name=dataUnit.ipSourceName;

        // console.log(childData.data);
        seriesData.push(childData);
        };


        var option = {
			  color:["#bdc3c7","#95a5a6","#6d7e88","#ffffff","#2e363d","#7d7f81",],
			   title: {
					text: '攻击来源TOP5',
					textStyle:{
						fontSize:16,
						color:'#9ea3b4'
					}
			   },
			   tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
			   series: [

					{
						name:'攻击来源',
						type:'pie',
						radius: ['40%', '55%'],
					    center: ['50%', '40%'],
						label: {
							normal: {
								textStyle: { fontSize: 14, color: '#fff', },
							}
						},
						labelLine:{//标签的视觉引导线样式
							normal:{
								length:10,
								length2:20,
								lineStyle:{color:'#fff'}
							}
						},
						data:seriesData
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
