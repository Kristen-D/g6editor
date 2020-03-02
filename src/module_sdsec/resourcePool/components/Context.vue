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
                    <el-form-item label="资源池名称" >
                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源池类型" style="display: inline-block;">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.poolType">
                        <el-option label="物理资源池" value="physical"></el-option>
                        <el-option label="虚拟资源池" value="virtual"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="管理IP">
                      <el-input clearable placeholder="IP/IP段" v-model="simpleQueryForm.likeFilters.ipAddr"></el-input>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <ResourcePoolTable :tableId="tableId"></ResourcePoolTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import ResourcePoolTable from './ResourcePoolTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        ResourcePoolTable,
      },
      data(){
        return {
          tableId: 'resourcePoolTable',
          simpleQueryForm:{
              filters:{poolType:''},
              likeFilters:{
              name:'',
              ipAddr:''
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
          this.$store.dispatch('loadResourcePoolTable', [this.tableId]);
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
