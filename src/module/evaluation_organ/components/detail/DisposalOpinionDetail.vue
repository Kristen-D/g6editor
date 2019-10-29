<template>

  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>处置意见：</div>
      </el-col>
      <el-col :span="16">
        <div v-show="disposalOpinionDetail.disposal_opinion=='1'">通报批评</div>
        <div v-show="disposalOpinionDetail.disposal_opinion=='2'">暂停测评业务</div>
        <div v-show="disposalOpinionDetail.disposal_opinion=='3'">取消测评资质</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      disposalOpinionDetail: {}
    }
  },
  created: async function() {
    this.disposalOpinionDetail = await this.$store.dispatch('getDisposalOpinionDetail', [this.params,this.params.tkey]);
  }
}
</script>
