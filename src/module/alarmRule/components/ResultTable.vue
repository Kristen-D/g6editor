<template>
  <div class='row'>
    <el-table :data="ruleList" :border="false" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'ruleId', order: 'ascending'}"
      @selection-change="handleSelectionChange" @cell-click="cellClick">
      <el-table-column type="selection" width="60"></el-table-column>

      <el-table-column v-for="col in showHeadCols" :prop="col.prop" :label="col.label" :formatter="formatter"
        :class-name="col.linkclass" :width="col.width" :show-overflow-tooltip="col.overflowTooltip" align="center">
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="top">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)"><i class="fa fa-edit fa-lg"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-close fa-lg"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="拷贝" placement="top">
            <el-button type="text" @click="handleCopy(scope.$index, scope.row)"><i class="fa fa-copy fa-lg"></i></el-button>
          </el-tooltip>
          <span v-if="scope.row.status!=3" class="vert-bar-color">|</span>
          <el-button v-if="scope.row.status==1" type="text" @click="handleStop(scope.$index, scope.row)">暂停</el-button>
          <el-button v-if="scope.row.status==2" type="text" @click="handleStart(scope.$index, scope.row)">启用</i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class=" float-r page-location" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :page-size="queryCondition.pageSize" :current-page="queryCondition.currentPage" layout="sizes, prev, pager, next"
      :total="ruleTotal">
    </el-pagination>
    <!-- <el-row type="flex" class="row-bg" justify="end" align="middle">
      <el-col :span="2"><span>每页显示</span></el-col>
      <el-col :span="7">
        <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryCondition.currentPage"
          :page-sizes="[10, 20, 30, 40]" :page-size="queryCondition.pageSize" layout="sizes, prev, pager, next" :total="ruleTotal">
        </el-pagination>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
  import commonAjax from 'components/js/common.js'
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tableHeadCols: state => state.context.tableHeadCols,
        checkHeadCols: state => state.context.checkHeadCols,
        ruleList: state => state.context.ruleList,
        queryCondition: state => state.context.queryCondition,
        ruleTotal: state => state.context.ruleTotal,
        subSystemList: state => state.context.subSystemList,
        formRule: state => state.context.formRule

      }),
      showHeadCols: function () {
        var result = [];
        var check = this.checkHeadCols.join(";");

        for (var item of this.tableHeadCols) {

          if (check.indexOf(item.label) >= 0) {
            result.push(item);
          }
        }
        console.log(result);
        return result;
      }
    },
    methods: {
      ...mapActions({
        setQueryCondition: 'setQueryCondition',
        getRuleList: 'getRuleList',
        setEditPanel: 'setEditPanel',
        setEditRule: 'setEditRule',
        getRuleById: 'getRuleById',
        deleteRuleById: 'deleteRuleById',
        setMultipleSelection: 'setMultipleSelection',
        getRuleConfig: 'getRuleConfig',
        getRuleOutputCondition: 'getRuleOutputCondition'
      }),

      handleSelectionChange(val) {
        this.setMultipleSelection(val);
        //console.log(val[val.length-1].ruleId);
      },
      handleSizeChange(val) {
        this.queryCondition.pageSize = val;
        this.getRuleList();
        console.log('每页 ' + val + '条');
      },
      handleCurrentChange(val) {
        this.queryCondition.currentPage = val;
        this.getRuleList();
        console.log('当前页:' + val);
      },
      handleEdit(index, row) {
        console.log(row.ruleName);
        var rule = JSON.parse(row.configJson);
        rule.ruleId = row.ruleId;
        rule.status = row.status;
        rule.addflag = 2;
        this.setEditRule(rule);
        this.formRule.title = '编辑规则';
        this.setEditPanel(1);
      },
      handleDelete(index, row) {
        console.log(index);
        this.$confirm('此操作将永久删除规则配置' + row.ruleId + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRuleById(row.ruleId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleCopy(index, row) {
        var param = {};
        param.ruleId = row.ruleId;
        commonAjax.req('/ssa/alarmRule/copyRule.do', param).then((data) => {
          this.getRuleList();
        })

      },
      handleStop(index, row) {
        var param = {};
        param.ruleId = row.ruleId;
        commonAjax.req('/ssa/alarmRule/stopRule.do', param).then((data) => {
          this.getRuleList();
        })
      },
      handleStart(index, row) {
        var param = {};
        param.ruleId = row.ruleId;
        commonAjax.req('/ssa/alarmRule/startRule.do', param).then((data) => {
          this.getRuleList();
        })
      },
      formatter(row, column) {
        var property = column.property
        var value = row[property]
        if (property == 'status') {
          switch (value) {
            case 1:
              value = '启用';
              break;
            case 2:
              value = '暂停';
              break;
            case 3:
              value = '异常';
          }
        } else if (property == 'enableAlarm') {
          switch (value) {
            case 1:
              value = '是';
              break;
            case 2:
              value = '否';
              break;
          }
        } else if (property == 'timeWindows') {
          value = value + '秒';
        }
        return value

      },
      cellClick: function (row, column, cell, event) {
        if (column.property == 'ruleName') {
          var rule = JSON.parse(row.configJson);
            rule.status = row.status;
          rule.ruleId = row.ruleId;
          this.setEditRule(rule);
          this.formRule.title = '查看规则';
          this.setEditPanel(2);
        }
      }

    },
    mounted: function () {
      this.getRuleList();
    }


  }

</script>
<style>
  .el-pagination .el-select .el-input {
    width: 60px;
  }

  .link {
    color: #1D9ED7;
    cursor: pointer;
  }

</style>
