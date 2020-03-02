<!--搜索按钮-->
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
<!--                    <el-form-item label="任务编号" >-->
<!--                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.jobId"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="任务状态" style="display: inline-block;">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.status">
                        <el-option label="已完成" value="Finished"></el-option>
                        <el-option label="运行中" value="Running"></el-option>
                        <el-option label="出现错误" value="Error"></el-option>
                      </el-select>
                    </el-form-item>
<!--                    <el-form-item label="任务行为">-->
<!--                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.jobAction"></el-input>-->
<!--                    </el-form-item>-->
                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <JobTable :tableId="tableId"></JobTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import JobTable from './JobTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        JobTable,
      },
      data(){
        return {
          tableId: 'jobTable',
          simpleQueryForm:{
              filters:{status:''},
              likeFilters:{
                  jobId:'',
                  jobAction:'',
            } ,
          },
        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;
          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadJobTable', [this.tableId]);
        },
      },
      computed:{
        ...mapState({
        })
      },
      created: async function(){
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }

</style>
