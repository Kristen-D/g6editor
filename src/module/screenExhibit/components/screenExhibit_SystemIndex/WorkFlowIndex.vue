<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>综合防控</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <comprecontrol></comprecontrol>
    <!-- <div class="echartsbox4" id="Funnel"></div> -->
    <div v-for="(item, index) in workFlowList">
      <el-row :class="[index === 0?'m-t30':'']">
        <h4 class="el-panel-bigscreen-subtitle">{{item.subtitle}}</h4>
        <div class="right-Pies">
          <workflowmap :id="index" :todo="item.t" :done="item.h"></workflowmap>
          <!-- <div class="echartsbox5" id="fourpie1"></div> -->
          <div class="pie-illustrate">
            <dl class="left">
              <dt>{{item.t}}<span>/ {{item.t+item.h}}</span></dt>
              <dd>待办<span>／总数</span></dd>
            </dl>
            <!-- <div class="center down-color"><i class="el-icon-caret-bottom"></i></div> -->
            <!-- <div class="right"> -->
              <!-- <font>100</font>
              <p>{{item.subtext}}</p> -->
            <!-- </div> -->
          </div>
        </div>
      </el-row>
      <div class="divider" v-if="workFlowList.length-1 !== index"></div>
    </div>

    <!-- <el-row class="m-t30">
        <h4 class="el-panel-bigscreen-subtitle">威胁预警</h4>
        <div class="right-Pies">
          <div class="echartsbox5" id="fourpie1"></div>
          <div class="pie-illustrate">
            <dl class="left">
              <dt>15<span>/ 43</span></dt>
              <dd>待办<span>／已完成</span></dd>
            </dl>
            <div class="center down-color"><i class="el-icon-caret-bottom"></i></div>
            <div class="right">
              <font>87</font>
              <p>威胁防控指数</p>
            </div>
          </div>
        </div>
      </el-row>
      <div class="divider"></div>
      <el-row>
        <h4 class="el-panel-bigscreen-subtitle">事件处置</h4>
        <div class="right-Pies">
          <div class="echartsbox5" id="fourpie2"></div>
          <div class="pie-illustrate">
            <dl class="left">
              <dt>16<span>/ 9</span></dt>
              <dd>待办<span>／已完成</span></dd>
            </dl>
            <div class="center up-color"><i class="el-icon-caret-top"></i></div>
            <div class="right">
              <font>99</font>
              <p>事件防控指数</p>
            </div>
          </div>
        </div>
      </el-row>
      <div class="divider"></div>
      <el-row>
        <h4 class="el-panel-bigscreen-subtitle">案件调查</h4>
        <div class="right-Pies">
          <div class="echartsbox5" id="fourpie3"></div>
          <div class="pie-illustrate">
            <dl class="left">
              <dt>5<span>/ 3</span></dt>
              <dd>待办<span>／已完成</span></dd>
            </dl>
            <div class="center up-color"><i class="el-icon-caret-top"></i></div>
            <div class="right">
              <font>68</font>
              <p>案件防控指数</p>
            </div>
          </div>
        </div>
      </el-row>
      <div class="divider"></div>
      <el-row>
        <h4 class="el-panel-bigscreen-subtitle">智能监管</h4>
        <div class="right-Pies">
          <div class="echartsbox5" id="fourpie4"></div>
          <div class="pie-illustrate">
            <dl class="left">
              <dt>21<span>/ 56</span></dt>
              <dd>待办<span>／已完成</span></dd>
            </dl>
            <div class="center equal-color"><i class="el-icon-minus"></i></div>
            <div class="right">
              <font>72</font>
              <p>监管防控指数</p>
            </div>
          </div>
        </div>
      </el-row> -->
  </div>
</div>
</template>

<script>
import comprecontrol from './CompreControl.vue'
import workflowmap from './WorkFlowMap.vue'
import {mapState} from 'vuex'
export default {
  components: {
    comprecontrol,
    workflowmap
  },
  data() {
    return {
      workFlowList: []
    }
  },
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      // this.loadMapChart();
      if(this.activeScreen===0) {
        this.getInitData();
      }
    }
  },
  methods: {
     getInitData() {
       this.common.req('/ssa/screenExhibit/getWrokFlowInfo.do', {
        dateRange: 'month'
      }, this).then((data) => {
        this.fmtWorkFlowList(data);
      })
      // console.log(data);
      // this.workFlowList = data;
      // this.fmtWorkFlowList(data);
    },
    fmtWorkFlowList(data) {
      let list = [
        {subtitle: '威胁预警', subtext: '威胁防控指数'},
        {subtitle: '事件处置', subtext: '事件防控指数'},
        // {subtitle: '案件调查', subtext: '事件防控指数'},
        {subtitle: '智能监管', subtext: '监管防控指数'},
      ];
      for(let i=0; i<data.length; i++) {
        data[i].subtitle = list[i].subtitle;
        data[i].subtext = list[i].subtext;
      }
      data.push({subtitle: '事件处置', subtext: '事件防控指数', t: 34, h:50});
      this.workFlowList = data;
    }
  },
  mounted: function() {
    // this.getInitData();
  }
}
</script>

<style lang="css">
</style>
