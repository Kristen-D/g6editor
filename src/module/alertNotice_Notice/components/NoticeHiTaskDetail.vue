<template>
  <div>


<el-row>
  <el-col :span="18" :offset="1">
    <el-row>
    <noticeDetail style="margin-bottom:20px;" :tkey="tkey" ref="hiseventAduitDetail" :eventFbDetail="eventFbDetail" :eventTzDetailparams="eventTzDetailparams" :eventTzDetail="eventTzDetail"  :eventReportDetail="eventReportDetail" :eventFkDetail="eventFkDetail" >
    </noticeDetail>
    </el-row>
      <el-row>
     <noticeInfo></noticeInfo>
     </el-row>
  </el-col>
</el-row>


  </div>
</template>

<script>
import noticeInfo from './NoticeInfo.vue'
import noticeDetail from './NoticeDetail.vue'
export default {
  components: {
    noticeInfo,
    noticeDetail
  },
  data(){
    return {
      tkey:"",
      eventReportDetail: {},
      eventAduitDetail: {},
      eventTzDetail:{},
      eventTzDetailparams:{
        isPass:1
      },
      eventFbDetail:{},
      eventFkDetail:{}
    }
  },
  created: async function(){
    if(this.$route.params.tkey != null){
      var params = {};
      this.tkey = this.$route.params.tkey;
      params.taskId = this.$route.params.taskId;
      params.processInstanceId = this.$route.params.processInstanceId;
      params.notice_code = this.$route.params.notice_code;
      if (this.tkey == 'noticeFbTask') {
       this.eventReportDetail = await this.$store.dispatch('getEventReportDetail', [params]);
     } else if (this.tkey == 'noticeSpTask') {
        this.$refs['hiseventAduitDetail'].eventAduitDetail = await this.$store.dispatch('getEventAduitDetail', [params]);
      } else if (this.tkey == 'noticeTzTask') {
        var param = {};
        param.notice_code = this.$route.params.notice_code;
         this.eventTzDetail = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
          this.eventTzDetailparams = await this.$store.dispatch('geteventTzDetail', [params]);
       } else if (this.tkey == 'noticeJsTask') {
         //this.eventFbDetail.notice_code = this.notice_code;
         //this.eventFbDetail.result ="通知发布成功";
         this.eventFbDetail.notice_name = this.$route.params.notice_name;
       } else if (this.tkey == 'noticeFkTask') {
         this.eventFkDetail = await this.$store.dispatch('getFeedbackDetail', [params]);
       }
    }
  }
}
</script>

<style>

</style>
