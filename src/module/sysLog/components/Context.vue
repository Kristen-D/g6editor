<template>

  <div class="whitebackground Whitespace">
    <div class="top-title">日志查询</div>

    <div :class="['ordinary-search', 'clearfloat']">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="">
          <el-input placeholder="用户姓名" v-model="params.realname"> </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="客户端IP" v-model="params.ip"> </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-model="dateRange" type="datetimerange" placeholder="选择时间范围"> </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="qryUser()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <sysLogTable :id="tableId"></sysLogTable>
  </div>








  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import sysLogTable from './SysLogTable.vue'
  export default {
    components: {
      sysLogTable
    },
    data() {

      return {
        dateRange: [],
        tableId: "sysLog",
        params: {
          username: null,
          roleids: null,
          realname: "",
          ip: ""
        },
        delSelectedUser: "/ssa/authority/userCfg/delCheckedRows.do",
        formatError: false,
        errorList: []
      }
    },
    computed: {
      ...mapState({
        roleList: state => state.context.roleList,
        orgList: state => state.context.orgList,
        menuName: state => state.context.menuName,
      })
    },
    methods: {


      qryUser() {
        this.params.st = this.common.formatDate(this.dateRange[0]);
        this.params.et = this.common.formatDate(this.dateRange[1]);
        console.log(this.params)
        this.$store.commit('setParams', [this.tableId, this.params]);
        this.$store.dispatch('reloadTable', this.tableId);
      },

    },
    created: async function () {
      this.$store.dispatch('loadOrgList');
      this.$store.dispatch('loadRoleList');
    }
  }

</script>
