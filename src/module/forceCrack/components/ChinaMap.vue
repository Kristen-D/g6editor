<template >
  <div class="el-panel-white">
    <div class="el-panel-white-heading"><h3 class="el-panel-white-title">攻击分布</h3>
      <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
         <el-tab-pane label="今天" name="1"></el-tab-pane>
         <el-tab-pane label="近7天" name="2"></el-tab-pane>
         <el-tab-pane label="近30天" name="3"></el-tab-pane>
      </el-tabs>
    </div>

     <div class="el-panel-white-body">
  <el-row :gutter="20">
<!-- <div class="echarts_BoxA margin_t20"  style="height:400px;!important" id="flowDayBarA"></div> -->
<el-col :span="12"><div class="echartbox1" style="height:400px;!important"  id="flowDayBarA"></div></el-col>
<el-col :span="12"><div class="echartbox1" style="height:400px;!important"   id="burstbarB"></div></el-col>

   </el-row>



   </div>

   <el-dialog :title="ipTitle" :visible.sync="ipShow" width="85%"  @close="onCloseIp()">
         <div style="height:300px">
       <ipTable :id="ipTableId" :tableUrl="tableUrl" :params="params"></ipTable>
       </div>
   </el-dialog>

   </div>
       <!-- <div id="Topfive" style="height: 290px;"></div> -->



</template>

<script>
import {mapState,mapActions } from 'vuex'
import ipTable from './IpTable.vue'
import echarts from 'echarts'
export default {
      components: {ipTable},
  computed:{
    ...mapState({

   })},

   data(){
   				 return {
             ipTitle:"IP详情",
             params:{dateRange:'month'},
             activeName:'3',
             ipShow:false,
             ipTableId:"chinaMapIpId",
             tableUrl:"/ssa/forceCrack/getDetail1Detail.do",
   				 }
   		 },


    methods: {
      onCloseIp(){

      },
      showIpDetail(src_ip_attribution){
        this.ipTitle=src_ip_attribution+"--攻击分布详情";
        this.params.src_ip_attribution=src_ip_attribution;
        this.tableUrl="/ssa/forceCrack/getChinaMapDetail.do";
        // this.ipShow=true;
        this.params = {...this.params};
      },
      changeTime(value){
        if (value.name==1){
          this.params.dateRange="day";
        }else if(value.name==2){
          this.params.dateRange="week";
        }else if(value.name==3){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },

      async loadMapChart(){

        var Geodata = await this.commonAjax.req("/ssa/forceCrack/getGeoCoordMap.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayBarA"));
        var Chinadata = await this.commonAjax.req("/ssa/forceCrack/getChinaMap.do", this.params);
        var yAxisData=[];
        var seriesData=[];
        var data=[];
       for (var i = 0; i < Chinadata.length; i++) {
            var dataUnit = Chinadata[i];
             var map={name: '秦皇岛市', value: '100'};
            map.name=dataUnit.src_ip_attribution;
            map.value=dataUnit.count;
            data.push(map);
       }

    var geoCoordMap ={};
    for (var i = 0; i < Geodata.length; i++) {
         var dataUnit = Geodata[i];
          var list=[];
          var strs= new Array(); //定义一数组
         strs=Geodata[i].mycode.split(","); //字符分割
         list.push(strs[0]);
         list.push(strs[1]);
         geoCoordMap[Geodata[i].name]=list;
    }



    function convertData(data) {
       var res = [];
       for (var i = 0; i < data.length; i++) {
           var geoCoord = geoCoordMap[data[i].name];
           if (geoCoord) {
               res.push({
                   name: data[i].name,
                   value: geoCoord.concat(data[i].value)
               });
           }
       }
       return res;
    };

    function randomValue() {
        return Math.round(Math.random()*1000);
    }


    for (var i = 0; i < Chinadata.length; i++) {
         var dataUnit = Chinadata[i];
         var geoCoord = geoCoordMap[dataUnit.src_ip_attribution];
         if (geoCoord){
           yAxisData.push(dataUnit.src_ip_attribution);
           seriesData.push(dataUnit.count);
         }
    }


    var regionslist=[
  			 /*华东地区： */
  			{
  				name: '广东',
  				itemStyle: {
  					normal: {areaColor: '#a5dabb'},
  				}
  			},
  			{
  				name: '福建',
  				itemStyle: {
  					normal: { areaColor: '#a5dabb' }
  				}
  			},
  			{
  				name: '广西',
  				itemStyle: {
  					normal: { areaColor: '#a5dabb' }
  				}
  			},
  			{
  				name: '海南',
  				itemStyle: {
  					normal: { areaColor: '#a5dabb' }
  				}
  			},

  			 /*******************************************************/
  			 {
  				name: '台湾',
  				itemStyle: {
  					normal: { areaColor: '#fbe6ef' }
  				}
  			},

  			/***西南地区****************************************************/
  			{
  				name: '云南',
  				itemStyle: {
  					normal: { areaColor: '#a0d9f6' }
  				}
  			},
  			{
  				name: '贵州',
  				itemStyle: {
  					normal: { areaColor: '#a0d9f6' }
  				}
  			},
  			{
  				name: '四川',
  				itemStyle: {
  					normal: { areaColor: '#a0d9f6' }
  				}
  			},
  			{
  				name: '重庆',
  				itemStyle: {
  					normal: { areaColor: '#a0d9f6' }
  				}
  			},
  			{
  				name: '西藏',
  				itemStyle: {
  					normal: { areaColor: '#a0d9f6' }
  				}
  			},

  			/***中南地区****************************************************/
  			{
  				name: '湖南',
  				itemStyle: {
  					normal: { areaColor: '#97d5d8' }
  				}
  			},
  			{
  				name: '湖北',
  				itemStyle: {
  					normal: { areaColor: '#97d5d8' }
  				}
  			},
  			{
  				name: '江西',
  				itemStyle: {
  					normal: { areaColor: '#97d5d8' }
  				}
  			},
  			{
  				name: '河南',
  				itemStyle: {
  					normal: { areaColor: '#97d5d8' }
  				}
  			},


  			/***华东地区****************************************************/
  			{
  				name: '浙江',
  				itemStyle: {
  					normal: { areaColor: '#8ed1ec' }
  				}
  			},
  			{
  				name: '安徽',
  				itemStyle: {
  					normal: { areaColor: '#8ed1ec' }
  				}
  			},
  			{
  				name: '江苏',
  				itemStyle: {
  					normal: { areaColor: '#8ed1ec' }
  				}
  			},
  			{
  				name: '山东',
  				itemStyle: {
  					normal: { areaColor: '#8ed1ec' }
  				}
  			},

  			 /*东北地区*V*/
  			{
  				name: '黑龙江',
  				itemStyle: {
  					normal: { areaColor: '#b9ddf4' }
  				}
  			},
  			{
  				name: '吉林',
  				itemStyle: {
  					normal: { areaColor: '#b9ddf4' }
  				}
  			},
  			{
  				name: '辽宁',
  				itemStyle: {
  					normal: { areaColor: '#b9ddf4' }
  				}
  			},

  			 /*华北地区*/
  			{
  				name: '内蒙古',
  				itemStyle: {
  					normal: { areaColor: '#afeee8' }
  				}
  			},
  			{
  				name: '河北',
  				itemStyle: {
  					normal: { areaColor: '#afeee8' }
  				}
  			},
  			{
  				name: '山西',
  				itemStyle: {
  					normal: { areaColor: '#afeee8' }
  				}
  			},

  			 /*西北地区V*/
  			{
  				name: '陕西',
  				itemStyle: {
  					normal: { areaColor: '#87cefa' }
  				}
  			},
  			{
  				name: '宁夏',
  				itemStyle: {
  					normal: { areaColor: '#87cefa' }
  				}
  			},
  			{
  				name: '甘肃',
  				itemStyle: {
  					normal: { areaColor: '#87cefa' }
  				}
  			},
  			{
  				name: '青海',
  				itemStyle: {
  					normal: { areaColor: '#87cefa' }
  				}
  			},
  			{
  				name: '新疆',
  				itemStyle: {
  					normal: { areaColor: '#87cefa' }
  				}
  	},

  ];
  	 function convertData(data) {
  					var res = [];
  					for (var i = 0; i < data.length; i++) {
  						var geoCoord = geoCoordMap[data[i].name];
  						if (geoCoord) {
  							res.push({
  								name: data[i].name,
  								value: geoCoord.concat(data[i].value)
  							});
  						}
  					}
  					return res;
  };
  	 function randomValue() {
  					return Math.round(Math.random() * 1000);
  }
  	 var option = {
  					tooltip: {
  						trigger: 'item'
  					},
  					geo: {
  						map: 'china',
  						roam: true,
  //						top: 0,
  //					   // right: 10,
  //						width: '60%',
  //						height:'80%',
  						label: {
  							normal: {
  								show: false,
  								textStyle: {
  									color: 'rgba(0,0,0,0.9)'
  								}
  							}
  						},
  						itemStyle: {
  							normal: {
  								borderColor: '#fff',
  								color: '#4a86e8',
  							},
  							emphasis: {
  								areaColor: null,
  								shadowOffsetX: 0,
  								shadowOffsetY: 0,
  								shadowBlur: 20,
  								borderWidth: 0,
  								shadowColor: 'rgba(0, 0, 0, 0.5)'
  							}
  						},
  						regions: regionslist,
  					},
  					series: [{
  						type: 'scatter',
  						coordinateSystem: 'geo',
  						data: convertData(data),
  						symbolSize: 22,
  						symbol:'image:///static/images/skeleton.png',
  						symbolRotate: 0,
  						label: {
  							normal: {
  								formatter: '{b}',
  								position: 'right',
  								show: true
  							},
  							emphasis: {
  								show: true
  							}
  						},
  						itemStyle: {
  							normal: {
  								color: '#fa1828',
  							}
  						},
  						tooltip: {
  							formatter: function(params, ticket, callback) {
  								var str = "所属地区：";
  								str += params.name;
  								str += "<br/>";
  								str += "攻击数量：";
  								str += params.value[2];
  								return str;
  							}
  						}
  					}, {
  						name: 'categoryA',
  						type: 'map',
  						geoIndex: 0,
  						tooltip: {
  							show: false
  						},

  					}]
  };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
        myChart.on('click', function(params) {
           vm.showIpDetail(params.name);
        });


        /******************攻击分布--柱状图******************/
    	 var myChart2 = echarts.init(document.getElementById('burstbarB'));
    var option2 = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}"
        },

        grid: {
            left: '3%',
            right: '8%',
            bottom: '20%',
            top:'20%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            splitNumber:5,
            axisTick:{show:false},
            axisLine:{lineStyle:{color:'#e1e3e4'}},
            splitLine:{lineStyle:{color:'#e1e3e4'}},
            axisLabel:{textStyle:{color:'rgba(0,0,0,0.9)'}}

        },
        yAxis: {
            type: 'category',
            axisTick:{show:false},
             axisLine:{lineStyle:{color:'#e1e3e4'}},
             axisLabel:{textStyle:{color:'rgba(0,0,0,0.9)'}},
            data: yAxisData
        },
        series: [{
            name: '攻击分布数量',
            type: 'bar',
            barWidth:20,
            label:{
            	normal:{
            		show:true,
            		position:'right',
            		textStyle:{
    	      			color:'#e74c3c'
            		}
            	}
            },
            data: seriesData
        }]
    };
    	 myChart2.setOption(option2);






      },

    },
  created :function() {

  },
  mounted: async function() {

  }

}
</script>
