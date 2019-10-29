<template>
<div>
  <h5 class="el-panel-subtitle">攻击趋势</h5>
  <div style="height: 200px;">
    <e-charts :options="option" auto-resize></e-charts>
  </div>
</div>
</template>
<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { lineCategory } from "../../../ChartsOption.js"
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      newEventTypeList: state => state.context.list.NewEventTypeList
    })
  },
  components: {
    ECharts,
  },

  data() {
    return {
      option: lineCategory,
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackTrend.do', {}, this).then((data) => {
        this.formateData(data)
      })
    },
    formateData(data) {
      //'#6c87ed',
      let nowDate = new Date();
      let ds = [];
      for (let i = 7; i > 0; i--) {
        nowDate.setDate(nowDate.getDate() - 1)
        ds.push(this.common.formatDate(nowDate, "MM.dd"))
      }
      ds.sort((a, b) => {
        return a - b;
      })

      let category = [];
      let s = [];
      for(let i=0; i< data.length; i++) {
        let newList = [];
        let dl = data[i].list;
        data[i].name = this.newEventTypeList[data[i].id];

        ds.forEach((d) => {
          let n = dl.find((u) => {
            return d === u.days;
          })
          if( n === undefined) {
            newList.push(0);
          }else {
            newList.push(n.count);
          }
        })
        dl = newList;
        let su = {};
        if(data[i].name === undefined) {
          category.push('总数');
          su = {
              name: '总数',
              type: 'line',
              stack: '总量',
              smooth: false, //是否平滑曲线显示
              symbol: 'none', // 线条无圆点
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: "#6c87ed",
                  borderColor: "#fff"
                }
              },
              data: newList

            };
        }else {
          category.push(data[i].name);
          su = {
            name: data[i].name,
            type: 'line',
            stack: '总量'+i,
            smooth: false,
            symbol: 'none',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: this.option.color[i],
                borderColor: "#fff"
              }
            },
            areaStyle: {
              normal: {
                color: this.option.color[i],
                opacity: 1,
              }
            },
            data: newList
          };
        }

        s.push(su);
      }



      this.option.legend.data = category;
      this.option.xAxis[0].data = ds;
      this.option.series = s;

    }
  },
  created() {

  },
  mounted() {
    this.getInitData();
  }
}
</script>
