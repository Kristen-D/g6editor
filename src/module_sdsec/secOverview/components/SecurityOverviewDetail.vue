<template>
  <div class="el-panel">
    <el-tabs class="noBottom  ssas-tabs" v-model="tabActiveName" @tab-click="clickTab">
      <el-tab-pane label="服务概览" name="1">
        <SecurityOverviewBaseInfo v-if="tabActiveName==='1'"></SecurityOverviewBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="事件概览" name="2">
        <SecurityOverviewMonitor v-if="tabActiveName==='2'"></SecurityOverviewMonitor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import SecurityOverviewBaseInfo from './SecurityOverviewBaseInfo';
    import SecurityOverviewMonitor from './SecurityOverviewMonitor';

    export default {
        components: {
            SecurityOverviewBaseInfo,
            SecurityOverviewMonitor,
        },
        data() {
            return {
                tabActiveName: "1"
            }
        },
        methods: {
            clickTab: function (tab, event) {

            }
        },
        created: function () {
        }
    }
</script>

<style scoped>
</style>
