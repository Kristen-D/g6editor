<template>
<div>
  <div v-if="this.tkey == 'noticeHandleInfoTask'  ">
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>通报标题:</div>
      </el-col>
      <el-col :span="12">
        <div>{{noticeHandleInfoDetail.notice_name}}</div>
      </el-col>
      <el-col :span="8">
        <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportView(noticeHandleInfoDetail.notice_code)" >导出表单</a>


        <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" ref="feedbackUpload" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload" :data="uploadParams" >
          <el-button  size="small" type="text">+扫描文件上传</el-button>
        </el-upload>

        <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadFile1()" >扫描文件</a>
        <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>通报表头：</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.notice_header}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否反馈：</div>
      </el-col>
      <el-col :span="16">
        <div v-if="noticeHandleInfoDetail.issign ==1 ">需反馈</div>
        <div v-if="noticeHandleInfoDetail.issign ==0 ">不需反馈</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>接收单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.orgNames}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>通报内容:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.notice_desc}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-show="noticeHandleInfoDetail.attachment_filepath != null && noticeHandleInfoDetail.attachment_filepath != ''">
      <el-col :span="4">
        <div style="color:#4db3ff;cursor:pointer;">附件：</div>
      </el-col>
      <el-col :span="16">
        <a  style="color:#4db3ff;cursor:pointer;" @click="downloadFile(noticeHandleInfoDetail.notice_code)" v-show="noticeHandleInfoDetail.attachment_filepath != null ">{{noticeHandleInfoDetail.attachment_filename}}</a>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-show="noticeHandleInfoDetail.attachment_filepath == null || noticeHandleInfoDetail.attachment_filepath == ''">
      <el-col :span="4">
        <div >附件：</div>
      </el-col>
      <el-col :span="16">
        <a  @click="downloadFile(noticeHandleInfoDetail.notice_code)" v-show="noticeHandleInfoDetail.attachment_filepath != null ">{{noticeHandleInfoDetail.attachment_filename}}</a>
      </el-col>
    </el-row>
    <el-row>
      <h4 class="sub-title">页头</h4>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>通报时间:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.notice_time}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>下发单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.send_unit}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>下发人员:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.create_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>期数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.periods}}</div>
      </el-col>
    </el-row>
    <el-row>
      <h4 class="sub-title">页尾</h4>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>审签人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.signature_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>审核人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.auditor_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>编校人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.editor_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>抄报单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.copy_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>主送单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.main_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>抄送单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.carbon_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>存份数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.inventory}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>印刷数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{noticeHandleInfoDetail.printing}}</div>
      </el-col>
    </el-row>
  </div>


  <div v-if="this.tkey == 'bulletinTjTask'">
    <!--<el-row>
      <span>审核意见:</span> {{eventReportDetail.reason}}
    </el-row>

    <el-row>
      <span>是否通过:</span> <span v-if="eventReportDetail.isPass ==1 ">通过</span>
      <span v-if="eventReportDetail.isPass ==0 ">不通过</span>
    </el-row>-->
  </div>

  <div v-if="this.tkey == 'bulletinSpTask'">
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>审核意见：</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventAduitDetail.reason}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否通过:</div>
      </el-col>
      <el-col :span="16">
        <div v-if="eventAduitDetail.isPass ==1 ">通过</div>
        <div v-if="eventAduitDetail.isPass ==0 ">不通过</div>
      </el-col>
    </el-row>
  </div>
  <div v-if="this.tkey == 'bulletinTzTask'  ">
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==0">
      <el-col :span="4">
        <div>表单作废：</div>
      </el-col>
      <el-col :span="16">
        <div>作废成功</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>通报标题:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.notice_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>通报表头：</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.notice_header}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>是否反馈：</div>
      </el-col>
      <el-col :span="16">
        <div v-if="eventTzDetail.issign ==1 ">需反馈</div>
        <div v-if="eventTzDetail.issign ==0 ">不需反馈</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>接收单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.orgNames}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>通报内容:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.notice_desc}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-show=" this.eventTzDetailparams.isPass==1 && eventTzDetail.attachment_filepath != null && eventTzDetail.attachment_filepath != ''">
      <el-col :span="4">
        <div style="color:#4db3ff;cursor:pointer;">附件：</div>
      </el-col>
      <el-col :span="16">
        <a  style="color:#4db3ff;cursor:pointer;" @click="downloadFile(eventTzDetail.notice_code)" v-show=" this.eventTzDetailparams.isPass==1 && eventTzDetail.attachment_filepath != null ">{{eventTzDetail.attachment_filename}}</a>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-show="this.eventTzDetailparams.isPass==1 && (eventTzDetail.attachment_filepath == null || eventTzDetail.attachment_filepath == '')">
      <el-col :span="4">
        <div >附件：</div>
      </el-col>
      <el-col :span="16">
        <a  @click="downloadFile(eventTzDetail.notice_code)" v-show="eventTzDetail.attachment_filepath != null ">{{eventTzDetail.attachment_filename}}</a>
      </el-col>
    </el-row>
    <el-row v-if="this.eventTzDetailparams.isPass==1">
      <h4 class="sub-title">页头</h4>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>通报时间:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.notice_time}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>下发单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.send_unit}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>下发人员:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.create_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>期数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.periods}}</div>
      </el-col>
    </el-row>
    <el-row v-if="this.eventTzDetailparams.isPass==1">
      <h4 class="sub-title">页尾</h4>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>审签人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.signature_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>审核人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.auditor_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>编校人:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.editor_user_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>抄报单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.copy_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>主送单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.main_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>抄送单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.carbon_unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>存份数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.inventory}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
      <el-col :span="4">
        <div>印刷数:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventTzDetail.printing}}</div>
      </el-col>
    </el-row>
  </div>
  <div v-if="this.tkey == 'bulletinFbTask'">
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>通报标题:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventFbDetail.notice_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>发布结果:</div>
      </el-col>
      <el-col :span="16">
        <div>通报发布成功</div>
      </el-col>
    </el-row>
  </div>
 <div v-if="this.tkey == 'bulletinQsTask'" class="aa" >
   <el-row  :gutter="20">
     <el-col :span="8">
       <div>签收结果(红色未签收):</div>
     </el-col>
   </el-row>
     <el-row v-for="(item, index) in recvOrgList">
       <i class="el-icon-circle-check" style="color:#2ECC71" v-show="item.status=='1' || item.status=='2'"><a title="已签收" style= "cursor:default">{{item.orgName}}</a></i>
       <i class="el-icon-circle-cross" style="color:#FF4949" v-show="item.status=='0'"><a title="未签收" style= "cursor:default"> {{item.orgName}}</a></i>
     </el-row>
 </div>

   <div v-if="this.tkey == 'bulletinFkTask'" class="aa">
       <el-row v-for="(item, index) in recvOrgList">
         <i class="el-icon-circle-check" style="color:#2ECC71" @click="downloadFile2(item.notice_code)" v-show="item.status=='2'"><a  class="download m-r-18" v-show="item.attachment_filepath != null" title="已反馈" style= "cursor:default">反馈单位:{{item.orgName}} 反馈时间：{{item.feedback_time}} 反馈结果:{{item.check_result}} 反馈附件:{{item.attachment_filename}}</a>
           <a class="file m-r-18" v-show="item.attachment_filepath == null || item.attachment_filepath ==''" title="已反馈" style= "cursor:default">反馈单位:{{item.orgName}} 反馈时间：{{item.feedback_time}} 反馈结果:{{item.check_result}}</a>
         </i>
         <i class="el-icon-circle-cross" style="color:#FF4949" v-show="item.status=='0' || item.status=='1'"><a title="未反馈" style= "cursor:default"> {{item.orgName}}</a></i>
       </el-row>
   </div>
</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  computed: {
    ...mapState({
      recvOrgList: state => state.context.recvOrgList
    })
  },
  data() {
    return {
      illegal_actions: [],
      eventAduitDetail:[],
      uploadParams:{},
      file:{}
    }
  },
  props: ["params","tkey","eventFkDetail","noticeHandleInfoDetail","eventTzDetailparams", "eventTzDetail","eventReportDetail","eventFbDetail"],

  methods: {
    beforeUpload(file){
      //alert(this.params.taskId);
      this.uploadParams.bussiness_id = this.params.notice_code;
      this.uploadParams.bussiness_type = "BULLETION";

    },
    async deleteFile(){
      var param ={};
      param.id = this.file.id;
      var msg =   await this.common.req("/ssa/processMgmt/deleteAttachment.do",param,this);
      this.$message({
        message: msg,
        type: 'success'
      });
       this.file.attachment_filepath ="";

    },
    getAttachment(){
      var param = {};
      param.bussiness_id = this.params.notice_code;
      param.bussiness_type = "BULLETION";

      this.common.req("/ssa/processMgmt/getAttachment.do",param,this).then(result =>{
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

  downloadFile1() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.notice_code + "&bussiness_type=" + "BULLETION";
      window.location.href = fileUrl;
    },
    downloadFile2(notice_code) {
      var fileUrl = "/ssa/alertNoticeBulletn/downloadFile2.do?notice_code=" + notice_code+"&taskId="+this.eventFkDetail.taskId;
      window.location.href = fileUrl;
      },
    exportView(notice_code) {
      var param = "reportType=pdfForm&exportFileName=预警信息表单&notice_code="+notice_code+"&type=bulletn.ftl";
    //  window.location.href = "/ssa/warnMgmt/exportReport.do?" + params;
      window.location.href = "/ssa/alertNotice/downloadWord.do?" + param;
    },
    downloadFile(id) {
      var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
      window.location.href = fileUrl;
    }
  },
  watch: {
    superviseRectifyDetail: function() {
      this.illegal_actions = this.superviseRectifyDetail.illegal_action.split("|");
    }
  },
  created: function() {
    this.getAttachment();
 //alert(eventFbDetail.result);
  }
}
</script>

<style>

.aa{
  height: 120px !important;
  overflow-y:auto !important;
}

</style>
