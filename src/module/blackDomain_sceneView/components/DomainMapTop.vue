<template>
 <div>

      <div class="echartsmap2" >
        <chart :options="options" ></chart>
      </div>
 </div>
</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'

export default {
	components: {chart},
	data() {
		return {
      getDomainDataTopUrl:"/ssa/blackDomain/getDomainDataTop.do",
      domainData:[],
      options:{
          	tooltip:{
                    trigger: 'item',
            		    backgroundColor:'transparent',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                    formatter: function(params) {
                        var res = "";
                        var value = params.value;
                        var source = params.name;
                        res = "<div style='border-top:5px solid #0066cc;background:#010204;padding:0 30px 10px 20px;font-weight:700;font-size:14;'><p>来源："
                        		+ source+ "</p><p>数量："
                        		+ value+ "</p></div>";
                        return res;
                    }
               },
              grid: {
                    left: '20%',
                    right: 10,
                    top: '10%',
                    bottom: 50,
                  },
              xAxis: [{
                    position: 'top',
                    type: 'value',
                    boundaryGap: false,
                    splitLine: {
                      show: false
                    },
                    axisLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    axisLabel:{show:false},
              }],
              yAxis: [
          		{
                    type: 'category',
                    data: '',
                    axisTick: {
                    	show:false,
                      alignWithLabel: false
                    },
                    axisLabel:{
                    	color:'#47a8f1',
                    	formatter: function(val) {
          	 			return(val.length > 15 ? (val.slice(0, 14) + "...") : val);
          	 		},
                    },
                    axisLine:{show:false},
                  },//辅助x轴
                  {
                      type: 'category',
                      axisLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      },
                      axisLabel: {
                          show: false
                      },
                      splitArea: {
                          show: false
                      },
                      splitLine: {
                          show: false
                      },
                      data: ''
                  }
              ],
              series: [
          		{
                    name: 'ip',
                    z: 9,
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                    	 normal: {
                              color: function(d) {
                             var colorlist = ['#f7fe00', '#ffbd00','#ff9900','#ff7300','#fe5722','#ff4200', '#ff2741',  '#ff0000', '#d01111','#b70009']
                                  return colorlist[d.dataIndex];
                              }
                         },
                    	emphasis: {color: "#ccc"}
                  },
                      data: ''
               },
          		{
                      name: '辅助',
                      type: 'bar',
                      barWidth: 10,
                      yAxisIndex: 1,
                      itemStyle: {
                          normal: {
                              color: 'rgba(101, 101, 101,0.5)',
                          }
                      },
                      label: {
                          normal: {
                              show: false,
                             }
                      },
                      tooltip: {
                          show: false
                      },
                      //背景值
                      data:''
                  },
              ]

          },
  	 }
  },

	computed: {
		...mapState({

		})
	},
	methods: {
    getInitData(){
      this.domainData=[]
       this.common.req(this.getDomainDataTopUrl, {}).then(data => {
         this.domainData = data;
         this.dataHandle(this.domainData);
       });
    },
    dataHandle(data){

      //获取value
      var getvalue=[]
      for(var j = 0; j < data.length; j++) {
              getvalue.push(data[j].value);
      }
      //取最大小值

      var maxNum = Math.max.apply(null,getvalue);
      var categoryData = [];  //坐标label-name
      var auxdata=[]; //辅助数据，
      var bardata=[]; //top10
      for(var j=data.length-1; j>=0; j--) {
      	categoryData.push(data[j].name);
      	bardata.push({name:data[j].name,value:data[j].value});
      	auxdata.push({value:maxNum});
      }
      this.options.yAxis[0].data=categoryData;
      this.options.yAxis[1].data=categoryData;
      this.options.series[0].data = bardata;
      this.options.series[1].data = auxdata;
    }
	},
	created:async function() {
    this.getInitData();
	},
	mounted:  function() {}
}
</script>
