<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <div class="echarts_BoxB1" id="flowDayScatterB"></div>
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
        var myChart = echarts.init(document.getElementById("flowDayScatterB"));
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
        title : {
              text: '登录频次异常',
              x:"10%",
                y:"12%",
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
              formatter: '{a0}: {b0}<br />{c0}:00',
            },
            xAxis : [

              {
                type : 'category',
                data: ['100', '200', '300', '400'],
                scale:true,
                axisLabel : {
                  formatter: '{value}',
                  show:true,
                      textStyle: {
                        color:"#9ea3b4",
                        fontSize:12,
                      },
                },

                splitLine: {
                  show: false,
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
                  formatter: '{value}:00',
                  show:true,
                      textStyle: {
                        color:"#9ea3b4",
                        fontSize:12,
                      },
                },
                splitLine: {
                  lineStyle: {
                    color:'#1c1e1f'
                  }
                }
              }
            ],
            series : [
              {
                name:'登录',
                type:'scatter',
                data: [
                  // ['100', 6], ['200',7],
                  // ['300', 8], ['400', 8],
                  // ['300', 10],['100', 6],
                  // ['200',7], ['200', 8],
                  // ['400', 8], ['400', 10],
                  // ['100', 10],['300', 6],
                  // ['200',7], ['100', 8],
                  // ['400', 8], ['100', 10],
              ],

              markLine : {
                data : [
                  { name: '标准',
                    yAxis: 8
                  }
                ],
                lineStyle:{
                   normal:{
                         color:'rgb(0, 255, 255)'
                      }
                 }
              }

              },
              {
                name:'登出',
                type:'scatter',
                data:[
                //   ['200', 6], ['200',7],
                //  ['300', 8], ['100', 8],
                // ['200', 10],['100', 6],
                //  ['100',7], ['200', 8],
                //   ['300', 8], ['400', 10],
                //  ['100', 10],['300', 6],
                //   ['200',7], ['400', 8],
                //    ['200', 8], ['300', 10],
              ],

              markLine : {
                data : [
                  { name: '标准',
                    yAxis: 8
                  }
                ],
                lineStyle:{
                   normal:{
                         color:'rgb(0, 255, 255)'
                      }
                 }
              }

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
