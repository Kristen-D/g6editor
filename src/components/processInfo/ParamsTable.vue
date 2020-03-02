<template>
    <el-table   :data="tableData" border  style="width: 100%;margin-top:15px;">
      <el-table-column v-for="col in columns"  :prop="col.name"   :label="col.label" >   </el-table-column>

    </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
    }
  },
  props:['columns',"tableData"],
  created :function() {
 
  }
}
</script>
