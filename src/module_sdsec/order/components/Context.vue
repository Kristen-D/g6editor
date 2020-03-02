<!--普通与高级搜索按钮-->
<template>
  <div>
    <section>
      <div class="container-fluid">
        <el-row :gutter="10">
          <el-col :span="24" >
            <div class="el-panel">
              <div class="search sass-search" >

                <!--普通搜索-->
<!--                  <div class="ordinary-search" v-if="searchFlag=='0'">-->

                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
                      <el-form-item label="订单状态" style="display: inline-block; margin-left: 20px;">
                        <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.orderStatus">
<!--                          <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">-->
<!--                          </el-option>-->
                          <el-option label="已保存" value="save"></el-option>
                          <el-option label="已取消" value="cancel"></el-option>
                        </el-select>
                      </el-form-item>
                    <el-form-item label="订单编号" >
                      <el-input clearable placeholder="订单编号" v-model="simpleQueryForm.likeFilters.orderNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                      <el-input clearable placeholder="用户名" v-model="simpleQueryForm.likeFilters.tenantId"></el-input>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
                   </div>
                <!--高级搜索-->
<!--                <div class="senior-search" v-show="searchFlag=='1'">-->
<!--                  <el-form :inline="true" :model="complexQueryForm" label-width="80px">-->
<!--                    <el-form-item label="资源池类型" style="display:inline-block;  margin-left:20px;">-->
<!--                      <el-select clearable placeholder="请选择" v-model="complexQueryForm.filters.poolType">-->
<!--                        <el-option v-for="item in poolType" :key="item.value" :label="item.label" :value="item.value">-->
<!--                        </el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="名称">-->
<!--                      <el-input clearable placeholder="名称" v-model="complexQueryForm.likeFilters.poolName"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="IP地址">-->
<!--                      <el-input clearable placeholder="IP地址" v-model="complexQueryForm.likeFilters.ipAddr"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="厂商">-->
<!--                      <el-input clearable placeholder="厂商" v-model="complexQueryForm.likeFilters.poolSupplier"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="状态">-->
<!--                      <el-select clearable placeholder="状态" v-model="complexQueryForm.filters.poolStatus">-->
<!--                        <el-option label="未同步" value="0"></el-option>-->
<!--                        <el-option label="已同步" value="1"></el-option>-->
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
<!--              </div>-->
                <OrderTable :tableId="tableId"></OrderTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import OrderTable from './OrderTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        OrderTable,
      },
      data(){
        return {
          tableId: 'orderTable',
          simpleQueryForm:{
              filters:{orderStatus:''},
              likeFilters:{
              orderNumber:'',
              tenantId:'',
            } ,
          },
          // complexQueryForm:{
          //     filters:{poolType:'', poolStatus:''},
          //     likeFilters:{
          //     poolType:'',
          //     poolName:'',
          //     ipAddr:'',
          //     poolSupplier:'',
          //     },
          // },
          // searchFlag:'0',

          defaultProps:{
            children:'childs',
            label:'name'
          },
          // orderStatus:[{
          //   value: 0,
          //   label:'已保存'
          // },{
          //   value: 1,
          //   label: '已取消'
          // }]
        }
      },

      methods:{
        // treeClick:function (data, state) {
          // var assetTypeIds = this.$refs.tree.getCheckedKeys().toString();
          // if (!assetTypeIds) {
          //   this.$store.dispatch('loadAssetOs');
          // } else {
          //   var param = {'typeId': assetTypeIds};
          //   this.$store.dispatch('loadAssetOs', param);
          //
          // }
        // },
        // complexQuery:function () {
        //     // console.log('点击高级搜索按钮')
        //     this.searchFlag = '1';
        //     // console.log('现在按钮变为普通搜索')
        //     this.simpleQueryForm.poolType = '';
        //     this.simpleQueryForm.poolName = '';
        //     this.simpleQueryForm.ipAddr = '';
        //
        // },
        // simpleQuery:function () {
        //     // console.log('点击普通搜索按钮')
        //     this.searchFlag = '0';
        //     // console.log('现在按钮变为高级搜索')
        //     this.complexQueryForm.poolName = '';
        //     this.complexQueryForm.ipAddr = '';
        //     this.complexQueryForm.poolType = '';
        //     this.complexQueryForm.poolSupplier = '';
        //     this.complexQueryForm.poolStatus = '';
        // },
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;
          // var orderTypeIds = this.$refs.tree.getCheckedKeys().toString();
          // var resPoolTypeIds = this.$refs.tree.getCheckedKeys();
          // params.orderTypeIds = orderTypeIds;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadOrderTable', [this.tableId]);
        },
        // complexQueryData:function () {
        //   this.$store.state.context[this.tableId].load = true;
        //   var params = this.complexQueryForm;
        //   var resPoolTypeIds = this.$refs.tree.getCheckedKeys().toString();
        //   params.resPoolTypeIds = resPoolTypeIds;
        //
        //   this.$store.commit('setParams', [this.tableId, params]);
        //   this.$store.dispatch('loadResourcePoolTable', [this.tableId]);
        // },


      },
      computed:{
        ...mapState({
          // assetBiz: state => state.context.assetBiz,
          // assetOs: state => state.context.assetOs,
          // assetTp: state => state.context.assetTp,
          // assetTypeTree: state => state.context.assetTypeTree,
          orderTypeTree: state =>state.context.orderTypeTree,
        })
      },
      created: async function(){
        // this.$store.dispatch('loadAssetBiz');
        // this.$store.dispatch('loadAssetOs');
        this.$store.dispatch('loadOrderTypeTree');
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

</style>
