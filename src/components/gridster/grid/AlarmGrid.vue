<template>
  <div :id="id">
    <el-table :data="tableData"  height="290" border   >
      <el-table-column prop="sequence"  label="ID" width="100"> </el-table-column>
      <el-table-column prop="fmt_time"  label="发生时间" min-width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip   prop="event_name" label="事件类型" min-width="150"> </el-table-column>
      <el-table-column prop="grade_desc" label="事件等级" min-width="100"> </el-table-column>
       <el-table-column prop="threat_desc" label="威胁类型" min-width="100"> </el-table-column>
      <el-table-column prop="product_ip" label="资产IP" min-width="100"> </el-table-column>
      <el-table-column prop="product_type_name" label="资产类型" min-width="100"> </el-table-column>
      <el-table-column prop="product_area_code" label="资产地区" min-width="100"> </el-table-column>
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
        }
      },
      props: ['tableData']
    }
  </script>
