<template >
<div>
  <el-row>
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">查看流程状态</h4>
      <div class="float-r prostate">
        当前状态：<span>{{this.$route.params.state}}</span> <i v-show="this.$route.params.status != 2 " class="el-icon-view" style="color:#20a0ff" @click="showProcessTrace"></i>
      </div>
      <div class="float-r prostate" style="margin-top:-15px;">
        <el-button type="text" @click="showAlldetail" class="float-l">{{handleTxt}}</el-button>
      </div>
    </div>
    <el-col :span="24">
      <el-collapse v-model="activeNames" @change="showTaskDeTail($event)" class="Check-the-process-state-collapse">
        <!-- 唯一标识 流程实例id,任务标识,任务id-->
        <el-collapse-item class="processcollapse-item" v-for="(item, index) in hiTasks" v-show="item.deleteReason != 'deleted'" :name="item.processInstanceId+','+item.taskDefinitionKey+','+item.id">

          <template slot="title">
            <span class="processcollapse-itemnane"> {{item.name}}</span>&nbsp;&nbsp;
            <label>{{formatDate(item.endTime)}}</label>
            <span class="processcollapse-itemperson">{{item.assignee}}</span>
</template>

          <mainDetail :ref="item.id" ></mainDetail>
        </el-collapse-item>
      </el-collapse>
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
import mainDetail from './detail/MainDetail'
export default {
  components: {
    mainDetail
  },
  watch: {
    activeNames: function(newArr) {
      this.showTaskDeTail(newArr);
      if (newArr.length == 0) {
        this.handleTxt = "全部展开";
      } else {
        this.handleTxt = "全部关闭";
      }
    }
  },
  data() {
    return {
      handleTxt: "全部展开",
      arr:[],
      orgName: "",
      processTrace: "",
      dialogVisible: false,
      task_inspect_id: null,
      event_time: null,
      creator: "",
      activeName: '1',
      activeNames: [],
      hiTasks: [],
      store: [],
      processInstanceId: null,
      detailMap: {
        taskInspectTask: "taskInspectDetail",
        superviseInspectTask: "superviseInspectDetail",
        inspectAduitTask: "inspectAduitDetail",
        rectificationNoticeTask: "rectificationNoticeDetail",
        rectificationFeedbackTask: "rectificationFeedbackDetail",
        rectificationCheckTask: "rectificationCheckDetail",
        bulletinTask: "bulletinDetail"
      }
    };
  },
  created: function() {
    var params = this.$route.params;
    this.task_inspect_id = params.task_inspect_id;
    this.orgName = params.orgName;
    var processInstanceId = params.processInstanceId;
    this.processInstanceId = processInstanceId;
    this.utils.req("/ssa/taskInspect/listHiTask.do", {
      processInstanceId: processInstanceId
    }, this).then(result => {
      this.hiTasks = result;
      //加入空数组用于显示原始表单数据
      this.hiTasks.push({
        name: "任务检查详单",
        taskDefinitionKey: "taskInspectTask",
        processInstanceId: processInstanceId,
        id: this.task_inspect_id,
        endTime: params.create_time,
        assignee: params.creator
      });

      Vue.nextTick(function() {
        var items = $(".Check-the-process-state-collapse > .processcollapse-item");

        items.each(function(i, e) {
          if (i < items.length - 1) {
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
      if (date == null) {
        return "";
      }
      return this.utils.formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss");
    },

    showAlldetail() {

      if (this.handleTxt == "全部展开") {
        this.activeNames = this.arr;
        this.activeNames.concat();

      } else {
        this.activeNames = [];

      }
    },
    showProcessTrace() {
      this.processTrace = "/ssa/processMgmt/processTrace.do?processId=" + this.processInstanceId + "&r=" + Math.random();
      this.dialogVisible = true;
    },
    async showTaskDeTail(activeNames, e) {

      var id;
      for (id in activeNames) {

        var task = activeNames[id];

        if (this.store[task] == undefined) {
          var taskAttr = task.split(",");
          var processId = taskAttr[0];
          var tkey = taskAttr[1];
          var taskId = taskAttr[2];
          // var deleteReason = taskAttr[3];

          var params = {};
          params.taskId = taskId;
          params.processInstanceId = processId;
          params.task_inspect_id = this.task_inspect_id;
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
