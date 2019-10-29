<template>
  <div class="el-panel">
    <div class="el-panel-heading">
      <h4 class="el-panel-title">告警</h4>
    </div>
    <div class="el-panel-body p-b-10" style="height: 232px;">
      <el-table :data="pupsWarningData" style="width: 100%" class="table">
        <el-table-column prop="alarmtype" label="类型" align="center" ></el-table-column>
        <el-table-column label="风险级别" align="center">
          <template scope="scope">
          <i v-if="scope.row.alarmGrade==='高危'"><span class="circle circle-high"></span></i>
          <i v-if="scope.row.alarmGrade==='中危'"><span class="circle circle-medium"></span></i>
          <i v-if="scope.row.alarmGrade==='低危'"><span class="circle circle-low"></span></i>
            <span class="m-l--6">{{ scope.row.alarmGrade }}</span>
         </template>
        </el-table-column>
        <el-table-column prop="srcIp" label="源IP" align="center"></el-table-column>
        <el-table-column prop="dstIp" label="目的IP" align="center"></el-table-column>
        <el-table-column prop="alarmTime" label="告警时间" align="center" min-width="110"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip="true"></el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pupsWarningData: [],
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/pups/getPupWarnings.do', {}, this).then((data) => {
        this.pupsWarningData = data;
      })
    }
  },
  created: function() {
    this.getInitData();
  }
}
</script>

<style>
</style>
