<template>
  <div class="global-map">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
  export default {
    name: "global-map",
    mounted () {
      console.log(this.$refs.chart);
      let chart = echarts.init(this.$refs.chart);

      $.getJSON('/static/js/map/population.json').then(data => {
        data = data.filter(function (dataItem) {
          return dataItem[2] > 0;
        }).map(function (dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

        data.push({
          symbolSize: 5,
          itemStyle: {color: "red"},
          value: [-75.440806, 40.652083, 0]
        });

        data.push({
          symbolSize: 5,
          itemStyle: {color: "red"},
          value: [-80.943139, 35.214]
        })

        chart.setOption({
          globe: {
            viewControl: {
              autoRotate: false,
              distance: 180
            },
            baseColor: '#000',
            light: {
              ambient: {
                intensity: 0
              },
              main: {
                intensity: 0,
                shadowQuality: 'low'
              },
              ambientCubemap: {
                diffuseIntensity: 0,
                specularIntensity: 0
              }
            }
          },
          series: [{
            type: 'scatter3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            symbolSize: 2,
            itemStyle: {
              color: '#ccc',
              opacity: 0.7
            },
            data: data
          }, {
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            lineStyle: {
              width: 3,
              color: 'red',
              // opacity: 1
            },
            data:  [
              [[-75.440806, 40.652083], [-80.943139, 35.214]],
              [[-75.440806, 40.652083], [113.5107, 23.2196]]
            ]
          }]
        });
      })
    }
  }
</script>

<style scoped>
  .global-map {
    width: 100%;
    height: 500px;
  }
  .global-map .chart {
    width: 100%;
    height: 100%;
  }
</style>
