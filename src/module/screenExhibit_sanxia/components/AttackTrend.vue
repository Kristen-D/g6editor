<template>
  <big-screen-grid-header
    title="攻击趋势"
    subtitle="（近7天）">
    <e-charts :options="option" @chartclick="chartClick" auto-resize></e-charts>
    <el-dialog :title="detailTitle" v-model="myShow" size="large" @close="onCloseIp()"  top="15%" >
      <div class="float-r button-toolbar" style="margin-bottom:5px;">
        <el-button type="primary" size="small" @click="clCheckedRows">批量处置</el-button>
      </div>
        <detailTable :id="detailTableId" :params="params" :tableUrl="tableUrl" ></detailTable>
    </el-dialog>
  </big-screen-grid-header>
</template>

<script>
  import BigScreenGridHeader from "./BigScreenGridHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import detailTable from './DetailTable.vue'
  export default {
    components: {
      ECharts,
      BigScreenGridHeader,
      detailTable
    },
    name: "attack-trend",
    data(){
            return {
              params:{dateRange:'month'},
              myShow: false,
              detailTitle:"攻击详情",
              tableUrl:"22",
              detailTableId:"attackTrendDetail",
              unitOptions: [{
                  label: '已处置'
                },
                {
                  label: '未处置'
                }
              ],
            }
        },
    methods: {
      clCheckedRows(){
        var rows = this.$store.state.editTable[this.detailTableId].multipleSelection;
        if (rows.length <= 0) {
          this.$message({message: '请先勾选要处置的事件！',type: 'warning'});
          return;
        }
        var alarmIdStr='';
        rows.forEach(row => {
          if(row.flow_status!=3){
            alarmIdStr=alarmIdStr+row.alarm_id+",";
          }
        })
        if(alarmIdStr==""){
          this.$message({message: '勾选的事件没有未处置的！',type: 'warning'});
          return;
        }
        var params = {};
        this.$root.$children[0].form.alarmIds = alarmIdStr.substr(0,alarmIdStr.length-1);
        this.$root.$children[0].dialogFormVisible=true;
        this.$root.$children[0].form.tableId=this.detailTableId;
        this.$root.$children[0].form.tkey=true;
        this.$root.$children[0].form.pageIndex= this.$store.state.editTable[this.detailTableId].pageIndex;
      },
          chartClick (params) {
            this.showDetail(params.data[0]);//日期
          },
          showDetail(dataTime){
            this.detailTitle=""+dataTime+"的攻击趋势告警详情";
            this.tableUrl="/ssa/screenExhibit/getLineByEventType_GD_Detail.do";
            this.params.externalIp_s=this.$store.state.context.params.externalIp_s;
            this.params.timeValue=this.$store.state.context.params.timeValue;
            this.params.timeType=this.$store.state.context.params.timeType;
            this.params.dataTime=dataTime;
            this.myShow = true;
            this.params = {...this.params};
         },
         onCloseIp() {
          this.publicShow=false;
         },

      },
    computed: {
      option () {
        return this.$store.state.context.attackTrend
      }
    }
  }
</script>

<style scoped>

</style>
