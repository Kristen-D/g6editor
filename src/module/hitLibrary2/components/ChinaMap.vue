<template >
   <div class="el-panel">
					<div class="el-panel-heading">
						<h4 class="el-panel-title">攻击分布</h4>
						<el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
						     <el-tab-pane label="今天" name="day"></el-tab-pane>
						     <el-tab-pane label="近7天" name="week"></el-tab-pane>
						     <el-tab-pane label="近30天" name="month"></el-tab-pane>
					    </el-tabs>
					</div>
					<div class="el-panel-body"  >
						<div class="echartbox8"  id="hitmap"></div>
					</div>
          <el-dialog :title="ipTitle" :visible.sync="ipShow" width="85%"  @close="onCloseIp()">
                <div style="height:300px">
              <ipTable :id="ipTableId" :tableUrl="tableUrl" :params="params"></ipTable>
              </div>
          </el-dialog>
		</div>








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
             params:{dateRange:'week'},
             activeName:'week',
             ipShow:false,
             ipTableId:"chinaMapIpId",
             tableUrl:"",
             chinaData:"",
   				 }
   		 },


    methods: {
      onCloseIp(){

      },
      showIpDetail(data){
        this.ipTitle=data.name+"--攻击分布详情";
        this.params = {...this.params,...data};
        this.tableUrl="/ssa/hitLibrary2/getChinaMapDetail.do";
        this.ipShow=true;

      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },

      async loadMapChart(){
        var myChart = echarts.init(document.getElementById("hitmap"));
        this.chinaData = await this.commonAjax.req("/ssa/hitLibrary2/getMapIpData.do", this.params);


                  	 var option = {
                       tooltip: {
                         trigger: 'item',
                         formatter: function(params, ticket, callback) {
                           var res= ""
                           res = "<div style='border-top:5px solid #0066cc;background:#40E0D0;padding:0 30px 10px 20px;font-weight:700;font-size:14;'><p style='color:#0066cc;'>攻击源IP：" +
                             params.data.src_ip + "</p><p>所属区域:" +
                             params.name + "</p></div>";
                           return res;
           							},
                         backgroundColor: 'transparent',
                         showDelay: 0,
                         hideDelay: 0,
                         enterable: true,
                         transitionDuration: 0,
                         extraCssText: 'z-index:100',

                       },

                       animation: true,
                       animationDurationUpdate: 1000,
                       animationEasingUpdate: 'cubicInOut',
                       geo: {
                         name: '撞库',
                         type: 'map',
                         map: 'world',
                         roam: true,
                         label: {
                           normal: {
                             show: false
                           },
                           emphasis: {
                             show: false
                           }
                         },
                         itemStyle: {
                           normal: {
                             areaColor: '#356587',
                             borderColor: '#0DABEA'
                           },
                           emphasis: {
                             areaColor: '#356587'
                           }
                         },
                         regions: [{ //在地图上画上颜色，主要是背景图，没有其他功能。
                           name: 'Denmark',
                           itemStyle: {
                             normal: {
                               areaColor: '#69cf58',
                             },
                             emphasis: {
                               areaColor: '#69cf58'
                             }
                           }
                         }, {
                           name: 'Canada',
                           itemStyle: {
                             normal: {
                               areaColor: '#e5d05a',
                             },
                             emphasis: {
                               areaColor: '#e5d05a'
                             }
                           }
                         }, {
                           name: 'Russia',
                           itemStyle: {
                             normal: {
                               areaColor: '#3ea9f4',
                             },
                             emphasis: {
                               areaColor: '#3ea9f4'
                             }
                           }
                         }, {
                           name: 'United States of America',
                           itemStyle: {
                             normal: {
                               areaColor: '#3eadfb',
                             },
                             emphasis: {
                               areaColor: '#3eadfb'
                             }
                           }
                         },{
                           name: 'China',
                           itemStyle: {
                             normal: {
                               areaColor: '#76EEC6',
                             },
                             emphasis: {
                               areaColor: '#76EEC6'
                             }
                           }
                         }]
                       },

                       series: [{
                           name: 'IP',
                           type: 'scatter',
                           coordinateSystem: 'geo',
                           symbolSize: 8,
               						symbol:'image:///static/images/skeleton.png',
               						symbolRotate: 0,
               						label: {
               							normal: {
               								formatter: '{b}',
               								position: 'right',
               								show: true,
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

                           hoverAnimation: true,
                           zlevel: 8,


                           data: this.chinaData,

                         },    ]
                    };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
        myChart.on('click', function(params) {
          if(params.seriesType == "scatter" )
           vm.showIpDetail(params.data);

        });

      },

  },
  created :function() {

  },
  mounted: async function() {
    this.loadMapChart()
  }

}
</script>
