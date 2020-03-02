<template>
  <div>

    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="排名" align="center" prop="name">
      </el-table-column>
      <el-table-column label="源IP地址/端口" align="center" prop="componentType">

      </el-table-column>
      <el-table-column label="源地址归属地" align="center" prop="size">

      </el-table-column>
      <el-table-column label="目的IP地址/端口" align="center" prop="actualSize">

      </el-table-column>
      <el-table-column label="源地址归属地" align="center" prop="format">
      </el-table-column>
      <el-table-column label="攻击类型" align="center" prop="platform">
      </el-table-column>
      <el-table-column label="攻击次数" align="center" prop="state">

      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleAlarmInfo(scope.row)" style="cursor: pointer;" >处置</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

  </div>
</template>

<script>

  export default {
    props: ['tableId'],
    data() {
      return {
        pageIndex: 1,
        pageSize: 10,
        total: 30,
        tableConf: {},
      }
    },
    methods: {
      handleSelectionChange(selectedRow) {
        this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
        return;
      },
      handleSizeChange(pageSize) {
        this.$store.dispatch('handleSizeChange', [this.tableId, pageSize]);
      },
      handleCurrentChange(pageIndex) {
        this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
      },

      handleAlarmInfo(row) {
        var params = {id: row.id};
        this.$router.push({
          name: 'EventTableContext',
          params: params
        })
      },

      refreshTable() {
        var tableConf = {
          total: 0,
          tableData: [],
          pageSize: 10,
          pageIndex: 1,
          load: true,
          tableUrl: "/sdsec/web/respool/image/pageQuery",
          params: {
            "orderBy": ["create_time"],
            "orderType": "desc",
            "filters": {"oemInteralUseOnly": 0}
          },
          multipleSelection: [],
        }
        this.$store.commit('registerConf', [this.tableId, tableConf]);
        this.tableConf = this.$store.state.context[this.tableId];
        this.$store.dispatch('reloadTable', this.tableId);
      }
    },
    created: function () {
      this.refreshTable();
    },
    watch: {
      tableId: function (curVal) {
        console.log("tableId:" + curVal);
      }
    },
  }
</script>

<style scoped>

</style>
