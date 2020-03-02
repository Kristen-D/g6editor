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
                    <el-form-item label="产品名称" >
                      <el-input clearable placeholder="产品名称" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
                    <el-form-item label="售卖状态" style="display: inline-block;">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.status">
                        <el-option label="已上架" value="on"></el-option>
                        <el-option label="已下架" value="off"></el-option>
                        <el-option label="草稿" value="draft"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <ProductTable :tableId="tableId"></ProductTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import ProductTable from './ProductTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        ProductTable,
      },
      data(){
        return {
          tableId: 'productTable',
          simpleQueryForm:{
              filters:{status:''},
              likeFilters:{name:''} ,
          },
        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadProductTable', [this.tableId]);
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
