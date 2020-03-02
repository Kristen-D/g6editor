<template>

  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{enteringReportDetail.event_handling_header}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>侦查单位现场处置：</div>
      </el-col>
      <el-col :span="16">
        <div>{{enteringReportDetail.invest_hnale_info}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" v-if="technicalList.length >0" :gutter="20">
      <el-col :span="4">
        <div>技术协查：</div>
      </el-col>
      <el-col :span="16">
        <div v-for="item in technicalList">
          <div style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
          <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      enteringReportDetail: {},
      technicalList:[]
    }
  },
  methods:{
    getTechnicalByBussiness() {
      var param = {};
      param.bussiness_type = "EVENTMGMT_INVESTIGATEREPORTTASK";
      param.bussiness_id = this.params.event_handling_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    },
  },
  created: async function() {
    this.enteringReportDetail = await this.$store.dispatch('getEnteringReportDetail', [this.params,this.params.tkey]);
    this.getTechnicalByBussiness();
  }
}
</script>
