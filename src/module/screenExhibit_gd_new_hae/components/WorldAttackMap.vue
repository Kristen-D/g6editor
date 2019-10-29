<template>
  <div class="world-attack-map">
    <big-screen-grid-header :title="title">
      <div class="box">
        <span class="box-tl"></span><span class="box-br"></span>
        <el-row :gutter="24">
          <el-col :span="24" style="position: relative">
            <e-charts style="width: 82%" :options="optionMap" @chartclick="chartClick" auto-resize></e-charts>
            <div class="btn-map">
              <el-button type="text" @click="mapChange('world')">
                <i class="icon_wd" :class="{active: smallWorld}"></i>
              </el-button>
              <el-button type="text" @click="mapChange('guangdong')">
                <i class="icon_gd" :class="{active: smallGd}"></i>
              </el-button>
            </div>
            <div class="bar">
              <e-charts style="height: 400px;" :options="optionPie" @chartclick="chartClickPie" auto-resize></e-charts>
            </div>
          </el-col>
        </el-row>
      </div>
    </big-screen-grid-header>
    <el-dialog :title="detailTitle" :visible.sync="myShow" width="85%" @close="onCloseIp()"  top="15%" >
      <div class="float-r button-toolbar" style="margin-bottom:5px;">
        <el-button type="primary" size="small" @click="clCheckedRows">批量处置</el-button>
      </div>
        <detailTable :id="detailTableId" :params="params" :tableUrl="tableUrl" ></detailTable>
    </el-dialog>
  </div>
</template>

<script>
  import BigScreenGridHeader from "./BigScreenGridHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {ON_SMALL_MAP_CHANGE} from "../store/mutation-types";
  import detailTable from './DetailTable.vue'
  export default {
    components: {
      ECharts,
      BigScreenGridHeader,
      detailTable
    },
    name: "world-attack-map",
    data(){
            return {
              params:{dateRange:'month'},
              myShow: false,
              detailTitle:"攻击详情",
              tableUrl:"22",
              detailTableId:"worldAttackMapDetail",
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
            if(params.data!=undefined){
              var ipStr="";
              for (var i = 0; i < this.$store.state.context.srcIpList.ipList.length; i++) {
                  if(this.$store.state.context.srcIpList.ipList[i].ipSourceName==params.data.fromName){
                    ipStr+=this.$store.state.context.srcIpList.ipList[i].event_src_ip;
                    ipStr+=","
                  }
              }
              ipStr=ipStr.substring(0,ipStr.length-1);
              if(ipStr!=""){
                  this.showDetail(params.data.fromName,ipStr);//攻击地点
              }
            }

          },
          chartClickPie (params) {
              var ipStr="";
              for (var i = 0; i < this.$store.state.context.srcIpList.ipList.length; i++) {
                  if(this.$store.state.context.srcIpList.ipList[i].ipSourceName==params.name){
                    ipStr+=this.$store.state.context.srcIpList.ipList[i].event_src_ip;
                    ipStr+=","
                  }
              }
              ipStr=ipStr.substring(0,ipStr.length-1);
              if(ipStr!=""){
                  this.showDetail(params.name,ipStr);//攻击地点
              }

          },

          showDetail(fromName,ipStr){
            this.detailTitle="来自"+fromName+"的攻击态势详情";
            this.tableUrl="/ssa/screenExhibit/getEventSrcIpOnMap_GD_Detail.do";
            this.params.externalIp_s=this.$store.state.context.params.externalIp_s;
            this.params.timeValue=this.$store.state.context.params.timeValue;
            this.params.timeType=this.$store.state.context.params.timeType;
            this.params.dataType=ipStr;
            this.myShow = true;
            this.params = {...this.params};
         },
         onCloseIp() {
this.publicShow=false;
         },
         mapChange(type) {
           this.$store.commit(ON_SMALL_MAP_CHANGE, {
             type: type, dispatch: this.$store.dispatch, commit: this.$store.commit
           });
         }
      },
    computed: {
      optionPie() {
        return this.$store.state.context.attackPie;
      },
      optionBar() {
        return this.$store.state.context.attackBar;
      },
      optionMap() {
        return this.$store.state.context.mapChart;
      },
      smallWorld() {
        return this.$store.state.context.smallWorld;
      },
      smallGd() {
        return this.$store.state.context.smallGd;
      },
      title() {
        let pre = '';
        if (this.smallGd && this.smallWorld) {
          pre = '全球和广东';
        } else if (this.smallGd) {
          pre = '广东';
        } else if (this.smallWorld) {
          pre = '全球'
        }
        return pre + '攻击态势';
      }
    },
  }
</script>

<style scoped>
  .world-attack-map,
  .world-attack-map .el-row,
  .world-attack-map .el-col {
    height: 100%;
  }

  .box {
    position: relative;
    background-color:rgba(0,0,0,0.18);
    border:1px solid rgba(255,255,255,0.16);
    width: 100%; height: 100%;
    border-image:-webkit-linear-gradient(left,rgba(255,255,255,0.16),#fff,rgba(255,255,255,0.16)) 35 35 35 35;
  }

  .box-tl {
    position: absolute;
    left: 0px;
    top: 0px;
    background: url(/static/images/screen_gd/box-tl.png) no-repeat;
    width: 18px;
    height: 18px;
  }

  .box-br {
    position: absolute;
    right: 0px;
    bottom: 0px;
    background: url(/static/images/screen_gd/box-br.png) no-repeat;
    width: 18px;
    height: 18px;
  }

  .btn-map {
    position: absolute;
    bottom: 30px;
    right: 50px;
  }

  .btn-map .icon_wd {
    display: block;
    width: 73px;
    height: 57px;
    margin: 0 auto;
    background: url(/static/images/screen_gd/world-icon.png) no-repeat;
  }

  .btn-map .icon_gd {
    display: block;
    width: 73px;
    height: 57px;
    margin: 0 auto;
    background: url(/static/images/screen_gd/guangdong-icon.png) no-repeat;
  }

  .btn-map .icon_gd.active,
  .btn-map .icon_wd.active {
    border: 1px solid white;
  }

  .bar {
    position: absolute;
    right: 20px;
    top: 15px;
    width: 300px;
  }

</style>
