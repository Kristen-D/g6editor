<template>
  <div class="el-panel">
		<span class="left-top"></span><span class="left-bottom"></span>
		<span class="right-top"></span><span class="right-bottom"></span>
		<div class="el-panel-heading">
			<h4 class="el-panel-title">URL分布</h4>
		</div>
		<div class="el-panel-body shine">

			<div class="echartsbox4" id="Treemap">  <e-charts :options="option" auto-resize></e-charts></div>
		</div>
	</div>
</template>

<script>
// import echarts from 'echarts'
import {UrlDistribution} from "../ChartOptions";
import ECharts from "components/vue-echarts/ECharts";
  export default {
    components: {
    ECharts},
    name: "url-relation",
    data () {
      return {
      // option:{}
      option: UrlDistribution
      }
    },
    methods: {
      loadChart(data) {
        this.option.series[0].data =data;
      //   let myChart = echarts.init(document.getElementById('Treemap'));
      //   this.option={
      //     color:['#42a5f5','#1565c0','#0d47a1','#3d5afe','#2962ff','#2979ff','#448aff','#6091e4','#2196f3'],
      //     tooltip : {
      //       trigger: 'item',
      //       formatter: "来源：{b}  <br/>数量： {c}"
      //     },
      //     // tooltip: {
      //     //   trigger: 'item',
      //     //   formatter: "来源：{b}  <br/>数量： {c}"
      //     // },
      //     calculable: true,
      //     series: [{
      //       name: 'URL分布',
      //       type: 'treemap',
      //       width: '100%',
      //       height: '90%',
      //       roam: false, //是否开启拖拽漫游（移动和缩放）
      //       nodeClick: false, //点击节点后的行为,false无反应
      //       breadcrumb: { //关闭面包屑路径
      //         show: false
      //       },
      //       silent: false, //关闭鼠标事件
      //       label: {
      //         normal: {
      //           textStyle: {
      //             // fontWeight: 'bold',
      //             fontSize: '14',
      //           }
      //         }
      //       },
      //       itemStyle: {
      //   normal: {
      //     label: {
      //       show: true,
      //       formatter: "{b}"
      //     },
      //     borderWidth: 1,
      //     borderColor: '#000'
      //   },
      //   emphasis: {
      //     label: {
      //       show: true
      //     },
      //     color: '#95ccf8',
      //   }
      // },
      //       data: data
      //     }]
      //   };
      //   myChart.setOption(this.option);
      //   window.onresize = myChart.resize;
      }
    },
    async mounted() {

       let data = await this.common.req('/ssa/blackURL/UrlDistribution.do', {}, this);

        this.loadChart(data);


    }
  }
</script>
