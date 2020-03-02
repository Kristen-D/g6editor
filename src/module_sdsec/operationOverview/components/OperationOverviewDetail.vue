<template>
  <div class="el-panel">
    <el-tabs class="noBottom  ssas-tabs" v-model="tabActiveName">
      <el-tab-pane label="产品概览" name="1">
        <OperationOverviewBaseInfo v-if="tabActiveName==='1'"></OperationOverviewBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="事件概览" name="4">
        <OperationOverviewEvent v-if="tabActiveName==='4'"></OperationOverviewEvent>
      </el-tab-pane>
      <el-tab-pane label="租户概览" name="3">
        <OperationOverviewTenant v-if="tabActiveName==='3'"></OperationOverviewTenant>
      </el-tab-pane>
      <el-tab-pane label="监控概览" name="2">
        <OperationOverviewMonitor v-if="tabActiveName==='2'"></OperationOverviewMonitor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import OperationOverviewBaseInfo from './OperationOverviewBaseInfo';
    import OperationOverviewMonitor from './OperationOverviewMonitor';
    import OperationOverviewTenant from './OperationOverviewTenant';
    import OperationOverviewEvent from './OperationOverviewEvent'

    export default {
        components: {
            OperationOverviewBaseInfo,
            OperationOverviewMonitor,
            OperationOverviewTenant,
            OperationOverviewEvent
        },
        data() {
            return {
                tabActiveName: "1",
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
