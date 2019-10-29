<template>
  <div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" >
      <el-form-item>
        <el-input placeholder="单位名称" v-model="queryForm.q_unit_name"></el-input>
      </el-form-item>
        <el-form-item>
          <el-input placeholder="备案表编号" v-model="queryForm.q_record_code"></el-input>
        </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.q_affiliation" placeholder="隶属关系" clearable>
          <el-option label="中央" value="中央"></el-option>
          <el-option label="省(自治区、直辖市)" value="省(自治区、直辖市)"></el-option>
          <el-option label="地(区、市、州、盟)" value="地(区、市、州、盟)"></el-option>
          <el-option label="县(区、市、旗)" value="县(区、市、旗)"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.q_startTime" placeholder="备案起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.q_endTime" placeholder="备案结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData()">查询</el-button>
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
        q_unit_name: "",
        q_record_code: "",
        q_affiliation: "",
        q_startTime: null,
        q_endTime: null
        }
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
