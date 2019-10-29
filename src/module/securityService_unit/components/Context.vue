<template>
<div class="whitebackground Whitespace">
  <div class="top-title">安服备案</div>
  <div :class="['ordinary-search', 'clearfloat']">
        <el-form :inline="true" :model="queryForm" ref="queryForm">
          <el-form-item label="安服机构名称">
            <el-input placeholder="安服机构名称" v-model="queryForm.q_unit_name"></el-input>
          </el-form-item>
            <el-form-item label="备案编号">
              <el-input placeholder="编号" v-model="queryForm.q_record_code"></el-input>
            </el-form-item>
          <el-form-item label="单位性质">
            <el-select v-model="queryForm.q_unit_type" placeholder="所有" clearable>
              <el-option label="所有" value=""></el-option>
              <el-option label="政府机构" value="政府机构"></el-option>
              <el-option label="事业单位" value="事业单位"></el-option>
              <el-option label="企业" value="企业"></el-option>
              <el-option label="社会团体" value="社会团体"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" v-model="queryForm.q_startTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" v-model="queryForm.q_endTime" placeholder="结束时间" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="单位负责人">
            <el-input placeholder="负责人" v-model="queryForm.q_charge"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>


  </div>

  <el-tabs v-model="activeTable" @tab-click="handleClick">
      <div  class="float-r button-toolbar">
        <el-button type="primary" size="small" @click="handleAdd"><i class="icon-add m-r-8"></i>新建</el-button>
        <!-- <el-button type="primary" size="small" @click="toHandle"><i class="icon-import m-r-8"></i>导入</el-button> -->
        <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
      </div>
      <unitlist :id="tableId1"></unitlist>
  </el-tabs>

</div>
</div>
</template>

<script>
import unitlist from './UnitList.vue'
export default {

  components: {
    unitlist,
  },
  data() {
    return {
      tableId1: "unitTable",
      queryForm: {
        q_unit_name: "",
        q_record_code: "",
        q_unit_type: "",
        q_startTime: null,
        q_endTime: null,
        q_charge:""
      },


    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toHandle(){
      this.$router.push({
        path: '/systemHandle'
      })

    },

    async delCheckedRows(){
      var rows = this.$store.state.table[this.tableId1].multipleSelection;
      if(rows <= 0){
        this.$alert("请选中删除数据!");
        return;
      }
      this.$confirm('此操作将删除选中条目，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(async()=>{
        var  unitIds = [];
        rows.forEach(row =>{
          unitIds.push(row.unit_id);
        });
        var msg = await  this.utils.req("/ssa/securityService/DetleUnitInfo.do", {unitIds:unitIds}, this);
        this.$message({type: 'success',message: msg   });
      })
      this.$store.dispatch('reloadTable', this.tableId1);

    },

    queryData() {
      if (this.queryForm.q_startTime != null && this.queryForm.q_startTime != "") {
        this.queryForm.q_startTime = this.utils.formatDate(new Date(this.queryForm.q_startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.q_endTime != null && this.queryForm.q_endTime != "") {
        this.queryForm.q_endTime = this.utils.formatDate(new Date(this.queryForm.q_endTime), "yyyy-MM-dd hh:mm:ss");
      }
      var params = this.queryForm;
      this.$store.commit('setParams', [this.tableId1, params]);
      this.$store.dispatch('reloadTable', this.tableId1);
    },
    //新增
    handleAdd(){
      this.$router.push({
        name: 'unitForm',
        params: {
          handle: "add"
        }
      })

    }
  }


}
</script>

<style>

</style>
