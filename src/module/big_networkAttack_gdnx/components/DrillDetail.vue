<template >
<el-dialog title="详情" :visible.sync="drillData.dialogTableVisible" width="30%" class="dialog-panel">
  <div style="padding-left: 10px; padding-right: 10px;">
    <el-table :data="drillData.tableData" class="blue-table">
      <el-table-column prop="attackType" label="攻击类型" width="120"></el-table-column>
      <el-table-column prop="level" label="风险级别" align="center" width="95">
        <template scope="scope">
                <span v-if="scope.row.alarmGrade==='高危'" class="alarm-high">{{scope.row.alarmGrade}}</span>
                <span v-if="scope.row.alarmGrade==='中危'" class="alarm-medium">{{scope.row.alarmGrade}}</span>
                <span v-if="scope.row.alarmGrade==='低危'" class="alarm-low">{{scope.row.alarmGrade}}</span>
                </template>
      </el-table-column>
      <el-table-column prop="attackCount" label="攻击次数" width="98" align="center"></el-table-column>
      <el-table-column prop="srcIp" label="源IP" width="120" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="attackBelong" label="源地址" width="120" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orgName" label="目的单位" width="98" align="center"></el-table-column>
      <el-table-column prop="alarmTime" label="告警时间" width="100" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="pagelocation m-b-100">
      <!-- <el-pagination :current-page.sync="currentPage1" layout="sizes, prev, pager, next" :total="100" class="pagination">
      </el-pagination> -->
      <el-pagination class="pagination" @current-change="handleCurrentChange" :page-size="drillData.pageSize" :current-page="pageIndex" layout="total, prev, pager, next, jumper" :total="drillData.total">
      </el-pagination>
    </div>
  </div>
</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: 'alarmDrillTable',
      pageIndex: 1
    }
  },
  computed: {
    ...mapState({
      drillData: state => state.drillData.drillData,
    })
  },
  methods: {
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('listCurrentChange', [this.id, pageIndex]);
    },
  },
  created: function() {

  }
}
</script>

<style lang="css">
</style>
