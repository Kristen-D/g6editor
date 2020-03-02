<template>
  <div>

<div class="row" style="margin-top：20px;padding-left:20px;">
    <el-col class="line" :span="4">
    <el-tag type="success">编号:</el-tag>
   <h class="myTag"> {{tableData.id}}</h>
  </el-col>
    <el-col class="line" :span="4">
    <el-tag type="success">设备类别:</el-tag>
   <h class="myTag"> {{fmtProductTypeList(tableData.product_type)}}</h>
  </el-col>
  <el-col class="line" :span="4">
    <el-tag type="success">设备名:</el-tag>
  <h class="myTag">  {{ tableData.product_name }}</h>
  </el-col>
  <el-col class="line" :span="4">
  <el-tag type="success">设备IP:</el-tag>
<h class="myTag"> {{tableData.product_ip}}</h>
</el-col>
<el-col class="line" :span="4">
  <el-tag type="success">设备所属地区名:</el-tag>
<h class="myTag"> {{ tableData.product_area_name }}</h>
</el-col>
<el-col class="line" :span="4">
<el-tag type="success">设备版本号:</el-tag>
<h class="myTag"> {{tableData.product_version}}</h>
</el-col>
</div>

<div class="row" style="margin-top：20px;padding-top:20px;padding-left:20px;">
        <el-col class="line" :span="4">
          <el-tag type="success">持续时长:</el-tag>
        <h class="myTag"> {{ tableData.event_duration }}</h>
        </el-col>
        <el-col class="line" :span="4">
          <el-tag type="success">用户名:</el-tag>
        <h class="myTag"> {{ tableData.event_user }}</h>
        </el-col>
    <el-col class="line" :span="4">
      <el-tag type="success">威胁类型:</el-tag>
    <h class="myTag"> {{ fmtEventRiskList(tableData.event_threat_type) }}</h>
    </el-col>
    <el-col class="line" :span="4">
    <el-tag type="success">威胁描述:</el-tag>
  <h class="myTag"> {{tableData.event_threat_type_desc}}</h>
  </el-col>
  <el-col class="line" :span="4">
    <el-tag type="success">等级:</el-tag>
<h class="myTag"> {{ fmtEventGradeList(tableData.event_grade) }}</h>
  </el-col>
  <el-col class="line" :span="4">
  <el-tag type="success">等级描述:</el-tag>
<h class="myTag"> {{tableData.event_grade_desc}}</h>
</el-col>
</div>

<div class="row" style="margin-top：20px;padding-top:20px;padding-left:20px;">
        <el-col class="line" :span="4">
          <el-tag type="success">检查得分:</el-tag>
        <h class="myTag"> {{ tableData.event_check_score }}</h>
        </el-col>
        <el-col class="line" :span="4">
        <el-tag type="success">源IP:</el-tag>
      <h class="myTag"> {{tableData.event_src_ip}}</h>
      </el-col>
      <el-col class="line" :span="4">
        <el-tag type="success">源端口:</el-tag>
      <h class="myTag"> {{ tableData.event_src_port }}</h>
      </el-col>
      <el-col class="line" :span="4">
      <el-tag type="success">目标IP:</el-tag>
    <h class="myTag"> {{tableData.event_dest_ip}}</h>
    </el-col>
    <el-col class="line" :span="4">
      <el-tag type="success">目标端口:</el-tag>
    <h class="myTag"> {{ tableData.event_dest_port }}</h>
    </el-col>
    <el-col class="line" :span="4">
    <el-tag type="success">事件动作:</el-tag>
  <h class="myTag"> {{tableData.event_action}}</h>
  </el-col>
</div>

      <div class="row" style="margin-top：20px;padding-top:20px;padding-left:20px;">
          <el-col class="line" :span="4">
            <el-tag type="success">事件后果:</el-tag>
          <h class="myTag"> {{ tableData.event_result }}</h>
          </el-col>
          <el-col class="line" :span="4">
          <el-tag type="success">数据来源:</el-tag>
        <h class="myTag"> {{fmtPacketDirection(tableData.event_packet_direction)}}</h>
        </el-col>
        <el-col class="line" :span="4">
          <el-tag type="success">次数:</el-tag>
      <h class="myTag"> {{ tableData.event_total_count }}</h>
        </el-col>
        <el-col class="line" :span="4">
        <el-tag type="success">病毒名:</el-tag>
      <h class="myTag"> {{tableData.event_virus_name}}</h>
      </el-col>
      <el-col class="line" :span="4">
        <el-tag type="success">恶意软件名:</el-tag>
      <h class="myTag"> {{ tableData.event_malware_name }}</h>
      </el-col>
      <el-col class="line" :span="4">
        <el-tag type="success">文件名:</el-tag>
      <h class="myTag"> {{ tableData.event_file_name }}</h>
      </el-col>
    </div>

              <div class="row" style="margin-top：20px;padding-top:20px;padding-left:20px;">
            <el-col class="line" :span="4">
              <el-tag type="success">风险等级:</el-tag>
            <h class="myTag"> {{ fmtEventThreatList(tableData.event_risk_type) }}</h>
            </el-col>
            <el-col class="line" :span="4">
              <el-tag type="success">风险描述:</el-tag>
            <h class="myTag"> {{ tableData.event_risk_type_desc }}</h>
            </el-col>
            <el-col class="line" :span="4">
            <el-tag type="success">攻击阶段:</el-tag>
          <h class="myTag"> {{tableData.event_attack_phase}}</h>
          </el-col>
          <el-col class="line" :span="4">
            <el-tag type="success">协议:</el-tag>
          <h class="myTag"> {{ tableData.event_protocol }}</h>
          </el-col>
          <el-col class="line" :span="4">
            <el-tag type="success">规则ID:</el-tag>
          <h class="myTag"> {{ tableData.event_rule_id }}</h>
          </el-col>
          <el-col class="line" :span="4">
            <el-tag type="success">规则名:</el-tag>
          <h class="myTag"> {{ tableData.event_rule_name }}</h>
          </el-col>
        </div>
        <div class="row" style="margin-top：20px;padding-top:20px;padding-left:20px;">
        <el-col class="line" :span="8">
          <el-tag type="success">事件类型:</el-tag>
        <h class="myTag"> {{ fmtEventTypeList(tableData.event_type) }}</h>
        </el-col>
        <el-col class="line" :span="8">
        <el-tag type="success">事件子类型:</el-tag>
      <h class="myTag"> {{fmtEventTypeList(tableData.event_subtype)}}</h>
      </el-col>
      <el-col class="line" :span="4">
        <el-tag type="success">URL:</el-tag>
      <h class="myTag"> {{ tableData.event_url }}</h>
      </el-col>
    </div>


  </div>
  </template>

  <script>
  import {mapState} from 'vuex'
    export default {
      data() {
        return {
        }
      },
      props: ['tableData'],
      computed:{
        ...mapState({
           params:state=>state.context.params,
           eventTypeList:state=>state.context.eventTypeList,
           ProductTypeList:state=>state.context.ProductTypeList,
           EventThreatList:state=>state.context.EventThreatList,
           EventGradeList:state=>state.context.EventGradeList,
           EventRiskList:state=>state.context.EventRiskList,
       })},
       methods:{
         fmtEventTypeList(val){
          // console.log(val);
            for(var item in this.eventTypeList) {
                if (val==this.eventTypeList[item].id){
                  return this.eventTypeList[item].text;
                }
            }

         },
         fmtProductTypeList(val){
          // console.log(val);
            for(var item in this.ProductTypeList) {
                if (val==this.ProductTypeList[item].id){
                  return this.ProductTypeList[item].text;
                }
            }

         },
         fmtEventThreatList(val){
          // console.log(val);
            for(var item in this.EventThreatList) {
                if (val==this.EventThreatList[item].id){
                  return this.EventThreatList[item].text;
                }
            }

         },
         fmtEventGradeList(val){
          // console.log(val);
            for(var item in this.EventGradeList) {
                if (val==this.EventGradeList[item].id){
                  return this.EventGradeList[item].text;
                }
            }

         },
        fmtEventRiskList(val){
             // console.log(val);
               for(var item in this.EventRiskList) {
                   if (val==this.EventRiskList[item].id){
                     return this.EventRiskList[item].text;
                   }
               }

            },
          fmtStatus(val){
               // console.log(val);
                 if (val=="0"){
                   return "待提交";
                 }else if (val=="1") {
                    return "流程进行中";
                 }else if (val=="2") {
                    return "已完成";
                 }else{
                    return "尚未处理";
                 }

          },
          fmtPacketDirection(val){//数据来源
               // console.log(val);
                 if (val=="0"){
                   return "内部";
                 }else if (val=="1") {
                    return "外部";
                 }
          },

      }
    }
  </script>
  <style>
  .myTag{ color:#fff;font-size:12px;}
  </style>
