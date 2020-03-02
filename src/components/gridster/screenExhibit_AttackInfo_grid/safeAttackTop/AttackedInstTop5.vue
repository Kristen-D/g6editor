<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle">事发单位</h4>
    <ul class="safe-content-list">
      <li v-for="(item, index) in orgNameList">
        <span class="list-number">{{index+1}}</span>
        <label>{{item.org_name}}</label>
        <span class="total">{{item.count}}个</span>
      </li>
    </ul>
  </div>

</template>

<script>
  import {getShortStr} from "../../../js/functionUtil";

  export default {
    data() {
      return {
        orgNameList: []
      }
    },
    created() {
      this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.orgNameList = data[0];
      })
    }
  }
</script>

