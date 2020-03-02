<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">
        <i class="el-icon-caret-right title-symbol"></i>
        <template v-if="title">{{title}}</template>
        <span class="el-panel-bigscreen-small" v-if="subtitle">{{subtitle}}</span></h3>
        <div v-if="title=='全球攻击态势'|| title=='全球和广东攻击态势' ||title=='广东攻击态势'" class="timesearch">
          <el-form :inline="true"  class="demo-form-inline elform">
           <lable style="margin-right:8px">近</lable>
           <el-form-item label="">
              <el-input v-model="value" placeholder="12"  size="small" style="width:50px"></el-input>
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
<div v-if="title=='全球攻击态势'|| title=='全球和广东攻击态势'||title=='广东攻击态势'"class="day_time">
  <!-- <span>告警：{{alarmAllTotal}}条，</span>
  <span>阻断：{{blockTotal}}条，</span>
  <span>阻断率：{{blockCenter}}%</span> -->
  <!-- <span>今日</span>
  <span>{{date}}</span> -->
</div>
    </div>
    <div class="el-panel-bigscreen-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import {mapState,mapActions } from 'vuex'
  export default {
    name: "big-screen-grid-header",
    props: ['title', 'subtitle'],
    computed:{
      ...mapState({
          date:state=>state.context.date,
          alarmAllTotal:state=>state.context.alarmAllTotal,
          blockTotal:state=>state.context.blockTotal,
          blockCenter:state=>state.context.blockCenter,
     })},
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
      search() {
        this.$store.state.context.params.timeValue=this.value;
        this.$store.state.context.params.timeType=this.unit;
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
      var d = new Date();
      //this.value=d.getHours()+1;
      this.value=12;
      this.unit=1;
    }
  }
</script>

<style scoped>
  .el-panel-bigscreen {
    margin-bottom: 16px;
    background-color: transparent;
    height: 100%;
    position: relative;
    padding-top: 42px;
  }

  .el-panel-bigscreen-heading {
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .el-panel-bigscreen-title {
    font-family: "Microsoft YaHei UI";
    font-weight: 400;
    line-height: 22px;
    color: inherit;
    font-size: 22px;
  }

  .el-panel-bigscreen-small {
    color: #999;
    font-size: 16px;
    margin-left: 0;
  }

  .el-panel-bigscreen-body {
    padding: 10px;
    height: 100%;
  }

  .title-symbol {
    font-size: 12px;
    margin-right: 10px;
    vertical-align: top;
    margin-top: 4px;
  }

</style>
