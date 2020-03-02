<template>
<div>
  <el-table v-loading="defConf.loading" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">

    <el-table-column type="selection"> </el-table-column>

    <!--prop属性对应row里要显示的值,inline-template可以自定义显示的值的格式,可以不用设prop属性,但是需要排序的列必须要设置prop属性 -->
    <el-table-column prop="id" label="ID" align="center">
    </el-table-column>

    <!--

 <el-table-column prop="sender" show-overflow-tooltip label="发送邮箱" min-width="150" align="center">
  </el-table-column> -->

    <el-table-column prop="send_time" label="发送周期(小时)" show-overflow-tooltip align="center">
    </el-table-column>

    <el-table-column prop="title" label="邮件主题" show-overflow-tooltip align="center">
    </el-table-column>

    <el-table-column prop="content" label="邮件内容" min-width="200" align="center">
    </el-table-column>

    <el-table-column label="操作" align="center" width="180">
      <template scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
        <span style="color: #F3F3F3">|</span>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>

</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      defConf: {}
    }
  },
  props: ['id'],
  computed: {
    ...mapState({
      emailTemplateList: state => state.context.emailTemplateList
    })
  },
  methods: {
    //默认的方法,基本无需修改
    handleEdit(i, row) {

      var params = {};
      params = row;
      params.handle = "update";
      this.$router.push({
        name: "mailTemplateForm",
        params: params
      });

    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, row]);
    },
    saveEdit(i, row) {
      if (this.checkNoNull(row)) {
        this.$store.dispatch('saveEdit', [this, i, row]);
      }
    },
    cancelEdit() {
      this.$store.commit('cancelEdit', this.id);
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },
    //默认方法结束

    //自定义方法
    fmtemailTemplateList(val) {

      for (var item in this.emailTemplateList) {
        if (val == this.emailTemplateList[item].id) {
          return this.emailTemplateList[item].text;
        }
      }

    },
    checkNoNull(row) {

      if (row.template == null || row.template == '') {
        this.$message.error({
          message: '发送模版不能为空',
          duration: 1000,
          showClose: true
        });
        //e.target.focus();
        return false;
      }
      if (row.send_time == null || row.send_time == '') {
        this.$message.error({
          message: '发送周期不能为空',
          duration: 1000,
          showClose: true
        });
        //e.target.focus();
        return false;
      }

      if (row.reciever == null || row.reciever == '') {
        this.$message.error({
          message: '接收邮箱不能为空',
          duration: 1000,
          showClose: true
        });
        //e.target.focus();
        return false;
      }


      var reg = /^[0-9]*$/;
      if (!reg.test(row.send_time)) {
        this.$message.error({
          message: '发送周期只能为数字,请重新输入',
          duration: 1000,
          showClose: true
        });
        //e.target.focus();
        return false;
      }

      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      if (!reg.test(row.reciever)) {
        this.$message.error({
          message: '接收邮箱格式错误,请重新输入',
          duration: 1000,
          showClose: true
        });
        //e.target.focus();
        return false;
      }


      return true;
    }

    //methods end
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/platformIntf_mailIntf/queryMailTemplateList.do",
      params: {},
      saveUrl: "/ssa/platformIntf_mailIntf/addOrModifyMailTemplate.do",
      delUrl: "/ssa/platformIntf_mailIntf/deleteDataMailTemplate.do",
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }
}
</script>
