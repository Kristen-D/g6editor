<template>
<div>
    <div  v-if="this.tkey == 'alarmView'  " class="top-title">告警详情</div>
  <div v-if="this.tkey == 'alarmView'  ">
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>告警内容:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.alarm_desc}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>风险级别：</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.alarm_gradeName}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>告警类型:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.alarm_typeName}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>源IP:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.src_ip}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>目的IP:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.dst_ip}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>受威胁资产:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.asset_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>告警时间:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.alarm_time}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>状态:</div>
      </el-col>
      <el-col :span="16">
        <div>{{ fmtStatus(alarmviewDetail.status)}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>关联事件:</div>
      </el-col>
      <el-col :span="16">
        <!-- <a  style="color:#4db3ff;cursor:pointer;" @click="eventClick(alarmviewDetail.alarm_id)">加载列表</a> -->
        <div>{{alarmviewDetail.completion_desc}}</div>
      </el-col>
    </el-row>
  </div>

  <div v-if="this.tkey == 'alarmSh'  ">
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>审核结果：</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventSpDetail.resultname}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>审核情况</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventSpDetail.hand_desc}}</div>
      </el-col>
    </el-row>

  </div>

  <div v-if="this.tkey == 'alarmCl'  ">
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>处理情况</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventClDetail.hand_desc}}</div>
      </el-col>
    </el-row>

  </div>
</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  computed: {
    ...mapState({
      //recvOrgList: state => state.context.recvOrgList
    })
  },
  data() {
    return {
      illegal_actions: [],
      uploadParams:{},
      file:{}
    }
  },
  props: ["params","tkey","eventSpDetail","eventClDetail","alarmviewDetail"],

  methods: {
    eventClick(alarm_id){

    },
    fmtStatus(val){
       let s = '';
       val = parseInt(val);
       switch (val) {
          case 0:
            s = '待确认';
            break;
          case 1:
            s = '未审批';
            break;
          case 2:
            s = '未派发';
            break;
          case 3:
            s='已派发';
              break;
           case 4:
            s='已归档';
              break;
          default:
            s='--';
        }
        return s;
     }
  },
  watch: {
    superviseRectifyDetail: function() {
      this.illegal_actions = this.superviseRectifyDetail.illegal_action.split("|");
    }
  },
  created: function() {
    // this.getAttachment();
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
