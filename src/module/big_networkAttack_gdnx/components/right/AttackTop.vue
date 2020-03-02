<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>网络攻击TOP</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <el-row :gutter="40">
        <el-col :span="8" v-for="item in attackTopData">
          <h4 class="el-panel-bigscreen-subtitle2">{{item.name}}</h4>
          <ul class="safe-mark">
            <li v-for="(du, index) in item.list" @click="chartClick(du)" style="cursor:pointer;">
              <div >{{index+1}}</div><label :tittle="du.name">{{du.name.length>5?du.name.substring(0, 5):du.name}}</label><span>{{du.value}}个</span></li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  data() {
    return {
      attackTopData: [],
      result: [
        {name: '攻击类型',  },
        {name: '资产名称',  },
        {name: '事发区域',  }
      ],
    }
  },
  computed: {
    ...mapState({
      params: state => state.context.params,
    })
  },
  watch: {
    params: function() {
      this.getInitData();
    },
  },
	methods: {
    getInitData() {
      this.common.req('/ssa/netattack_gdnx/getAttackTops.do', this.params, this).then((data) => {
          this.attackTopData = data;
      })
    },
    chartClick(du) {
      let ps = { ...this.params, ...du}
      this.$store.commit('openDrillDialogTable', ps);
      this.$store.dispatch('loadDrillTableData');
    },
  },
  created() {

  },
  mounted() {
    window.fetchData.push(this.getInitData)
    // this.getInitData();
  }
}
</script>
