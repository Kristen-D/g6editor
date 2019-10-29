<template>
<div class="whitebackground Whitespace">
  <div class="top-title">白名单管理</div>
      <div class="ordinary-search clearfloat" style="margin-top: 0px;">
        <el-form :inline="true" :model="queryForm" ref="queryForm" style="display: inline-block;">
          <el-form-item>
          <el-select v-model="nparams.list_type_id" clearable placeholder="名单类型">
            <el-option v-for="item in listTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="内容" v-model="nparams.list_value"> </el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button @click="qryData(1)" type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="float-r button-toolbar">
          <el-button type="primary" size="small" @click="addRow(1)"><i class="icon-add m-r-8"></i>添加</el-button>
          <el-button type="primary" size="small" @click="delCheckedRows(1)"><i class="icon-delet m-r-8"></i>删除</el-button>
          <el-button type="primary" size="small" @click="downloadTemplate()" style="margin-left:10px;"> 模板下载</el-button>
          <el-upload style="display:inline-block;margin-left:10px;" action="/ssa/infoCenter_blackWhiteList/emBatchHandle.do?bw_type=1" :file-list="fileList" :before-upload="handleBeforeUpload" :accept="accept_type" :show-upload-list="false" :on-success="handleSuccessOnWhite">
            <el-button size="small" type="primary">批量导入</el-button>
          </el-upload>

        </div>
      </div>


      <!-- <div class="float-r button-toolbar">
        <el-button type="primary" size="small" @click="addRow(1)"><i class="icon-add m-r-8"></i>添加</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows(1)"><i class="icon-delet m-r-8"></i>删除</el-button>
        <el-button type="primary" size="small" @click="downloadTemplate()" style="margin-left:10px;"> 模板下载</el-button>
        <el-upload style="display:inline-block;margin-left:10px;" action="/infoCenter_blackWhiteList/empBatchHandle.do?bw_type=1" :file-list="fileList" :before-upload="handleBeforeUpload" :accept="accept_type" :show-upload-list="false" :on-success="handleSuccessOnBlack">
          <el-button size="small" type="primary">批量导入</el-button>
        </el-upload>

      </div> -->
      <div>
        <whiteEditTable :id="whiteId"></whiteEditTable>
      </div>


</div>









<!-- <div class="wraper container-fluid">

    <div class="row">
      <div class="row m-t-30">
        <div class="col-sm-12">
          <div class="tab-content bg-panel">
            <div class="panel-body p-0">
              <ul class="nav nav-tabs tab-list">
                <li class="active"><a data-toggle="tab" href="#black">黑名单</a></li>
                <li class=""><a data-toggle="tab" href="#white">白名单</a></li>
              </ul>

<div class="tab-content bg-panel">



<div id="black" class="tab-pane active">

    <div class="row">
      <div class="col-lg-12">
          <div class="panel" style="height:700px">
            <div class="panel-body">

         </div>
      </div>
    </div>
    </div>
</div>

<div id="white" class="tab-pane">

    <div class="row">
      <div class="col-lg-12">
          <div class="panel" style="height:700px">
            <div class="panel-body">


         </div>
      </div>
    </div>
    </div>
</div>

</div>
</div>

</div>
</div>
</div>
</div>
</div> -->
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import blackEditTable from './BlackEditTable.vue'
import whiteEditTable from './WhiteEditTable.vue'
export default {
  components: {
    blackEditTable,
    whiteEditTable
  },
  data() {
    return {
      //自定义属性
      activeName: "black",
      blackId: "blackId",
      whiteId: "whiteId",
      mparams: {
        list_type_id: "",
        list_value: ""
      },
      nparams: {
        list_type_id: "",
        list_value: ""
      },
      delSelected: "/ssa/infoCenter_blackWhiteList/deleteCheckedRows.do",
      accept_type: "xlsx/xls",
      fileList: [],
      formatError: false,
      errorList: []
    }
  },
  computed: {
    ...mapState({
      listTypeList: state => state.context.listTypeList,
      menuName: state => state.context.menuName,
    })
  },
  methods: {
    downloadTemplate() {
      var fileUrl = "/static/template/BlackWhiteListBatchImport.xlsx";
      window.location.href = fileUrl;
    },
    handleBeforeUpload(file) {
      // alert(file.name);
      var filename = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
      //  alert(nameExt);
      if (filename != ".xlsx") {
        this.$message({
          type: 'error',
          message: "只允许上传与模版相同的xlsx格式的表格文件！"
        });
        this.fileList = [];
        return false;
      } else {
        return true;
      }

    },
    handleSuccessOnBlack(response, file, fileList) {
      let rs = response.data;
      if (response.state) {

          this.$message({
            type: 'success',
            message: rs
          });
          this.$store.dispatch('reloadTable', this.blackId);


      } else {
        this.$message({
          type: 'error',
          message: rs
        });
      }

      this.fileList = [];
    },
    handleSuccessOnWhite(response, file, fileList) {
      if (response.state) {
        this.$message({
          type: 'success',
          message: response.data
        });
        this.$store.dispatch('reloadTable', this.whiteId);
      } else {
        this.$message({
          type: 'error',
          message: response.data
        });
      }
      this.fileList = [];
    },
    qryData(val) {
      if (val == "0") {
        var tableId = this.blackId;
        var params = this.mparams;
      } else {
        var tableId = this.whiteId;
        var params = this.nparams;
      }

      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow(val) {
      var params = {};
      params.handle = "add";
      if (val == "0") {
        params.bw_type = "0";
      } else {
        params.bw_type = "1";
      }
      this.$router.push({
        path: "/blackWhiteForm",
        query: params
      })
    },
    delCheckedRows(val) {
      if (val == "0") {
        var tableId = this.blackId;
      } else {
        var tableId = this.whiteId;
      }
      var rows = this.$store.state.editTable[tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中数据");
        return;
      }

      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var data_ids = [];
        rows.forEach(row => {
          data_ids.push(row.list_id);
        })
        var ids = data_ids.join(",");
        var msg = await commonAjax.req(this.delSelected, {
          ids: ids
        });
        await this.$store.dispatch('reloadTable', tableId);
        this.$message({
          type: 'success',
          message: msg
        });
      })
    }
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
  }
}
</script>
