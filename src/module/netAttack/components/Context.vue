<template>
  <div class="whitebackground Whitespace">
    <div class="top-title">攻击详情</div>
  <!-- <el-row class="el-panel el-panel-scenario" style="background-color:#172d57;">
    <div class="el-panel-heading">
      <div class="el-panel-title">网络攻击</div>
    </div>
    <el-row class="el-panel-body">
      <el-col :span="8">
        <totaldataMap ref="totaldataMap"></totaldataMap>
      </el-col>
      <el-col :span="16">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane :label="m.name" :name="m.value" v-for="m in seriesData"></el-tab-pane>
        </el-tabs>
        <totalHeatMap ref="totalHeatMap"></totalHeatMap>
      </el-col>
    </el-row>
  </el-row> -->

  <el-row >
    <el-row class="el-panel-heading">
      <el-col :span="24" class="el-panel-title">

      <!-- <el-form :inline="true"   class="demo-form-inline"  style="margin-left:100px;!important" > -->
      <el-form :inline="true"   class="demo-form-inline" >
          <el-form-item >
            <el-select v-model="params.event_threat_type" clearable placeholder="请选择威胁类型">
              <el-option :label="se.text" :value="se.id" v-for="se in EventThreatList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="params.event_risk_level" clearable placeholder="请选择风险等级">
              <el-option :label="se.text" :value="se.id" v-for="se in EventRiskList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="params.event_attack_phase" clearable placeholder="请选择攻击阶段">
              <el-option :label="se.name" :value="se.name" v-for="se in event_attack_phase_list"></el-option>
            </el-select>
            <!-- <el-input  v-model="params.event_attack_phase" placeholder="请输入攻击阶段"></el-input> -->
          </el-form-item>
          <!-- <el-form-item >
            <el-input  v-model="params.product_name" placeholder="请输入设备名称"></el-input>
          </el-form-item> -->
          <el-form-item >
            <el-select v-model="params.product_name" clearable placeholder="请选择设备名称">
              <el-option :label="se.text" :value="se.id" v-for="se in DeviceTypeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-input  v-model="params.event_src_ip" placeholder="请输入攻击IP"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input  v-model="params.event_dest_ip" placeholder="请输入目标IP"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
              <el-button type="primary" @click="showExport">导出</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <!-- <el-col :span="24" class="el-panel-body"> -->
      <el-col :span="24" >
        <qryTable id="qryTable" style="width:100%"></qryTable>
      </el-col>
    </el-row>
  </el-row>
  <el-dialog title="导出数据" :visible.sync="myShow" size="small" @close="onCloseIp()" class="dialog-panel" top="15%" >
    <!-- <div style="height:300px"> -->
      <exportExcel ></exportExcel>
    <!-- </div> -->
  </el-dialog>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import totaldataMap from './TotalDataMap.vue'
import totalHeatMap from './TotalHeatMap.vue'
import realTimeDataMap from './RealTimeDataMap.vue'
import qryTable from './QueryTable.vue'
import exportExcel from './ExportExcel.vue'
import mapChart from './CustomMap.vue'
import draggable from 'vuedraggable'
import jqJson from 'components/js/jquery.json.js'
import commonAjax from 'components/js/common.js'
export default {
  components: {
    totaldataMap,
    totalHeatMap,
    mapChart,
    draggable,
    realTimeDataMap,
    qryTable,
    exportExcel
  },
  data() {
    return {
      report: {
        title: "",
        type: "",
        width: "",
        statsFields: "",
        statsIndex: ""
      },
      dateTime: "",
      myShow: false,
      dialogVisible: false,
      tableId: "threatReports",
      activeName: 'all',
      seriesData: [],
      params: {
        event_threat_type: '',
        event_dest_ip:'',
        event_src_ip:'',
        event_attack_phase:'',
        product_name:'',
        event_risk_level:''
      },
      event_attack_phase_list:[
      {name:'情报刺探'},
      {name:'弱点攻击'},
      {name:'命令控制'},
      {name:'渗透感染'},
      {name:'资料发掘'},
      {name:'攻击窃取'}
    ],
    product_name_list:[
    {name:'Sangfor_WAF'},
    {name:'TDA'},
  ]

    }
  },
  computed: {
    ...mapState({
      menuName: state => state.context.menuName,
      qryTableName1: state => state.context.qryTableName1,
      qryTableName2: state => state.context.qryTableName2,
      eventTypeList: state => state.context.eventTypeList,
      EventThreatList: state => state.context.EventThreatList,
      ProductTypeList:state=>state.context.ProductTypeList,
      EventRiskList:state=>state.context.EventRiskList,
      DeviceTypeList:state=>state.context.DeviceTypeList
    })
  },

  methods: {
    showExport() {

    var pageIndex=this.$store.state.context.currentPage;
    var event_threat_type=this.params.event_threat_type;
    var event_dest_ip=this.params.event_dest_ip;
    var event_src_ip=this.params.event_src_ip;
    var event_attack_phase=this.params.event_attack_phase;
    var product_name=this.params.product_name;
    var event_risk_level=this.params.event_risk_level;
    var pageSize= this.$store.state.context.pageSize;
    this.$store.state.context.currentUrl='/ssa/netAttack/downloadExcel.do'+'?pageIndex='+pageIndex+'&pageSize='+pageSize+'&event_threat_type='+event_threat_type+'&event_risk_level='+event_risk_level+'&event_attack_phase='+event_attack_phase+'&product_name='+product_name+'&event_src_ip='+event_src_ip+'&event_dest_ip='+event_dest_ip;
    // $(window).attr('location','/ssa/netAttack/downloadExcel.do'+'?pageIndex='+pageIndex+'&event_threat_type='+event_threat_type+'&event_risk_level='+event_risk_level+'&event_attack_phase='+event_attack_phase+'&product_name='+product_name+'&event_src_ip='+event_src_ip+'&event_dest_ip='+event_dest_ip);
    //  this.$store.state.context.bottonName="确认导出";
    //  this.myShow = true;
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
                $(window).attr('location','/ssa/netAttack/downloadExcel.do'+'?pageIndex='+pageIndex+'&pageSize='+pageSize+'&event_threat_type='+event_threat_type+'&event_risk_level='+event_risk_level+'&event_attack_phase='+event_attack_phase+'&product_name='+product_name+'&event_src_ip='+event_src_ip+'&event_dest_ip='+event_dest_ip);
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
    fmtEventTypeList(val) {

      for (var item in this.eventTypeList) {
        if (val == this.eventTypeList[item].id) {
          return this.eventTypeList[item].text;
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
    fmtProductTypeList(val){
     // console.log(val);
       for(var item in this.ProductTypeList) {
           if (val==this.ProductTypeList[item].id){
             return this.ProductTypeList[item].text;
           }
       }

    },
    handleClick(tab, event) {
      this.$store.state.context.params.event_subtype = tab.name;
      this.$refs.totalHeatMap.loadMapChart();
    },

    onSetting() {
      this.dialogVisible = true
    },
    query() {

      this.$store.commit('setParams',["qryTable", this.params]);
      this.$store.dispatch('reloadTable',"qryTable");

    }
  },

  created: function() {

  },
  mounted: async function() {

    this.$store.dispatch('loadListTypeList').then((data) => {
    //  this.$refs.totaldataMap.loadMapChart();
      this.$store.dispatch('reloadTable', "qryTable");
    });


    var params = [];
    var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnTab.do", params);

    var seriesData = [];
    for (var i = 0; i < data.length; i++) {
      var dataUnit = data[i];
      var childData = {};
      childData.value = dataUnit.event_subtype;
      childData.name = dataUnit.name;
      seriesData.push(childData);
    };

    this.seriesData = seriesData;

  }

}
</script>
