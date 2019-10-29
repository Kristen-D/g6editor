<template>
<div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
  <el-form :inline="true" :model="queryForm" ref="queryForm">

    <el-form-item>
      <el-input v-model="queryForm.case_name" placeholder="案件名称"></el-input>
    </el-form-item>



    <el-form-item>
      <selectOrganization v-model="queryForm.case_orgId" :orgType="2" :size="25" placeholder="请选择"></selectOrganization>
    </el-form-item>

    <el-form-item>
      <el-select v-model="queryForm.case_level" clearable placeholder="请选择案件等级">
        <el-option label="一级" :value="1"></el-option>
        <el-option label="二级" :value="2"></el-option>
        <el-option label="三级" :value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-select v-model="queryForm.case_type" clearable placeholder="请选择案件类型">
        <el-option v-for="item in caseTypes" :label="item.name" :value="item.value"> </el-option>
      </el-select>

    </el-form-item>
    <!-- <el-form-item style="margin-top:5px;" v-show="isAdvanced"> -->

      <el-form-item>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
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
import {
  mapState
} from 'vuex'
import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components: {
    selectOrganization
  },
  props: ["id"],
  computed: {
    ...mapState({
      caseTypes: state => state.process.caseTypes
    })
  },
  data() {
    return {
      queryForm: {
        endTime: null,
        startTime: null,
        case_name: "",
        case_level: null,
        case_type: null,
        case_orgId: null
      },
      isAdvanced: false
    }
  },
  methods: {
    queryData() {

      if (this.queryForm.startTime != null && this.queryForm.startTime != "") {
        this.queryForm.startTime = this.utils.formatDate(new Date(this.queryForm.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.endTime != null && this.queryForm.endTime != "") {
        this.queryForm.endTime = this.utils.formatDate(new Date(this.queryForm.endTime), "yyyy-MM-dd hh:mm:ss");
      }

      var params = this.queryForm;
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    }
  }
}
</script>
