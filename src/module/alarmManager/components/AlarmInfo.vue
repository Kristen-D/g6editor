<template >
<div>

  <el-row>
    <div class="el-sub-panel-heading">
       <h4 class="sub-title">处置结果</h4>
       <!-- <div class="float-r prostate" style="margin-top:-15px;">
         <el-button type="text" @click="showAlldetail" class="float-l">{{handleTxt}}</el-button>
       </div> -->
    </div>

    <el-col :span="24">
      <el-collapse v-model="activeNames" @change="showTaskDeTail($event)" class="Check-the-process-state-collapse">
        <el-collapse-item  class="processcollapse-item" v-for="(item, index) in hiTasks"  :name="item.alarm_id+','+item.tkey+','+item.id">
          <template slot="title">
              <span class="processcollapse-itemnane" > {{item.name}}</span>
              &nbsp;&nbsp;<label>{{formatDate(item.hand_time)}}</label>
               <span class="processcollapse-itemperson" >{{item.userName}}</span>
        </template>
          <alarmDetail :tkey="item.tkey" :eventClDetail="eventClDetail"  :eventSpDetail="eventSpDetail" :params="param">
          </alarmDetail>
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
</div>

</template>
<script>
import alarmDetail from './AlarmDetail.vue'
export default {

  components: {
    alarmDetail
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
      alarm_id: "",
      alarm_time: null,
      creator: "",
      activeName: '1',
      activeNames: [],
      hiTasks: [],
      store: [],
      alarmInfoDetail: {},
      eventSpDetail: {},
      eventClDetail: {}
    };
  },
  mounted: function() {
    //alert(this.$route.params.alarm_id)
    this.param =  this.$route.params;
    var params = this.$route.params;
     // this.alarm_id = params.alarm_id;
    // this.alarm_time = params.alarm_time;
    // this.creator = params.creator;
    var i=0;
    this.common.req("/ssa/alarmManager/listHiTask.do", {
      alarm_id: params.alarm_id
    }, this).then(result => {
      this.hiTasks = result;
    //  alert(this.hiTasks );
      //alert((this.hiTasks))  ;
      //加入空数组用于显示原始表单数据
      // this.hiTasks.push({
      //   name: "告警表单",
      //   tkey: "alarmInfoTask",
      //   id: this.alarm_id,
      //   endTime: this.alarm_time,
      //   assignee: params.userName
      // });
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
        var id = item.alarm_id+','+item.tkey+','+item.id;
        this.arr.push(id);
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
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
    async showTaskDeTail(activeNames) {
      var id;
      for (id in activeNames) {
        var task = activeNames[id];
        if (this.store[task] == undefined) {
          var taskAttr = task.split(",");
          var alarmId = taskAttr[0];
          var tkey = taskAttr[1];
          //alert(tkey);
          //var taskId = taskAttr[2];
          var params = {};
          params.alarm_id=alarmId;
         if (tkey == 'alarmSh') {
           this.eventSpDetail = await this.$store.dispatch('getEventSpDetail', [params]);
         }else if (tkey == 'alarmCl') {
            this.eventClDetail = await this.$store.dispatch('getEventClDetail', [params]);
          }
            this.store[task] = "in";
        }
      }
    }
  }
}
</script>
