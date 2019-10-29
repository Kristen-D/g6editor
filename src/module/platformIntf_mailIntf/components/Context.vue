<template>
<div class="whitebackground Whitespace">
  <div class="top-title">邮件模版</div>

  <div class="ordinary-search clearfloat" style="margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" ref="queryForm">

      <el-form-item label="">
        <el-input placeholder="邮件主题" v-model="nparams.title"> </el-input>
      </el-form-item>


      <el-form-item label="">
        <el-input placeholder="邮件内容" v-model="nparams.content"> </el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button @click="qryData(1)" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <el-button type="primary" size="small" @click="addRow(1)"><i class="icon-add m-r-8"></i>添加</el-button>
    <el-button type="primary" size="small" @click="delCheckedRows(1)"><i class="icon-delet m-r-8"></i>删除</el-button>
  </div>

  <mailTemplateEditTable :id="whiteId"></mailTemplateEditTable>





</div>
</template>

<script>
import commonAjax from 'components/js/common.js'

import {
  mapState
} from 'vuex'
import mailTemplateEditTable from './MailTemplateEditTable.vue'
export default {
  components: {
    mailTemplateEditTable
  },
  data() {
    return {
      //自定义属性
      activeName: "black",
      blackId: "blackId",
      whiteId: "whiteId",
      mparams: {
        email_template_id: "",
        reciever: "",
      },
      nparams: {
        title: '',
        content: ''
      },
      delSelected: "",
      delSelected1: "/ssa/platformIntf_mailIntf/deleteCheckedRows.do",
      delSelected2: "/ssa/platformIntf_mailIntf/deleteCheckedRowsMailTemplate.do",
      exportDialogShow: false,
      customColShow: false,
      // 自定义列表所有列
      columns: [],
      // 自定义列
      customColumnList: [],
      // 默认列
      defaultColumns: [],
      // 向子组件传递的列
      columnList: [],
      //暂存的列，取消时用
      tempColumns: []
    }
  },
  computed: {
    ...mapState({
      emailTemplateList: state => state.context.emailTemplateList
    })
  },
  methods: {
    qryData(val) {
      if (val == "0") {
        var tableId = this.blackId;
        var params = this.mparams;
      } else {
        var tableId = this.whiteId;
        var params = this.nparams;
      }

      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow(val) {


      if (val == "0") {
        var params = {};
        params.handle = "add";
        this.$router.push({
          name: "alarmEmailForm",
          params: params
        })
      } else {
        this.$router.push({
          name: 'mailTemplateForm',
          params: {
            "tableId": this.whiteId
          }
        });
      }
    },
    delCheckedRows(val) {
      if (val == "0") {
        var tableId = this.blackId;
        this.delSelected = this.delSelected1;
      } else {
        var tableId = this.whiteId;
        this.delSelected = this.delSelected2;
      }
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

          if (val == "0") {
            data_ids.push(row.id);
          } else {
            data_ids.push(row.id);
          }

        })
        var ids = data_ids.join(",");
        var msg = await commonAjax.req(this.delSelected, {
          ids: ids
        });
        await this.$store.dispatch('reloadTable', tableId);
        this.$message({
          type: 'success',
          message: msg
        });
      })
    }
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
  }
}
</script>
