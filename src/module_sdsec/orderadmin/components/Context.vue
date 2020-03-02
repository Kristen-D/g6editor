<template>
  <div>
    <section>
      <div class="container-fluid">
        <el-row :gutter="10">
          <el-col :span = "4">
          </el-col>
          <el-col :span="24" >
            <div class="el-panel">
              <div class="search sass-search" >


                <!--<普通搜索>-->
                <div class="ordinary-search">
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
                    <el-form-item label="订单编号" >
                      <el-input clearable placeholder="订单编号" v-model="simpleQueryForm.likeFilters.orderNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.orderStatus">
                          <el-option label="新增" value="Brand-new"></el-option>
                          <el-option label="已处理" value="Handled"></el-option>
<!--                          <el-option label="已部署" value="deployed"></el-option>-->
<!--                          <el-option label="待部署" value="deploying"></el-option>-->
                        </el-select>
                      </el-form-item>
                    <el-form-item label="申请人" v-if="this.isHighRightsUser">
                      <el-input clearable placeholder="申请人" v-model="simpleQueryForm.likeFilters.submitterId"></el-input>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
                   </div>
              </div>
                <OrderTable :tableId="tableId" :loginUser="loginUser" :highRightsUserArray="highRightsUserArray" :isHighRightsUser ="isHighRightsUser" :isOrdinaryUser="isOrdinaryUser" ></OrderTable>
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
              submitterId:'',
            } ,
          },
          highRightsUserArray:['1148046988160331778','1196702921603014658'],
          loginUser:null,
          isHighRightsUser:this.isHighRightsUser,
          isOrdinaryUser:this.isOrdinaryUser,

        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadOrderTable', [this.tableId]);
        },
      },
      computed:{
        ...mapState({
          // orderTypeTree: state =>state.context.orderTypeTree,
        })
      },
      created: async function(){
          let loginUser;
          await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
              loginUser = currentLoginUser.data;
              console.log('loginUser',loginUser)
              console.log('this.loginUser',this.loginUser)
              console.log('loginUser.userId11',loginUser.userId)
              let highRightsUserArray=['1148046988160331778','1196702921603014658'];
              let isHighRightsUser;
              let isOrdinaryUser;
              if(highRightsUserArray.indexOf(loginUser.userId)!== -1){
                  console.log('高权限用户')
                  this.isHighRightsUser = true;
                  this.isOrdinaryUser = false;
                  console.log('isHighRightsUser',this.isHighRightsUser)
                  console.log('isOrdinaryUser',this.isOrdinaryUser)
                  // return isHighRightsUser;
              }else{
                  console.log('普通用户')
                  this.isOrdinaryUser = true;
                  this.isHighRightsUser = false;
                  console.log('isOrdinaryUser',this.isOrdinaryUser)
                  // return isOrdinaryUser;
              }
          });
          /*本地测试用
          let highRightsUserArray=['1148046988160331778','1196702921603014658'];
          let isHighRightsUser;
          let isOrdinaryUser;
          if(highRightsUserArray.indexOf('1148046988160331778')!== -1){
              console.log('高权限用户')
              this.isHighRightsUser = true;
              this.isOrdinaryUser = false;
              console.log('isHighRightsUser',this.isHighRightsUser)
              console.log('isOrdinaryUser',this.isOrdinaryUser)

              // return this.isHighRightsUser;
          }else{
              console.log('普通用户')
              this.isOrdinaryUser = true;
              this.isHighRightsUser = false;
              console.log('isOrdinaryUser',this.isOrdinaryUser)
              // return this.isOrdinaryUser;
          }
          console.log('quanxian',this.isHighRightsUser)
          console.log('quanxian',this.isOrdinaryUser)
          */
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

</style>
