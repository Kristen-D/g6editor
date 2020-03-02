<template>
<div class="">
  <el-dialog :title="drillData.title" :visible.sync="drillData.dialogTableVisible" width="85%" class="dialog-panel">

    <el-table :data="drillData.tableData" style="margin-top:20px;">
      <!-- <el-table-column type="selection"></el-table-column> -->
      <el-table-column prop="siteUrl" label="站点URL" align="center" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shortName" label="区域" align="center" ></el-table-column>
      <el-table-column prop="vulType" label="漏洞名称" align="center"></el-table-column>
      <!-- <el-table-column prop="cvenumber" label="CVE编号" align="center"></el-table-column> -->
      <el-table-column prop="owaspTypeName" label="OWASP类型" align="center"></el-table-column>
      <el-table-column prop="riskLevelName" label="级别" align="center" ></el-table-column>
      <el-table-column prop="scanTime" label="扫描时间" align="center" sortable>
        <!-- <template scope="scope">{{ scope.row.scanTime }}</template> -->
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template scope="scope">
          <a href="#" class="operate-center">查看</a>
        </template>
      </el-table-column> -->

      <div slot="empty" >
        <div class="" v-if="(!drillData.tableData || drillData.tableData.length === 0) && 'loaded' === drillData.loading">
          <i class="el-icon-document"></i> 没有相关数据！
        </div>

        <div class="" v-if="'wrong' === drillData.loading">
          <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
        </div>

        <div class="" v-if="'load' === drillData.loading">
          <i class="el-icon-loading"></i> 正在读取数据，请稍后...
        </div>
      </div>
    </el-table>
    <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="drillData.pageSize"
      :current-page="drillData.pageIndex" layout="total, prev, pager, next, jumper" :total="drillData.total">
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
      // queryParams: {
      //   p1: '',
      //   p2: ''
      // }
    }
  },
  computed: {
    ...mapState({
      drillData: state => state.drillDialog.drillData
    })
  },
  methods: {
    getChange(event) {
      let obj = new Object();
      if (event.length > 0) {
        event.forEach((c) => {
          let arra  = c.split(':');
          let descriptor = Object.create({ value: null, writable: true, enumerable: true, configurable: true });
          descriptor.value = arra[1];
          Object.defineProperty(obj, arra[0], descriptor);
        });
        this.drillData.columnList = obj;
      }
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('listCurrentChange', pageIndex);
    },
    getMinWidth(value) {
      if(value=="logTime_dt"){
        return 170;
      }else if(value=="srcIp_s"){
          return 120;
      }else if(value=="dstIp_s"){
          return 120;
      }else if(value=="protocol_s"){
          return 100;
      }
    },
    query() {
      this.$store.dispatch('queryByConditions');
    }
  },
  created: function() {

  }
}
</script>

<style >
</style>
