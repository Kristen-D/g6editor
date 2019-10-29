<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>{{activePhase}}-威胁设备</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox3" id="eventasset"></div>
  </div>
</div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  props: ['activePhase'],
  watch: {
    activePhase: function() {
      this.getInitData();
    }
  },
  computed: {
    ...mapState({
      eventRiskList: state => state.context.list.EventRiskList
    })
  },
  data() {
    return {
      pieData: [],
      total:0,
      // riskObj: {1:'高危',2:'中危',3:'低危'}
    }
  },
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('eventasset'));
      //	let PieAdata1 =[{value: 18,name: '中危'}, {value: 5,name: '高危'}, {value: 40,name: "普通"}];
      // let PieAdata = [{
      //   value: 20,
      //   name: '中危'
      // }, {
      //   value: 13,
      //   name: '高危'
      // }, {
      //   value: 65,
      //   name: "普通"
      // }];
      let option1 = {

      color: ['#90e9ff', '#00e81b', '#ffffff'],
        title: [{
          text: this.total,
          left: '49%',
          top: '30%',
          textAlign: 'center',
          textBaseline: 'middle',
          textStyle: {
            color: '#fff',
            fontWeight: '800',
            fontSize: 22
          }
        }, {
          text: '设备总数',
          left: '49%',
          top: '40%',
          textAlign: 'center',
          textBaseline: 'middle',
          textStyle: {
            color: '#dededf',
            fontWeight: 'normal',
            fontSize: 16
          }
        }],
        tooltip: {
          show: true
        },
        series: [{
          hoverAnimation: false, //设置饼图默认的展开样式
          radius: ['45%', '55%'],
          center: ['50%', '40%'],
          name: '设备名称',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 16, //选中是扇区偏移量
          clockwise: true,
          startAngle: 90,
          label: {
            normal: {
              textStyle: {
                fontSize: 14,
                color: '#dededf'
              }
            }
          },
          labelLine: {
            normal: {
              length: 15,
              length2: 10,
              lineStyle: {
                color: '#999',

              }
            }
          },
          data: this.pieData.list
        }]
      };

      myChart.setOption(option1);
      window.onresize = myChart.resize;
    },
    getInitData() {
      this.common.req('/ssa/screenExhibit/getAssetInfoByAttackPhase.do', {dateRange: 'month',eventAttackPhase:this.activePhase}, this).then((data) => {
        this.formatData(data);
      })
    },
    formatData(data) {
      this.total=0;
      data.list.forEach((d) => {

        d.name =d.id;

        this.total=this.total+1;

      })
        this.pieData = data;
        this.loadMapChart();
    },

  },
  mounted: function() {
    this.getInitData();
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
