<template>
<div class="">
  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange" class="changefontcolor">

    <el-table-column type="selection"> </el-table-column>
    <el-table-column  prop="photoIcon"  label="图标" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="nameMachine"  label="名称" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="platform"  label="平台" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="strategy"  label="策略" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="statusLamp"  label="状态灯" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="status"  label="状态" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="sucSendStrategy"  label="成功发送策略" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="version"  label="版本" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="hypervisor"  label="Hypervisor" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="groupName"  label="组" show-overflow-tooltip></el-table-column>

    <el-table-column label="操作" align="center">
      <template scope="scope">

                <el-button type="text" @click="handleEdit(scope.$index,scope.row)" class="operate-left">编辑</el-button>
                <span class="vert-bar-color">|</span>
                <el-button type="text" @click="handleDelete(scope.$index,scope.row)" class="operate-center">删除</el-button>

            <!-- <div v-if="!operateFlag">
                <el-button type="text" @click="showDetail(scope.$index,scope.row)" class="operate-left">查看</el-button>
            </div> -->
         </template>
    </el-table-column>

    <div slot="empty">
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' === defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击
        <el-button type="text" @click="refresh">刷新</el-button>
      </div>

      <div class="" v-if="'load' === defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

  </el-table>


  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  components: {},
  props: [ 'id'],
  computed: {
    ...mapState({
      // operateFlag: state => state.context.operateFlag,
    }),

  },
  data() {
    return {
      defConf: {},

    }
  },
  methods: {


    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },



    //默认的方法,基本无需修改

    handleEdit(i, row) {

      this.$router.push({
        name: 'pocTestInfoForm',
        params: {...row,tableId:this.id}
      })
      // this.$store.dispatch('handleEdit', [this.id, i, row]);
    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, {
        "ids": [row.id]
      }]);
    },

    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    }
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/pocTestExport/queryPocInfo.do",
      params: {},
      saveUrl: "/ssa/pocTestExport/addOrModifyPocInfo.do",
      delUrl: "/ssa/pocTestExport/batchDeletePocInfo.do",
    };
    // let params = this.$store.state.editTable[this.id];
    // if (params) {
    //   for (let p in params) {
    //     defConf[p] = params[p];
    //   }
    // }
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>

<style>

</style>
