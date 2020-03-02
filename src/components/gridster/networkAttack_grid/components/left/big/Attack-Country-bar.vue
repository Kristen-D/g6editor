<template>
<div style="height: 200px; margin-top: 60px;">
  <e-charts :options="option" auto-resize></e-charts>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { bar2Category } from "../../../ChartsOption.js"

export default {
  props: ['attackSource'],
  components: {
    ECharts,


  },

  data() {
    return {
      option: bar2Category
    }
  },
  watch: {
    attackSource: function() {
      this.getInitData();
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackCountryTop.do', {attackSource: this.attackSource}, this).then((data) => {
        let dataLength = data.length;
        if(dataLength < 5) {
          for(let i = 0; i< 5-dataLength;i++) {
            if(this.attackSource === 'china') {
              data.push({location: 'N/A', value:0})
            }else {
              data.push({name: 'N/A', value:0})
            }

          }
        }
        data.sort((a, b) => {
          return a.value -b.value;
        })
        let datax = [];
        let datav = [];
        for(let du of data) {
          if(this.attackSource === 'china') {
            datax.push(du.location.includes('N/A')?'N/A':du.location.split(/[\s\n]/)[1]);
          }else {
            datax.push(du.name);
          }

          datav.push(du.value);
        }
        let maxValue = datav[datav.length-1]===0?3:datav[datav.length-1]*1.3;
        let maxdata = [maxValue, maxValue, maxValue, maxValue, maxValue]
        this.option.yAxis[0].data = datax;
        this.option.series[0].label.normal.formatter = function (d) {
          return datav[d.dataIndex];
        } ;
        this.option.series[0].data = maxdata;
        this.option.series[1].data = datav;
      })
    },
  },
  created() {

  },
  mounted() {
    this.getInitData();
  }
}
</script>
