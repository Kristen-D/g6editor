<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <el-col :span="4">
      <div class="el-panel-white-subtitle">重要资产占比</div>
      <div id="PieAsset" style="height:180px;"></div>
      <div id="LineIskeyAsset" style="height:100px;"></div>
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
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              cacheData:[],
              params:{dateRange:'month'}
   				 }
   		 },
    methods: {
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      async loadMapChart(dateRange){
        this.params.dateRange=dateRange;
        var data = await this.commonAjax.req("/ssa/situationAnaly/getPieAssetList.do", this.params);
        var myChart = echarts.init(document.getElementById("PieAsset"));
        var myChart2 = echarts.init(document.getElementById("LineIskeyAsset"));
        var seriesData=[];
        var keyAsset=0;
        var nokeyAsset=0;
        var lineData=0;

        for(var i = 0; i < data.PieAssetList.length; i++){
          var dataUnit = data.PieAssetList[i];
          var child={value: 0, name: '1',	label: {normal: {position:'center'}}};
          child.value=dataUnit.count;
          child.name=dataUnit.type_name;
          seriesData.push(child);
        };

        for(var i = 0; i < data.AssetIsKey.length; i++){
          var dataUnit = data.AssetIsKey[i];
          if (dataUnit.is_key==1){
            keyAsset=dataUnit.count;
          }else{
            nokeyAsset=dataUnit.count;
          }

        };


      //  lineData= Math.ceil(keyAsset/(keyAsset+nokeyAsset)*100;
       lineData=keyAsset/(keyAsset+nokeyAsset)*100;
       lineData = lineData.toFixed(2);
      //  console.log(lineData);

      var TextData="总：";
      TextData+=keyAsset+nokeyAsset
      TextData+=",重要资产：";
      TextData+=keyAsset;



        var option = {
	color: ['#1B55A5', '#00B8FF', '#FDB502','#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
      title:{
        // text:'重要资产占比',
        textStyle:{
            color:'#9ea3b4',
            fontSize:14,
			fontweight:100,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
      series: [{
        name: '数量',
        type: 'pie',
        center:['60%','60%'],
        radius: ['50%', '65%'],
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    color:'#fff',
                    fontSize: '12',
                }
            }
        },
        data:seriesData
    }]
};


var data=[17];
var xMax=100;
var option2 = {
		tooltip:{
			show:true,
			formatter:"{b} {c}"
		},
		grid:{
			left:50,
			top:10,
			bottom:'20',
			right:'0'
		},
		xAxis : [
			{
				max:xMax,
				type : 'value',
				axisTick: {show: false},
				axisLine: {show:false},
				axisLabel: {show:false},
				splitLine: {show: false}
			}
		],
		yAxis : [
			{
				type : 'category',
				data : ['重要占比'],
				nameTextStyle:{color:'#b7ce9e',fontSize:'10px'},
				axisLabel: {show:false},
				axisTick: {show: false},
				axisLine: {show: false}
			}
		],
    graphic: [{
        type: 'text',
        z: -10,
        left: 46,
        top: '60',
        style: {
            fill: '#9ca1b2',
            text: TextData,
            font: 'bold 12px Microsoft YaHei'
        }
    }],
		series : [
			{
				name:' ',
				type: 'bar',
				barWidth:16,
				silent:true,
				itemStyle: {normal: {color: '#ccc'}},
				barGap:'-100%',
				barCategoryGap:'50%',
				data: data.map(function(d){return xMax;}),
			},
			{
				name:' ',
				type:'bar',
				barWidth:16,
				label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
				data:[{value:lineData,itemStyle:{normal:{color:'#f80'}}}]
			}
		]
	};
        myChart2.setOption(option2);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
  			myChart.on('click', function(params) {
          let parameters = {};
          parameters.module = 'assetInfo_drilling';
          parameters.detailUrl = '/ssa/customColumn/getAssetInfoDetail.do';
          vm.$store.commit('openDrillDialogTable', parameters);
          vm.$store.dispatch('getDrillColumns', [vm, params.name]);
          vm.$store.dispatch('loadDrillTableData');
  				  // vm.funbs(params.name,params.dataIndex);

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
