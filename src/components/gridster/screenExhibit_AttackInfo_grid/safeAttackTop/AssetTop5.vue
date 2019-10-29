<template>
  <div class="">
    <h4 class="el-panel-bigscreen-subtitle">资产名称</h4>
    <ul class="safe-content-list">
      <li v-for="(item, index) in assetList">
        <span class="list-number">{{index+1}}</span>
        <label class="text-ellipsis">{{(item.assert_name)}}</label>
        <span class="total">{{item.count}}个</span>
      </li>
   </ul>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        assetList: []
      }
    },
    created () {
      this.common.req('/ssa/screenExhibit/getEventSubTypeTop5NetAttack.do', {dateRange: 'month'}, this).then((data) => {
        this.assetList = data[0];
      })
    }
  }
</script>

