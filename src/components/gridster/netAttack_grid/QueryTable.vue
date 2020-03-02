<template>
  <div>
    <el-table v-loading="defConf.loading" class="dark-table" :data="defConf.tableData" border>

      <el-table-column  align="center" prop="threatType_s"  show-overflow-tooltip label="威胁类型" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ eventThreatList[scope.row.threatType_s] }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="logTime_dt" label="发生时间" show-overflow-tooltip min-width="170"> </el-table-column>
      <el-table-column align="center" prop="pattackPhase_s"  show-overflow-tooltip label="阶段" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.pattackPhase_s }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="riskLevel_s"  show-overflow-tooltip label="级别" min-width="70">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ eventRiskList[scope.row.riskLevel_s] }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="srcIp_s"  show-overflow-tooltip label="攻击IP" min-width="120">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.srcIp_s }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="srcPort_s" label="攻击端口" show-overflow-tooltip min-width="100"> </el-table-column>
      <el-table-column align="center" prop="event_src_ip_area"  show-overflow-tooltip label="攻击地点" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.event_src_ip_area }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="dstIp_s"  show-overflow-tooltip label="目标IP" min-width="120">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.dstIp_s }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="dstPort_s" label="目标端口" show-overflow-tooltip min-width="100"> </el-table-column>
      <el-table-column align="center" prop="event_dest_ip_area"  show-overflow-tooltip label="目标地点" min-width="100">
<template   scope="scope">
        <div >
          <span  style="margin-left: 10px">{{ scope.row.event_dest_ip_area }}</span>
        </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="protocol_s" label="协议" show-overflow-tooltip min-width="100"> </el-table-column>
      <el-table-column header-align="center" prop="msg_s" label="具体内容" show-overflow-tooltip min-width="100"> </el-table-column>
      <el-table-column  label="操作" min-width="100" align="center">
<template   scope="scope">
        <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox">
          <a title="查看" class="ipset" style="cursor: pointer;" @click="showDetail(scope.$index, scope.row)">查看</a>
        </div>
      </template>
</el-table-column>
    </el-table>
    <el-pagination class="paglocation float-r" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
    </el-pagination>
    <!--<el-dialog title="事件详情" fullscreen :modal="false" :visible.sync="myShow" width="85%" modal-append-to-body append-to-body class="dialog-panel" top="5%">-->
      <!--<dataTotalTable :tableData="rowData"></dataTotalTable>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import dataTotalTable from './DataTotalTable.vue';
  import {fmtEventThreatList, eventRiskList} from "../../js/functionUtil";
  import {SET_DIALOG} from "../../../module/viewPlugins/store/mutation-types";

  const tableUrl = "/ssa/netAttack/getDataListBySolr.do";

  export default {
    components: {
      dataTotalTable
    },
    data() {
      return {
        defConf: {
          total: 0,
          loading: false,
          tableData: [],
          pageSize: 10,
          pageIndex: 1,
          editRowIndex: -1,
          editRowTemp: {},
          multipleSelection: []
          //默认ajax属性
        },
        //自定义属性
        myShow: false,
        rowData: "",
        eventThreatList: {},
        eventRiskList: {}
      }
    },
    props: {
      params: Object
    },
    methods: {
      showDetail(i, row) {
        this.rowData = row;
        this.myShow = true;
        this.$store.commit(SET_DIALOG, {
          data: row, component: 'DataTotalTable', title: '事件详情'
        })
      },
      //处理翻页时候的事件
      handleCurrentChange(pageIndex) {
        this.loadTableData(pageIndex);
      },
      async loadTableData (pageIndex) {
        let params = {...this.params, pageIndex: pageIndex};
        let data = await this.common.req(tableUrl, params, this);

        this.defConf.tableData = data.rowData;
        this.defConf.total = data.total;
      }
    },
    async mounted () {
      this.loadTableData();
      this.eventRiskList = eventRiskList;
      this.eventThreatList = await fmtEventThreatList(this);
    }
  }
</script>
