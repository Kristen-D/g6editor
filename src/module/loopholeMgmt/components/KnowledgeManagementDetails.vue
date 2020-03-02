<template>
<div>
<div class="top-title">漏洞详情</div>
  <el-form :label-position="labelPosition" label-width="150px" :model="params">
    <el-form-item label="漏洞名称：" required>
      <span>{{params.vulName}}</span>
    </el-form-item>

    <el-form-item label="发布时间：" required>
      <span>{{params.publishDate}}</span>
    </el-form-item>

    <el-form-item label="更新时间：">
      <span>{{params.updateDate}}</span>
    </el-form-item>

    <el-form-item label="CNNVD编号：" required>
      <span>{{params.cnnvd}}</span>
    </el-form-item>

    <el-form-item label="CVE编号：" required>
      <span>{{params.cve}}</span>
    </el-form-item>

    <el-form-item label="漏洞类型：" required>
      <span>{{params.vulType}}</span>
    </el-form-item>

    <el-form-item label="威胁类型：" >
      <span>{{params.threadLevelName}}</span>
    </el-form-item>

    <el-form-item label="等级：" required>
      <span>{{params.riskLevelName}}</span>
    </el-form-item>

    <el-form-item label="补丁信息：" >
      <span>{{params.patchInfo}}</span>
    </el-form-item>

    <el-form-item label="漏洞公告：" >
      <span>{{params.vulDisclosure}}</span>
    </el-form-item>

    <el-form-item label="漏洞描述：">
      <span>{{params.vulBreif}}</span>
    </el-form-item>

    <el-form-item label="厂商：" >
      <span>{{params.manufacturers}}</span>
    </el-form-item>

    <el-form-item label="漏洞来源：" >
      <span>{{params.vulSource}}</span>
    </el-form-item>

    <el-form-item label="影响范围：" >
      <span>{{params.affectScope}}</span>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="button-p-3" @click="editDetails" :disabled="!params.enableUpdate">编辑</el-button>
      <el-button type="primary" class="button-p-3" @click="deleteDetails" :disabled="!params.enableUpdate">删除</el-button>
      <el-button type="gray" class="button-p-3" @click="back">返回</el-button>
      <!-- <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button> -->
    </el-form-item>

  </el-form>

  <el-dialog title="删除" :visible.sync="deleteShow" width="30%" class="dialog-panel">
    <span >
      是否删除所选数据？
    </span>
    <div class="" style="margin-top:20px;">
      <el-button type="primary" @click="confirmDelete" class="button-p-3">确认</el-button>
      <el-button type="gray" @click="cancelDelete" class="button-p-3">返回</el-button>
    </div>
  </el-dialog>

</div>
</template>
<script>
export default {
  data(){
    return {
      params:[],
      deleteState:false,
      deleteShow:false,
      deleteKnowledgeByIdUrl:"/ssa/knowledgeManagement/deleteKnowledgeById.do"

    }
  },
  methods:{
    editDetails(){

      this.$router.push({name:'knowledgemanagementedit' , params:this.params});
    },
    confirmDelete(){
      var params = {vulId:this.params.id};
        this.common.reqDef(this.deleteKnowledgeByIdUrl, params).then(data => {
          this.deleteState = data.state;
          this.dialogSelect();
          this.deleteShow = false;
          this.$router.push({name:'knowledgemanagement'});
        });
    },
    cancelDelete(){
      this.deleteShow = false;
    },
    deleteDetails(){
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
    back(){
      this.$router.push({name:'knowledgemanagement'});
    },
    getParams(){
    //  this.params = this.$route.params;
    if (this.$route.params.id) {
      this.params = this.$route.params;
      let assetInfo = JSON.stringify(this.$route.params);
      sessionStorage.params = assetInfo;
    }else if (sessionStorage.params) {
      this.params = JSON.parse(sessionStorage.params);

    }
    }

},
  created: async function() {
    this.getParams();


},
destroyed: function() {
  sessionStorage.removeItem('params');
}
}
</script>
<style>

</style>
