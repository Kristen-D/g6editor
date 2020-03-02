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
                    <el-form-item label="安全域名称" >
                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="IP/IP段">-->
<!--                      <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.ipRangeSet"></el-input>-->
<!--                    </el-form-item>-->

                      <el-form-item label="备注">
                        <el-input clearable placeholder="请输入" v-model="simpleQueryForm.likeFilters.description"></el-input>
                      </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <SecurityDomainTable :tableId="tableId"></SecurityDomainTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import SecurityDomainTable from './SecurityDomainTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        SecurityDomainTable,
      },
      data(){
        return {
          tableId: 'securityDomainTable',
          simpleQueryForm:{
              filters:{ },
              likeFilters:{
              name:'',
              ipRangeSet:'',
              description:''
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
          this.$store.dispatch('loadSecurityDomainTable', [this.tableId]);
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
