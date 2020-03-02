<template>
<div>
  <el-row>
    <h4 class="sub-title">基础信息</h4>
  </el-row>
  <br>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案件名称:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.case_name}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案发单位:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.orgName}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案件等级:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.caseLevel}}</div>
    </el-col>
  </el-row>



  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案件类型:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="investigateDetail.case_type !=null">{{caseTypesMap[investigateDetail.case_type].name}}</div>
    </el-col>
  </el-row>



  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案件来源:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.case_source}}</div>
    </el-col>
  </el-row>

  <br>

  <el-row v-show="this.investigateDetail.event_handling_id != null">
    <h4 class="sub-title">关联信息</h4>
  </el-row>
  <br>
  <div v-show="this.investigateDetail.event_handling_id != null">

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称:</div>
      </el-col>
      <el-col :span="16">
          <el-button type="text" @click="showEvent()">{{this.event_info.event_handling_header}}</el-button>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件类型:</div>
      </el-col>
      <el-col :span="16">
        <div>{{this.event_info.event_type_name}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件等级:</div>
      </el-col>
      <el-col :span="16">
        <div>{{this.event_info.eventLevel}}</div>
      </el-col>
    </el-row>
    <br>
  </div>

  <el-row>
    <h4 class="sub-title">攻击信息</h4>
  </el-row>
  <br>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>源IP:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.srcIp}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>源端口:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.srcPort}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>目的IP:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.destIp}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>目的端口:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.destPort}}</div>
    </el-col>
  </el-row>




  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>协议:</div>
    </el-col>
    <el-col :span="16">
      <div v-for="item in this.investigateDetail.protocols" style="display:inline-block;margin-right:5px;">
        {{protocolsMap[item].name}}
      </div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>设备名:</div>
    </el-col>
    <el-col :span="16">
      <div>{{investigateDetail.device_name}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>设备类型:</div>
    </el-col>
    <el-col :span="16">
      <div v-for="item in this.investigateDetail.deviceTypes" style="display:inline-block;margin-right:5px;">
        {{deviceTypesMap[item].name}}
      </div>
    </el-col>
  </el-row>




</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  props: ["params"],
  computed: {
    ...mapState({
      protocolsMap: state => state.process.protocolsMap,
      deviceTypesMap: state => state.process.deviceTypesMap,
      caseTypesMap: state => state.process.caseTypesMap
    })
  },
  data() {
    return {
      event_info: {},
      investigateDetail: {}
    }
  },
  methods:{
    showEvent() {
      var params ={};
      params = this.event_info;
      params.case_id = this.investigateDetail.case_id;
      params.case_name = this.investigateDetail.case_name;
      params.handle = "view";
      params.module = "caseEvent"
      this.$router.push({
        name: "eventMgmtHandle",
        params: params
      });
    }
  },
  created: async function() {
    var param = {};
    param.case_id = this.params.case_id;

    this.investigateDetail = await this.$store.dispatch('getCaseInvestigateById', [param]);
    if (this.investigateDetail.device_type != null && this.investigateDetail.device_type != "") {
      this.investigateDetail.deviceTypes = this.investigateDetail.device_type.split(",");
    } else {
      this.investigateDetail.deviceTypes = [];
    }


    if (this.investigateDetail.protocol != null && this.investigateDetail.protocol != "") {
      this.investigateDetail.protocols = this.investigateDetail.protocol.split(",");

    } else {
      this.investigateDetail.protocols = [];
    }

    if (this.investigateDetail.event_handling_id != null) {
      this.utils.req("/ssa/caseInvestigate/getEventHandleInfoById.do", {
        event_handling_id: this.investigateDetail.event_handling_id
      }, this).then(data => {

        this.event_info = data;

      })
    }



  }
}
</script>
