<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle2">事发单位</h4>
    <ul class="safe-mark">
      <li v-for="(item, index) in orgNameList">
        <div>{{index+1}}</div><label >{{getShortStr(item.org_name)}}</label><span>{{item.count}}个</span>
      </li>
    </ul>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
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
      orgNameList: []
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.orgNameList = data[0];
      })
    },
    getShortStr(val) {
      var str="";
     if(val.length>8){
        str=val.substring(0,8);
        str+="...";
     }else{
         str=val;
     }
     return str;
    },

  },
  created: function() {
  }
}
</script>

<style lang="css">
</style>
