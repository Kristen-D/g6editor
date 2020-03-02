<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle">攻击类型</h4>
    <ul class="safe-content-list">
      <li v-for="(item, index) in subEventTypeList">
        <span class="list-number">{{index+1}}</span>
        <label>{{eventTypeList[item.event_subtype]}}</label>
        <span class="total">{{item.count}}个</span>
      </li>
    </ul>
  </div>

</template>

<script>
  import {fmtEventTypeList} from "../../../js/functionUtil";

  export default {
    data() {
      return {
        subEventTypeList: [],
        eventTypeList: {}
      }
    },
    async created() {
      let data = await this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this);
      this.subEventTypeList = data[1];
      this.eventTypeList = await fmtEventTypeList(this);
    }
  }
</script>

<style scoped>

</style>
