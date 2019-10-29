<template>
  <div>


<el-row>
  <el-col :span="18" :offset="1">
    <el-row>
    <noticeDetail style="margin-bottom:20px;" :tkey="tkey" ref="hisAduitDetail" :eventFkDetail="eventFkDetail" :eventTzDetailparams="eventTzDetailparams" :eventFbDetail="eventFbDetail" :eventTzDetail="eventTzDetail" :eventReportDetail="eventReportDetail">
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
import {mapState}from 'vuex'
import noticeInfo from './NoticeInfo.vue'
import noticeDetail from './NoticeDetail.vue'
export default {
  components: {
    noticeInfo,
    noticeDetail
  },
  // computed: {
  //   ...mapState({
  //     recvOrgList: state => state.context.recvOrgList
  //   })
  // },
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
      //alert(this.tkey);
      params.notice_code = this.$route.params.notice_code;
      if (this.tkey == 'bulletinTjTask') {
       this.eventReportDetail = await this.$store.dispatch('getEventReportDetail', [params]);
      } else if (this.tkey == 'bulletinSpTask') {
        this.$refs['hisAduitDetail'].eventAduitDetail = await this.$store.dispatch('getEventAduitDetail', [params]);
        //alert(eventAduitDetail.isPass);
      } else if (this.tkey == 'bulletinTzTask') {
        var param = {};
        param.notice_code = this.$route.params.notice_code;
        this.eventTzDetail = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
        this.eventTzDetailparams = await this.$store.dispatch('geteventTzDetail', [params]);
      } else if (this.tkey == 'bulletinFbTask') {
        this.eventFbDetail.notice_code = this.$route.params.notice_code;
        this.eventFbDetail.notice_name = this.$route.params.notice_name;
        //this.eventFbDetail.result ="通报发布成功";
        //alert(this.eventFbDetail.result);
      }else if (this.tkey == 'bulletinFkTask') {
        this.eventFkDetail = await this.$store.dispatch('getFeedbackDetail', [params]);
      }
    }
  }
}
</script>

<style>

</style>
