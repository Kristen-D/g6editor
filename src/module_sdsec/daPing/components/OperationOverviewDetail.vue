<template>
  <div class="el-panel">
    <el-tabs class="noBottom  ssas-tabs" v-model="tabActiveName">
      <el-tab-pane label="echarts geo地图" name="1">
        <OperationOverviewEchartsGeo v-if="tabActiveName==='1'"></OperationOverviewEchartsGeo>
      </el-tab-pane>
      <el-tab-pane label="L7地图" name="2">
        <OperationOverviewL7 v-if="tabActiveName==='2'"></OperationOverviewL7>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import OperationOverviewEchartsGeo from './OperationOverviewEchartsGeo';
    import OperationOverviewL7 from './OperationOverviewL7';

    export default {
        components: {
            OperationOverviewEchartsGeo,
            OperationOverviewL7
        },
        data() {
            return {
                tabActiveName: "2",
            }
        },
        methods: {
            clickTab: function () {
            }
        },
        created: function () {
        }
    }
</script>

<style scoped>
</style>
