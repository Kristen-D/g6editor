<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle2">资产名称</h4>
    <ul class="safe-mark">
      <li v-for="(item, index) in assetList">
        <div>{{index+1}}</div><label>{{getShortStr(item.assert_name)}}</label><span>{{item.count}}个</span>
      </li>
      <!-- <li>
        <div>1</div><label>10.23.32.71服务器</label><span>96个</span></li>
      <li>
        <div>2</div><label>11.15.22.53服务器</label><span>87个</span></li>
      <li>
        <div>3</div><label>10.23.32.71服务器</label><span>82个</span></li>
      <li>
        <div>4</div><label>192.168.2.5域名</label><span>78个</span></li>
      <li>
        <div>5</div><label>192.168.5.7域名</label><span>68个</span></li> -->
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
      assetList: []
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/screenExhibit/getEventSubTypeTop5NetAttack.do', {dateRange: 'month'}, this).then((data) => {
        this.assetList = data[0];
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
