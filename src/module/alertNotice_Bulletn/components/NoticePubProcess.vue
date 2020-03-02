<template>
<!-- 我发布的流程-->
<div>
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="params" ref="params">
      <el-form-item label="">
        <el-input v-model="params.notice_name" placeholder="通报标题"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-input v-model="params.notice_desc" placeholder="通报内容"></el-input>
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
  </div>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button size="small" @click="eventClick" type="primary"><i class="icon-add m-r-8"></i>新建</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>

    <el-tab-pane :label="'进行中（共'+tableTotal1+'条）' " name="myTaskTable">
      <noticeMyTask :checkList="columnList" :id="myTaskTable"></noticeMyTask>
    </el-tab-pane>
    <el-tab-pane :label="'已完成（共'+tableTotal2+'条）'" name="myTaskHiTable">
      <noticeMyTask :checkList="columnList" :id="myTaskHiTable"></noticeMyTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import noticeMyTask from './NoticeMyTask'
import {mapState}from 'vuex'
export default {
  components: {
    noticeMyTask
  },
  computed: {
    columnList: function() {
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

    },
    ...mapState({

      tableTotal1:state => state.table["myTaskTable"].total,
      tableTotal2:state => state.table["myTaskHiTable"].total,
    })
  },
  data() {
    return {
      activeTable: 'myTaskTable',
      myTaskHiTable: "myTaskHiTable",
      myTaskTable: "myTaskTable",
      //toolBarId:"myTaskTable",
      tableId: 'bulletnTable',
      params: {
        startTime: '',
        endTime: '',
        notice_desc: '',
        notice_name: ''
      },
      advancedFlag: false,
      roles:{},
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
    };
  },
  methods: {
    HandleImport() {
      this.importDialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 刷新列表
    reload() {
      //this.queryData();
     this.$store.dispatch('reloadTable', this.activeTable);
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
    eventClick() {
      this.$router.push({
        name: 'noticeInfoForm',
        params: {
          handle: "add",
          "tableId": this.activeTable,
          "tkey":"addInfoForm"

        }
      });
    },
    handleClick(tab){
      this.activeTable = tab.name;
      this.queryData();
    },
    // 删除
    async delCheckedRows() {

      var rows = this.$store.state.table[this.activeTable].multipleSelection;
      var i;
      for (i in rows) {
        if (rows[i].status !=2 && rows[i].status !=0) {
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
        var noticeIds = [];
        rows.forEach(row => {
          noticeIds.push(row.notice_code);
        })
        var msg = await this.common.req("/ssa/alertNotice/delNoticeInfo.do", {
          "noticeIds": noticeIds
        }, this);
          this.$message({
            type: 'success',
            message: msg
          });
          await this.$store.dispatch('reloadTable', this.activeTable);
      })
    },
    // 搜索
    queryData() {
      //alert(this.queryForm.startTime);
      if (this.params.startTime != null && this.params.startTime  != "") {
        //  alert("--------");
        this.params.startTime = this.common.formatDate(new Date(this.params.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.params.endTime != null && this.params.endTime != "") {
        this.params.endTime = this.common.formatDate(new Date(this.params.endTime), "yyyy-MM-dd hh:mm:ss");
      }

      this.$store.commit('setParams', [this.activeTable, this.params]);
      this.$store.dispatch('reloadTable', this.activeTable);
    }
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
  }
}
</script>
