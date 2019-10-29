<template>
  <div class="net-attack-list-panel">
    <h4 class="el-panel-bigscreen-subtitle2">{{title}}</h4>
    <ul class="safe-mark">
      <li v-for="(item, index) in oList"  @click="getDrillData(item)" style="cursor: pointer;">
        <div>{{index+1}}</div>
        <label>{{(item.name)}}</label>
        <span>{{item.count ? item.count + '个' : '--'}}</span>
      </li>
    </ul>
    <el-dialog :title="detailTitle" :visible.sync="myShow" width="85%" @close="onCloseIp()"  top="15%" >
      <div class="float-r button-toolbar" style="margin-bottom:5px;">
        <el-button type="primary" size="small" @click="clCheckedRows(1)">批量处置</el-button>
      </div>
        <detailTable :id="detailTableId" :params="params" :tableUrl="tableUrl" ></detailTable>
    </el-dialog>
    <el-dialog :title="detailTitle" :visible.sync="myShow2" width="85%" @close="onCloseIp()"  top="15%" >
      <div class="float-r button-toolbar" style="margin-bottom:5px;">
        <el-button type="primary" size="small" @click="clCheckedRows(2)">批量处置</el-button>
      </div>
        <detailTable :id="detailTableId2" :params="params2" :tableUrl="tableUrl2" ></detailTable>
    </el-dialog>
    <el-dialog :title="detailTitle" :visible.sync="myShow3" width="85%" @close="onCloseIp()"  top="15%" >
      <div class="float-r button-toolbar" style="margin-bottom:5px;">
        <el-button type="primary" size="small" @click="clCheckedRows(3)">批量处置</el-button>
      </div>
        <detailTable :id="detailTableId3" :params="params3" :tableUrl="tableUrl3" ></detailTable>
    </el-dialog>
  </div>
</template>

<script>
import detailTable from './DetailTable.vue'
export default {
  components: {
    detailTable},
    name: "net-attack-list-panel",
    props: ['title', 'list'],
    data(){
            return {
              params:{dateRange:'month'},
              params2:{dateRange:'month'},
              params3:{dateRange:'month'},
              detailTitle:"攻击详情",
              tableUrl:"22",
              myShow: false,
              detailTableId:"netAttackListPanelDetail",
              tableUrl2:"22",
              myShow2: false,
              detailTableId3:"netAttackListPanelDetail2",
              tableUrl3:"22",
              myShow3: false,
              detailTableId3:"netAttackListPanelDetail3",
            }
        },
    methods: {
      clCheckedRows(val){
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
        var tableId="";
        if(val=="1"){
          tableId=this.detailTableId;
        }else if(val=="2"){
          tableId=this.detailTableId2;
        }else if(val=="3"){
          tableId=this.detailTableId3;
        }
        this.$root.$children[0].form.alarmIds = alarmIdStr.substr(0,alarmIdStr.length-1);
        this.$root.$children[0].dialogFormVisible=true;
        this.$root.$children[0].form.tableId=tableId;
        this.$root.$children[0].form.tkey=true;
        this.$root.$children[0].form.pageIndex= this.$store.state.editTable[tableId].pageIndex;
      },
          getDrillData (item) {
           if(item.name!="暂无"&&this.title=="攻击类型"){
             this.detailTitle=""+this.title+"中的"+item.name+"告警详情";
             this.tableUrl="/ssa/screenExhibit/getEventThreatType_GD_Detail.do";
             this.params.externalIp_s=this.$store.state.context.params.externalIp_s;
             this.params.timeValue=this.$store.state.context.params.timeValue;
             this.params.timeType=this.$store.state.context.params.timeType;
             this.params.dataType=item.event_threat_type;
             this.myShow = true;
             this.params = {...this.params};
           }else if(item.name!="暂无"&&this.title=="资产名称"){
             this.detailTitle=""+this.title+"中的"+item.name+"告警详情";
             this.tableUrl2="/ssa/screenExhibit/getAssetNameNetAttack_GD_Detail.do";
             this.params2.externalIp_s=this.$store.state.context.params.externalIp_s;
             this.params2.timeValue=this.$store.state.context.params.timeValue;
             this.params2.timeType=this.$store.state.context.params.timeType;
             this.params2.dataType=item.name;
             this.myShow2= true;
             this.params2 = {...this.params2};
           }else if(item.name!="暂无"&&this.title=="事发区域"){
             var ipStr="";
             for (var i = 0; i < this.$store.state.context.dstIpListAll.length; i++) {
                 if(this.$store.state.context.dstIpListAll[i].ipSourceName==item.name){
                   ipStr+=this.$store.state.context.dstIpListAll[i].event_dest_ip;
                   ipStr+=","
                 }
             }
             ipStr=ipStr.substring(0,ipStr.length-1);
             if(ipStr!=""){
                  this.detailTitle=""+this.title+"中的"+item.name+"告警详情";
                  this.tableUrl3="/ssa/screenExhibit/getEventDestIpOnMap_GD_Detail.do";
                  this.params3.externalIp_s=this.$store.state.context.params.externalIp_s;
                  this.params3.timeValue=this.$store.state.context.params.timeValue;
                  this.params3.timeType=this.$store.state.context.params.timeType;
                  this.params3.dataType=ipStr;
                  this.myShow3= true;
                  this.params3 = {...this.params3};
             }
           }
          },

         onCloseIp() {
this.publicShow=false;
         },
      },
    computed: {
      oList() {
        const defList = [
          {name: '暂无', count: 0},
          {name: '暂无', count: 0},
          {name: '暂无', count: 0},
          {name: '暂无', count: 0},
          {name: '暂无', count: 0},
        ];
        this.list.map((value, index) => {
          if (index < 5) {
            defList[index] = value;
          }
        });
        return defList;
      }
    }
  }
</script>

<style scoped>
  .el-panel-bigscreen-subtitle2 {
    border-left: 4px solid #007BE8;
    padding-left: 8px;
    line-height: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9)
  }

  ul.safe-mark {
    position: relative;
    margin-top: 30px;
    color: #ced0d3;
    font-size: 16px;
  }

  ul.safe-mark > li {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  ul.safe-mark > li > div {
    display: inline;
    padding: 2px 5px;;
    border: 1px solid rgba(255, 255, 255, 0.21);
    background-color: rgba(0, 0, 0, 0.8);
    margin-right: 22px;
  }

  ul.safe-mark > li > span {
    position: absolute;
    right: 10%;
  }

  ul.safe-mark > li:hover {
    background-color: rgba(62, 73, 86, 0.23);
  }
</style>
