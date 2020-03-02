<template>
  <div class="el-panel-bigscreen safe-attack-top">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全攻击TOP
      </h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <el-row :gutter="20">
        <el-col :span="6">
          <sub-event-type-top5></sub-event-type-top5>
        </el-col>
        <el-col :span="6">
          <asset-top5></asset-top5>
        </el-col>
        <el-col :span="6">
          <attacked-inst-top5></attacked-inst-top5>
        </el-col>
        <el-col :span="6">
          <attacked-area-top5></attacked-area-top5>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import SubEventTypeTop5 from './safeAttackTop/SubEventTypeTop5';
  import AssetTop5 from "./safeAttackTop/AssetTop5";
  import AttackedInstTop5 from "./safeAttackTop/AttackedInstTop5";
  import AttackedAreaTop5 from "./safeAttackTop/AttackedAreaTop5";

  export default {
    components: {
      AttackedAreaTop5,
      AttackedInstTop5,
      AssetTop5,
      SubEventTypeTop5
    },
    id: "safeAttackTop"
  }
</script>

<style>
  .safe-attack-top .safe-content-list {
    list-style: none;
    margin-left: 10px;
  }
  .safe-attack-top .safe-content-list li {
    color: #ffffff;
    position: relative;
    padding: 0 30px;
  }
  .safe-attack-top .safe-content-list li .list-number {
    position: absolute;
    left: 0;
    top: 0;
    width: 25px; height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.21);
    background-color: rgba(0,0,0,0.8);
  }
  .safe-attack-top .safe-content-list li label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  .safe-attack-top .safe-content-list li .total {
    position: absolute;
    right: 5px;
    top: 0;
  }
</style>