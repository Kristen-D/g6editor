<template>
<!--工具栏 -->
<div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
  <el-form :inline="true" :model="queryForm" ref="queryForm">
    <el-form-item label="">
      <el-input v-model="queryForm.alert_header" placeholder="预警名称"></el-input>
    </el-form-item>
    <el-form-item label="">

      <el-select v-model="queryForm.org_id" clearable filterable placeholder="处置单位">
        <el-option v-for="item in orgList" :label="item.name" :value="item.value">
        </el-option>
      </el-select>


    </el-form-item>
    <el-form-item label="">
      <el-select v-model="queryForm.alert_level" placeholder="预警等级" clearable>
        <el-option label="低" value="1"></el-option>
        <el-option label="中" value="2"></el-option>
        <el-option label="高" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="" required>
      <el-col :span="11">
        <el-form-item>
          <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
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

export default {

  props: ["id"],
  computed: {
    ...mapState({
      orgList: state => state.process.orgList,
    })
  },
  data() {
    return {
      queryForm: {
        org_id: null,
        alert_level: null,
        alert_header: "",
        startTime: null,
        endTime: null
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
