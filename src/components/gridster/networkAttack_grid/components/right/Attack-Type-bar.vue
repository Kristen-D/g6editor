<template>
	<div class="el-panel">
		<div class="el-panel-heading">
			<h4 class="el-panel-title">攻击类型TOP</h4>
		</div>
		<div class="el-panel-body">
			<div style="height: 275px">
				<e-charts :options="option" auto-resize></e-charts>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { bar1Category } from "../../ChartsOption.js"
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
      option: bar1Category,
    }
  },
	methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackSubTypeTop5.do', {}, this).then((data) => {
				let datax = [];
				let datav = [];
				for(let du of data) {
					datax.push(this.newEventTypeList[du.id]);
					datav.push(du.value);
				}
        this.option.xAxis[0].data = datax;
				this.option.series[0].data = datav;
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
