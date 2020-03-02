<!--安全设备列表-->
<template>
  <div>
    <div class="el-panel-heading  flexBetween">
      <label class="el-panel-title">安全设备列表</label>
    </div>
    <div class="search sass-search">
      <div class="ordinary-search" v-if="searchFlag =='0'">
        <el-form :inline="true" :model="simpleQueryEquipForm" class="demo-form-inline">
          <el-form-item class="m-b-0">
            <el-input clearable placeholder = "设备编号" v-model = "simpleQueryEquipForm.EquipNum"></el-input>
          </el-form-item>
          <el-form-item class="m-b-0">
          <el-form-item label="设备类型" style="display: inline-block; margin-left: 20px;">
            <el-select clearable placeholder="请选择" v-model="simpleQueryEquipForm.EquipType">
              <el-option v-for="item in EquipType" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-button type="primary" size="small" @click="simpleQueryEquip">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        // name: "SecEquipInfo"
    }
</script>

<style scoped>

</style>
