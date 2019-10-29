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
        <div>设备IP:</div>
      </el-col>
      <el-col :span="16">
        <div>{{alarmviewDetail.device_ip}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>安全事件:</div>
      </el-col>
      <el-col :span="16">
        <div>{{ fmtexternalIp_s(alarmviewDetail.externalIp_s) }}</div>
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
        <div>{{ fmtStatus(alarmviewDetail.flow_status,alarmviewDetail.is_approve)}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" >
      <el-col :span="4">
        <div>关联事件:</div>
      </el-col>
      <el-col :span="16">
        <a style="color:#4db3ff;cursor:pointer;" v-if="display" @click="eventClick(alarmviewDetail.alarm_id)">加载列表</a>
        <!-- <div>{{alarmviewDetail.completion_desc}}</div> -->
      </el-col>
      </el-row>
      <el-row  :gutter="20" v-for="(item, index) in alarmEventList">
        <el-col :span="16" :offset="4"><div>{{item.event_id}}</div>
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
      display:true,
      illegal_actions: [],
      uploadParams:{},
      alarmEventList:[],
      file:{}
    }
  },
  props: ["params","tkey","eventSpDetail","eventClDetail","alarmviewDetail"],

  methods: {
    fmtexternalIp_s(val){
      let s = '';
      switch (parseInt(val)) {
         case 1:
           s = '外部安全事件';
           break;
         case 0:
           s = '内部安全事件';
           break;
         default:
           s='--';
       }
       return s;
    },
  async  eventClick(alarm_id){
    this.display = false;
      var param={};
      param.alarm_id=alarm_id;
      await this.common.req("/ssa/alarmInfoList/getEventIds.do",param,this).then(result =>{
        if(result != null){
          this.alarmEventList = result;
      }
    })
    },
    fmtStatus(val,is_approve){
      let s = '';
      switch (val) {
         case -1:
           s = '发送失败';
           break;
         case 1:
           s = '未处理';
           if (is_approve=='0'){
             s = '待处理';
           }else{
             s = '待审核';
           }
           break;
         case 2:
           s = '待处理';
           break;
         case 3:
           s='已完成';
           break;
         default:
           s='--';
       }
       return s;
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
