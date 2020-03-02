<template>
<!-- 现场勘验详细列表 -->
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>事件名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{inquisitionDetail.event_handling_header}}</div>
    </el-col>
  </el-row>



  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>事件原因：</div>
    </el-col>
    <el-col :span="16">
      <div>{{inquisitionDetail.event_reason}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>证据材料：</div>
    </el-col>
    <el-col :span="16">
      <a class="file m-r-18" v-show="inquisitionDetail.attachment_filepath != null ">{{inquisitionDetail.attachment_filename}}</a>
      <a v-show="inquisitionDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
      <div>{{inquisitionDetail.evidence_material}}</div>
    </el-col>
  </el-row>



  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>系统数据破坏程度：</div>
    </el-col>
    <el-col :span="16">
      <div>{{inquisitionDetail.data_destruction_degree}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>系统服务破坏程度：</div>
    </el-col>
    <el-col :span="16">
      <div>{{inquisitionDetail.service_destruction_degree}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>对系统用户影响：</div>
    </el-col>
    <el-col :span="16">
      <div>{{inquisitionDetail.user_effects}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" v-if="technicalList.length >0" :gutter="20">
    <el-col :span="4">
      <div>技术协查：</div>
    </el-col>
    <el-col :span="16">
      <div v-for="item in technicalList">
        <div @click="showTechnicalDetail(item)" style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
        <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
      </div>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {

  props: ["params"],
  data() {
    return {
      inquisitionDetail: {},
      technicalList: []
    }
  },
  methods: {
    getTechnicalByBussiness() {
      var param = {};
      param.bussiness_type = "EVENTMGMT_INQUISITIONTASK";
      param.bussiness_id = this.params.event_handling_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    },

    downloadFile() {
      var fileUrl = "/ssa/eventMgmt/downloadFile.do?event_handling_id=" + this.inquisitionDetail.event_handling_id + "&taskName=" + this.params.tkey;
      window.location.href = fileUrl;
    }
  },
  created: async function() {
    this.inquisitionDetail = await this.$store.dispatch('getInquisitionDetail', [this.params, this.params.tkey]);
    this.getTechnicalByBussiness();
  }
}
</script>
