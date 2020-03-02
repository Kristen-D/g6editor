<template>
  <div class="">
    <!-- {{checkList}} {{tableId}} -->
    <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="80">
      </el-table-column>
        <!--以下几行为新增-->
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
      <el-table-column prop="company" label="厂商" width="180"></el-table-column>
      <el-table-column prop="state" label="状态" width="180"></el-table-column>
      <el-table-column prop="time" label="更新时间" min-width="180"></el-table-column>

      <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :sortable="key==='assetCode'"
        align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template scope="scope">
          <div>
            <el-button type="text" @click="handleEdit(scope.$index,scope.row)" style="color:#00a0fe; margin-right:17px;">同步</el-button>
            <span style="color: #F3F3F3">|</span>
            <!--<el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>-->
          </div>
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


    <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize"
      :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    components: {},
    props: ['checkList', 'id'],
    computed: {
      columnList: function () {
        if (this.checkList.length > 0) {
          let ob = "{";
          for (let x in this.checkList) {
            ob = ob + this.checkList[x] + ",";
          }
          let nob = ob.substring(0, ob.length - 1) + "}";
          return JSON.parse(nob);
        } else {
          return {};
        }

      }
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
      filterType(value, row) {
        return row.type === value;
      },
      //默认的方法,基本无需修改
      handleEdit(i, row) {
        row.tableId = this.id;
        row.assetOrg = (row.assetOrg + '').split(',');
        row.handle = 'update';
        this.$router.push({
          // name: 'assetInfoForm',
          name: 'resourcePoolInfoForm',
          params: row
        })
        // this.$store.dispatch('handleEdit', [this.id, i, row]);
      },
      handleDelete(i, row) {
        this.$store.dispatch('handleDelete', [this, i, {
          "assetIds": [row.assetId]
        }]);
      },
      saveEdit(i, row) {
        if (this.objCheckNull(row, ["name", "mail|phone"]) && this.objCheck(row, ["mail", "phone"])) {
          this.$store.dispatch('saveEdit', [this, i, row]);
        }
      },
      cancelEdit() {
        this.$store.commit('cancelEdit', this.id);
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
    created: function () {
      // 新增

      var testdata0=[{'name':'资源池A','type':'虚拟资源池','ip':'192.168.1.2.0','company':'ZStock','state':'未同步','time':'2019-11-05 11:37'},
      {'name':'资源池B','type':'物理资源池','ip':'192.168.1.2.1','company':'盛科','state':'已同步','time':'2019-11-05 11:40'}];

      var defConf = {
        total: 0,
        loading: false,
        // tableData: [],
        tableData: testdata0,
        pageSize: 10,
        pageIndex: 1,
        editRowIndex: -1,
        editRowTemp: {},
        multipleSelection: [],
        //默认ajax属性
        // 下行注释掉，暂时不去后端取数据
        // tableUrl: "/ssa/assetMgmt/queryAssetInfo.do",
        params: {},
        saveUrl: "/ssa/assetMgmt/addOrModifyAssetInfo.do",
        delUrl: "/ssa/assetMgmt/batchDeleteAssetInfo.do",
      };
      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);
    }

  }

</script>

<style>

</style>
