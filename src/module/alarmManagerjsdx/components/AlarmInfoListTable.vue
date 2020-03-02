<template>
<div>
  <div>
    <el-table v-loading="defConf.loading" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="alarm_id" label="告警id" min-width="80" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="alarm_desc" label="告警内容" min-width="80" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="风险级别" min-width="80" align="center">
        <template scope="scope">
            <div>
              <el-tag style="color:#fff;" :color="alarmGradeMap[scope.row.alarm_grade]">{{fmtalarmGradeList(scope.row.alarm_grade) }}</el-tag>
            </div>
          </template>
      </el-table-column>

      <el-table-column label="告警类型" align="center">
        <template scope="scope">
            <div>
              <span style="margin-left: 10px">{{ fmtalarmTypeList(scope.row.alarm_type) }}</span>
            </div>
          </template>
      </el-table-column>

      <el-table-column prop="src_ip" label="源IP" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="dst_ip" label="目标IP" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>

      <el-table-column prop="main_account" label="主账号" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="sub_account" label="从账号" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="user" label="用户" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>

      <el-table-column prop="alarm_time" label="告警时间" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>

      <el-table-column prop="state" label="状态" min-width="80" show-overflow-tooltip align="center">
      </el-table-column>

      <el-table-column v-if="type == 'hilist'" prop="taskName" label="任务名称" align="center">
      </el-table-column>
      <el-table-column v-if="type == 'hilist'" prop="endTime" label="任务完成时间" align="center">
      </el-table-column>

      <!-- <el-table-column sortable="'custom'" prop="status" label="状态" min-width="80" align="center">
        <template scope="scope">
            <div>
              <span style="margin-left: 10px">{{ fmtStatus(scope.row.state) }}</span>
            </div>
          </template>
      </el-table-column> -->
      <!-- -->
      <el-table-column label="操作" align="center">
        <template scope="scope">

            <el-button v-if="scope.row.status == 0 && scope.row.flag =='permit'" type="text"  @click="clClick(scope.row)">下发部门</el-button>
            <el-button v-else-if="scope.row.status == 1  && scope.row.tKey =='pNotifyTask' && type=='todolist' "  type="text"  @click="clClick(scope.row)">下发地市</el-button>
            <el-button v-else-if="scope.row.status == 1 &&  scope.row.tKey =='pAudit1Task' && type=='todolist'" type="text"  @click="clClick(scope.row)">下发审核</el-button>
            <el-button v-else-if="scope.row.status == 1 &&  scope.row.tKey =='mNotifyTask' && type=='todolist'" type="text"  @click="clClick(scope.row)">下发部门</el-button>
            <el-button v-else-if="scope.row.status == 1  && scope.row.tKey =='mHandleTask' && type=='todolist'"   @click="clClick(scope.row)" type="text" >市部门处置</el-button>
            <el-button v-else-if="scope.row.status == 1  && scope.row.tKey =='mAuditTask' && type=='todolist'"   @click="clClick(scope.row)" type="text" >市审计审核</el-button>
            <el-button v-else-if="scope.row.status == 1  &&  scope.row.tKey =='pAudit2Task' && type=='todolist'" type="text"  @click="clClick(scope.row)">省审计审核</el-button>
            <el-button v-else  @click="clClick(scope.row)" type="text" >查看</el-button>

          </template>
      </el-table-column>

    </el-table>
  </div>

  <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>

</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      defConf: {},
      alarmGradeMap: {
        "3": "#ff4949",
        "2": "#ff9900",
        "1": "#f7ba2a"
      },
    }
  },
  props: ['id', 'url', 'type'],
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList,
    })
  },
  watch: {
    url() {

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
        tableUrl: this.url,
        params: {}
      };

      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);
    }
  },
  methods: {
    //默认的方法,基本无需修改


    clClick(row) {
      if (row.status == 0 && row.flag == 'permit') {
        //创建告警提交审批
        row.handle = "create";
        row.formTitle = "下发告警";
      } else if (row.tKey == 'mNotifyTask' && row.status == 1 && this.type == 'todolist') {
        //修改告警
        row.handle = "mNotifyTask";
        row.fromTitle = "下发部门";
      } else if (row.tKey == 'pNotifyTask' && row.status == 1 && this.type == "todolist") {
        //是否下发地市
        row.fromTitle = "下发地市";
        row.handle = "pNotifyTask";
      } else if (row.tKey == 'pAudit1Task' && row.status == 1 && this.type == "todolist") {
        //下发地市审核
        row.fromTitle = "下发审核";
        row.handle = "pAudit1Task";
      } else if (row.tKey == 'mHandleTask' && row.status == 1 && this.type == "todolist") {
        //下发地市审核
        row.fromTitle = "部门处置";
        row.handle = "mHandleTask";
      } else if (row.tKey == 'pAudit2Task' && row.status == 1 && this.type == "todolist") {

        row.fromTitle = "省审计审核";
        row.handle = "pAudit2Task";
      } else if (row.tKey == 'mAuditTask' && row.status == 1 && this.type == "todolist") {

        row.fromTitle = "市审计审核";
        row.handle = "mAuditTask";
      } else {
        //查看告警

        row.handle = "look"
        row.fromTitle = "告警信息";

      }
      row.tkey = "clInfoForm";
      this.$router.push({
        name: "alarmHandle",
        params: row
      });
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
    },
    //默认方法结束

    //自定义方法
    fmtorgList(val) {
      for (var item in this.orgList) {
        if (val == this.orgList[item].id) {
          return this.orgList[item].text;
        }
      }
    },
    fmtuserList(val) {
      for (var item in this.userList) {
        if (val == this.userList[item].id) {
          return this.userList[item].text;
        }
      }
    },
    fmtalarmTypeList(val) {
      for (var item in this.alarmTypeList) {
        if (val == this.alarmTypeList[item].value) {
          return this.alarmTypeList[item].label;
        }
      }
    },
    fmtalarmGradeList(val) {
      for (var item in this.alarmGradeList) {
        if (val == this.alarmGradeList[item].value) {
          return this.alarmGradeList[item].label;
        }
      }
    }
    //methods end
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
      tableUrl: this.url,
      params: {}
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
