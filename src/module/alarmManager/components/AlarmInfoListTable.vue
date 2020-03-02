<template>

  <div>
    <div>
      <el-table v-loading="defConf.loading" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"
        @selection-change="handleSelectionChange">


        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="alarm_id" label="告警id" min-width="80" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="alarm_desc" label="告警内容" min-width="80" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column sortable="'custom'" label="风险级别" min-width="80" align="center">
          <template scope="scope">
            <div>
              <el-tag style="color:#fff;" :color="alarmGradeMap[scope.row.alarm_grade]">{{
                fmtalarmGradeList(scope.row.alarm_grade) }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable="'custom'" label="告警类型" align="center">
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

        <el-table-column sortable="'custom'" prop="alarm_time" label="告警时间" min-width="80" show-overflow-tooltip align="center">
        </el-table-column>

        <el-table-column sortable="'custom'" prop="status" label="状态" min-width="80" align="center">
          <template scope="scope">
            <div>
              <span style="margin-left: 10px">{{ fmtStatus(scope.row.status) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button v-if="scope.row.status!='4' " type="text" class="operate-left" @click="clClick(scope.row)">处置</el-button>
            <span class="vert-bar-color">|</span>
            <el-button v-if="scope.row.status=='4'" @click="clClick(scope.row)" type="text" class="operate-right">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize"
      :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
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
    props: ['id'],
    computed: {
      ...mapState({
        alarmTypeList: state => state.context.alarmTypeList,
        alarmGradeList: state => state.context.alarmGradeList,
      })
    },
    methods: {
      //默认的方法,基本无需修改

      clClick(row) {
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
          if (val == this.alarmTypeList[item].id) {
            return this.alarmTypeList[item].text;
          }
        }
      },
      fmtalarmGradeList(val) {
        for (var item in this.alarmGradeList) {
          if (val == this.alarmGradeList[item].id) {
            return this.alarmGradeList[item].text;
          }
        }
      },
      fmtStatus(val) {


        let s = '';
        val = parseInt(val);
        switch (val) {
          case 0:
            s = '待确认';
            break;
          case 1:
            s = '未审批';
            break;
          case 2:
            s = '未派发';
            break;
          case 3:
            s = '已派发';
            break;
          case 4:
            s = '已归档';
            break;
          default:
            s = '--';
        }
        console.log(s);
        return s;
      },
      //methods end
    },
    created: function () {
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
        tableUrl: "/ssa/alarmManager/getDataList.do",
        params: {
          task_status: "0"
        }, //初始化设置黑白名单类型,黑名单为0，白名单为1
      };

      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);

    }
  }

</script>
