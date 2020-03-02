<template>
<div>
  <el-dialog :title="drillDialog.dialogTitle" :visible.sync="drillDialog.dialogVisible" width="85%" @close="initParam">
    <div v-if="drillDialog.dialogTableShow===1">
      <el-checkbox v-model="columnShow.aa">设备类型</el-checkbox>
      <el-checkbox v-model="columnShow.bb">源IP</el-checkbox>
      <el-checkbox v-model="columnShow.cc">源端口</el-checkbox>
      <el-checkbox v-model="columnShow.dd">目标IP</el-checkbox>
      <el-checkbox v-model="columnShow.ee">目标端口</el-checkbox>
    </div>


    <el-table :data="drillDialog.tableData" v-if="drillDialog.dialogTableShow===1" height="250" border style="width: 100%">
      <el-table-column prop="productTypeName" label="设备类型" v-if="columnShow.aa">
      </el-table-column>
      <el-table-column prop="productName" label="设备名称" >
      </el-table-column>
      <el-table-column prop="equIP" label="设备IP" >
      </el-table-column>
      <el-table-column prop="eventTypeName" label="事件类型" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="eventGradeName" label="危险等级" >
      </el-table-column>
      <el-table-column prop="eventSrcIp" label="源IP" v-if="columnShow.bb">
      </el-table-column>
      <el-table-column prop="eventSrcPort" label="源端口" v-if="columnShow.cc">
      </el-table-column>
      <el-table-column prop="eventDestIp" label="目标IP" v-if="columnShow.dd">
      </el-table-column>
      <el-table-column prop="eventDestPort" label="目标端口" v-if="columnShow.ee">
      </el-table-column>
      <el-table-column prop="eventFileName" label="病毒/恶意软件名称">
      </el-table-column>
      <el-table-column prop="eventAttackPhase" label="攻击阶段" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="eventAction" label="执行动作">
      </el-table-column>
    </el-table>

    <el-table :data="drillDialog.tableData" v-if="drillDialog.dialogTableShow===2" height="250" border style="width: 100%">

      <el-table-column label="资产编号" prop="assetCode" >
      </el-table-column>
      <el-table-column label="资产名称" prop="assetName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="资产IP" prop="assetIp" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="所属机构" prop="orgName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="资产负责人" prop="ownerName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="资产使用人" prop="userName" show-overflow-tooltip>
      </el-table-column>

    </el-table>


    <el-pagination @current-change="handleCurrentChange" class="pull-right"
     :page-size="drillDialog.pageSize"
     :current-page="drillDialog.pageIndex" layout="total, prev, pager, next"
     :total="drillDialog.total">
    </el-pagination>

  </el-dialog>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      checkList:[],
      columnShow: {
        aa: false,
        bb: false,
        cc: false,
        dd: false,
        ee: false,
      }
    }
  },
  computed: {
    ...mapState({
      drillDialog: state => state.gridster.drillDialog
    })
  },
  methods:{
    handleCurrentChange(pageIndex){
      this.drillDialog.pageIndex = pageIndex;
      this.$store.dispatch('getDrillData',this.drillDialog.params);
    },
    initParam(){
      this.$store.commit("initParam");
    }
  }


}
</script>
<style>
.el-checkbox__label {
  color: #fff;
}
.el-dialog__body {
  padding-top: 18px;
}
</style>
