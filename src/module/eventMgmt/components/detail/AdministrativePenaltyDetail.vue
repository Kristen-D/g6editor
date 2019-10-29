<!--行政处罚 -->
<template>
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称：</div>
      </el-col>
      <el-col :span="12">
        <div>{{this.params.event_handling_header}}</div>
      </el-col>

      <el-col :span="8">
        <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportDoc('administrativePenalty',administrativePenaltyDetail.event_handling_id)" >行政处罚决定书</a>

        <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload" :data="uploadParams" >
          <el-button  size="small" type="text">+扫描文件上传</el-button>
        </el-upload>

        <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadFile()" >扫描文件</a>
        <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>


      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事发单位：</div>
      </el-col>
      <el-col :span="16">
        <div>{{this.params.orgName}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>文号：</div>
      </el-col>
      <el-col :span="16">
        <div>并公行罚决字 字【{{administrativePenaltyDetail.word}}】 第{{administrativePenaltyDetail.num}} 号</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>处罚文书：</div>
      </el-col>
      <el-col :span="16">
        <a class="file m-r-18"   v-show="administrativePenaltyDetail.attachment_filepath != null " >{{administrativePenaltyDetail.attachment_filename}}</a>
        <a   @click="downloadFile(administrativePenaltyDetail.event_handling_id)" v-show="administrativePenaltyDetail.attachment_filepath != null " class="download m-r-18">下载</a>
        <div>{{administrativePenaltyDetail.attachment_desc}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>依照条例：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.penalized_reason}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>处罚类型：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.penalized_type}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>执行方式：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.execution}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>执行期限：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.penalized_time}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>复议单位：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.reconsider}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>诉讼法院：</div>
      </el-col>
      <el-col :span="16">
        <div>{{administrativePenaltyDetail.court}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      administrativePenaltyDetail: {},
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

    this.administrativePenaltyDetail = await this.$store.dispatch('getAdministrativePenaltyDetail', [this.params]);
  }
}
</script>
