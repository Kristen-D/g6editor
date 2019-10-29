<template>
  <div class="whitebackground Whitespace">
    <div class="top-title">模板管理</div>
    <div :class="['ordinary-search', 'clearfloat']">

      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="">
          <el-select v-model="queryForm.template_type" clearable  placeholder="模板类型">
            <el-option v-for="item in templateList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-input v-model="queryForm.ip" placeholder="IP地址"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
      <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
        <el-button size="small" @click="addRow" type="primary"><i class="icon-add m-r-8"></i>新增</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
      </div>
      <alarmTemplateTable :id="interfaceId"></alarmTemplateTable>
  </div>


</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import alarmTemplateTable from './AlarmTemplateTable.vue'
export default {
  components: {
    alarmTemplateTable
  },
  data() {
    return {
      //自定义属性
      templateList:[{id:"1",text:"邮件模板"},{id:"2",text:"短信模板"}],
      interfaceId: "interfaceId",
      emailId: "emailId",
      queryForm: {
        template_type: null,
        template_name: null
      },
      delSelected: "/ssa/alarm_template/deleteCheckedRows.do",

    }
  },
  computed: {
    ...mapState({
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList,
      // userList:state=>state.context.userList
    })
  },
  methods: {
    queryData() {
      var tableId = this.interfaceId;
      var params = this.queryForm;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow() {
      var params = {};
      params.handle = "add";
      this.$router.push({name:"alarmTemplateForm",params:params})

    },
    delCheckedRows() {
      var tableId = this.interfaceId;
      var rows = this.$store.state.editTable[tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中数据");
        return;
      }

      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var data_ids = [];
        rows.forEach(row => {
          data_ids.push(row.template_id);
        })
        var ids = data_ids.join(",");
        var result = await commonAjax.reqBackState(this.delSelected, {
          ids: ids
        });
        if(result.state) {
          this.$store.dispatch('reloadTable', tableId);
          this.$message({
            type: 'success',
            message: result.message
          });
        }else {
          this.$message({
            type: 'error',
            message: result.message
          });
        }

      })
    }
    //methods end
  },
  created: async function() {
    // this.$store.dispatch('loadListTypeList');
    // var params={};
    // this.templateList = await commonAjax.req("/ssa/alarm_template/getTemplateList.do", params, this);
  }
}
</script>
