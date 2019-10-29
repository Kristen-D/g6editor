<template>
<div class="whitebackground Whitespace">
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="params" ref="params">
      <el-form-item label="">
        <el-input v-model="params.notice_name" placeholder="通知标题"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-input v-model="params.notice_desc" placeholder="通知内容"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="params.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="params.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="!advancedFlag" class="button-p-2" @click="queryData">搜索</el-button>
      </el-form-item>

      <transition name="slide-fade">
        <div class="" v-if="advancedFlag">
          <el-form-item label="">
            <el-input v-model="params.recvUnitName" placeholder="收发单位"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" v-model="params.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" v-model="params.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
      </transition>

      <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:0px;">
        <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
        <el-button type="gray" class="button-p-2 m-l-30" @click="resetForm('params')">清空</el-button>
      </el-form-item>

      <div class="float-r">
      <!--  <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
          <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
        </p>
        <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
          <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
        </p>-->
        <el-button type="graypink" size="small" @click="customCol"><i class="icon-set icon-size"></i></el-button>
        <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>
      </div>

    </el-form>
  </div>
  <!-- 自定义列 -->
  <el-dialog title="自定义列" :visible.sync="customColShow" width="30%">
    <div class="dialog-content">
      <p>
        页面上最多可以选择5个字段，已选{{customColumnList.length}}个
        <span @click="recoverColumns" class="dialog-reset">恢复默认设置</span>
      </p>
      <el-checkbox-group v-model="customColumnList" :min="3" :max="5" style="padding-top:10px; font-size:14px;">
        <el-checkbox v-for="c in columns" :label="c" class="list-custom-unit">
          {{c.substring(1, c.length-1).split(":")[1].substring(1)}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer dialog-location2">
      <el-button type="primary" class="button-p-3" @click="saveColumns">保存</el-button>
      <el-button type="gray" class="button-p-3" @click="cancelColumns">取消</el-button>
    </span>
  </el-dialog>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="'仅通知（共'+tableTotal1+'条）' " name="myReceInfoTable" v-if="this.hasRole(this.roles,[1,2,6,7,12])">
      <!--<div  class="float-r button-toolbar">
        <el-button type="primary" size="small" @click="addRow"><i class="icon-add m-r-8"></i>新增</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
      </div>-->
      <editTable :checkList="columnList" :id="tableId1"></editTable>
    </el-tab-pane>
    <el-tab-pane :label="'待处理（共'+tableTotal2+'条）'" name="recvTodoTask" v-if="this.hasRole(this.roles,[1,2,3,4,5,6,7])">
       <myRecvTodoTask :checkList="columnList" :id="tableId2"></myRecvTodoTask>
    </el-tab-pane>
    <el-tab-pane :label="'已处理（共'+tableTotal3+'条）'" name="recvHisTask" v-if="this.hasRole(this.roles,[1,2,3,4,5,6,7])">
      <myRecvHisTask :checkList="columnList" :id="tableId3"></myRecvHisTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import editTable from './NoticeInfoEditTable.vue'
import myRecvTodoTask from './MyRecvTodoTask.vue'
import myRecvHisTask from './MyRecvHisTask.vue'
import {mapState}from 'vuex'
export default {
  components: {
    editTable,
    myRecvTodoTask,
    myRecvHisTask
  },
  computed: {
    ...mapState({
      roles: state => state.context.roles,
      isCompany :state => state.context.isCompany,
      tableTotal1:state => state.table['myReceInfoTable'].total,
      tableTotal2:state => state.table["recvTodoTask"].total,
      tableTotal3:state => state.table["recvHisTask"].total,
    })
  },
  data() {
    return {
      activeName: 'recvTodoTask',
      activeTab: 'recvTodoTask',
      tableId1: "myReceInfoTable",
      tableId2: "recvTodoTask",
      tableId3: "recvHisTask",
      noticeInfoForm: {
        devName: '',
        devId: '',
      },
      tableId: 'noticeInfoTable',
      params: {
        startTime: '',
        endTime: '',
        notice_desc: '',
        notice_name: ''
      },
      advancedFlag: false,
      //roles: {},
      customColShow: false,
      // 自定义列表所有列
      columns: [],
      // 自定义列
      customColumnList: [],
      // 默认列
      defaultColumns: [],
      // 向子组件传递的列
      columnList: [],
      //暂存的列，取消时用
      tempColumns: []
    }
  },
  methods: {
    // hasRole(roles) {
    //   var flag = false;
    //   var i;
    //   for (i in roles) {
    //     for (var j = 0; j < this.roles.length; j++) {
    //       if (this.roles[j].roleId == roles[i]) {
    //         if (this.roles[j].roleId =='5' || this.roles[j].roleId =='7'){
    //             this.activeName='myReceInfoTable';
    //         }
    //         if (this.roles[j].roleId =='4'){
    //             this.activeName='recvTodoTask';
    //         }
    //         flag = true;
    //         break;
    //       }
    //     }
    //     if (flag) {
    //       break;
    //     }
    //
    //   }
    //   return flag;
    // },
    hasRole(roles,array){
     var flag = false;
     var i;
     for (i in array) {
       for (var j = 0; j < roles.length; j++) {
         if (roles[j].roleId == array[i]) {
           flag = true;
           break;
         }
       }
       if (flag) {
         break;
       }
     }
     return flag;
   },
    handleClick(tab, event) {
      this.activeTab = tab.name;
      this.queryData();
      // console.log(tab, event);
    },
    resetForm(formName) {
      this.params = {
        startTime: '',
        endTime: '',
        recvStartTime: '',
        recvEndTime: '',
        recvUnitName: '',
        noticeName: ''
      };
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.state) {
        this.exportDialogShow = false;
        this.$store.dispatch('reloadTable', this.tableId);
        this.$message({
          type: 'success',
          message: '导入成功！'
        })
      } else {
        this.exportDialogShow = false;
        this.$message({
          type: 'error',
          message: '导入失败，请检查格式后重新上传！'
        })
      }
    },
    // 导入
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 高级搜索
    showAdvanced() {
      this.advancedFlag = true;
    },
    // 普通搜索
    hideAdvanced() {
      this.resetForm('params');
      this.advancedFlag = false;
    },
    // 刷新列表
    reload() {
    //  this.queryData();
      this.$store.dispatch('reloadTable', this.activeTab);
    },
    // 恢复默认列
    recoverColumns() {
      this.customColumnList = this.defaultColumns;
      this.common.req("/ssa/customColumn/recoverDefalutColumns.do", {
        "tableName": this.tableId
      }, this);
      this.columnList = this.defaultColumns;
      this.customColShow = false;
    },
    // 保存自定义列
    saveColumns() {
      this.columnList = this.customColumnList;
      this.common.req("/ssa/customColumn/saveColumns.do", {
        "customColumns": this.customColumnList,
        "tableName": this.tableId
      }, this);
      this.customColShow = false;
    },
    // 取消自定义列
    cancelColumns() {
      this.customColumnList = this.tempColumns;
      this.customColShow = false;
    },
    // 打开自定义列窗口
    customCol() {
      this.tempColumns = this.customColumnList;
      this.customColShow = true;
    },
    // 搜索
    queryData() {
      //alert(this.queryForm.startTime);
      if (this.params.startTime != null && this.params.startTime != "") {
        //  alert("--------");
        this.params.startTime = this.common.formatDate(new Date(this.params.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.params.endTime != null && this.params.endTime != "") {
        this.params.endTime = this.common.formatDate(new Date(this.params.endTime), "yyyy-MM-dd hh:mm:ss");
      }


      this.$store.commit('setParams', [this.activeTab, this.params]);
      this.$store.dispatch('reloadTable', this.activeTab);
    },
    // 导入
    importEvent() {
      this.exportDialogShow = true;
    },
    // 新增
    addRow() {
      this.$router.push({
        name: 'noticeInfoForm',
        params: {
          "tableId": this.tableId,
          "tkey":"addInfoForm"

        }
      });
      // var newRow = {
      //   user_id: -1,
      //   role_id: null
      // };
      // this.$store.dispatch('addRow', [this.tableId, newRow]);
    },
    // 删除
    async delCheckedRows() {

      var rows = this.$store.state.editTable[this.tableId].multipleSelection;
      var i;
      for (i in rows) {
        if (rows[i].status != 0 && rows[i].status != 2) {
          this.$alert('删除数据存在进行中流程', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请先选中!");
        return;
      }

      this.$confirm('此操作将删除选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var devIds = [];
        rows.forEach(row => {
          devIds.push(row.notice_code);
        })
        var result = await this.common.reqBackState("/ssa/alertNotice/delNoticeInfo.do", {
          "noticeIds": devIds
        }, this);
        if (result.state) {
          this.$store.dispatch('reloadTable', this.tableId);
          this.$message({
            type: 'success',
            message: result.message
          });
        } else {
          this.$message({
            type: 'error',
            message: result.message
          });
        }
      })
    },

  },
  created: async function() {
    let cols = await this.common.req("/ssa/customColumn/getAllColumns.do", {
      "tableName": this.tableId
    }, this);
    this.columns = cols.totalColumns;
    if (cols.customColumns) {
      this.customColumnList = cols.customColumns;
    } else {
      this.customColumnList = cols.defaultColumns;
    }
    this.columnList = this.customColumnList;
    this.defaultColumns = cols.defaultColumns;

    this.common.req("/ssa/processMgmt/getUserRole.do").then(data => {
    this.roles = data;
    });
  }
}
</script>
<style>
.slide-fade-enter-active {
  animation: bounce-in 0.2s;
}

.slide-fade-leave-active {
  animation: bounce-out 0.2s;
}

@keyframes bounce-in {
  0% {
    height: 0px;
  }
  50% {
    height: 30px;
  }
  100% {
    height: 60px;
  }
}

@keyframes bounce-out {
  0% {
    opacity: 0.2;
    height: 60px;
  }
  50% {
    opacity: 0.1;
    height: 30px;
  }
  100% {
    opacity: 0;
    height: 0px;
  }
}
</style>
