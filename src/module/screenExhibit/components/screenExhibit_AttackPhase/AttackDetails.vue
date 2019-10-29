<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-body" style="padding-top: 0px; margin-top: -10px;">
      <el-table :data="tableData" border style="width: 100%;margin-top: 60px;" class="dark-table">
        <el-table-column align="center" prop="pattackPhase_s"  show-overflow-tooltip label="阶段" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.pattackPhase_s }}</span>
        </div>
        </template>
</el-table-column>

        <el-table-column align="center" prop="logTime_dt" label="发生时间" show-overflow-tooltip min-width="170"> </el-table-column>


        <el-table-column  align="center" prop="threatType_s"  show-overflow-tooltip label="攻击类型" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.threatType_s }}</span>
        </div>
       </template>
</el-table-column>

       <el-table-column align="center" prop="riskLevel_s"  show-overflow-tooltip label="等级" min-width="70">
<template   scope="scope">
       <div >
         <span  style="margin-left: 10px">{{ scope.row.riskLevel_s }}</span>
       </div>
       </template>
</el-table-column>
       <el-table-column align="center" prop="srcIp_s"  show-overflow-tooltip label="攻击IP" min-width="120">
<template   scope="scope">
       <div >
         <span  style="margin-left: 10px">{{ scope.row.srcIp_s }}</span>
       </div>
       </template>
</el-table-column>

       <el-table-column align="center" prop="event_src_ip_area"  show-overflow-tooltip label="攻击端口" min-width="100">
<template   scope="scope">
       <div >
         <span  style="margin-left: 10px">{{ scope.row.srcPort_s }}</span>
       </div>
       </template>
</el-table-column>
       <el-table-column align="center" prop="dstIp_s"  show-overflow-tooltip label="目标IP" min-width="120">
<template   scope="scope">
       <div >
         <span  style="margin-left: 10px">{{ scope.row.dstIp_s }}</span>
       </div>
       </template>
</el-table-column>

       <el-table-column align="center" prop="event_dest_ip_area"  show-overflow-tooltip label="目标端口" min-width="100">
<template   scope="scope">
       <div >
         <span  style="margin-left: 10px">{{ scope.row.dstPort_s }}</span>
       </div>
       </template>
</el-table-column>

       <el-table-column header-align="center" prop="msg_s" label="内容" show-overflow-tooltip min-width="100"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['activePhase'],
  computed: {
    ...mapState({
      EventThreatList:state=>state.context.list.EventThreatList,
    })
  },
  watch: {
    activePhase: function() {
      this.getInitData();
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/situationAnaly/getEventAttackPhaseDetail.do', {time: 'month',pageSize:'5',pageIndex:'1',old_total:'-1',pattackPhase_s:this.activePhase}, this).then((data) => {
        this.tableData = data.rowData;
      })
    },
    fmtEventThreatList(val) {

      for (var item in this.EventThreatList) {
        if (val == this.EventThreatList[item].id) {
          return this.EventThreatList[item].text;
        }
      }

    },
    fmtEventRiskList(val) {
      if(val==1){
        return "低";
      }else if(val==2){
        return "中";
      }else if(val==3){
        return "高";
      }

    },
  },
  created: function() {
    this.getInitData();
  }
}
</script>

<style lang="css">
</style>
