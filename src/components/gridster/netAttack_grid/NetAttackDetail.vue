<template>
  <div class="el-panel-bigscreen net-attack-detail">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">攻击详情</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="float-r">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="showExport">导出</el-button>
      </div>
      <el-form :inline="true" class="demo-form-inline" style="margin-left:100px;!important">
        <el-form-item>
          <el-select v-model="params.event_threat_type" clearable placeholder="请选择威胁类型">
            <el-option :label="id" :value="text" v-for="(id, text) in eventThreatList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.event_risk_level" clearable placeholder="请选择风险等级">
            <el-option :label="id" :value="text" v-for="(id, text) in eventRiskList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.event_attack_phase" clearable placeholder="请选择攻击阶段">
            <el-option :label="se.name" :value="se.name" v-for="se in eventAttackPhaseList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.product_name" clearable placeholder="请选择设备名称">
            <el-option :label="id" :value="text" v-for="(id, text) in deviceTypeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="params.event_src_ip" placeholder="请输入攻击IP"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="params.event_dest_ip" placeholder="请输入目标IP"></el-input>
        </el-form-item>
      </el-form>
      <el-col :span="24">
        <qry-table ref="table" :params="params"></qry-table>
      </el-col>
    </div>
    <el-dialog title="导出数据" :visible.sync="myShow" size="small" @close="onCloseIp()" class="dialog-panel" top="15%">
      <!-- <div style="height:300px"> -->
      <export-excel></export-excel>
      <!-- </div> -->
    </el-dialog>
  </div>
</template>

<script>
  import qryTable from './QueryTable.vue'
  import exportExcel from './ExportExcel.vue'
  import {fmtEventTypeList, fmtEventThreatList,
    fmtEventRiskList, fmtDeviceTypeList} from "../../js/functionUtil";

  export default {
    components: {
      qryTable,
      exportExcel
    },
    data() {
      return {
        myShow: false,
        dialogVisible: false,
        params: {
          event_threat_type: '',
          event_dest_ip: '',
          event_src_ip: '',
          event_attack_phase: '',
          product_name: '',
          event_risk_level: '',
          pageIndex: 1
        },
        eventAttackPhaseList: [],
        eventThreatList: {},
        eventRiskList: {},
        deviceTypeList: {}
      }
    },
    methods: {
      showExport() {
        let params = Object.assign({}, this.params);
        let paramsStr = this.common.convertUrlString(params);

        const h = this.$createElement;
        this.$msgbox({
          title: '导出数据',
          message: h('p', null, [
            h('span', null, '确认导出当前所查询到的数据吗？'),
          ]),
          showCancelButton: false,
          confirmButtonText: '确认导出',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              $(window).attr('location', '/ssa/netAttack/downloadExcel.do' + paramsStr);
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '导出中,请稍候...';
              setTimeout(() => {
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = '确认导出';
              }, 5000);
            } else {
              done();
            }
          }
        }).then(action => {

        });
      },
      query() {
        this.$refs.table.loadTableData(1);
      }
    },
    async created () {
      this.eventThreatList = await fmtEventThreatList(this);
      this.eventRiskList = await fmtEventRiskList(this);
      this.deviceTypeList = await fmtDeviceTypeList(this);
      this.eventAttackPhaseList = [
        {name: '情报刺探'},
        {name: '弱点攻击'},
        {name: '命令控制'},
        {name: '渗透感染'},
        {name: '资料发掘'},
        {name: '攻击窃取'}
      ];
    }
  }
</script>

<style scoped>
  .net-attack-detail .el-panel-white-title {
    color: white;
  }
</style>
