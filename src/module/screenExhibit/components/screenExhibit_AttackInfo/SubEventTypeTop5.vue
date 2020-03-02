<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle2">攻击类型</h4>
    <ul class="safe-mark">
      <li v-for="(item, index) in subEventTypeList">
        <div>{{index+1}}</div><label>{{fmtEventTypeList(item.event_subtype)}}</label><span>{{item.count}}个</span>
      </li>
      <!-- <li>
        <div>1</div><label>DDOS攻击</label><span>80个</span></li>
      <li>
        <div>2</div><label>蠕虫病毒</label><span>65个</span></li>
      <li>
        <div>3</div><label>低速扫描</label><span>55个</span></li>
      <li>
        <div>4</div><label>木马攻击</label><span>43个</span></li>
      <li>
        <div>5</div><label>暴力破解</label><span>37个</span></li> -->
    </ul>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      eventTypeList:state=>state.context.list.EventTypeList
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===1) {
        this.getInitData();
      }
    }
  },
  data() {
    return {
      subEventTypeList: []
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.subEventTypeList = data[1];
      })
    },
    fmtEventTypeList(val){

       for(var item in this.eventTypeList) {
           if (val==this.eventTypeList[item].id){
             return this.eventTypeList[item].text;
           }
       }

    },
  },
  created: function() {
  }
}
</script>

<style lang="css">
</style>
