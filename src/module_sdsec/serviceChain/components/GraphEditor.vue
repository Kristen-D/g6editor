<template>
  <div>
    <div class="el-panel-heading  flexBetween">
      <label class="el-panel-title">逻辑拓扑图</label>
    </div>
  </div>
  <Groupeditor> </Groupeditor>
</template>

<script>
  import Groupeditor from "../../../module/groupEditor/components/Groupeditor";
  export default {
        name: "GraphEditor",
        components: {Groupeditor}
  }
</script>

<style scoped>

</style>
