<template>
  <div>
    <el-dialog :title="dialog.dialogTitle" :visible.sync="dialog.dialogVisible" width="85%">
      <el-table v-if="dialog.chartType == 'assetInfo'" :data="dialog.tableData" style="width: 100%" border>
        <el-table-column prop="assetCode" label="资产编号"></el-table-column>
        <el-table-column prop="assetName" label="资产名称"></el-table-column>
        <el-table-column prop="devName" label="设备名称"></el-table-column>
        <el-table-column prop="orgName" label="所属机构"></el-table-column>
        <el-table-column prop="ownerName" label="资产负责人"></el-table-column>
        <el-table-column prop="userName" label="使用人"></el-table-column>
        <el-table-column prop="systemName" label="所属子系统"></el-table-column>
        <el-table-column prop="assetIp" label="ip"></el-table-column>
      </el-table>

      <el-table v-else="dialog.chartType =='dataPick' || dialog.chartType =='dataFlow' "
                :data="dialog.tableData" style="width: 100%" border>
        <el-table-column prop="name" label="威胁类型"></el-table-column>
        <el-table-column prop="event_src_ip" label="源ip"></el-table-column>
        <el-table-column prop="event_src_port" label="源端口"></el-table-column>
        <el-table-column prop="event_dest_ip" label="目标ip"></el-table-column>
        <el-table-column prop="event_dest_port" label="目标端口"></el-table-column>
        <el-table-column prop="time" label="发生时间"></el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" class="float-r"
                     :page-size="dialog.pageSize"
                     :current-page="dialog.pageIndex" layout="total, prev, pager, next"
                     :total="dialog.total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {DATA_CENTER_GET_DETAIL_DATA} from '../store/mutation-types';

  export default {
    props: ["id", "productType"],
    data() {
      return {}
    },
    computed: {
      ...mapState({
        dialog: state => state.detailDialog
      })
    },
    methods: {
      //处理翻页时候的事件
      handleCurrentChange(pageIndex) {
        this.$store.dispatch(DATA_CENTER_GET_DETAIL_DATA, {
          pageSize: this.dialog.pageSize,
          pageIndex: pageIndex,
          product_type: this.dialog.product_type,
          chartType: this.dialog.chartType,
          old_total: this.dialog.old_total,
        });
      }
    }
  }
</script>
