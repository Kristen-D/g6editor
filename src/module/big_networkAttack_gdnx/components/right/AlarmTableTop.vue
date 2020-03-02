<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>最新告警事件TOP</h3>
  </div>
  <div class="el-panel-bigscreen-body">

    <el-table :data="alarmData" class="blue-table noborder-table" max-height="280" :row-class-name="tableRowClassName">
      <el-table-column prop="attackType" label="攻击类型" width="120"></el-table-column>
      <el-table-column prop="level" label="风险级别" align="center" width="95">
        <template scope="scope">
                <span v-if="scope.row.alarmGrade==='高危'" class="alarm-high">{{scope.row.alarmGrade}}</span>
                <span v-if="scope.row.alarmGrade==='中危'" class="alarm-medium">{{scope.row.alarmGrade}}</span>
                <span v-if="scope.row.alarmGrade==='低危'" class="alarm-low">{{scope.row.alarmGrade}}</span>
                </template>
      </el-table-column>
      <el-table-column prop="srcIp" label="源地址" width="120" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orgName" label="目的单位" width="98" align="center"></el-table-column>
      <el-table-column prop="alarmTime" label="告警时间" width="100" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column label="查看" width="75">
        <template scope="scope">
                <el-button type="text"  style="color:#2196f3" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  data() {
    return {
      alarmData: []
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
      this.common.req('/ssa/netattack_gdnx/getNetAttackWarningTableData.do', {}, this).then((data) => {
        this.alarmData = data;
      })
    },
    toDetail(row) {
      this.$router.push({
        name: 'alarmDetail',
        params: row
      });
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 == 1 ) {
        return 'even-row';
      } else if (rowIndex % 2 == 0) {
        return 'odd-row'
      }
    }
  },
  created: function() {
    let self = this;
    if (self && !self._isDestroyed) {
      setInterval(() => {
        if (self && !self._isDestroyed) {
          self.getInitData();
        }

      }, 60000);
    }

  },
  mounted() {
    $(".blue-table div.el-table__body-wrapper").myScroll({
      speed: 40,
    });

    window.fetchData.push(this.getInitData)
  }
}
</script>
<style>
.blue-table.el-table .even-row {
  background-color: rgba(255, 255, 255, 0.05);
}

.blue-table.el-table .odd-row {
  background-color: rgba(10, 17, 30, 0.05) !important;
}
</style>
