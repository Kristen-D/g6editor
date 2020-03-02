<template>
<div>
  <el-table :data="detailListData" style="width: 100%">

    <el-table-column  prop="account"  label="账号" min-width="80"  align="center">
    </el-table-column>
    <el-table-column  prop="src_ip"  label="源IP"  min-width="80"  align="center">
    </el-table-column>
    <el-table-column   prop="src_ip_attribution"  label="源IP归属地" min-width="140"  align="center">
    </el-table-column>
    <el-table-column  prop="hit_time"  label="撞库时间" min-width="90" show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column  prop="login_type"  label="登录类型" min-width="80"  align="center">
    </el-table-column>
  </el-table>


</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState({
     // EventRiskList:state=>state.context.EventRiskList,
     // eventTypeList:state=>state.context.eventTypeList,
    })
  },
  props: ['detailListData'],
  data() {
    return {
      rowData: {},
      dialogTableVisible: false
    }
  },
  methods: {
    showDetail() {
      this.dialogTableVisible = true;
    },
    async showDetail(row) {

      if (row.id == null || row.id == "") {
        return;
      } else {
        var param = {};
        param.event_id = row.id;
        var result = await this.common.req("/ssa/alarmInfoList/getSolrQuery.do", param, this);
        this.$store.dispatch('showDetail', result.rowData[0]);
      }
    },
    fmtEventRiskList(row, column) {

      for (var item in this.EventRiskList) {
        if (row.riskLevel_s == this.EventRiskList[item].id) {
          return this.EventRiskList[item].text;
        }
      }

    },

    fmtEventTypeList(row, column) {

      for (var item in this.eventTypeList) {
        if (row.parentEventType_s == this.eventTypeList[item].id) {
          return this.eventTypeList[item].text;
        }
      }

    }
  }

}
</script>

<style lang="css">
</style>
