<template>
  <!-- 整改通知详细信息-->
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>被检查单位:</div>
      </el-col>
      <el-col :span="12">
        <div>{{this.orgName}}</div>
      </el-col>

      <el-col :span="8">
        <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportDoc('rectificationNoticeTask')">整改通知书</a>

        <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload" :data="uploadParams" >
          <el-button  size="small" type="text">+扫描文件上传</el-button>
        </el-upload>

        <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadAttachment()" >扫描文件</a>
        <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>

      </el-col>

    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>文号:</div>
      </el-col>
      <el-col :span="16">
      <div>并公信安 限字【{{rectificationNoticeDetail.word}}】 第【{{rectificationNoticeDetail.num}}】号</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>督查时间:</div>
      </el-col>
      <el-col :span="16">
        <div>{{rectificationNoticeDetail.check_time}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>违规行为:</div>
      </el-col>
      <el-col :span="16">
    <div>
    <el-checkbox-group v-model="rectificationNoticeDetail.checkedList">
      <div v-for="item in checkList">
        <el-checkbox :label="item.value" >{{item.name}}</el-checkbox>
      </div>
    </el-checkbox-group>
    </div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>整改期限:</div>
      </el-col>
      <el-col :span="16">
        <div>{{rectificationNoticeDetail.reform_time}}</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props:["params"],
  data() {
    return {
      orgName:"",
      checkList:[],
      rectificationNoticeDetail: {},
      uploadParams:{},
      file:{}
    }
  },

  methods:{

        beforeUpload(file){
          this.uploadParams.bussiness_id = this.params.taskId;
          this.uploadParams.bussiness_type = "TASKINSPECT";

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
          param.bussiness_type = "TASKINSPECT";
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

        downloadAttachment() {
            var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.taskId + "&bussiness_type=" + "TASKINSPECT";
            window.location.href = fileUrl;
        },
        exportDoc(type){
          window.location.href = "/ssa/taskInspect/downloadWord.do?type="+type+"&taskId="+this.params.taskId+"&id="+this.params.task_inspect_id;
        }

  },
  created: async function() {
      this.orgName = this.params.orgName;
      this.rectificationNoticeDetail = await this.$store.dispatch('getRectificationNoticeDetail', [this.params]);
      this.checkList = await this.$store.dispatch('getIllegalaction');
      this.rectificationNoticeDetail.checkedList =  this.rectificationNoticeDetail.illegal_action.split(",");
        this.getAttachment();
  }
}
</script>
