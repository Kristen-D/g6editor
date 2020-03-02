<template>
  <div class="el-panel">
    <span class="left-top"></span><span class="left-bottom"></span>
          <span class="right-top"></span><span class="right-bottom"></span>
          <div class="el-panel-body-map">
        <h4 class="el-panel-title">IP分布</h4>
        <!-- <div class="echartsmap" id="blackIpMap" ></div> -->
        <div class="echartsmap" >
        <chart :options="options"   id="blackIpMap"></chart>
      </div>
    </div>
  </div>

</template>

<script>
// import echarts from 'echarts'
import {mapState} from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'
export default {
  components: {chart},
  computed: {
    ...mapState({

    })
  },
  data() {
    return {
      myData:[],
      options:{
        //	backgroundColor: '#0c192e',
        tooltip: {
        trigger: 'item',
        },
        color: ['#1abc9c', '#2ecc71', '#2980b9', '#f1c40f', '#e67e22', '#d35400', '#c0392b', '#ffffff'],
        legend: {
          show: true,
          left: 10,
          top: 10,
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: '#b9bbbf'
          },
          data: [{
              name: '网络攻击',
              icon: 'circle'
            }
          ],
        },
        tooltip: {
          show: 'true',
          trigger: 'item'
        },
        visualMap: {
            type: 'continuous',
            // min: 0,
            // max: 0,
            text:['高','低'],
            realtime: false,//拖拽时，是否实时更新
            calculable : true,//是否显示拖拽用的手柄
        //      range:[15, 40],//指定手柄对应数值的位置
            inRange:{ //定义 在选中范围中 的视觉元素
              color: ['#feea3b','#f95e06'],
        //          symbolSize: [30, 100]
            },
            outOfRange:{  //定义 在选中范围外 的视觉元素。
              color: ['#356587'],
        //          symbolSize: [30, 100]
            },
            itemWidth:15,
            bottom:50,
            left:50,
            splitNumber: 0,
            textStyle: {
                color: '#ddd'
              },
      },
        geo: {

          name: '',
          type: 'map',
          map: 'world',
          roam: true,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              /*shadowBlur: 30,
              shadowColor: 'rgba(0, 0, 0,0.8)',*/
              areaColor: '#bbbfc5',
              borderColor: '#0c192e'
            },
            emphasis: {
              areaColor: '#3c4b64'
            }
          }
        },
        series: [
          {
            name: 'IP分布',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              scale: 2,
              brushType: 'stroke',
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#1abc9c',
                borderColor: 'gold'
              }
            },

            data: [],
            tooltip: {
              trigger: 'item',
              formatter: function(params) {
                  var res = "";
                  var value = params.value[2];
                  var source = params.name;
                  res = "<div style='border-top:5px solid #0066cc;background:#010204;padding:0 30px 10px 20px;font-weight:700;font-size:14;'><p>来源："
                      + source+ "</p><p>数量："
                      + value+ "</p></div>";
                  return res;
              }
              }
          }
        ]
      }
    }
  },
  methods: {
  async  getInitData() {
    this.common.req("/ssa/blackIp/getIpData.do", {}).then(data => {
      this.myData = data
      this.loadMapChart();
    });



   },

async    loadMapChart() {

      var getvalue=[]
      for(var j = 0; j < this.myData.length; j++) {
              getvalue.push(this.myData[j].value[2]);
      }
      //取最大小值
      var minNum = Math.min.apply(null,getvalue);
      var maxNum = Math.max.apply(null,getvalue);
      this.myData.sort(function(a,b){return a.value-b.value;});

      this.options.visualMap.min = minNum;
      this.options.visualMap.max = maxNum;
      this.options.series[0].data = this.myData;
    }
  },
  mounted:async function() {
    this.getInitData();
  },
  created:async function() {

	},
}
</script>

<style lang="css">
</style>
