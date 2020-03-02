<!--普通与高级搜索按钮-->
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
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
                    <el-form-item label="用户名" >
                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.username"></el-input>
                    </el-form-item>
                    <el-form-item label="客户端IP" >
                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.ip"></el-input>
                    </el-form-item>
<!--                    待改-->
<!--                    <el-form-item label="日志时间">-->
<!--                      <el-date-picker v-model="dateRange" type="datetimerange" placeholder="选择时间范围"> </el-date-picker>-->
<!--                    </el-form-item>-->

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <SysLogTable :tableId="tableId"></SysLogTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import SysLogTable from './SysLogTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
          SysLogTable,
      },
      data(){
        return {
          tableId: 'sysLogTable',
          simpleQueryForm:{
              likeFilters:{
                  username:'',
                  ip:'',
            } ,
          },
          dateRange: [],
        }
      },

      methods:{
        simpleQueryData:function(){
          console.log("点击搜索按钮");
            console.log('this.tableId',this.tableId)
          this.$store.state.context[this.tableId].load = true;
            console.log('this.simpleQueryForm',this.simpleQueryForm)
          var params = this.simpleQueryForm;
            console.log('params',params)

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadSysLogTable', [this.tableId]);

        },
          // qryUser() {
          //     if (this.dateRange && this.dateRange.length > 0) {
          //         this.params.st = this.common.formatDate(this.dateRange[0]);
          //         this.params.et = this.common.formatDate(this.dateRange[1]);
          //     } else {
          //         this.params.st = null;
          //         this.params.et = null;
          //     }
          //
          //     this.$store.commit('setParams', [this.tableId, this.params]);
          //     this.$store.dispatch('reloadTable', this.tableId);
          // },


      },
      computed:{
        ...mapState({
            roleList: state => state.context.roleList,
            orgList: state => state.context.orgList,
            menuName: state => state.context.menuName,
        })
      },
      created: async function(){
          this.$store.dispatch('loadOrgList');
          this.$store.dispatch('loadRoleList');
          console.log('roleList',this.roleList)
          console.log('orgList',this.orgList)
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }

</style>
