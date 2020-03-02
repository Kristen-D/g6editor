<template>
  <div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" >
      <el-form-item label="" >
        <selectOrganization v-model="queryForm.inspected_org" :orgType="2" ></selectOrganization>

      </el-form-item>
      <el-form-item label="" >
        <el-date-picker type="date" placeholder="填发日期" v-model="queryForm.send_time" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData()">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components:{
    selectOrganization
  },
  props:["id"],

  data(){
    return {
      queryForm: {
          inspected_org:null,
          send_time:null
        }
    }
  },
  methods:{
    queryData(){
      if (this.queryForm.send_time != null && this.queryForm.send_time != "") {
          this.queryForm.send_time = this.utils.formatDate(new Date(this.queryForm.send_time), "yyyy-MM-dd hh:mm:ss")
      }
      var params = this.queryForm;
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    }
  }
}
</script>
