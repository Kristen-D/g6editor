<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import {  mapState,  mapActions} from 'vuex'
import { WorldOption } from "../../../ChartsOption-World.js"
import {geoChinaMap, geoWorldMap} from "static/static_web/js/echarts/longladata.js"
export default {
  computed: {
    ...mapState({
      localName: state => state.context.localName,
      localtionArr: state => state.context.localTion
    })
  },
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
      this.common.req('/ssa/netattack/getNetAttackMapNew.do', {range: 'world'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          du.name = du.country;
           // let myCode=du.lng+","+du.lat;
          let pointArra = geoWorldMap[du.name];
          if(du.name === '局域网') {break;}
          pointArra.push(du.value);
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
              "toName": this.localName,
              "coords": [[du.lng,du.lat], this.localtionArr]
          };
          pointData.push(point);
          lineData.push(line);
        }

        this.option.series[0].data = pointData;
        this.option.series[1].data = lineData;
      })
    },
    getInitDataBak() {
      this.common.req('/ssa/netattack/getNetAttackMap.do', {range: 'world'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          let pointArra = geoWorldMap[du.name];
          if(pointArra === undefined) {break;}
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
              "toName": this.localName,
              "coords": [geoWorldMap[du.name], this.localtionArr]
          };
          pointData.push(point);
          lineData.push(line);
        }

        this.option.series[0].data = pointData;
        this.option.series[1].data = lineData;
      })
    }
  },
  created() {
  },
  mounted() {
    this.getInitData();

  }
}
</script>
