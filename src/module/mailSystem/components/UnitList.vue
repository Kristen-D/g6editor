<template lang="html">
  <div>
    <el-form :model="params" ref="params" label-width="120px">
          <el-input v-model="params.q_mail_name" placeholder="邮件系统名称" ></el-input>
        <el-button type="primary" class="button-p-2" @click="qryData" style="margin-left: 5px;">搜索</el-button>
    </el-form>
    <el-table v-loading="defConf.loading" :data="defConf.tableData" @row-dblclick="dialogUnit">
      <el-table-column prop="unit_name" label="备案单位">
      </el-table-column>
      <el-table-column prop="affiliation" label="隶属关系">
      </el-table-column>
      <el-table-column prop="unit_type" label="单位类型">
      </el-table-column>
  </el-table>
  <el-pagination  class=" float-r page-location"
    @current-change="handleCurrentChange"
   :page-size="defConf.pageSize"
   :current-page="defConf.pageIndex"
   layout="total, prev, pager, next, jumper"
   :total="defConf.total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
      return {
        params: {
          q_mail_name: "",
        },
        defConf:{}
      }
  },
props:['id'],
  methods: {
    //处理翻页时候的事件
    handleCurrentChange(pageIndex){
      this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
    },
    dialogUnit(row){
      //alert(JSON.stringify(row));
      this.$emit('dialogUnit',row);
    },
    qryData() {
      var tableId = this.id;
      var params = this.params;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
  },
  mounted: function() {},
  created: function() {
    var defConf = {
    total:0,
    loading: false,
    tableData:[],
    pageSize:10,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/ssa/mailSystem/getUnitList.do",
    params:{bw_type:"0"},
    saveUrl:"/ssa/mailSystem/saveData.do",
    delUrl:"/ssa/mailSystem/deleteData.do",
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}

</script>
<style>
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
}
</style>
