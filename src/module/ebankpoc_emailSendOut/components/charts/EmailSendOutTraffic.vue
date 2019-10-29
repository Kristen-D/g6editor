<template>
<div class="echartsbox2" id="Graphbox"></div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState({
      // areaId: state => state.context.params.areaId,
      // appraisalCycle: state => state.context.params.appraisalCycle,
    })
  },
  watch: {
    // areaId: function() {
    //   this.getInitData();
    // },
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/ebankpoc/getEmailSendOutTraffic.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      // console.log(data);
      let nodes = data.nodes1.concat(data.nodes2);
      let links = data.links;
      for(let i = 0; i < nodes.length; i++) {
        // nodes[i].id = i.toString();
        nodes[i].symbolSize = nodes[i].value/50;
      }
      // for(let i = 0; i < links.length; i++) {
      //   links[i].id = i.toString();
      // }
      // console.log(nodes);
      // console.log(links);
      let myChart = echarts.init(document.getElementById('Graphbox'));
      // let graphdata=[
  		// 	{category:0, name: '内网外发IP', value : 15,symbolSize:30},
  		// 	{category:0, name: '内网外发IP1', value : 6,symbolSize:12},
  		// 	{category:0, name: '内网外发IP2', value : 8,symbolSize:16},
  		// 	{category:0, name: '内网外发IP3', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IP4', value : 4,symbolSize:8},
  		// 	{category:0, name: '内网外发IP5', value : 3,symbolSize:6},
  		// 	{category:0, name: '内网外发IP6', value : 4,symbolSize:8},
  		// 	{category:0, name: '内网外发IP7', value : 7,symbolSize:14},
  		// 	{category:0, name: '内网外发IP8', value : 9,symbolSize:18},
  		// 	{category:0, name: '内网外发IP9', value : 6,symbolSize:12},
  		// 	{category:0, name: '内网外发IPa', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPb', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPc', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPd', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPe', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPf', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPg', value : 5,symbolSize:10},
  		// 	{category:0, name: '内网外发IPh', value : 5,symbolSize:10},
  		// 	{category:1, name: '外网邮箱', value : 15,symbolSize:30},
  		// 	{category:1, name: '外网邮箱1', value : 6,symbolSize:12},
  		// 	{category:1, name: '外网邮箱2', value : 8,symbolSize:16},
  		// 	{category:1, name: '外网邮箱3', value : 5,symbolSize:10},
  		// 	{category:1, name: '外网邮箱4', value : 4,symbolSize:8},
  		// 	{category:1, name: '外网邮箱5', value : 3,symbolSize:6},
  		// 	{category:1, name: '外网邮箱6', value : 4,symbolSize:8},
  		// 	{category:1, name: '外网邮箱8', value : 9,symbolSize:18},
  		// 	{category:1, name: '外网邮箱9', value : 6,symbolSize:12},
  		// 	{category:1, name: '外网邮箱a', value : 5,symbolSize:10},
  		// 	{category:1, name: '外网邮箱12', value : 8,symbolSize:16},
  		// 	{category:1, name: '外网邮箱13', value : 5,symbolSize:10},
  		// 	{category:1, name: '外网邮箱14', value : 4,symbolSize:8},
  		// 	{category:1, name: '外网邮箱15', value : 3,symbolSize:6},
  		// 	{category:1, name: '外网邮箱16', value : 4,symbolSize:8},
  		// 	{category:1, name: '外网邮箱18', value : 9,symbolSize:18},
  		// 	{category:1, name: '外网邮箱19', value : 6,symbolSize:12},
  		// 	{category:1, name: '外网邮箱1a', value : 5,symbolSize:10},
  		// ];
      //
      // let dlinks = function(linksdata) {
      //   let res = [];
      //
      //   for (let i = 0; i < linksdata.length; i += 2) {
      //     for (let j = i + 1; j < linksdata.length; j += 5) {
      //       res.push({
      //         source: linksdata[i].name,
      //         target: linksdata[j].name,
      //         value: linksdata[j].value,
      //       });
      //
      //     };
      //   };
      //   return res;
      // };

      let option = {
        color: ['#e83701', '#007be8'],
        tooltip: {
          trigger: 'item',
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          name: "邮箱外发关系",
          layout: 'circular',
          categories: [{
            name: '内网邮箱'
          }, {
            name: '外网邮箱'
          }],
          data: nodes,
          // graphdata,
          links: links,
          // dlinks(graphdata),
          roam: true,
          label: {
            normal: {
              position: 'right',
              formatter: '{b}'
            }
          },
          lineStyle: {
            normal: {
              //color:'#99e6f7',
              //				color:'source',
              type: 'solid',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0,123,232,1)' // 0% 处的颜色
                }, {
                  offset: 0.5,
                  color: 'rgba(0,123,232,0.5)' // 50% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0,123,232,1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },

              curveness: 0.3
            }
          }

        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', function(params) {
        if(params.data.category) {
          return;
        }
        let parameters = { ...params.data, title: '邮件发送详情' };
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('loadDrillTableData', {});
      });
    },
  },
  mounted: function() {
    this.getInitData();
    // this.loadMapChart({});
  }
}
</script>

<style>
</style>
