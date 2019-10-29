<template>
<div >
  <div class="top-title"></div>
    <el-form :inline="true" :model="queryForm" ref="queryForm" label-width="80px">
      <el-form-item label="">
        <el-input placeholder="源IP" v-model="queryForm.src_ip"> </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-datePicker v-model="queryForm.hit_time_date" placeholder="攻击开始时间" >
        </el-datePicker>
      </el-form-item>
      <el-form-item label="">
        <el-button  @click="qryData()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
//import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components: {
  //  selectOrganization
  },
  props: ["id"],
  data() {
    return {
      queryForm: {
      	src_ip:"",
      	hit_time:"",
        hit_time_date:null
      },
    }
  },
  methods: {
    qryData(){
      this.queryForm.hit_time = common.formatDate(this.queryForm.hit_time_date,"yyyy-MM-dd");
        var params = this.queryForm;
        this.$store.commit('setParams', [this.id, params]);
        this.$store.dispatch('reloadTable', this.id);
    }
  },
  created: async function() {
    // // this.amassetInfoData = await this.common.req("/ssa/alarmInfoList/getAmassetInfo.do", null, this);
    // this.orgInfoData = await this.common.req("/ssa/alarmInfoList/getOrgInfo.do", null, this);
    // var param={};
    // param.externalIp_s="2";
    // var recordData = await this.common.req("/ssa/screenExhibit/getEventSrcIpOnMap_GD.do",param,this);
    //
    // this.srcData = recordData.result;

  }
}
</script>
