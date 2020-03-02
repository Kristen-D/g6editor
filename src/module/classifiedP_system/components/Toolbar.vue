<template>
  <div class="senior-search clearfloat" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" ref="queryForm" label-width="100px" class="demo-form-inline senior-form" style="display: block;">
      <el-form-item label="系统名称">
        <el-input placeholder="系统名称" v-model="queryForm.q_sys_name"></el-input>
      </el-form-item>
        <el-form-item label="备案证明编号">
          <el-input placeholder="编号" v-model="queryForm.q_record_approval_code"></el-input>
        </el-form-item>
      <el-form-item label="保护等级">
        <el-select v-model="queryForm.q_info_sys_protec_level" placeholder="所有等级" clearable>
          <el-option label="第一级" value="第一级"></el-option>
          <el-option label="第二级" value="第二级"></el-option>
          <el-option label="第三级" value="第三级"></el-option>
          <el-option label="第四级" value="第四级"></el-option>
          <el-option label="第五级" value="第五级"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="备案单位">
          <el-input placeholder="单位名称" v-model="queryForm.q_unit_name"></el-input>
        </el-form-item>
      <el-form-item label="时间">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.q_startTime" placeholder="开始时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.q_endTime" placeholder="结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
   </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {
    cap
  },
  props:["id"],
  computed: {
    ...mapState({
      orgList: state => state.process.orgList,
    })
  },
  data(){
    return {
      queryForm: {
        q_sys_name: "",
        q_record_approval_code: "",
        q_info_sys_protec_level: "",
        q_unit_name:"",
        q_startTime: null,
        q_endTime: null
      },
    }
  },
  methods:{
    queryData(){
      if (this.queryForm.q_startTime != null && this.queryForm.q_startTime != "") {
        this.queryForm.q_startTime = this.utils.formatDate(new Date(this.queryForm.q_startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.q_endTime != null && this.queryForm.q_endTime != "") {
        this.queryForm.q_endTime = this.utils.formatDate(new Date(this.queryForm.q_endTime), "yyyy-MM-dd hh:mm:ss");
      }
      var params = this.queryForm;
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    }
  }
}
</script>

<style lang="css">
</style>
