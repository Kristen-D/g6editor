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
                    <el-form-item label="名称" >
                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="设备网络地址" >-->
<!--                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.ip"></el-input>-->
<!--                    </el-form-item>-->
                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <StrategyConfigurationTable :tableId="tableId"></StrategyConfigurationTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import StrategyConfigurationTable from './StrategyConfigurationTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
          StrategyConfigurationTable,
      },
      data(){
        return {
          tableId: 'strategyConfigurationTable',
          simpleQueryForm:{
              likeFilters: {
                  name: '',
                  // ip:''
              } ,
              filters:{

              }
          },
        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadStrategyConfigurationTable', [this.tableId]);

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
