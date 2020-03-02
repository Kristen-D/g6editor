<template>
<div class="whitebackground Whitespace">
    <div class="top-title">邮件模版管理</div>

    <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
        <el-form :model="params" ref="params" label-width="90px">
          <div class="" style="display:inline-block;">
            <el-form-item label="邮件主题" style="display:inline-block;">
              <el-input v-model="params.title" placeholder="邮件主题"></el-input>
            </el-form-item>
            <el-form-item label="邮件内容" style="display:inline-block;margin-left:20px;">
              <el-input v-model="params.content" placeholder="邮件内容"></el-input>
            </el-form-item>
            <el-form-item style="display:inline-block;" v-if="!advancedFlag">
              <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
            </el-form-item>
          </div>

          <div class="float-r">
            <el-button type="graypink" size="small" @click="customCol" disabled><i class="icon-set icon-size"></i></el-button>
            <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>
          </div>
        </el-form>
    </div>

    <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
      <el-button type="primary" size="small" @click="addRow"><i class="icon-add m-r-8"></i>新增</el-button>
      <!-- <el-button type="primary" size="small" @click="importEvent"><i class="icon-import m-r-8"></i>导入</el-button> -->
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>
    <editTable :checkList="columnList" :id="tableId"></editTable>


  <!-- </div> -->
  <!-- 导入弹框 -->
  <el-dialog title="导入" :visible.sync="exportDialogShow" width="30%">
    <div class="dialog-content">
      <span>请先下载Excel模版，填写完整后，再选择上传。</span>
      <a href="/static/template/VendorInfo.xlsx" class="dialog-importEvent-label">供应商信息模版下载</a>

      <el-upload ref="upload" action="/ssa/email/batchImportVendorInfo.do"
        :auto-upload="false" :multiple="false" :on-success="handleSuccess">
        <el-button type="primary" class="button-p-3" slot="trigger">选取文件</el-button>
        <el-button type="gray" class="button-p-3" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
      </el-upload>
    </div>

  </el-dialog>

  <!-- 自定义列 -->
  <el-dialog title="自定义列" :visible.sync="customColShow" width="30%">
    <div class="dialog-content">
      <p>
        页面上最多可以选择3个字段，已选{{customColumnList.length}}个
        <span @click="recoverColumns" class="dialog-reset">恢复默认设置</span>
      </p>
      <el-checkbox-group v-model="customColumnList" :min="3" :max="3" style="padding-top:10px; font-size:14px;">
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
</template>

<script>
import editTable from './MailTemplateEditTable.vue'
export default {
  components: {
    editTable,
  },
  computed: {

  },
  data() {
    return {
      tableId: 'mailTemplateTable',
      params: {
        title: '',
        content: ''
      },
      exportDialogShow: false,
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
    // 刷新列表
    reload() {
      this.$store.dispatch('reloadTable', this.tableId);
    },
    // 恢复默认列
    recoverColumns() {
      this.customColumnList = this.defaultColumns;
      this.common.req("/ssa/customColumn/recoverDefalutColumns.do", {
        "tableName": this.tableId
      }, this);
      this.columnList = this.defaultColumns;
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
    search() {
      this.$store.commit('setParams', [this.tableId, this.params]);
      this.$store.dispatch('reloadTable', this.tableId);
    },
    // 导入
    importEvent() {
      this.exportDialogShow = true;
    },
    // 新增
    addRow() {
      this.$router.push({
        name: 'mailTemplateForm',
        params: {
          "tableId": this.tableId
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
      if (rows.length <= 0) {
        this.$alert("请先选中!");
        return;
      }

      this.$confirm('此操作将删除选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        rows.forEach(row => {
          ids.push(row.id);
        })
        var result = await this.common.reqBackState("/ssa/email/batchedDetleMailTemplate.do", {
          "ids": ids
        }, this);
        if(result.state) {
          this.$store.dispatch('reloadTable', this.tableId);
          this.$message({ type: 'success', message: result.message});
        }else {
          this.$message({ type: 'error', message: result.message});
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
  }
}
</script>
