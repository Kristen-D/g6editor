<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle2">事发地域</h4>
    <ul class="safe-mark">
      <li v-for="(item, index) in areaList">
        <div>{{index+1}}</div><label>{{item.ipSourceName}}</label><span>{{item.total}}个</span>
      </li>
      <!-- <li>
        <div>1</div><label>杏花岭区</label><span>89个</span></li>
      <li>
        <div>2</div><label>迎泽区</label><span>76个</span></li>
      <li>
        <div>3</div><label>万柏林区</label><span>54个</span></li>
      <li>
        <div>4</div><label>尖草坪区</label><span>38个</span></li>
      <li>
        <div>5</div><label>晋源区</label><span>23个</span></li> -->
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
      areaList: []
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/netAttack/getEventSrcIpOnMap.do', {dateRange: 'month'}, this).then((data) => {
        this.areaList=[];
        var Mapdata=data.result;
        var dataSize=5;
        if(Mapdata.length<10){
          dataSize=Mapdata.length;
        }
        for (var i = 0; i < dataSize; i++) {
           this.areaList.push(Mapdata[i]);
        }
      })
    },

  },
  created: function() {
  }
}
</script>

<style lang="css">
</style>
