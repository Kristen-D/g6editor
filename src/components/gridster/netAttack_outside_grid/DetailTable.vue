<template>
<div>
  <el-table v-loading="defConf.loading" class="dark-table" :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange">

    <el-table-column  align="center" prop="threatType_s"  show-overflow-tooltip label="威胁类型" min-width="100">
<template   scope="scope">
    <div >
      <span  style="margin-left: 10px">{{ fmtEventThreatList(scope.row.threatType_s) }}</span>
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
     <span  style="margin-left: 10px">{{ fmtEventRiskList(scope.row.riskLevel_s) }}</span>
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

   <el-table-column align="center" prop="event_dest_ip_area"  show-overflow-tooltip label="目标地点" min-width="100">
<template   scope="scope">
   <div >
     <span  style="margin-left: 10px">{{ scope.row.event_dest_ip_area }}</span>
   </div>
   </template>
</el-table-column>
   <el-table-column align="center" prop="protocol_s" label="协议" show-overflow-tooltip min-width="100"> </el-table-column>
   <el-table-column header-align="center" prop="msg_s" label="具体内容" show-overflow-tooltip min-width="100"> </el-table-column>

</el-table>


  <br>
  <el-pagination class="paglocation float-r" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>



</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      defConf: {},
      //自定义属性
      myShow: false,
      rowData: "",
    }
  },
  props:['id', 'params'],
  computed: {
    ...mapState({

      eventTypeList: state => state.netAttackOutSide.eventTypeList,
      ProductTypeList: state => state.netAttackOutSide.ProductTypeList,
      EventThreatList: state => state.netAttackOutSide.EventThreatList,
      EventGradeList: state => state.netAttackOutSide.EventGradeList,
      EventRiskList: state => state.netAttackOutSide.EventRiskList,
    })
  },
  watch: {
    params: function(params) {
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    }
  },
  methods: {

    fmtEventTypeList(val) {
      // console.log(val);
      for (var item in this.eventTypeList) {
        if (val == this.eventTypeList[item].id) {
          return this.eventTypeList[item].text;
        }
      }

    },
    fmtProductTypeList(val) {
      // console.log(val);
      for (var item in this.ProductTypeList) {
        if (val == this.ProductTypeList[item].id) {
          return this.ProductTypeList[item].text;
        }
      }

    },
    fmtEventThreatList(val) {
      // console.log(val);
      for (var item in this.EventThreatList) {
        if (val == this.EventThreatList[item].id) {
          return this.EventThreatList[item].text;
        }
      }

    },
    fmtEventGradeList(val) {
      //  console.log(this.EventGradeList);
      for (var item in this.EventGradeList) {
        if (val == this.EventGradeList[item].id) {
          return this.EventGradeList[item].text;
        }
      }

    },
    fmtEventRiskList(val) {
      if(val==1){
        return "低";
      }else if(val==2){
        return "中";
      }else if(val==3){
        return "高";
      }

    },
    fmtStatus(val) {
      // console.log(val);
      if (val == "0") {
        return "待提交";
      } else if (val == "1") {
        return "流程进行中";
      } else if (val == "2") {
        return "已完成";
      } else {
        return "尚未处理";
      }

    },
    fmtPacketDirection(val) { //数据来源
      // console.log(val);
      if (val == "0") {
        return "内部";
      } else if (val == "1") {
        return "外部";
      }

    },
    fmtIpAddress(val) { //数据来源
      // console.log(val);
      if (val == "192.168.1.1") {
        return "福州";
      } else if (val == "192.168.1.1") {
        return "厦门";
      } else if (val == "192.168.2.77") {
        return "深圳";
      } else if (val == "192.168.1.2") {
        return "福州";
      } else if (val == "192.168.2.11") {
        return "郑州";
      } else if (val == "92.168.2.55") {
        return "北京";
      } else if (val == "192.168.1.3") {
        return "上海";
      } else if (val == "172.111.4.22") {
        return "广州";
      } else {
        return "福州";
      }

    },

    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },

  },
  mounted: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 5,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/netAttack/getEventSrcIpDetail.do",
      params: {
              event_threat_type: null,
              event_dest_ip:null,
              event_src_ip:null,
              event_attack_phase:null
            }
    };
    defConf.params = this.params;
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
<style media="screen">
.paglocation.el-pagination .btn-next, .paglocation.el-pagination .btn-prev{
    /*background-color: #172d57;*/
    background: center center no-repeat #172d57
}
.paglocation.el-pagination > ul.el-pager >li {
    background:#172d57;
}
.myTag {
  color:#9ea3b4 !important;
}
</style>
