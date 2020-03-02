<template >
<div>
  <el-row v-show="this.$route.params.status != 0 ">
    <div class="el-sub-panel-heading">
       <h4 class="sub-title">查看流程状态</h4>
       <div class="float-r prostate">
                当前状态：<span>{{this.$route.params.state}}</span>   <i class="el-icon-view" style="color:#20a0ff" @click="showProcessTrace"></i>
       </div>
       <div class="float-r prostate" style="margin-top:-15px;">
         <el-button type="text" @click="showAlldetail" class="float-l">{{handleTxt}}</el-button>
       </div>
    </div>

    <el-col :span="24">
      <el-collapse v-model="activeNames" @change="showTaskDeTail($event)" class="Check-the-process-state-collapse">
        <!-- 唯一标识 流程实例id,任务标识,任务id-->
        <el-collapse-item class="processcollapse-item" v-for="(item, index) in hiTasks" :name="item.processInstanceId+','+item.taskDefinitionKey+','+item.id">
          <template slot="title">
              <span class="processcollapse-itemnane" > {{item.name}}</span>
              &nbsp;&nbsp;<label>{{formatDate(item.endTime)}}</label>
               <span class="processcollapse-itemperson" >{{item.assignee}}</span>
          </template>

          <mainDetail :ref="item.id" ></mainDetail>
          <!-- <template slot="title">
              <span> {{item.name}}</span>&nbsp;&nbsp;<span>{{formatDate(item.endTime)}}</span>  <span class="pull-right" style="margin-right:10px;">{{item.assignee}}</span>
           </template>
           <div v-if="item.taskDefinitionKey == 'System_Sign'">
             <el-row>
               <el-col :span="16">
                 <span>接收材料回执:</span>
                 <a class="file m-r-18" v-show="getCheckOpinion.attachment_filepath != null " >{{getCheckOpinion.attachment_filename}}</a>
                 <a v-show="getCheckOpinion.attachment_filepath != null " @click="downloadFile(getCheckOpinion.attachment_filename,getCheckOpinion.attachment_filepath)" class="download m-r-18">下载</a>
               </el-col>
             </el-row>
           </div>
          <div v-if="item.taskDefinitionKey == 'System_Check'">
            <el-row>
              <span>审核意见:</span> {{getCheckOpinion.reason}}
            </el-row>
            <el-row>
              <span>是否通过:</span> <span v-if="getCheckOpinion.isPass ==1 ">通过</span><span v-if="getCheckOpinion.isPass ==0 ">不通过</span>
            </el-row>
            <el-row v-show="getCheckOpinion.isPass ==0 ">
              <el-col :span="16">
                <span>接收材料回执:</span>
                <a class="file m-r-18" v-show="getCheckOpinion.attachment_filepath != null " >{{getCheckOpinion.attachment_filename}}</a>
                <a v-show="getCheckOpinion.attachment_filepath != null " @click="downloadFile(getCheckOpinion.attachment_filename,getCheckOpinion.attachment_filepath)" class="download m-r-18">下载</a>
              </el-col>
            </el-row>
          </div>
          <div v-if="item.taskDefinitionKey == 'System_Issued'">
            <el-row>
              <el-col :span="16">
                <span>备案材料上传:</span>
                <a class="file m-r-18" v-show="getCheckOpinion.attachment_filepath != null " >{{getCheckOpinion.attachment_filename}}</a>
                <a v-show="getCheckOpinion.attachment_filepath != null " @click="downloadFile(getCheckOpinion.attachment_filename,getCheckOpinion.attachment_filepath)" class="download m-r-18">下载</a>
              </el-col>
            </el-row>
          </div>
          <div v-if="item.taskDefinitionKey == 'System_Rectification'">
            <el-row>
              <span>审核意见:</span> {{getCheckOpinion.reason}}
            </el-row>
          </div>
          <div v-if="item.taskDefinitionKey == 'System_FileCheck'">
            <el-row>
              <span>审核意见:</span> {{getCheckOpinion.reason}}
            </el-row>
            <el-row>
              <span>是否通过:</span> <span v-if="getCheckOpinion.isPass ==1 ">通过</span><span v-if="getCheckOpinion.isPass ==0 ">不通过</span>
            </el-row>
          </div> -->
        </el-collapse-item>
      </el-collapse>

    </el-col>
  </el-row>

  <el-dialog title="流程轨迹" :visible.sync="dialogVisible"  width="85%">
    <img :src="processTrace" alt="流程轨迹图">
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</div>

</template>
<script>
import systemDetail from './SystemDetail.vue'
import mainDetail from './detail/MainDetail'
export default {
  components: {
    systemDetail,
    mainDetail
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
      processTrace:"",
      arr:[],
      dialogVisible:false,
      executionId:"",
      sys_id: "",
      activeName: '1',
      activeNames: [],
      hiTasks: [],
      store: [],
      getCheckOpinion: {},
      processInstanceId:null,
      detailMap:{
        System_Sign:"systemSignDetail",
        System_Check:"systemCheckDetail",
        System_Issued:"systemIssuedDetail",
        System_Rectification:"systemRectificationDetail",
        System_FileCheck:"systemFileCheckDetail"
      }
    };
  },
  mounted: function() {
    var params = this.$route.params;
    this.executionId = params.executionId;
    this.sys_id = params.sys_id;
    var processInstanceId = params.processInstanceId;
    this.processInstanceId=processInstanceId;
    this.utils.req("/ssa/classifiedP/listSystemHiTask.do", {
      processInstanceId: processInstanceId
    }, this).then(result => {
      this.hiTasks = result;
      this.hiTasks.push({
        name: "新增备案表单",
        taskDefinitionKey: "systemInfoTask",
        id: this.sys_id,
        endTime: params.filling_time,
        assignee:params.realname
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

    formatDate(date) {
      if(date == null){
        return "";
      }
      return this.utils.formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss");
    },
    showAlldetail(){
      if(this.handleTxt == "全部展开"){
        this.activeNames = this.arr;
      }else{
        this.activeNames = [];
      }
    },
    showProcessTrace(){
      this.processTrace = "/ssa/processMgmt/processTrace.do?processId=" + this.processInstanceId +"&r="+Math.random();
      this.dialogVisible = true;
    },
    downloadFile(fileName,filePath){
      var params={};
      params.fileName=fileName;
      params.filePath=filePath;
      this.$store.dispatch('downloadFile', [params]);
    },
    goBack() {
      this.$router.go(-1);
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
          params.sys_id = this.sys_id;
          // if (tkey == 'Unit_Check') {
          //this.getCheckOpinion = await  this.$store.dispatch('getOpinionDetail', [params, tkey]);
          // }
          //
          params.orgName = this.orgName;
          var detail = this.$refs[taskId][0];
          detail.currentDetail = this.detailMap[tkey];
          detail.params = params;


          params.tkey = tkey;
          this.$refs[taskId][0].params = params;
          this.store[task] = "in";
        }
      }
    }

  }
}
</script>
<style media="screen">
.mark {
  background-color: #20a0ff;
}

.el-collapse-item__header {
  height: 35px;
  line-height: 35px;
}



.el-collapse-item__header {
  height: 36px;
  line-height: 36px;
}

.el-step__icon {
  line-height: 18px;
}

.el-step__line.is-vertical {
  top: 16px;
  left: 9px;
}

.el-step {
  height: 30px;
}

.el-step__head {
  height: 20px;
  width: 20px;
}

.el-step.is-vertical {
  height: 40px !important;
}
</style>
