<template>
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">受攻击资产TOP</h4>
  </div>
  <div class="el-panel-body p-t-0">
    <div style="height: 198px;">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import {  pieThree } from "../../ChartsOption.js"
export default {
  components: {
    ECharts,
  },

  data() {
    return {
      option: pieThree
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackAssetPie.do', {}, this).then((data) => {
        this.formateData(data);
      })
    },
    formateData(data) {
      let dataLength = data.length;
      if(dataLength < 3) {
        for(let i = 0; i<3-dataLength; i++) {
          data.push({total: 100, name: "N/A", asset: 0, value: 0})
        }
      }
      let leftx = ['13%','46%', '79%'];
      let lefty = ['5%', '38%', '71%'];
      let leftz = ['19%', '52%', '85%'];
      let dataPosition = [ ['17%', '50%'], ['50%', '50%'], ['83%', '50%']];
      let tittle = [];
      let list = [];
      for (let i = 0; i<data.length; i++) {
        let title1 = {
          text: data[i].name,
          top: '10%',
          left: leftx[i],
          itemGap: 20,
          textStyle: {
            color: " #3e4956 ",
            fontSize: 14,
          },
        };
        let title2 = {
          text: '\t\t{a|'+data[i].value+'}\n{b|受攻击数}',
          top: '70%',
          left: lefty[i],
          itemGap: 20,
          textStyle: {
            rich: {
              a: {
                color: '#3e4956 ',
                fontSize: 26,
                fontWeight: 600,
                fontFamily: "HATTEN"
              },
              b: {
                color: 'rgba(62,73,86,0.6)',
                fontSize: 12
              },
            }
          },
        };
        let title3 = {
          text: '\t\t{a|'+data[i].asset+'}\n{b|受攻击资产}',
          top: '70%',
          left: leftz[i],
          itemGap: 20,
          textStyle: {
            rich: {
              a: {
                color: '#3e4956 ',
                fontSize: 26,
                fontWeight: 600,
                fontFamily: "HATTEN"
              },
              b: {
                color: 'rgba(62,73,86,0.6)',
                fontSize: 12
              },
            }
          },
        };
        let l = {
          name: data[i].name,
          type: 'pie',
          radius: ['28%', '40%'],
          center: dataPosition[i],
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: data[i].asset,
              hoverAnimation: false,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.percent.toFixed(0)+'%';
                  },
                  textStyle: {
                    fontSize: 20,
                    color: "rgba(62,73,86,0.6)",
                    fontWeight: 600,
                    fontFamily: "HATTEN",
                  },
                  position: "center",
                }
              },
            },
            {
              value: data[i].total-data[i].asset,
              itemStyle: {
                normal: {
                  color: '#eef1f6',
                },
              },
              hoverAnimation: false
            }
          ]
        };
        tittle.push(title1);
        tittle.push(title2);
        tittle.push(title3)
        list.push(l);
      }

      this.option.title = tittle;
      this.option.series = list;
    }

  },
  created() {

  },
  mounted() {
    this.getInitData();
  }
}
</script>
