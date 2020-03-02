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
<!--                  <div class="ordinary-search" v-if="searchFlag=='0'">-->
<!--                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">-->
<!--&lt;!&ndash;                      <el-form-item label="服务类型" style="display: inline-block; margin-left: 20px;">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.serviceType">&ndash;&gt;-->
<!--&lt;!&ndash;                          <el-option label="防护类" value="protect"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;                          <el-option label="审计类" value="audit"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;                        </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;                      </el-form-item>&ndash;&gt;-->
<!--                    <el-form-item label="名称" >-->
<!--                      <el-input clearable placeholder="名称" v-model="simpleQueryForm.likeFilters.name"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>-->

<!--                  </el-form>-->
<!--            </div>-->
                <!--高级搜索-->
<!--                <div class="senior-search" v-show="searchFlag=='1'">-->
<!--                  <el-form :inline="true" :model="complexQueryForm" label-width="80px">-->
<!--                    <el-form-item label="服务类型" style="display:inline-block;  margin-left:20px;">-->
<!--                      <el-select clearable placeholder="请选择" v-model="complexQueryForm.filters.serviceType">-->
<!--                        <el-option label="防护类" value="protect"></el-option>-->
<!--                        <el-option label="审计类" value="audit"></el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="名称">-->
<!--                      <el-input clearable placeholder="名称" v-model="complexQueryForm.likeFilters.name"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="状态">-->
<!--                      <el-select clearable placeholder="状态" v-model="complexQueryForm.filters.productStatus">-->
<!--                        <el-option label="上架" value="on"></el-option>-->
<!--                        <el-option label="下架" value="off"></el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                    <div class="search-button-location flexCenter">-->
<!--                      <el-button type="primary" size="small" @click="complexQueryData">搜索</el-button>-->
<!--                    </div>-->
<!--                  </el-form>-->
<!--                </div>-->
<!--                <div class="op-location" @click="complexQuery" v-if="searchFlag=='0'">-->
<!--                  <p id="search-tag1" class="search-tag">-->
<!--                    <i class="icon-top-search m-r-5"></i>高级搜索</p>-->
<!--                </div>-->
<!--                <div class="op-location" @click="simpleQuery" v-if="searchFlag=='1'">-->
<!--                  <p id="search-tag2" class="search-tag search-tag02">-->
<!--                    <i class="icon-top-search m-r-5"></i>普通搜索</p>-->
<!--                </div>-->
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
              // filters:{serviceType:''},
              likeFilters:{name:''} ,
          },
          complexQueryForm:{
              filters:{
                  serviceType:'',
                  // billingRules:'',
                  productStatus:''
              },
              likeFilters:{name:''},
          },
          searchFlag:'0'
        }
      },

      methods:{
        complexQuery:function () {
            // console.log('点击高级搜索按钮')
            this.searchFlag = '1';
            // console.log('现在按钮变为普通搜索')
            // this.simpleQueryForm.filters.serviceType = '';
            this.simpleQueryForm.likeFilters.name = '';
        },
        simpleQuery:function () {
            // console.log('点击普通搜索按钮')
            this.searchFlag = '0';
            // console.log('现在按钮变为高级搜索')
            this.complexQueryForm.filters.serviceType = '';
            this.complexQueryForm.likeFilters.name = '';
            // this.complexQueryForm.filters.billingRules = '';
            this.complexQueryForm.filters.productStatus = '';
        },
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          // this.$store.dispatch('loadProductTable', [this.tableId]);
          this.$store.dispatch('loadProductTable', [this.tableId]);
          // this.$store.dispatch('loadProductTable');
          // console.log('params:',params)
        },
        complexQueryData:function () {
          this.$store.state.context[this.tableId].load = true;
          var params = this.complexQueryForm;

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
