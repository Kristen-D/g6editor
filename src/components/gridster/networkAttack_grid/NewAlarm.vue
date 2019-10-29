<template>
       <div class="el-panel">
        <div class="el-panel-heading">
          <h4 class="el-panel-title">最新告警</h4>
        </div>
        <div class="el-panel-body">
          <el-row :gutter="10">
            <el-col :span="6">
              <div style="height: 183px; width: 100%;">
                <warning-handled></warning-handled>
              </div>
            </el-col>
            <el-col :span="18" style="margin-top: 15px;">
              <warning-table></warning-table>
            </el-col>
          </el-row>
        </div>
      </div>
</template>
<script>

import WarningHandled from "./components/left/Warnning-Handled-liquidFill.vue";
import WarningTable from "./components/left/Warning-Table.vue";

export default {
  name: "context",
  components: {
    WarningHandled,
    WarningTable
  },
  data() {
    return {

    };
  },
  methods: {

  },
  created() {

  },
  async mounted() {

  }
};
</script>
<style >

</style>
