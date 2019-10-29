<template>
  <div>
    <div>
      <el-table v-loading="defConf.loading" :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="realname" show-overflow-tooltip label="用户姓名" width="150" align="center"> </el-table-column>
        <el-table-column prop="start_time" label="日志时间" width="180" align="center"> </el-table-column>
        <el-table-column prop="ip" label="客户端IP" width="150" align="center"> </el-table-column>
        <el-table-column prop="uri" label="访问地址" show-overflow-tooltip width="400" align="center"> </el-table-column>
        <el-table-column prop="result" label="返回结果" show-overflow-tooltip min-width="200" align="center"> </el-table-column>
        <el-table-column prop="user_agent" label="客户端系统信息" show-overflow-tooltip width="180" align="center"> </el-table-column>
      </el-table>
    </div>
    <br>
    <div class="col-lg-13 pull-right">
      <el-pagination @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex"
        layout="total, prev, pager, next, jumper" :total="defConf.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        defConf: {},
        filedMap: {
          name: "用户姓名",
          mail: "电子邮件",
          phone: "电话"
        },
        //自定义属性
      }

    },
    props: ['id'],
    computed: {
      ...mapState({

      })
    },
    methods: {
      //默认的方法,基本无需修改

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
      },
      //默认方法结束

      //自定义方法

      //methods end
    },
    created: function () {
      var defConf = {
        total: 0,
        loading: false,
        tableData: [],
        pageSize: 9,
        pageIndex: 1,
        editRowIndex: -1,
        editRowTemp: {},
        multipleSelection: [],
        //默认ajax属性
        tableUrl: "/ssa/sysLog/listSysLog.do",
        params: {},
        saveUrl: "",
        delUrl: "",
      };

      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);
    }
  }

</script>
