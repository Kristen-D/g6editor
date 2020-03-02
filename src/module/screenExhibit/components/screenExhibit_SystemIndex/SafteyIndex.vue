<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全指数</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="safe-indexes">
      <p class="numword">{{ overall.totalScore }}</p>
      <p>{{ overallStatus }}</p>
      <i class="fa fa-dashboard"></i>
    </div>
    <div v-for="(item, index) in eventScoreList">
      <el-row >
        <!--  :class="[index===0?'m-t46':'m-t30']" -->
        <branchTotal :eventName="item.name" :eventScore="item.score" :id="item.id"></branchTotal>

        <ul class="pielist">
          <li class="echartsbox2" v-for="s in item.children">
            <branchList :id="s.id" :branchName="s.name" :branchScore="s.score" :engName="s.engName" ></branchList>
          </li>
        </ul>
      </el-row>
      <div class="divider" v-if="index!==eventScoreList.length-1"></div>
    </div>
    <!-- <el-row class="m-t46">
      <div class="echartsbox1" id="Pie1"></div>
      <ul class="pielist">
        <li class="echartsbox2" id="oneliPie1"></li>
        <li class="echartsbox2" id="oneliPie2"></li>
        <li class="echartsbox2" id="oneliPie3"></li>
        <li class="echartsbox2" id="oneliPie4"></li>
        <li class="echartsbox2" id="oneliPie5"></li>
        <li class="echartsbox2" id="oneliPie6"></li>
      </ul>
    </el-row>
    <div class="divider"></div>
    <el-row class="m-t30">
      <div class="echartsbox1" id="Pie2"></div>
      <ul class="pielist">
        <li class="echartsbox2" id="twoliPie1"></li>
        <li class="echartsbox2" id="twoliPie2"></li>
        <li class="echartsbox2" id="twoliPie3"></li>
        <li class="echartsbox2" id="twoliPie4"></li>
        <li class="echartsbox2" id="twoliPie5"></li>
        <li class="echartsbox2" id="twoliPie6"></li>
      </ul>
    </el-row>
    <div class="divider"></div>
    <el-row class="m-t30">
      <div class="echartsbox1" id="Pie3"></div>
      <ul class="pielist pielist2">
        <li class="echartsbox2" id="threeliPie1"></li>
        <li class="echartsbox2" id="threeliPie2"></li>
        <li class="echartsbox2" id="threeliPie3"></li>
      </ul>
    </el-row> -->
  </div>
</div>
</template>

<script>
import branchTotal from './SafetyIndex_total.vue'
import branchList from './SafetyIndex_branchList.vue'
import {mapState} from 'vuex'
export default {
  components: {
    branchTotal, branchList
  },
  data() {
    return {
      overall: {},
      eventScoreList: []
    }
  },
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      eventTypeList:state=>state.context.list.EventTypeList,
      overallStatus: function() {
        let score = this.overall.totalScore;
        if(score>90) {
          return '状态良好';
        }else if (score>80) {
          return '有待提升';
        }else {
          return '极度危险';
        }
      }
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===0) {
        this.getInitData();
      }
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/screenExhibit/getSystemScoreOverView.do',
      {dateRange: 'month'}, this).then((data) => {
        this.overall = data;
        this.fmtScoreList();
      })

    },
    fmtScoreList() {
      let scoreList = this.overall.scoreList;
      let list = [];
      scoreList.forEach((s) => {
        if(s.pid ===- 1) {
          list.push(s);
        }
      });
      list.forEach((cs) => {
        let children = [];
        scoreList.forEach((s) => {
          if(cs.id === s.pid) {
            children.push(s);
          }
        });
        cs.children = children;
      });
      this.eventScoreList = list;
    }
  },
  created: function() {
  }
}
</script>

<style lang="css">
</style>
