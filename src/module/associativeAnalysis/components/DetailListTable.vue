<template>
<div>
  <el-table :data="detailListData" style="width: 100%">

    <el-table-column prop="logTime_dt" label="发生时间">
    </el-table-column>

    <el-table-column prop="srcIp_s" label="攻击iP">
    </el-table-column>
    <el-table-column prop="deviceIp_s" label="设备IP">
    </el-table-column>
    <el-table-column prop="dstIp_s" label="目标IP">
    </el-table-column>

    <el-table-column prop="riskLevel_s" :formatter="fmtEventRiskList" label="风险等级">
    </el-table-column>
    <el-table-column prop="parentEventType_s" :formatter="fmtEventTypeList" label="事件类型">
    </el-table-column>
    <el-table-column label="操作" width="100" >
<template   scope="scope">
      <el-button type="text" @click="showDetail(scope.row)" size="small">
        详情</el-button>
    </template>
</el-table-column>
  </el-table>


</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import dataTotalTable from './DataTotalTable.vue'
export default {
  components: {
    dataTotalTable
  },

  computed: {
    ...mapState({
     EventRiskList:state=>state.context.EventRiskList,
     eventTypeList:state=>state.context.eventTypeList,
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
