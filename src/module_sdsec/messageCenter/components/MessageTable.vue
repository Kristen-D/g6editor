<!--产品规格表格布局-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">消息列表</label>
      <div>
        <el-button type="primary" v-if="showEditMessage" size="small" @click="addMessage">添加消息</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i
          class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="消息编号" align="center" prop="name">
      </el-table-column>
      <el-table-column label="消息来源" align="center" prop="serviceType">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="消息" align="center" prop="description">
      </el-table-column>
      <el-table-column label="消息" align="center" prop="productStatus">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="消息" align="center" prop="billingRules">
      </el-table-column>
      <el-table-column label="消息时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="editMessage(scope.row)" style="cursor: pointer;" v-if="showEditMessage">编辑</el-button>
          <el-button type="text" @click="showMessageDetail(scope.row)" style="cursor: pointer;">详情</el-button>
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
  import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

  export default {
    props: ['tableId'],
    data() {

      return {
        pageIndex: 1,
        pageSize: 10,
        total: 30,
        tableConf: {},
        showEditMessage: true
      }
    },

    methods: {
      dateTimeFormat(time) {
        return TimeFormat(time);
      },
      editMessage: function (row) {
        var params = {id: row.id};
        params.handle = 'update';
        this.$router.push({
          name: 'MessageForm',
          params: params
        })
      },
      addMessage: function () {
        this.$router.push({
          name: 'MessageForm'
        })
      },
      showMessageDetail: function (row) {
        this.$router.push({path: 'MessageDetail/' + row.id});
      },

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
      refreshTable() {
        var tableConf = {
          total: 0,
          tableData: [],
          pageSize: 10,
          pageIndex: 1,
          load: true,
          tableUrl: "/sdsec/web/secsermarket/productspecification/pageQuery",
          params: {
            "orderBy": ["create_time"],
            "orderType": "desc"
          },
          multipleSelection: [],
        }
        this.$store.commit('registerConf', [this.tableId, tableConf]);
        this.tableConf = this.$store.state.context[this.tableId];
        this.$store.dispatch('reloadTable', this.tableId);
      }
    },

    created: function () {
      var user = this.$route.params.loginUser;
      if (user == "tenant") {
        this.showEditMessage = false;
      }

      this.refreshTable();
    }
  }
</script>

<style scoped>

</style>
