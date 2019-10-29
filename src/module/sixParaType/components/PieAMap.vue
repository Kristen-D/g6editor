<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
  <div class="echartbox2" id="flowDaypieA"></div>
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
        var myChart = echarts.init(document.getElementById("flowDaypieA"));
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
			  color:["#1abc9c","#3498db","#22638e","#ecf0f1"],
			   title: {
					text: "568",
					subtext: '漏洞总数',
					x: 'center',
					y: '36%',
					textStyle: {
					color: '#fff',
					fontSize: 28
					},
					subtextStyle: {
					color: '#fff',
					fontSize: 12
					}

				},
				tooltip: {
					trigger: 'item',
					formatter: function(params, ticket, callback) {
						var res = params.seriesName;
						res += '<br/>' + params.name + ' : ' + params.percent + '%';
						return res;
					}
				},
				legend: {
					orient: 'vertical',
					left: '8%',
					bottom: '35%',
					data: [
							{name:'高危',icon:'circle'},
							{name:'中危',icon:'circle'},
							{name:'低危',icon:'circle'},
							{name:'其他',icon:'circle'},
							],
					textStyle: {
							color: '#9ea3b4'
						     },
					itemWidth: 20,
					itemHeight: 10
				},
				series: [{
					name: '',
					type: 'pie',
					selectedMode: 'single',
					radius: ['62%', '72%'],
					label: {
						normal: {
							show: false,
							position: 'inner',
							textStyle: {
								color: '#fff',
								fontSize: 12
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},

					data: [{
						value: 11,
						name: '高危'
					}, {
						value: 22,
						name: '中危'
					}, {
						value: 33,
						name: '低危'
					}, {
						value: 52,
						name: '其他'
					}]
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
