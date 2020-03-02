<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>被检查单位：</div>
    </el-col>
    <el-col :span="12">
      <div>{{taskInspectDetail.orgName}}</div>
    </el-col>

    <el-col :span="8">
      <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportDoc('taskInspectTask',taskInspectDetail.task_inspect_id)">信息安全等级保护监督检查通知书</a>

      <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload" :data="uploadParams" >
        <el-button  size="small" type="text">+扫描文件上传</el-button>
      </el-upload>

      <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadAttachment()" >扫描文件</a>
      <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>

    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查时间：</div>
    </el-col>
    <el-col :span="16">
      <div>{{taskInspectDetail.inspection_time_start}} {{taskInspectDetail.inspection_time_end}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查地点：</div>
    </el-col>
    <el-col :span="16">
      <div>{{taskInspectDetail.inspection_address}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查事项：</div>
    </el-col>
    <el-col :span="16">
    <el-checkbox-group v-model="taskInspectDetail.inspection_items">
      <div v-for="(item,index) in inspectionItems">
        <el-checkbox :label="item.value">{{index+1}}、{{item.name}}</el-checkbox>
      </div>
    </el-checkbox-group>
    <!--
      <div v-for="item in inspection_items">{{inspectionMap[item].name}}</div>
      -->
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>附件：</div>
    </el-col>
    <el-col :span="16" v-show="taskInspectDetail.attachment_filepath != null ">
      <a class="file m-r-18" v-show="taskInspectDetail.attachment_filepath != null " >{{taskInspectDetail.attachment_filename}}</a>
      <a v-show="taskInspectDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
    </el-col>
  </el-row>
  <br/>
  <el-row>
    <h4 class="sub-title">基本信息</h4>
  </el-row>
  <br/>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>文号：</div>
    </el-col>
    <el-col :span="16">
      <div>公安信 检字【{{taskInspectDetail.word}}】 第{{taskInspectDetail.num}}号</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查单位：</div>
    </el-col>
    <el-col :span="16">
      <div>太原市公安局</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>填发日期：</div>
    </el-col>
    <el-col :span="16">
      <div>{{taskInspectDetail.send_time}}</div>
    </el-col>
  </el-row>

  <br/>
  <el-row>
    <h4 class="sub-title">人员安排</h4>
  </el-row>
  <br/>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>承办人：</div>
    </el-col>
    <el-col :span="16">
     <div>{{superviseMap[taskInspectDetail.undertaker].username}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>批准人：</div>
    </el-col>
    <el-col :span="16">
    <div>{{leaderMap[taskInspectDetail.approver].username}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查人员：</div>
    </el-col>
    <el-col :span="16">

     <div>{{handleMap[taskInspectDetail.inspectors].username}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>联系人：</div>
    </el-col>
    <el-col :span="16">
      <div v-if="taskInspectDetail.linkman ==1">{{superviseMap[taskInspectDetail.undertaker].username}}</div>
      <div v-else-if="taskInspectDetail.linkman ==2">{{leaderMap[taskInspectDetail.approver].username}}</div>
      <div v-else-if="taskInspectDetail.linkman ==3">{{handleMap[taskInspectDetail.inspectors].username}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>联系电话：</div>
    </el-col>
    <el-col :span="16">
      <div>{{taskInspectDetail.phone}}</div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props: ["params"],
  computed: {
    ...mapState({
      inspectionMap: state => state.process.inspectionMap,
      superviseMap: state => state.process.superviseMap,
      leaderMap: state => state.process.leaderMap,
      handleMap: state => state.process.handleMap,
      inspectionItems: state => state.process.inspectionItems
    })
  },
  data() {
    return {
      taskInspectDetail: {},
      inspection_items: [],
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




    downloadFile(){
      this.$store.dispatch('downloadFile', [this.params]);
    },
    exportDoc(type,id){
      window.location.href = "/ssa/taskInspect/downloadWord.do?type="+type+"&id="+id;
    }
  },
  created: async function() {

    this.taskInspectDetail = await this.$store.dispatch('getTaskInspectById', [this.params, this.params.tkey]);
    this.taskInspectDetail.inspection_items = this.taskInspectDetail.inspection_item.split(",");
    this.getAttachment();
  }
}
</script>
