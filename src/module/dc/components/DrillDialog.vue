<template>
<div>



  <el-dialog  :title="drillDialog.dialogTitle"  :visible.sync="drillDialog.dialogVisible"  width="85%">

    <el-table v-show="drillDialog.chartType == 'assetInfo'" :data="drillDialog.tableData" style="width: 100%" border>

      <el-table-column prop="assetCode" label="资产编号" >
      </el-table-column>

      <el-table-column prop="assetName" label="资产名称" >
      </el-table-column>

      <el-table-column prop="devName" label="设备名称" >
      </el-table-column>


      <el-table-column prop="orgName" label="所属机构" >
      </el-table-column>

      <el-table-column prop="ownerName" label="资产负责人">
      </el-table-column>

      <el-table-column prop="userName" label="使用人" >
      </el-table-column>

      <el-table-column prop="systemName" label="所属子系统">
      </el-table-column>

      <el-table-column prop="assetIp" label="ip" >
      </el-table-column>


    </el-table>




    <el-table v-show="drillDialog.chartType =='dataPick' || drillDialog.chartType =='dataFlow' " :data="drillDialog.tableData" style="width: 100%" border>

      <el-table-column prop="threatType_s" label="威胁类型" >
      </el-table-column>
      <el-table-column prop="srcIp_s" label="源ip" >
      </el-table-column>
      <el-table-column prop="srcPort_s" label="源端口" >
      </el-table-column>
      <el-table-column prop="dstIp_s" label="目标ip" >
      </el-table-column>
      <el-table-column prop="dstPort_s" label="目标端口" >
      </el-table-column>
      <el-table-column prop="logTime_dt" label="发生时间">
      </el-table-column>

    </el-table>

    <el-pagination @current-change="handleCurrentChange" class="float-r"
     :page-size="drillDialog.pageSize"
     :current-page="drillDialog.pageIndex" layout="total, prev, pager, next"
     :total="drillDialog.total">
    </el-pagination>

  </el-dialog>


</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ["id","productType"],
  data() {
    return {
    }
  },
  computed:{
    ...mapState({
      drillDialog:state=>state.context.drillDialog
   })
 },
  methods: {
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
       this.drillDialog.pageIndex = pageIndex;
       this.$store.dispatch('getDrillData');

    }
  },
  created: function() {

  }
}
</script>

<style>

</style>
