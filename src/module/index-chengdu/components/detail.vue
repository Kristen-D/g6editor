<template>
  <div class="container-fluid">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/alarmTable'}">告警信息</el-breadcrumb-item>
      <el-breadcrumb-item>告警详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-panel">
      <div class="el-panel-heading">
        <h3 class="el-panel-title">发布资讯</h3>
      </div>
      <div class="el-panel-body">
        <el-form  ref="AlarmDetail" :model="AlarmDetail" label-width="85px" label-position="right" class="dialog-from">
          <el-form-item label="告警id：" >
            <span>{{AlarmDetail.alarm_id}}</span>
          </el-form-item>
          <el-form-item label="告警类型：">
            <span>{{AlarmDetail.alarm_type_name}}</span>
          </el-form-item>
          <el-form-item label="告警等级：">
            <span>{{AlarmDetail.alarm_grade_name}}</span>
          </el-form-item>
          <el-form-item label="告警详情：">
            <span>{{AlarmDetail.alarm_desc}}</span>
          </el-form-item>
          <el-form-item label="告警时间：">
            <span>{{AlarmDetail.alarm_time}}</span>
          </el-form-item>
          <el-form-item label="源IP：">
            <span>{{AlarmDetail.src_ip}}</span>
          </el-form-item>
          <el-form-item label="目标IP：">
            <span>{{AlarmDetail.dst_ip}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="$router.go(-1)" size="small">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content:{},
        AlarmDetail:{},
      }
    },
    methods:{
      getData(){
        var params = {
          alarm_id:this.$route.params.alarm_id,
        };
        this.common.req("/ssa/index/getAlarmDetail.do",params).then(data => {
          this.AlarmDetail = data[0];
        })
      }
    },
    mounted: function() {
      this.getData();
    }
  }
</script>
