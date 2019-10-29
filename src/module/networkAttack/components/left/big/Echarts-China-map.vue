<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import {  mapState,  mapActions} from 'vuex'
import { ChinaOption } from "../../../ChartsOption-China.js"
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
      option: ChinaOption
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackMapNew.do', {range: 'china'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          du.name = du.areaName;
          let myCode=du.lng+","+du.lat;
          let formArr=[du.lng,du.lat];
          // formArr.push(myCode);
          let pointArra = [du.lng,du.lat];
          if(du.name === '局域网') {break;}
           pointArra.push(du.value);
          let point = {
              "name": du.name,
              "value": pointArra
          };
          let line = {
              "fromName": du.name,
              "toName": this.localName,
              "coords": [formArr, this.localtionArr]
          };
          pointData.push(point);
          lineData.push(line);
        }
        this.option.series[0].data = lineData;
        this.option.series[1].data = pointData;
      })
    },
    getInitDataBak() {
      this.common.req('/ssa/netattack/getNetAttackMap.do', {range: 'china'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          let locationArra = du.location.split(/[\s\n]/);
          du.name = locationArra[1];
          let pointArra = geoChinaMap[du.name];
          if(pointArra === undefined) {break;}
          pointArra.push(du.value);
          let point = {
              "name": du.name,
              "value": pointArra,
              // "symbolSize": du.value/100,
              // "itemStyle": {
              //     "normal": {
              //         "color": "#ef4836"
              //     }
              // }
          };
          let line = {
              "fromName": du.name,
              "toName": this.localName,
              "coords": [geoChinaMap[du.name], this.localtionArr]
          };
          pointData.push(point);
          lineData.push(line);
        }
        this.option.series[0].data = lineData;
        this.option.series[1].data = pointData;
      })
    }
  },
  created() {
      // this.common.req('/ssa/netattack/getLocaltion.do', null, this).then((data) => {
      //   var mapStr= new Array(); //定义一数组
      //   mapStr=data.netAttackOutSideMap.split(","); //字符分割
      //   this.localName=mapStr[0];
      //   this.location.push(mapStr[1]);
      //   this.location.push(mapStr[2]);
      // }
  },
  mounted() {
    this.getInitData();
  }
}
</script>
