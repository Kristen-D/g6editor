<template >
<div class="container-padding body-bgcolor">
  <el-row :gutter="16">
    <el-col :span="12">
      <associativeTendency></associativeTendency>
    </el-col>
    <el-col :span="12">
      <actionTendency></actionTendency>
    </el-col>
  </el-row>



  <div class="el-panel clearfloat">
    <div class="el-panel-body">
      <div class="search">

        <div class="senior-search ">
          <el-form :inline="true" :model="params" ref="params">

            <el-form-item label="风险级别" style="display:inline-block;margin-left:20px;" v-if="advancedFlag">
              <el-select v-model="params.alarm_grade" clearable placeholder="风险级别">
                <el-option v-for="item in alarmGradeOptions" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="告警类型" style="display:inline-block;margin-left:20px;" v-if="advancedFlag">
              <el-select v-model="params.alarm_type" clearable placeholder="告警类型">
                <el-option v-for="item in alarmTypeOptions" :label="item.text" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="关联结果" style="display:inline-block;margin-left:20px;" v-if="advancedFlag">
              <el-select v-model="params.correlation" clearable placeholder="关联结果">
                <el-option v-for="item in correlationOptions" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>



            <el-form-item label="是否阻拦" style="display:inline-block;margin-left:20px;" v-if="advancedFlag">
              <el-select v-model="params.action" clearable placeholder="是否阻拦">
                <el-option v-for="item in actionOptions" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="告警时间" style="display:inline-block;margin-left:20px;">
              <el-date-picker v-model="params.beginTime" type="date" placeholder="选择起始日期">
              </el-date-picker>
              至
              <el-date-picker v-model="params.endTime" type="date" placeholder="选择结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="源IP" style="display:inline-block;margin-left:20px;">
              <el-input v-model="params.src_ip" placeholder="源IP"></el-input>
            </el-form-item>

            <el-form-item label="目标IP" style="display:inline-block;margin-left:20px;">
              <el-input v-model="params.dest_ip" placeholder="目标IP"></el-input>
            </el-form-item>


            <!--
            <el-form-item label="状态" style="display:inline-block;" v-if="advancedFlag">
              <el-select v-model="params.flow_status" placeholder="是否阻拦">
                <el-option v-for="item in statusOptions" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->




            <el-form-item label="告警内容" style="display:inline-block;margin-left:20px;" v-if="advancedFlag">
              <el-input v-model="params.alarm_desc" placeholder="告警内容"></el-input>
            </el-form-item>

            <el-form-item v-if="!advancedFlag">
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="search-button-location" v-if="advancedFlag">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="gray" @click="reset">清空</el-button>
          </div>
          <div class="op-location" v-if="advancedFlag">
            <p @click="hideAdvanced" class="search-tag search-tag02"><i class="el-icon-search m-r-8"></i>普通搜索</p>
          </div>

          <div class="op-location" v-if="!advancedFlag">
            <p @click="showAdvanced" class="search-tag"><i class="el-icon-search m-r-8"></i>高级搜索</p>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div>
    <editTable :id="tableId"></editTable>

  </div>










</div>
</template>

<script>
import echarts from 'echarts'
import editTable from './AssociativeAnalysisEditTable.vue'
import associativeTendency from './AssociativeTendency.vue'
import actionTendency from './ActionTendency.vue'
export default {
  components: {
    editTable,
    associativeTendency,
    actionTendency

  },
  data() {
    return {
      tableId: "associativeAnalysisEditTable",
      advancedFlag: false,
      //告警级别
      alarmGradeOptions: [{
        value: 1,
        label: "低"
      }, {
        value: 2,
        label: "中"
      }, {
        value: 3,
        label: "高"
      }],
      //关联结果
      correlationOptions: [{
        value: 0,
        label: "失败"
      }, {
        value: 1,
        label: "成功"
      }],
      //是否阻拦
      actionOptions: [{
        value: 0,
        label: "否"
      }, {
        value: 1,
        label: "是"
      }],
      //状态
      statusOptions: [{
        value: 1,
        label: "待处理"
      }, {
        value: 3,
        label: "已处理"
      }],

      alarmTypeOptions: [],
      params: {
        //风险级别
        alarm_grade: null,
        correlation: null,
        //是否阻拦
        action: null,
        alarm_type: null,
        //目标IP
        dst_ip: "",
        src_ip: "",
        //告警时间
        alarm_time: "",
        //状态
        flow_status: null,
        beginTime: null,
        endTime: null,
        //告警内容
        alarm_desc: ""

      }
    }
  },
  methods: {
    //清空
    reset() {
      //风险级别
      this.params.alarm_grade = null;
      this.params.correlation = null;
      //是否阻拦
      this.params.action = null;
      this.params.alarm_type = null;
      //目标IP
      this.params.dst_ip = "";
      this.params.src_ip = "";
      //告警时间
      this.params.alarm_time = "";
      //状态
      this.params.flow_status = null;
      this.params.beginTime = null;
      this.params.endTime = null;
      //告警内容
      this.params.alarm_desc = "";

    },

    // 高级搜索
    showAdvanced() {
      this.advancedFlag = true;
    },
    // 普通搜索
    hideAdvanced() {
      this.advancedFlag = false;
    },
    search() {
      if (this.params.beginTime != null && this.params.beginTime != "") {
        this.params.beginTime = this.common.formatDate(new Date(this.params.beginTime), "yyyy-MM-dd");
      }
      if (this.params.endTime != null && this.params.endTime != "") {
        this.params.endTime = this.common.formatDate(new Date(this.params.endTime), "yyyy-MM-dd");
      }
      this.$store.commit('setParams', [this.tableId, this.params]);
      this.$store.dispatch('reloadTable', this.tableId);
    }

  },
  mounted: function() {
    this.common.req("/ssa/associativeAnalysis/getAlarmTypeList.do").then(data => {
      this.alarmTypeOptions = data;
    });
    this.$store.dispatch('loadListNewTypeList');

  }
}
</script>

<style lang="css">

.search {
    padding: 10px 20px;
    position: relative;
}
 .op-location {
    position: absolute;
    right:20px;
    bottom: 12px;
    clear: both;
}

.m-b--20 {
    margin-bottom: -20px;
}
.search .el-form--inline .el-form-item {
    margin-right: 22px;
}
.el-form-item {
    margin-bottom: 18px;
}
</style>
