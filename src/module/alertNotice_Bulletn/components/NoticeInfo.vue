<template >
<div>

  <el-row>
    <div class="el-sub-panel-heading">
       <h4 class="sub-title">查看流程状态</h4>

       <div class="float-r prostate">
     					  当前状态：<span>{{this.$route.params.state}}</span>   <i v-show="this.$route.params.status != 0 "  class="el-icon-view" style="color:#20a0ff" @click="ViewPic"></i>
     	 </div>
       <div class="float-r prostate" style="margin-top:-15px;">
         <el-button type="text" @click="showAlldetail" class="float-l">{{handleTxt}}</el-button>
       </div>
    </div>

    <el-col :span="24">
      <el-collapse v-model="activeNames" @change="showTaskDeTail($event)" class="Check-the-process-state-collapse">
        <!-- 唯一标识 流程实例id,任务标识,任务id-->
        <el-collapse-item  class="processcollapse-item" v-for="(item, index) in hiTasks" v-show="item.taskDefinitionKey != 'bulletinTjTask'"  :name="item.processInstanceId+','+item.taskDefinitionKey+','+item.id">
          <template slot="title">
              <span class="processcollapse-itemnane" > {{item.name}}</span>
              &nbsp;&nbsp;<label>{{formatDate(item.endTime)}}</label>
               <span class="processcollapse-itemperson" >{{item.assignee}}</span>
        </template>
          <noticeDetail :tkey="item.taskDefinitionKey" :eventFkDetail="eventFkDetail" :eventTzDetailparams="eventTzDetailparams"  :eventTzDetail="eventTzDetail" :noticeHandleInfoDetail="noticeHandleInfoDetail" :eventFbDetail="eventFbDetail"
          :eventReportDetail="eventReportDetail" :ref="item.id" :params="param">
          </noticeDetail>
        </el-collapse-item>



      </el-collapse>

    </el-col>
  </el-row>
  <el-row>
      <el-col :span="28" :offset="1">
        <el-button type="gray" @click="back">返回</el-button>
       <!-- <el-button  @click="exportView" type="primary">导出表单</el-button> -->
      </el-col>
  </el-row>

  <el-dialog title="流程轨迹" :visible.sync="dialogVisible" width="85%">
    <img width="100%" :src="processTrace" alt="流程轨迹图">
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</div>

</template>
<script>
import noticeDetail from './NoticeDetail.vue'
export default {

  components: {
    noticeDetail
  },
  watch: {
   activeNames: function (newArr) {
      this.showTaskDeTail(newArr);
      if(newArr.length == 0){
          this.handleTxt ="全部展开";
      }else {
        this.handleTxt ="全部关闭";
      }

   }
 },
  data() {
    return {
      handleTxt:"全部展开",
      arr:[],
      param:{},
      processTrace: "",
      dialogVisible: false,
      notice_code: "",
      notice_name: "",
      executionId: "",
      notice_time: null,
      creator: "",
      activeName: '1',
      activeNames: [],
      hiTasks: [],
      store: [],
      noticeHandleInfoDetail: {},
      eventReportDetail: {},
      eventTzDetail: {},
      eventTzDetailparams:{
        isPass:1
      },
      eventAduitDetail: {},
      eventFbDetail: {},
      eventQsDetail: {},
      eventFkDetail: {},
      processInstanceId:null
    };
  },
  mounted: function() {
    this.param =  this.$route.params;
    var params = this.$route.params;
    this.notice_code = params.notice_code;
    this.notice_name = params.notice_name;
    this.executionId = params.executionId;
    this.notice_time = params.notice_time;
    this.creator = params.creator;
    var processInstanceId = params.processInstanceId;
    var i=0;
    this.processInstanceId=processInstanceId;
    this.common.req("/ssa/alertNoticeBulletn/listHiTask.do", {
      processInstanceId: processInstanceId
    }, this).then(result => {
      var vm  = this;
      var flag =0;
      var flag1 =0;
      for (var i=0;i<result.length;i++){
         if (result[i].taskDefinitionKey=='bulletinQsTask'){
           if (flag==0){
             flag =1;
             vm.hiTasks.push(result[i]);
           }
         }else if (result[i].taskDefinitionKey=='bulletinFkTask'){
           if (flag1==0){
             flag1 =1;
             vm.hiTasks.push(result[i]);
           }
         }else{
           vm.hiTasks.push(result[i]);
         }
      }
      //alert(flag);
      //this.hiTasks = result;
      //alert((this.hiTasks))  ;
      //加入空数组用于显示原始表单数据
      this.hiTasks.push({
        name: "提交通报表单",
        taskDefinitionKey: "noticeHandleInfoTask",
        id: this.notice_code,
        endTime: this.notice_time,
        assignee: this.creator
      });
      Vue.nextTick(function () {
        var items = $(".Check-the-process-state-collapse > .processcollapse-item");

          items.each(function(i, e) {
            if(i < items.length - 1) {
              $(e).append("<div class='collapse-steps'><div class='collapse-steps-item'></div></div>");
            }
          });

          $(".Check-the-process-state-collapse > .processcollapse-item >.el-collapse-item__header").prepend("<i class='el-icon-circle-check c-green m-r-18' style='line-height:30px;'></i>");

          $(".el-collapse.Check-the-process-state-collapse >.processcollapse-item  .el-collapse-item__content ").wrapInner("<div class='collapse-steps-item-content'></div>");

          $(".current-item > .el-collapse-item__header  > .el-icon-arrow-right").remove();
      })
      for(var i=0;i<this.hiTasks.length;i++){
        var item = this.hiTasks[i];
        var id = item.processInstanceId+','+item.taskDefinitionKey+','+item.id;
        this.arr.push(id);
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    exportView() {
      var notice_code = this.notice_code;
      var param = "reportType=pdfForm&exportFileName=预警信息表单&notice_code="+notice_code+"&type=bulletn.ftl";
    //  window.location.href = "/ssa/warnMgmt/exportReport.do?" + params;
      window.location.href = "/ssa/alertNotice/downloadWord.do?" + param;
    },
    showAlldetail(){
      if(this.handleTxt == "全部展开"){
        this.activeNames = this.arr;
      }else{
        this.activeNames = [];
      }
    },
    formatDate(date) {
      return this.common.formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss");
    },
    //下载流程图
    ViewPic() {
      this.processTrace ="/ssa/processMgmt/processTrace.do?processId=" + this.processInstanceId +"&r="+Math.random();
      //alert(this.processTrace );
      this.dialogVisible = true;
    },
    async showTaskDeTail(activeNames) {
      var id;
      for (id in activeNames) {
        var task = activeNames[id];
        if (this.store[task] == undefined) {
          var taskAttr = task.split(",");
          var processId = taskAttr[0];
          var tkey = taskAttr[1];
          var taskId = taskAttr[2];
          var params = {};
          params.taskId = taskId;
          params.processInstanceId = processId;
          params.notice_code = this.notice_code;
          await this.$store.dispatch('loadRecvOrgList', [params]);
          if (tkey == "noticeHandleInfoTask") {
            var param = {};
            param.notice_code = this.notice_code;
            this.noticeHandleInfoDetail = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
          } else if (tkey == 'bulletinTjTask') {
            this.eventReportDetail = await this.$store.dispatch('getEventReportDetail', [params]);
          } else if (tkey == 'bulletinSpTask') {
            console.log(this.$refs[taskId][0]);
            this.$refs[taskId][0].eventAduitDetail = await this.$store.dispatch('getEventAduitDetail', [params]);
            //alert(eventAduitDetail.isPass);
          } else if (tkey == 'bulletinTzTask') {
            var param = {};
            param.notice_code = this.notice_code;
            this.eventTzDetail = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
            this.eventTzDetailparams = await this.$store.dispatch('geteventTzDetail', [params]);
          } else if (tkey == 'bulletinFbTask') {
            var param = {};
            param.notice_code = this.notice_code;
            this.eventFbDetail = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
          }else if (tkey == 'bulletinFkTask') {
            this.eventFkDetail = await this.$store.dispatch('getFeedbackDetail', [params]);
          }
            this.store[task] = "in";
        }
      }
    }
  }
}
</script>
