<template>
<div style="background-color: #fff; padding-bottom: 120px;">
  <div class="top-title">管理</div>
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
    <el-form :model="params" ref="params" label-width="100px">

      <div v-if="!advancedFlag" style="display:inline-block;">
        <div style="display:inline-block;">
          <el-input v-model="params.nameMachine" placeholder="名称" clearable></el-input>
        </div>
        <el-button type="primary" class="button-p-2" @click="search" style="margin-left: 5px;">搜索</el-button>
      </div>

      <div class="" v-if="advancedFlag" style="margin-top: 20px;">
        <div style="display:inline-block;">
          <el-form-item label="名称" style="display:inline-block;" class="input-width">
            <el-input placeholder="名称" clearable v-model="params.nameMachine"> </el-input>
          </el-form-item>

          <el-form-item label="平台" style="display:inline-block;" class="input-width">
            <el-input placeholder="平台" clearable v-model="params.platform"> </el-input>
          </el-form-item>

          <el-form-item label="状态" style="display:inline-block;" class="input-width">
            <el-input placeholder="状态" clearable v-model="params.status"> </el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:5px;">
        <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
        <el-button type="gray" class="button-p-2 m-l-30" @click="resetForm('params')">清空</el-button>
      </el-form-item>

      <div class="float-r">
        <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
          <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
        </p>
        <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
          <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
        </p>
      </div>
    </el-form>
  </div>

  <span class="top-title" style="border-bottom: none;">列表</span>

  <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <div  style="display:inline-block;">
      <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>新增</el-button>
      <el-button type="primary" size="small" @click="importEvent"><i class="icon-import m-r-8"></i>导入</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
      <!-- <el-button type="graypink" size="small" @click="customCol"><i class="icon-set icon-size"></i></el-button> -->
    </div>

    <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>
  </div>
  <editTable :id="tableId" ></editTable>

  <!-- 导入弹框 -->
  <el-dialog title="导入" :visible.sync="exportDialogShow" width="30%" class="dialog-panel">
    <div class="dialog-import-content">
      <span>请先下载Excel模版，填写完整后，再选择上传。</span>
      <a href="/static/template/Computers.xlsx" class="dialog-downloadtext font-color">模版下载</a>

      <el-upload ref="upload" action="/ssa/pocTestExport/batchImportPocTest.do" :auto-upload="false" :multiple="false" :on-success="handleSuccess">
        <el-button type="primary" class="button-p-3" slot="trigger">选取文件</el-button>
        <el-button type="gray" class="button-p-3" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
  </el-dialog>


</div>
</template>

<script>
import { mapState } from 'vuex'
import editTable from './PocTestEditTable.vue'

export default {
  components: {
    editTable,

  },
  data() {
    return {
      //自定义属性
      tableId: "pocTestEditTable",

      params: {
        nameMachine: '',
        platform: '',
        status: '',


      },
      advancedFlag: false,
      exportDialogShow: false,

    }
  },
  computed: {
    ...mapState({
      // operateFlag: state => state.context.operateFlag,
    })
  },
  methods: {

    resetForm(formName) {
      this.params = {
        nameMachine: '',
        platform: '',
        status: '',

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
    // 搜索
    search() {
      this.$store.commit('setParams', [this.tableId, this.params]);
      this.$store.dispatch('reloadTable', this.tableId);
    },

    // 导入
    importEvent() {
      this.exportDialogShow = true;
    },
    //刷新
    reload() {
      this.resetForm('params');
      this.search();
    },
    addRow() {
      this.$router.push({
        name: 'pocTestInfoForm',
        params: {
          "tableId": this.tableId
        }
      });
    },
    async initDataList() {

    },
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
        var result = await this.common.reqBackState("/ssa/pocTestExport/batchDeletePocInfo.do", {
          "ids": ids
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


  },
  mounted: function() {

    }

  }
</script>
