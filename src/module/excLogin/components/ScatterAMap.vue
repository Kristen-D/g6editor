<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <div class="echarts_BoxB1" id="flowDayScatterA"></div>
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
        var myChart = echarts.init(document.getElementById("flowDayScatterA"));
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
          title : {
                text: '登录时间异常',
                x:"10%",
                  y:"18%",
                  textStyle:{
                      fontSize:14,
                      color: '#9ea3b4'
                      }
              },
    grid: {
      top:"28%",
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    tooltip : {
        trigger: 'item',
        showDelay : 0,
      formatter: function (params, ticket, callback) {
        var str=params.data[0].toString();
        var strs= new Array(); //定义一数组
        strs=str.split("."); //字符分割
        var shi=strs[0];
        if(strs.length>1){

          if(strs[1]<=1){
            var fen="0";
            fen+=strs[1]*6;
         }else{
           var fen=strs[1]*6;
         }

        }else{
          var fen="00";
        }

        var rStr="时间：";
        rStr+=shi;
        rStr+=":";
        rStr+=fen;
        rStr+=",数量:";
        rStr+=params.data[1];
        return rStr;
  }
},


    xAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} 点',
                textStyle: {
                  color:"#9ea3b4",
                  fontSize:12,
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} ',
                textStyle: {
                  color:"#9ea3b4",
                  fontSize:12,
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        }
    ],
    series : [
        {
            name:'时间',
            type:'scatter',
            data: [
//               [8.0, 65], [8.3, 71], [8.5, 80], [8.5, 72], [8.2, 78],
// [9.0, 61], [9.1, 62], [9.2, 43], [9.3, 64], [9.4, 85],
// [9.5, 56], [9.6, 97], [9.7, 68], [9.8, 79], [9.9, 60],
// [9.0, 32], [9.1, 31], [9.2, 73], [9.3, 45], [9.4, 54],
// [9.5, 40], [9.6, 57], [9.7, 58], [9.8, 59], [9.9, 70],
// [9.0, 34], [9.1, 23], [9.2, 12], [9.3, 34], [9.4, 38],
// [9.5, 98], [9.6, 36], [9.7, 45], [9.8, 90], [9.9, 47],
// [9.0, 78], [9.1, 89], [9.2, 76], [9.3, 69], [9.4, 45],
// [9.5, 45], [9.6, 67], [9.7, 45], [9.8, 89], [9.9, 90],
//
//
// [10.0, 12],
// [11.5, 2],
// [14.0, 2],
//
// [20.5, 4],
// [23.5, 2],
            ],

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
