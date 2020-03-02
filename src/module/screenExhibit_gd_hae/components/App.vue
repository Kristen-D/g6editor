<template>
<div>
  <header>
    <a href="" class="logo">
      <img src="/static/images/screen_gd/LOGO.png" alt="logo">
      <span class="logo-text">广东农信网络安全态势</span>
    </a>
    <!-- <div style="display: inline-block;">
      <el-input style="display: inline-block; width: 100px; margin-left: 100px;" v-model="value"></el-input>
      <el-select v-model="unit" placeholder="请选择">
        <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="search">搜索</el-button>
    </div> -->

  <div class="time-search">
   <el-form :inline="true"  class="demo-form-inline elform">
    <lable style="margin-right:8px">近</lable>
    <el-form-item label="">
       <el-input v-model="value" placeholder="30"  size="small" style="width:50px"></el-input>
    </el-form-item>
    <el-form-item label="" >
      <!-- <el-select placeholder="分钟"  size="small" style="width:80px;" >
         <el-option label="分钟" value="1" v-model="unit"></el-option>
         <el-option label="小时" value="2" v-model="unit"></el-option>
         <el-option label="天" value="3" v-model="unit"></el-option>
      </el-select> -->
      <el-select v-model="unit" placeholder="请选择" style="width:100px;">
        <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="deepblue" size="small" @click="search">搜索</el-button>
    </el-form-item>
</el-form>
</div>
    <div class="time">
      <span>今日</span>
      <span>{{date}}</span>
    </div>
  </header>
  <div class="container-wrap">
    <el-row :gutter="24">
      <el-col :span="7">
        <high-alarm-trend style="height: 230px;"></high-alarm-trend>
        <middle-alarm-trend style="height: 230px;"></middle-alarm-trend>
        <attack-trend style="height: 230px;"></attack-trend>
        <threated-trend style="height: 230px;"></threated-trend>
      </el-col>
      <el-col :span="17">
        <world-attack-map style="height: 640px;"></world-attack-map>
        <net-attack-top style="height: 260px"></net-attack-top>
      </el-col>
    </el-row>
  </div>
  <el-dialog  title="事件详情"  :modal="false" :visible.sync="publicShow" width="85%" @close="onCloseIp()" top="15%" >
    <!-- <div style="height:600px"> -->
      <singleDataTable :tableData="publicRowData"></singleDataTable>
    <!-- </div> -->
  </el-dialog>
  <el-dialog title="处置事件" :modal="false" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="反馈结果:"  label-width="120px">
        <el-input v-model="form.name"   type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEvent">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import HighAlarmTrend from "./HighAlarmTrend";
import MiddleAlarmTrend from "./MiddleAlarmTrend";
import WorldAttackMap from "./WorldAttackMap";
import AttackTrend from "./AttackTrend";
import ThreatedTrend from "./ThreatedTrend";
import NetAttackTop from "./NetAttackTop";
import * as types from '../store/mutation-types';
import singleDataTable from './SingleDataTable.vue'
export default {
  components: {
    NetAttackTop,
    ThreatedTrend,
    AttackTrend,
    WorldAttackMap,
    MiddleAlarmTrend,
    HighAlarmTrend,
    singleDataTable
  },
  watch: {
    value: function(val, oldVal) {
      if (val > 30 && this.unit == 0) {
        this.value = 30;
      } else if (val > 24 && this.unit == 1) {
        this.value = 24;
      } else if (val > 30 && this.unit == 2) {
        this.value = 30;
      }
    }
  },

  data() {
    return {
      publicShow:false,
      publicRowData:"",
      form:{name:"",rowData:[],tableId:"",pageIndex:"",alarmIds:"",tkey:false},
      dialogFormVisible:false,
      date: null,
      unitOptions: [{
          value: 0,
          label: '分钟内'
        },
        {
          value: 1,
          label: '小时内'
        },
        {
          value: 2,
          label: '天内'
        }
      ],
      value: 1,
      unit: 2
    }
  },
  methods: {

    async handleEvent(){
      if(this.form.name==""){
        this.$message({message: '反馈结果不能为空！',type: 'warning'});
        return;
      }

      var params = {};
      if(!this.form.tkey){
        params.alarmIds = this.form.rowData.alarm_id;
      }else{
        params.alarmIds = this.form.alarmIds;
      }
      params.feedBackcontext=this.form.name;
      console.log(this.form);
      this.dialogFormVisible=false;
      var msg = await this.common.req("/ssa/alarmInfoList/completeclTask.do",params, this);
      this.$message({message: msg,type: 'success' });
      this.$store.dispatch('handleCurrentChange',[this.form.tableId,this.form.pageIndex]);
      this.form.name="";
      this.form.rowData.alarm_id="";
      this.form.tkey=false;

     },
    onCloseIp() {

    },
    getCurrentDate() {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      let weekend = ['日', '一', '二', '三', '四', '五', '六'];
      let week = d.getDay();

      hour < 10 && (hour = '0' + hour);
      minutes < 10 && (minutes = '0' + minutes);

      return `${year}年 ${month}月 ${day}日   周${weekend[week]} ${hour}:${minutes}`;
    },
    refreshData() {
      if(!this.$store.state.context.isSearch){
        var d = new Date();
        this.value=d.getHours()+1;
        this.unit=1;
        this.$store.state.context.params.timeValue=this.value;
        this.$store.state.context.params.timeType=this.unit;
      }
      this.$store.dispatch(types.GET_ALL_DATA);
      this.date = this.getCurrentDate();
      setTimeout(() => {
        this.refreshData();
      }, 60000);
    },
    search() {
      this.$store.state.context.isSearch=true;
      var params = this.$store.state.context.params;
      params.timeValue = this.value;
      params.timeType = this.unit ;
      this.$store.state.context.alarmSmallTitle=this.value+this.unitOptions[this.unit].label;
      this.$store.commit(types.SET_PARAMS, params);
      this.$store.dispatch(types.GET_ALL_DATA);
    }
  },
  created() {
    // this.getAllData();
    this.$store.dispatch('loadListNewTypeList');
    this.refreshData();
  }
}
</script>

<style >


header {
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  min-width: 960px;
  line-height: 70px;
  box-shadow: none;
  border-bottom: 1px solid rgba(96, 112, 129, 0.61);
  border-image: -webkit-linear-gradient(left, rgba(96, 112, 129, 0.61), #fff, rgba(96, 112, 129, 0.61)) 100 100;
  /*background-color: #091045;*/
}

header .logo {
  display: block;
  float: left;
  height: 70px;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
}

header .logo img {
  vertical-align: middle;
  width: 40px;
  height: 36px;
}

header .logo .logo-text {
  margin: auto 20px auto 10px;
  vertical-align: middle;
  line-height: 70px;
  color: #fff;
  font-family: "FZPSZHUNHJW";
  font-style: italic;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 0 0 6px #00a67c, -1px -1px #FFF, -2px 0 #00a67c, 1px -1px #444;
}

header .time {
  float: right;
  margin-right: 30px;
  color: #99cae8;
  font-size: 20px;
  cursor: pointer;
}

.container-wrap {
  padding-top: 30px;
  padding-left: 40px;
  padding-right: 30px;
}
/**********右上角时间查询代码************/
header .time-search{
	float: left;
	background-color: #0c1f70;
	border: 1px solid #353c68;
	height: 50px;
	margin: 10px auto;
	padding-left: 25px;
	padding-right: 30px;
	line-height: 50px;
	margin-right:30px;
	font-size: 14px;
	cursor: pointer;
}
.timesearch{text-align: center; margin-top: -26px;}
.timesearch-form .el-form-item{margin-bottom: 0;}
.day_time{ text-align: right; margin-top: -20px; margin-right: 30px;  color:#99cae8; font-size: 20px; cursor: pointer;}


.el-button{ border-radius: 0;}
.el-button--deepblue{ background-color: #050948; color:#2196f3; border-color:#353c68; }
.el-button--deepblue:hover,.el-button--deepblue:focus { background: #050948;border-color: #353c68;color: #fff;}
.el-button--deepblue.is-active, .el-button--deepblue:active {background: #050948; border-color: #353c68; color: #fff;}

.elform.el-form--inline .el-form-item,
.elform.el-form--inline .el-form-item__content {
    display: inline-block;
    margin-right: 5px;
    vertical-align: inherit;
}
.elform .el-input__inner{color:#2196f3;background-color:#050948;border:1px solid #25367f; border-radius:0;}
.elform .el-select .el-input__inner{color:#fff;background-color:#162c8a; border:1px solid transparent; border-radius:0;}
.elform input::-ms-input-placeholder{color:#2196f3; text-align: center;}
.elform input::-webkit-input-placeholder{color:#2196f3; text-align: center;}
.elform input::-moz-placeholder{color:#2196f3;text-align: center;}
.elform .el-select input::-ms-input-placeholder{color:#fff; }
.elform .el-select input::-webkit-input-placeholder{color:#fff; }
.elform .el-select input::-moz-placeholder{color:#fff;}

.el-select-dropdown {border: 1px solid #162c8a; background-color: #162c8a;}
.el-select-dropdown__item { color: #fff;}
.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{background-color: #0c1f70; color: #fff;}
.el-form-item__label {color: #fff; }
.container-table-wrap{padding: 0 30px 50px;}
</style>

<style>
html,
body {
  width: 1920px;
  height: 1080px;
  overflow: visible;
  color: #fff;
  background: url(/static/images/screen_gd/bigscreen-bg.png) no-repeat #070c24;

}
</style>
