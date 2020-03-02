<!--普通与高级搜索按钮-->
<template>
  <div>
    <section>
      <div class="container-fluid">
        <el-row :gutter="10">
          <el-col :span="4">
          </el-col>
          <el-col :span="24" >
            <div class="el-panel">
              <div class="search sass-search" >

                <!--普通搜索-->
                  <div class="ordinary-search">
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
                    <el-form-item label="服务编号" >
                      <el-input clearable placeholder="服务编号" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>

<!--                    value大小写要与数据库统一-->
                    <el-form-item label="服务类型">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.deliverableType">
                        <el-option label="服务链" value="servicechain"></el-option>
                        <el-option label="Web应用防火墙" value="WAF"></el-option>
                        <el-option label="防火墙" value="FIREWALL"></el-option>
                        <el-option label="入侵防御系统" value="IPS"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="合同周期">
                      <el-input clearable placeholder="合同周期" v-model="simpleQueryForm.likeFilters.deliverablePeriod"></el-input>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
                   </div>
              </div>
                <PurchasedServiceTable :tableId="tableId"></PurchasedServiceTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import PurchasedServiceTable from './PurchasedServiceTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        PurchasedServiceTable,
      },
      data(){
        return {
          tableId: 'purchasedServiceTable',
          simpleQueryForm:{
              filters:{deliverableType:''},
              likeFilters:{
                  name:'',
                  deliverablePeriod:'',
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
          this.$store.dispatch('loadPurchasedServiceTable', [this.tableId]);
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
    margin-bottom: 20px;
  }

</style>
