<!-- 大屏-L7地图 -->
<template>
  <div>
    <div class="el-panel-body">
      <el-row type="flex">
        <div id="map" class="map-div"></div>
      </el-row>
    </div>

  </div>
</template>
<script>
    import 'static/js/world';
    import world from 'static/sdsec/js/world.json';

  export default {
      data () {
          return {
              geoCoordMap: world.geoCoordMap
          }
      },
      mounted () {
          this.getWorld();
      },
      methods: {
          getWorld () {
              var that = this;
              var namemap = world.namemap;
              var dataArr = world.dataArr;
              that.drawChart(namemap, dataArr)
          },
          convertData(data) {
              var res = [];
              for (var i = 0; i < data.length; i++) {
                  var geoCoord = this.geoCoordMap[data[i].name];
                  if (geoCoord) {
                      res.push({
                          name: data[i].name,
                          value: geoCoord.concat(data[i].value)
                      });
                  }
              }
              return res;
          },
          drawChart (name, data) {
              // 基于准备好的dom，初始化echarts实例
              let chart = echarts.init(document.getElementById('map'));
              // 监听屏幕变化自动缩放图表
              window.addEventListener('resize', function () {
                  chart.resize()
              })
              // 绘制图表
              var option = {
                  title: {
                      text: '受攻击IP分布',
                      left: 'left',
                      top: '3%',
                      textStyle: {
                          fontSize:13,
                          fontWeight:'bold',
                          color: ['#3e4956']
                      },
                  },
                  tooltip: {
                      trigger: 'item',
                      formatter: function(params) {
                          return params.name + ' : ' + params.value[2];
                      }
                  },
                  visualMap: [
                      {
                          type: 'piecewise',
                          splitNumber: 4,
                          //min: 0,
                          //max: 10000,
                          pieces: [
                              {gt: 100, label:'大于100'},
                              {gte: 50, lte: 100},
                              {gte: 10, lt: 50, label: '10-50'},
                              {lt: 10, label: '小于10'}
                          ],
                          showLabel: false,
                          orient: 'horizontal',
                          align: 'left',
                          left: 20,
                          bottom: 20,
                          itemWidth: 280,
                          itemHeight: 10,
                          itemGap: 2,
                          calculable: true,
                          inRange: {
                              color: ['blue', 'green', 'orange', 'red']
                          },
                          textStyle: {
                              color: '#666'
                          }
                      },
                      {
                          type: 'piecewise',
                          splitNumber: 4,
                          pieces: [
                              {gt: 100, label:'大于100'},
                              {gte: 50, lte: 100, label: ' 50-100'},
                              {gte: 10, lt: 50, label: '10 - 50'},
                              {lt: 10, label: ' 小于 10'}
                          ],
                          showLabel: true,
                          orient: 'horizontal',
                          align: 'left',
                          left: 20,
                          bottom: 0,
                          itemWidth: 10,
                          itemHeight: 10,
                          itemGap: 220,
                          calculable: true,
                          inRange: {
                              color: ['blue', 'green', 'orange', 'red']
                          },
                          textStyle: {
                              color: '#666',
                              width: 100
                          }
                      }],
                  series: [{
                      name: 'pm2.5',
                      type: 'scatter',
                      coordinateSystem: 'geo',
                      // nameMap: name,
                      data: this.convertData(data),
                      symbolSize: 18,
                      label: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: false
                          }
                      },
                      itemStyle: {
                          emphasis: {
                              borderColor: '#fff',
                              borderWidth: 1
                          }
                      }
                  }
                  ],
                  geo: {
                      map: "world",
                      label: {
                          emphasis: {
                              show: false
                          }
                      },
                      roam: true, //是否允许缩放
                      layoutCenter: ["50%", "50%"], //地图位置
                      layoutSize: "180%",
                      itemStyle: {
                          normal: {
                              areaColor: '#D9ECFF',
                              borderColor: '#8CC5FF'
                          },
                          emphasis: {
                              areaColor: '#8CC5FF'
                          }
                      }
                  }

              };
              chart.setOption(option);
          }
      }
  };
</script>

<style>
  .map-div {
    height: 650px;
    width: 100%;
  }
</style>

