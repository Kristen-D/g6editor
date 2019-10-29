<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { WorldOption } from "../../../ChartsOption-World.js"
import {geoChinaMap, geoWorldMap} from "static/static_web/js/echarts/longladata.js"
export default {
  components: {
    ECharts,
  },

  data() {
    return {
      option: WorldOption
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackMap.do', {range: 'world'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          let pointArra = geoWorldMap[du.name];
          pointArra.push(du.value)
          let point = {
              "name": du.name,
              "value": pointArra,
              "symbolSize": 5,
              "itemStyle": {
                  "normal": {
                      "color": "#ef4836"
                  }
              }
          };

          let line = {
              "fromName": du.name,
              "toName": "中国",
              "coords": [geoWorldMap[du.name], geoWorldMap['中国']]
          };
          pointData.push(point);
          lineData.push(line);
        }
        this.option.series[0].data = pointData;
        this.option.series[1].data = lineData;
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
