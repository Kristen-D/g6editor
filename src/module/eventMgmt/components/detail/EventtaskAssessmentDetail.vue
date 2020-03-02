<template>
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称：</div>
      </el-col>
      <el-col :span="12">
        <div>{{eventtaskAssessmentDetail.event_handling_header}}</div>
      </el-col>

      <el-col :span="8">
      <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;"  @click="exportDoc('eventtaskAssessment',eventtaskAssessmentDetail.event_handling_id)" >处置情况记录单</a>

      <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload" :data="uploadParams" >
        <el-button  size="small" type="text">+扫描文件上传</el-button>
      </el-upload>

      <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadFile()" >扫描文件</a>
      <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>

      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否案件：</div>
      </el-col>
      <el-col :span="16">
        <div v-if="eventtaskAssessmentDetail.is_alarm === true">是</div>
        <div v-if="eventtaskAssessmentDetail.is_alarm === false">否</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否立案：</div>
      </el-col>
      <el-col :span="16">
        <div v-if="eventtaskAssessmentDetail.is_registration === true">是</div>
        <div v-if="eventtaskAssessmentDetail.is_registration === false">否</div>
      </el-col>
    </el-row>



    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>处置评价：</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventtaskAssessmentDetail.assessment}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {

  props:["params"],
  data() {
    return {
      eventtaskAssessmentDetail: {},
      uploadParams:{},
      file:{}
    }
  },
  methods:{
    beforeUpload(file){
      this.uploadParams.bussiness_id = this.params.taskId;
      this.uploadParams.bussiness_type = "EVENTMGMT";

    },
    async deleteFile(){
      var param ={};
      param.id = this.file.id;
      var msg =   await this.utils.req("/ssa/processMgmt/deleteAttachment.do",param,this);
      this.$message({
        message: msg,
        type: 'success'
      });
       this.file.attachment_filepath ="";

    },
    getAttachment(){
      var param = {};
      param.bussiness_id = this.params.taskId;
      param.bussiness_type = "EVENTMGMT";

      this.utils.req("/ssa/processMgmt/getAttachment.do",param,this).then(result =>{
        if(result != null){
          this.file = result;
        }

      });
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.getAttachment();

      //  this.goBack();
      }
    },

  downloadFile() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.taskId + "&bussiness_type=" + "EVENTMGMT";
      window.location.href = fileUrl;
    },


    exportDoc(type,id){
      window.location.href = "/ssa/eventMgmt/downloadWord.do?type="+type+"&id="+id;
    }
  },
  created: async function() {
    this.eventtaskAssessmentDetail = await this.$store.dispatch('getEventtaskAssessmentDetail', [this.params,this.params.tkey]);
  }
}
</script>
