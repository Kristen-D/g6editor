<template>

  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>审核意见:</div>
      </el-col>
      <el-col :span="16">
        <div>{{disposalApprovalDetail.reason}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      disposalApprovalDetail: {}
    }
  },
  created: async function() {
    this.disposalApprovalDetail = await this.$store.dispatch('getDisposalApprovalDetail', [this.params,this.params.tkey]);
  }
}
</script>
