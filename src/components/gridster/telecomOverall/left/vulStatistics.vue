<template>
<div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">漏洞统计</h3>
  </div>

  <div class="el-panel-white-body">
    <div class="flexlayout">
      <div class="flex-countbox">
        <div class="flex-iconlayout" style="padding-top:8px"><i class="icon-id1"></i></div>
        <div class="float-l" @click="getVulDetail('new', '最新发现')">
          <p style="margin-bottom:0">最新发现</p>
          <p class="countnum">{{newFind}}</p>
        </div>
        <span><p>时间：{{appraisalCycle}}</p><p>漏洞数：{{newFind}}</p></span>
      </div>
      <div class="flex-countbox">
        <div class="flex-iconlayout" style="padding-top:8px"><i class="icon-id2"></i></div>
        <div class="float-l" @click="getVulDetail('total', '累计发现')">
          <p style="margin-bottom:0">累计发现</p>
          <p class="countnum">{{total}}</p>
        </div>
        <span><p>时间：{{appraisalCycle}}</p><p>漏洞数：{{total}}</p></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import echarts from 'echarts'
export default {
  data() {
    return {
      newFind: '',
      total: ''
    }
  },
  computed: {
    ...mapState({
      areaId: state => state.context_sz.params.areaId,
      appraisalCycle: state => state.context_sz.params.appraisalCycle,
      status: state => state.context_sz.params.status,
      roleState: state=>state.context_sz.RoleState,
    })
  },
  watch: {
    areaId: function() {
      this.getInitData();
    },
    appraisalCycle: function() {
      this.getInitData();
    },
    status: function() {
      this.getInitData();
    },
  },
  methods: {
    async getInitData() {
      let data = await this.common.req('/ssa/overall/getVulStatistics.do', {
        'areaId': this.areaId,
        'appraisalCycle': this.appraisalCycle,
        status: this.status
      }, this);
      this.newFind = data.new;
      this.total = data.total;
    },
    getVulDetail(type, title) {
      if(!this.roleState) {
        return;
      }
      let params = {};
      if(type === 'new') {
        params = { areaId: this.areaId, appraisalCycle: this.appraisalCycle, status: this.status,  };
      }else {
        params = { areaId: this.areaId, status: this.status,  };
      }
      params.title = title;
      this.$store.commit('openDrillDialogTable', params);
      this.$store.dispatch('loadDrillTableData', {});
    }
  },
  created: function() {
    this.$nextTick(()=>{
      this.getInitData();
    })
  }

}
</script>

<style scoped>
.el-panel-white-body{
  padding-top: 50px;
  /*position: relative;*/
}
</style>
