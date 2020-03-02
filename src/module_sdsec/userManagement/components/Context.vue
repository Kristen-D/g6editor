<template>
  <div>
    <section>
      <div class="container-fluid">
        <el-row :gutter="10">
          <el-col :span="4">
          </el-col>
          <el-col :span="24">
            <div class="el-panel">
              <div class="search sass-search" >

                <!--普通搜索-->
                <div class="ordinary-search">
                  <el-form :inline="true" :model="params" ref="queryForm" class="demo-form-inline">
                    <el-form-item label="用户姓名">
                      <el-input placeholder="用户姓名" v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名">
                      <el-input placeholder="登录名" v-model="params.username"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="用户权限">-->
<!--                      <el-select v-model="params.roleids" clearable placeholder="用户权限">-->
<!--                        <el-option v-for="item in roleList" :label="item.text" :value="item.id"></el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
                      <el-button @click="qryUser()" type="primary" size="small">搜索</el-button>
                  </el-form>
                </div>
              </div>
              <UserManagementTable :id="tableId"></UserManagementTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import {mapState} from 'vuex'
    import UserManagementTable from './UserManagementTable.vue'

    export default {
        components: {
            UserManagementTable
        },
        data() {
            return {
                tableId: "userManagementTable",
                params: {
                    username: null,
                    roleids: null,
                    name: ""
                },
                poi_params: {
                    poi_type: '',
                    poi_id: null,
                    poi_columns: null,
                    sql_params: null
                },
                delSelectedUser: "/ssa/authority/userCfg/delCheckedRows.do",
                resetPwdUrl: "/ssa/authority/userCfg/resetPwd.do",
                formatError: false,
                errorList: [],
                loginUser: {
                    userId: null
                },
            }
        },
        computed: {
            ...mapState({
                roleList: state => state.context.roleList,
                orgList: state => state.context.orgList,
                menuName: state => state.context.menuName,
                authState: state => state.editTable.authState,
            })
        },
        methods: {
            // 搜索
            qryUser() {
                this.$store.commit('setParams', [this.tableId, this.params]);
                this.$store.dispatch('reloadTable', this.tableId);
            },

        },
        created: async function () {
            if (window.top != window) {
                this.loginUser = window.top.getLoginUser()
            } else {
                this.common.req("/ssa/main/getLoginUser.do").then(data => {
                    this.loginUser = data;
                })
            }
            this.$store.dispatch('loadOrgList');
            this.$store.dispatch('loadRoleList');
        },
        mounted: function () {
            sessionStorage.removeItem('userManagementForm');
            if (!this.$route.params.pageIndex) {
                this.qryUser();
            } else {

                let pms = this.$route.params.params;
                if (pms) {
                    for (let p in this.params) {
                        if (pms[p] && pms[p] !== "") {
                            this.params[p] = pms[p];
                        }
                    }
                }
                this.$store.dispatch('handleCurrentChange', [this.tableId, pms.pageIndex]);
            }
        }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-cascader{
    line-height: 0px;
  }

</style>
