<template>
<!--工具栏 -->
<div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
  <el-form :inline="true" :model="queryForm" ref="queryForm">
    <el-form-item label="">
      <el-input placeholder="事件名称" v-model="queryForm.event_handling_header"></el-input>
    </el-form-item>
    <el-form-item label="">
      <selectOrganization v-model="queryForm.event_unit_id" :orgType="2" :size="30" placeholder="请选择"></selectOrganization>
    </el-form-item>
    <el-form-item label="">
      <el-select v-model="queryForm.event_level" placeholder="事件等级" clearable>
        <el-option label="一级" value="1"></el-option>
        <el-option label="二级" value="2"></el-option>
        <el-option label="三级" value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="" required>
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
      <el-button type="primary" @click="queryData">查询</el-button>
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
      orgList: state => state.process.orgList,
    })
  },
  data() {
    return {
      queryForm: {
        event_unit_id: null,
        event_level: null,
        event_handling_header: "",
        startTime: null,
        endTime: null,

      }
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
