<template>
<el-table :data="netattackTableAttack" style="width: 100%" class="white-table">
  <el-table-column prop="alarmtype" label="攻击类型"></el-table-column>
  <el-table-column prop="alarmGrade" label="风险级别">
    <template scope="scope">
     <i v-if="scope.row.alarmGrade==='高危'" class="circle circle-high"></i>
     <i v-if="scope.row.alarmGrade==='中危'" class="circle circle-medium"></i>
     <i v-if="scope.row.alarmGrade==='低危'" class="circle circle-low"></i>
     <span>{{ scope.row.alarmGrade}}</span>
   </template>
  </el-table-column>
  <el-table-column prop="srcIp" label="源IP" min-width="100"></el-table-column>
  <el-table-column prop="dstIp" label="目的IP" min-width="100"></el-table-column>
  <el-table-column prop="alarmTime" label="时间" min-width="120" show-overflow-tooltip></el-table-column>
  <el-table-column prop="status" label="状态"></el-table-column>
  <!-- <el-table-column prop="describe" label="攻击信息" show-overflow-tooltip></el-table-column> -->

</el-table>
</template>


<script>
export default {
  data() {
    return {
      netattackTableAttack: []

    };
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackWarningTableData.do', {}, this).then((data) => {
        this.netattackTableAttack= data;
      })
    },
  },
  created() {
    this.getInitData();
  },
};
</script>
