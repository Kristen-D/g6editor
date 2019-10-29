<template>
	<div style="height: 300px">
		<e-charts :options="option" auto-resize></e-charts>
	</div>

</template>

<script type="text/javascript">
	  import ECharts from "../../../vue-echarts/ECharts";
    import {pieCategory} from "./ChartsOption.js"

	export default {
		props: ['data'],
		components: {
			ECharts,
		},

		data () {
			return {
				  option: pieCategory,
					configuration: this.data.json
			}
		},
		methods:{
			getInitData() {
	      this.common.req(this.configuration.dataUrl, {}, this).then((data) => {
					this.loadMapChart(data);
	      })
	    },
			loadMapChart(data) {
				if (data.length != 0) {
					this.option.series[0].data = data;
				}else{
					this.option.series = [{//当所有数据为0时，则画一个底色饼图。不画第二个图。否则反之
	          name:'输助底色',
	          type:'pie',
	          radius : '55%',
	          center: ['50%', '50%'],
	          roseType: 'angle',
	          //roseType: 'radius',
	          startAngle: 0,
	          hoverOffset:0,
	          itemStyle:{
	            normal:{color: "#e1e3e4"},
	            emphasis:{color:"#e1e3e4"}
	          },
	          labelLine:{normal:{show:false}},
	          data:[{value:1,name:'',tooltip: {show:false}}]
	        }]
				}

			},


		},
		created: function() {
	    // this.getInitData();
	  },
	  mounted: function() {
	    this.getInitData();
	  }
	}
</script>
