<template>
<div class="whitebackground Whitespace">

  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
      <el-form :model="params" ref="params" label-width="80px">
        <div class="" style="display:inline-block;">

          <el-form-item label="操作类型" style="display:inline-block; margin-left:20px;">
            <el-select v-model="params.operateType" clearable placeholder="所有类型">
              <el-option v-for="item in allOperateType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日志类型" style="display:inline-block; margin-left:20px;">
            <el-select v-model="params.logType" clearable placeholder="所有类型">
              <el-option v-for="item in allLogType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="display:inline-block;" v-if="!advancedFlag">
            <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
          </el-form-item>

        </div>
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
          <div class="" v-if="advancedFlag">

            <el-form-item label="消耗时长" style="display:inline-block; margin-left:20px;">
              <el-input v-model="params.spendTime" placeholder="所有时长"></el-input>
            </el-form-item>

            <el-form-item label="操作用户" style="display:inline-block;  margin-left:20px;">
              <el-input v-model="params.userName" placeholder="所有用户"></el-input>
            </el-form-item>

            <el-form-item label="操作描述" style="display:inline-block;  margin-left:20px;">
              <el-input v-model="params.description" placeholder="所有描述"></el-input>
            </el-form-item>

            <el-form-item label="操作时间"  style="display:inline-block; margin-left:20px;">
              <el-date-picker v-model="params.startTime" type="datetime" placeholder="创建时间"></el-date-picker>
            </el-form-item>


          </div>
        </transition>
        <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:0px;">
          <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
        </el-form-item>

        <div class="float-r">
          <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
            <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
          </p>
          <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
            <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
          </p>
          <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>

        </div>
      </el-form>
  </div>
  <div class="float-r">
    <!-- <span style="position:fixed; left:440px;">日志列表</span>
    <el-button type="primary" size="small" @click="exportMethod">导出</el-button>
    <el-button type="primary" size="small" @click="importMethod">导入</el-button> -->
    <!-- <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button> -->
  </div>

  <el-table border :data="data" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="operateType"  align="center" label="操作类型" width="100"></el-table-column>
    <el-table-column prop="logType"  align="center" label="日志类型" width="100"> </el-table-column>
    <el-table-column prop="spendTime"  align="center" label="消耗时长" width="100"></el-table-column>
    <el-table-column prop="userName"  align="center" label="操作用户" width="100"> </el-table-column>
    <el-table-column prop="description"  align="center" label="操作描述" width="300"> </el-table-column>
    <el-table-column prop="startTime" sortable align="center" label="操作时间" width="200"> </el-table-column>
    <el-table-column label="操作" align="center" width="100">
      <template scope="scope">
           <el-button type="text" @click="lookDetails(scope.row)" style="color:#00a0fe; margin-left:10px;">查看</el-button>
           <!-- <span style="color: #F3F3F3">|</span>
           <el-button type="text" @click="lookDetails(scope.row)" style="color:#00a0fe; margin-left:17px;">导入</el-button>

          <span style="color: #F3F3F3">|</span>
          <el-button type="text" @click="lookDetails(scope.row)" style="color:#00a0fe; margin-left:17px;">导出</el-button> -->
      </template>
    </el-table-column>
  </el-table>



  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" layout="total, prev, pager, next, jumper" :total="total">
  </el-pagination>

  <el-dialog title="导出" :visible.sync="exportShow" width="30%" class="dialog-panel">
      <el-form :label-position="labelPosition" label-width="100px" :model="exportParams">
    <el-form-item label="日志类型" required>
      <el-select v-model="exportParams.logType" clearable >
        <el-option v-for="item in allLogType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="起止时间" required>
      <el-date-picker v-model="exportParams.time" type="daterange" placeholder="选择起止时间"></el-date-picker>
    </el-form-item>

    <el-form-item>
       <el-button type="primary" @click="saveExport">保存</el-button>
       <el-button @click="exportCancel">取消</el-button>
     </el-form-item>
         </el-form>
  </el-dialog>

  <el-dialog title="导入" :visible.sync="importShow" width="30%" class="dialog-panel">
    <div class="dialog-import-content">
      <el-upload ref="upload" action="/ssa/loggerManagement/importLog.do" :auto-upload="false" :multiple="false" :on-success="handleSuccess">
        <el-button type="primary" class="button-p-3" slot="trigger">选取文件</el-button>
        <el-button type="gray" class="button-p-3" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
      </el-upload>
    </div>
  </el-dialog>






</div>
</template>

<script>

export default {
  components: {

  },
  computed: {
  },
  data() {
    return {
      operateType:'',
      logType:'',
      spendTime:'',
      userName:'',
      description:'',
      startTime:'',
      params:{
        operateType:'',
        logType:'',
        spendTime:'',
        userName:'',
        description:'',
        startTime:''
      },
      exportParams:{
        logType:'',
        time:''

      },
      advancedFlag: false,
      pageSize: 10,
      pageIndex: 1,
      total:0,
      data:[],
      allOperateType:[],
      allLogType:[],
      exportShow:false,
      importShow:false,
      queryLogInfoByConditionsUrl:"/ssa/loggerManagement/queryLogInfoByConditions.do",
      getOperateTypeUrl:"/ssa/loggerManagement/getOperateType.do",
      getLogTypeUrl:"/ssa/loggerManagement/getLogType.do"



  }
},
  methods: {
    // 导入
    submitUpload() {
      this.$refs.upload.submit();
    },
    importMethod(){
      this.importShow = true;
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.state) {
        this.exportDialogShow = false;
      //  this.$store.dispatch('reloadTable', this.tableId);
      this.getData();
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
    exportCancel(){
      this.exportShow = false;
    },
    exportMethod(){
      this.exportShow = true;
    },
    lookDetails(row){
        this.$router.push({name:'LogDetails', params:row });
    },
    reload(){
      this.params.operateType = '';
      this.params.logType = '';
      this.params.pendTime = '';
      this.params.userName = '';
      this.params.description = '';
      this.params.tartTime = '';
      this.getData();
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },
    judgeTimeType(){
      if(typeof(this.params.startTime) === 'object'){
        this.params.startTime = this.common.formatDate(this.params.startTime);
      }
    },
    getData(){
      var params = {...this.params,pageSize:this.pageSize, pageIndex:this.pageIndex};
       this.common.req(this.queryLogInfoByConditionsUrl, params).then(data => {
       this.data =data.rowData;
       this.total = data.total;
     });
    },

    getOperateType(){
      var params = {};
     this.common.req(this.getOperateTypeUrl, params).then(data => {
       this.allOperateType =data;
     });
    },

    getLogType(){
      var params = {};
     this.common.req(this.getLogTypeUrl, params).then(data => {
       this.allLogType =data;

     });
    },
    search(){
      this.judgeTimeType();
      this.getData();
      console.log(this.params.operateType);
    },
    hideAdvanced(){
        this.advancedFlag = false;
    },
    showAdvanced(){
        this.advancedFlag = true;
    }

},
  created: async function() {
    this.getData();
    this.getOperateType();
    this.getLogType();

}
}
</script>

<style>
  .input-mw{ max-width: 10%;}
  .m-l-10{ margin-left: 10px; }

  .dialog-panel .el-dialog {min-width: 575px;}
  .dialog-panel .el-dialog__header{padding:20px 20px 0; padding-bottom:14px; padding-top:14px; border:1px solid #E1E3E4; }
  .dialog-panel .el-dialog__header .el-dialog__close {cursor: pointer; color: #505354 !important;}
  .dialog-panel .el-dialog__body{padding:30px 20px; padding:20px; color:#3E4956; font-size:14px;}

</style>
