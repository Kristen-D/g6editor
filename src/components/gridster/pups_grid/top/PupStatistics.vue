<template>
  <div class="el-panel">
    <div class="el-panel-heading">
      <h4 class="el-panel-title">{{configuration.name}}</h4>
    </div>
    <div class="el-panel-body echartmapbox4" style="position: relative;">
      <!-- <div class="tit-map" style="text-align: center;">
        <div class="tit-label"><label>累计发现</label><span>{{statistics.total.toLocaleString()}}</span></div>
        <div class="tit-label"><label>新增危害</label><span>{{statistics.newAffected.toLocaleString()}}</span></div>
        <div class="tit-label"><label>新增预警</label><span>{{statistics.newWarn.toLocaleString()}}</span></div>
      </div> -->
      <ul class="tip-map">
        <li>
          <label>累计发现</label>
          <span class="text-color1">{{statistics.total.toLocaleString()}}</span>
        </li>
        <li>
          <label>新增危害</label>
          <span class="text-color2">{{statistics.newAffected.toLocaleString()}}</span>
        </li>
        <li>
          <label>新增告警</label>
          <span class="text-color3">{{statistics.newWarn.toLocaleString()}}</span>
        </li>
      </ul>
      <div class="" style="height:385px">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  props: ['data'],
  components: {
    ECharts,
  },
  data() {
    return {
      statistics: {
        total: '',
        newAffected: '',
        newWarn: ''
      },
      option: {},
      configuration: this.data.json
    }
  },
  methods: {
    getInitData() {
      this.common.req(this.configuration.dataUrl, {}, this).then((data) => {
        this.statistics = data.statistics;
        this.loadMapChart(data.list);
      })
    },
    loadMapChart(data) {
      let color = ['#2979ff', '#1565c0', '#2196f3', '#42a5f5']
      let result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          value: data[i].value,
          name: data[i].name,
          itemStyle: {
            normal: {
              color: color[i],
            }
          },
        }, )
      }
      // let myChart = echarts.init(document.getElementById('puptreemap'));
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },

        calculable: true,
        series: [{
          name: '安全概况',
          type: 'treemap',
          left: '2%',
          right: '2%',
          top: '2%',
          bottom: '1%',
          roam: false, //是否开启拖拽漫游（移动和缩放）
          nodeClick: false, //点击节点后的行为,false无反应
          breadcrumb: {
            show: false
          },
          label: {
            normal: {
              textStyle: {
                fontSize: '14',
              }
            }
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b}  {c}"
              },
              borderWidth: 2,
              borderColor: '#fff'
            }
          },
          data: result
        }]

      };

      // myChart.setOption(option);
      // window.onresize = myChart.resize;
    }
  },
  created: function() {
    // this.getInitData();
  },
  mounted: function() {
    this.getInitData();
  }
}
</script>

<style>
</style>
