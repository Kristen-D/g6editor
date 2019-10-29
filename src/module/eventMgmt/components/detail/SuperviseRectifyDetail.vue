<!--督办整改-->
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
      <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportDoc('superviseRectify',params.event_handling_id)">整改通知书</a>
      <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" ref="feedbackUpload" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload"
          :data="uploadParams">
        <el-button size="small" type="text">+扫描文件上传</el-button>
      </el-upload>

      <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadFile()">扫描文件</a>
      <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>


    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>文号：</div>
    </el-col>
    <el-col :span="16">
      <div>公信安 限字【{{superviseRectifyDetail.word}}】 第{{superviseRectifyDetail.num}} 号</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>督查时间：</div>
    </el-col>
    <el-col :span="16">
      <div>{{superviseRectifyDetail.check_time}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>违规行为：</div>
    </el-col>
    <el-col :span="16">
      <el-checkbox-group v-model="superviseRectifyDetail.checkedList">
        <div v-for="item in checkList">
          <el-checkbox :label="item.value">{{item.name}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>违规描述：</div>
    </el-col>
    <el-col :span="16">
      <div> {{superviseRectifyDetail.illegal_desc}} </div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>依照条例：</div>
    </el-col>
    <el-col :span="16">
      <div>{{superviseRectifyDetail.evidence}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>整改期限：</div>
    </el-col>
    <el-col :span="16">
      <div>{{superviseRectifyDetail.reform_time}}(前)</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>整改报告：</div>
    </el-col>
    <el-col :span="16">
      <a class="file m-r-18" v-show="superviseRectifyDetail.attachment_filepath != null ">{{superviseRectifyDetail.attachment_filename}}</a>
      <a @click="downloadFile(superviseRectifyDetail.event_handling_id)" v-show="superviseRectifyDetail.attachment_filepath != null " class="download m-r-18">下载</a>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      checkList: [],
      superviseRectifyDetail: {},
      uploadParams:{},
      file:{}
    }
  },
  methods: {
    beforeUpload(file) {
      this.uploadParams.bussiness_id = this.params.taskId;
      this.uploadParams.bussiness_type = "EVENTMGMT";

    },
    async deleteFile() {
      var param = {};
      param.id = this.file.id;
      var msg = await this.utils.req("/ssa/processMgmt/deleteAttachment.do", param, this);
      this.$message({
        message: msg,
        type: 'success'
      });
      this.file.attachment_filepath = "";

    },
    getAttachment() {
      var param = {};
      param.bussiness_id = this.params.taskId;
      param.bussiness_type = "EVENTMGMT";

      this.utils.req("/ssa/processMgmt/getAttachment.do", param, this).then(result => {
        if (result != null) {
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

    exportDoc(type, id) {
      window.location.href = "/ssa/eventMgmt/downloadWord.do?type=" + type + "&id=" + id + "&taskId=" + this.params.taskId;
    }
  },
  created: async function() {

    this.superviseRectifyDetail = await this.$store.dispatch('getSuperviseRectifyDetail', [this.params, this.params.tkey]);
    this.utils.req("/ssa/eventMgmt/getIllegalactoin.do").then(result => {
      this.checkList = result;
      this.superviseRectifyDetail.checkedList = this.superviseRectifyDetail.illegal_action.split(",");
    });

    this.getAttachment();
  }
}
</script>
