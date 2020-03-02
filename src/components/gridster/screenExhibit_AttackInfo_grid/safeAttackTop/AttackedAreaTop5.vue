<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle">事发地域</h4>
    <ul class="safe-content-list">
      <li v-for="(item, index) in areaList">
        <span class="list-number">{{index+1}}</span>
        <label>{{item.ipSourceName}}</label>
        <span class="total">{{item.total}}个</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      areaList: []
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/netAttack/getEventSrcIpOnMap.do', {dateRange: 'month'}, this).then((data) => {
        this.areaList = [];
        let Mapdata = data.result;
        let dataSize = 5;
        if(Mapdata.length < 10){
          dataSize = Mapdata.length;
        }
        for (let i = 0; i < dataSize; i++) {
           this.areaList.push(Mapdata[i]);
        }
      })
    }
  },
  created() {
    this.getInitData();
  }
}
</script>
