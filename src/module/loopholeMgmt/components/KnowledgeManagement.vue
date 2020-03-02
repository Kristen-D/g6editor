<template>
<div class="whitebackground Whitespace"  style="background-color: #fff; padding-bottom: 120px;">
  <div class="top-title">漏洞管理</div>
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
      <el-form :model="params" ref="params" label-width="100px">

          <el-form-item label="漏洞名称" style="display:inline-block;">
            <el-input v-model="params.vulName"  placeholder="漏洞名称"></el-input>
          </el-form-item>
          <el-form-item style="display:inline-block;" v-if="!advancedFlag">
            <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
          </el-form-item>

        <!-- <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in"> -->
          <div class="" v-if="advancedFlag"  style="display:inline;">
            <el-form-item label="漏洞类型" style="display:inline-block;">
                <el-input v-model="params.vulType"  placeholder="漏洞类型"></el-input>
            </el-form-item>

            <el-form-item label="威胁类型" style="display:inline-block; ">
              <el-select v-model="params.threadType" clearable placeholder="所有类型">
                <el-option  v-for="item in allThreatType" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="等级" style="display:inline-block;">
              <el-select v-model="params.riskLevel" clearable placeholder="所有等级">
                <el-option  v-for="item in allRiskLevel" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="CNNVD编号" style="display:inline-block;">
              <el-input v-model="params.cnnvd"  placeholder="所有编号" ></el-input>
            </el-form-item>

            <el-form-item label="CVE编号" style="display:inline-block;">
              <el-input v-model="params.cve"  placeholder="所有编号"></el-input>
            </el-form-item>

            <!-- <el-form-item label="发布时间" style="display:inline-block;">
              <el-date-picker v-model="params.publishDate" type="datetime" placeholder="发布时间"></el-date-picker>
            </el-form-item> -->


            <el-form-item label="发布时间" style="display:inline-block;">
              <el-date-picker v-model="params.beginPublishDate" type="datetime" placeholder="开始时间"></el-date-picker>
              <span>~</span>
              <el-date-picker v-model="params.endPublishDate" type="datetime" placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间" style="display:inline-block;">
              <el-date-picker v-model="params.beginUpdateDate" type="datetime" placeholder="开始时间"></el-date-picker>
              <span>~</span>
              <el-date-picker v-model="params.endUpdateDate" type="datetime" placeholder="结束时间"></el-date-picker>
            </el-form-item>

  <!--
            <el-form-item label="更新时间" style="display:inline-block;">
              <el-date-picker v-model="params.updateDate" type="datetime" placeholder="更新时间"></el-date-picker>
            </el-form-item> -->

          </div>
        <!-- </transition> -->
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

  <!-- <p class="tabeltitle">漏洞列表</p> -->
  <!-- <span class="top-title" style="border-bottom: none;">漏洞列表</span> -->
 <div class="operate float-r" >

   <el-button type="primary" size="small" @click="addMethod">新增</el-button>
   <el-button type="primary" size="small" @click="importMethod">导入</el-button>
   <el-button type="primary" size="small" @click="deleteMethod">删除</el-button>

 </div>

 <el-table :data="data" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
   <el-table-column type="selection" disabled>
   </el-table-column>
   <el-table-column prop="vulName"  align="center" label="漏洞名称" width="250" show-overflow-tooltip="true"></el-table-column>
   <el-table-column prop="vulType"  align="center" label="漏洞类型" show-overflow-tooltip="true"> </el-table-column>
   <el-table-column prop="threadLevelName"  align="center" label="威胁类型" width="150" show-overflow-tooltip="true" ></el-table-column>
   <el-table-column prop="riskLevelName"  align="center" label="等级" width="100"> </el-table-column>
   <el-table-column prop="cnnvd"  align="center" label="CNNVD编号"  show-overflow-tooltip="true"> </el-table-column>
   <el-table-column prop="cve"  align="center" label="CVE编号" show-overflow-tooltip="true"> </el-table-column>
   <!-- <el-table-column prop="publishDate" sortable align="center" label="发布时间" show-overflow-tooltip="true"></el-table-column>
   <el-table-column prop="updateDate" sortable align="center" label="更新时间" show-overflow-tooltip="true"></el-table-column> -->
   <el-table-column label="操作" align="center" width="250">
     <template scope="scope">
       <el-button type="text"  style=" margin-right:17px;"  :disabled="!scope.row.enableUpdate"  @click="editRowMethod(scope.row)">编辑
       </el-button>
       <span style="color: #F3F3F3">|</span>
       <el-button type="text" style="margin-left:17px; margin-right:17px;" @click="deleteRowMethod(scope.row)" :disabled="!scope.row.enableUpdate">删除</el-button>
       <span style="color: #F3F3F3">|</span>
       <el-button type="text" style="margin-left:17px;" @click="lookRowMethod(scope.row)" >查看</el-button>
     </template>
   </el-table-column>
         <div slot="empty" >
           <div class="" v-if="(!data || data.length === 0)">
             <i class="el-icon-document"></i> 没有相关数据！
           </div>
        <!--
           <div class="" v-if="'wrong' === defConf.loading">
             <i class="el-icon-warning"></i> 数据加载错误！ 点击
             <el-button type="text" @click="refresh">刷新</el-button>
           </div>

           <div class="" v-if="'load' === defConf.loading">
             <i class="el-icon-loading"></i> 正在读取数据，请稍后...
           </div> -->
         </div>
 </el-table>
 <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" layout="total, prev, pager, next, jumper" :total="total">
 </el-pagination>



 <el-dialog title="删除" :visible.sync="deleteShow" width="30%" class="dialog-panel">
   <span >
     是否删除漏洞“{{rowDetails.vulName}}”吗？
   </span>
   <div class="" style="margin-top:20px;">
     <el-button type="primary" @click="confirmDelete" class="button-p-3">确认</el-button>
     <el-button type="gray" @click="cancelDelete" class="button-p-3">返回</el-button>
   </div>
 </el-dialog>

 <el-dialog title="批量删除" :visible.sync="deleteAllShow" width="30%" class="dialog-panel">
   <span >
     是否删除所选的{{this.multipleTableNumber}}条数据？
   </span>
   <div class="" style="margin-top:20px;">
     <el-button type="primary" @click="confirmAllDelete" class="button-p-3">确认</el-button>
     <el-button type="gray" @click="cancelAllDelete" class="button-p-3">返回</el-button>
   </div>
 </el-dialog>

 <el-dialog title="导入" :visible.sync="importShow" width="30%" class="dialog-panel">
   <div class="dialog-import-content">
     <span>请先下载Excel模版，填写完整后，再选择上传。</span>
     <a href="/static/template/Loophole.xlsx" class="dialog-downloadtext font-color">模板下载</a>

     <el-upload ref="upload" action="/ssa/loopholeMgmtManager/importLoophole.do" :auto-upload="false" :multiple="false" :on-success="handleSuccess">
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
  data(){
    return {
      advancedFlag:false,
      params:{
        vulName:'',
        vulType:'',
        vulTypeTwo:[],
        threadType:'',
        riskLevel:'',
        cnnvd:'',
        cve:'',
        publishDate:'',
        updateDate:'',
        beginPublishDate:'',
        endPublishDate:'',
        beginUpdateDate:'',
        endUpdateDate:''
      },
      deleteShow:false,
      deleteAllShow:false,
      importShow:false,
      data:[],
      allVulType:[],
      allVulTypeHandle:[],
      importShow:false,
      allThreatType:[],
      allRiskLevel:[],
      selectVulType:'',
      allSelectRow:[],
      rowDetails:[],

      multipleTableNumber:0,
      pageSize: 10,
      pageIndex: 1,
      total:0,
      deleteState:false,
      queryKnowledgeInfoByConditionsUrl:"/ssa/loopholeMgmtManager/queryKnowledgeInfoByConditions.do",

      getAllThreatTypeUrl:"/ssa/loopholeMgmtManager/getAllThreatType.do",
      getAllRiskLevelUrl:"/ssa/loopholeMgmtManager/getAllRiskLevel.do",
      deleteKnowledgeByIdUrl:"/ssa/loopholeMgmtManager/deleteKnowledgeById.do"
    }
  },
  methods:{
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
        this.importShow = false;
      //  this.$store.dispatch('reloadTable', this.tableId);
      this.getData();
        this.$message({
          type: 'success',
          message: '导入成功！'
        })
      } else {
        this.importShow = false;
        this.$message({
          type: 'error',
          message: response.message
        })
      }
    },
    editRowMethod(row){
      this.$router.push({name:'knowledgemanagementedit' , params:row});
    },
    addMethod(){
      this.$router.push({name:'knowledgemanagementadd'});
    },
    confirmAllDelete(){
      var count = 0;

      for(var j =0;j<this.allSelectRow.length;j++){
        if(this.allSelectRow[j].enableUpdate===0){

          count++;
        }
      }
      if(count === 0){
        for(var i = 0; i < this.allSelectRow.length; i++){
          var params = {vulId:this.allSelectRow[i].id};
            this.common.reqDef(this.deleteKnowledgeByIdUrl, params).then(data => {
              this.deleteState = data.state;
              this.dialogSelect();
            });
        }
        this.getData();
          this.deleteAllShow = false;
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
      }else {
        this.$message({
          showClose: true,
          message: '存在不可删除的数据',
          type: 'error'
        });
          this.deleteAllShow = false;
      }

    },
    confirmDelete(){
      var params = {vulId:this.rowDetails.id};
        this.common.reqDef(this.deleteKnowledgeByIdUrl, params).then(data => {
          this.deleteState = data.state;
          this.dialogSelect();
          this.getData();
            this.deleteShow = false;
        });
    },
    cancelAllDelete(){

          this.deleteAllShow = false;


    },
    cancelDelete(){

      this.deleteShow = false;
    },
    lookRowMethod(row){
      this.$router.push({name:'knowledgemanagementdetails', params:row });
    },
    handleSelectionChange(val){
      this.allSelectRow = val;
      this.multipleTableNumber = this.allSelectRow.length;
    },
    deleteMethod(){
      if(this.multipleTableNumber === 0){
        this.$message({
          type: 'error',
          message: '请选择删除对象'
        })
      }else {
      this.deleteAllShow = true;}

    },
    deleteRowMethod(row){
      this.rowDetails = row;
      this.deleteShow = true;
    },
    dialogSelect(){
      if(this.deleteState===true){
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      }
    },
    selectType(val){

      this.selectVulType = val[1];
    //  console.log(this.selectVulType);
    },
    reload(){
      this.params.vulName = '';
      this.params.vulType = '';
      this.params.threadType = '';
      this.params.riskLevel = '';
      this.params.cnnvd = '';
      this.params.cve = '';
      this.params.beginPublishDate = '';
      this.params.beginUpdateDate = '';
      this.params.endPublishDate = '';
      this.params.endUpdateDate = '';
      this.params.vulTypeTwo = [];
      this.getData();
    },
    judgeTimeType(){
      if(typeof(this.params.beginPublishDate) === 'object'){
        this.params.beginPublishDate = this.common.formatDate(this.params.beginPublishDate);
      }
      if(typeof(this.params.beginUpdateDate) === 'object'){
        this.params.beginUpdateDate = this.common.formatDate(this.params.beginUpdateDate);
      }
      if(typeof(this.params.endPublishDate) === 'object'){
        this.params.endPublishDate = this.common.formatDate(this.params.endPublishDate);
      }
      if(typeof(this.params.endUpdateDate) === 'object'){
        this.params.endUpdateDate = this.common.formatDate(this.params.endUpdateDate);
      }
    },
    search(){
      this.judgeTimeType();
      // this.params.vulType = this.selectVulType;
      // console.log(typeof(this.params.threadType));
      // console.log(this.params.threadType);
      // console.log(this.params.riskLevel);
      this.getData();

    },
    showAdvanced(){
      this.advancedFlag = true;
    },
    hideAdvanced(){
      this.advancedFlag = false;
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },
    getData(){

      var params = {...this.params,pageSize:this.pageSize, pageIndex:this.pageIndex};
       this.common.req(this.queryKnowledgeInfoByConditionsUrl, params).then(data => {
       // console.log(1);
       this.data =data.rowData;
       this.total = data.total;
     })
   },
   getAllRiskLevel(){
     var params = {};
     // console.log(this.getAllRiskLevelUrl);
    this.common.req(this.getAllRiskLevelUrl, params).then(data => {
      // console.log(1);
      this.allRiskLevel =data;

    });
   },
   getAllThreatType(){
     var params = {};
    this.common.req(this.getAllThreatTypeUrl, params).then(data => {
      this.allThreatType =data;
    });
   },

   handleAllVulType(){
     for(var i=0; i<this.allVulType.length; i++){
       if(this.allVulType[i].pid.toString() === '-1'){
         var temp = {
           value:'',
           label:'',
           children:[]
         };
         temp.value = this.allVulType[i].id.toString();
         temp.label = this.allVulType[i].name.toString();
         this.allVulTypeHandle.push(temp);
       }else{
        for(var j=i; j<this.allVulType.length;j++){
          if(this.allVulType[i-1].id === this.allVulType[j].pid){
            var childData = {
              value:'',
              label:''
            };
             childData.value = this.allVulType[j].id.toString();
             childData.label = this.allVulType[j].name.toString();
             temp.children.push(childData);
          }
        }
      }
     }
   },
   scopeBack(){
       window.scrollTo(0,0);
   }
},
  created: async function() {
    this.scopeBack();
    this.getData();

    this.getAllThreatType();

    this.getAllRiskLevel();

}
}
</script>

<style >

  .el-form-item__content{margin-left: 100px;}
</style>
