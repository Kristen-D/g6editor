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
                  <div class="ordinary-search" v-if="searchFlag=='0'">
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
<!--                      <el-form-item label="云主机类型" style="display: inline-block; margin-left: 20px;">-->
<!--                        <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.type">-->
<!--                          <el-option label="物理资源池" value="physical"></el-option>-->
<!--                          <el-option label="虚拟资源池" value="virtual"></el-option>-->
<!--                        </el-select>-->
<!--                      </el-form-item>-->
                    <el-form-item label="名称" >
                      <el-input clearable placeholder="名称" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
                    <el-form-item label="平台">
                      <el-input clearable placeholder="平台" v-model="simpleQueryForm.likeFilters.platform"></el-input>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
                <!--高级搜索-->
                <div class="senior-search" v-show="searchFlag=='1'">
                  <el-form :inline="true" :model="complexQueryForm" label-width="80px">
                    <el-form-item label="云主机类型" style="display:inline-block;  margin-left:20px;">
                      <el-select clearable placeholder="请选择" v-model="complexQueryForm.filters.type">
                        <el-option label="物理资源池" value="physical"></el-option>
                        <el-option label="虚拟资源池" value="virtual"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="名称">
                      <el-input clearable placeholder="名称" v-model="complexQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
                    <el-form-item label="平台">
                      <el-input clearable placeholder="平台" v-model="complexQueryForm.likeFilters.platform"></el-input>
                    </el-form-item>
                    <el-form-item label="CPU核心数量">
                      <el-input clearable placeholder="CPU核心数量" v-model="complexQueryForm.likeFilters.cpuNum"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-select clearable placeholder="状态" v-model="complexQueryForm.filters.status">
                        <el-option label="运行中" value="Running"></el-option>
<!--                        <el-option label="未同步" value="Unsynchronized"></el-option>-->
                      </el-select>
                    </el-form-item>
                    <div class="search-button-location flexCenter">
                      <el-button type="primary" size="small" @click="complexQueryData">搜索</el-button>
                    </div>
                  </el-form>
                </div>
<!--                <div class="op-location" @click="complexQuery" v-if="searchFlag=='0'">-->
<!--                  <p id="search-tag1" class="search-tag">-->
<!--                    <i class="icon-top-search m-r-5"></i>高级搜索</p>-->
<!--                </div>-->
<!--                <div class="op-location" @click="simpleQuery" v-if="searchFlag=='1'">-->
<!--                  <p id="search-tag2" class="search-tag search-tag02">-->
<!--                    <i class="icon-top-search m-r-5"></i>普通搜索</p>-->
<!--                </div>-->
              </div>
                <InstanceTable :tableId="tableId"></InstanceTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import InstanceTable from './InstanceTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        InstanceTable,
      },
      data(){
        return {
          tableId: 'instanceTable',
          simpleQueryForm:{
              filters:{type:''},
              likeFilters:{
              name:'',
              platform:''
            } ,
          },
          complexQueryForm:{
              filters:{type:'', status:''},
              likeFilters:{
              name:'',
              platform:'',
              cpuNum:''
              },
          },
          searchFlag:'0',
        }
      },

      methods:{
        complexQuery:function () {
            // console.log('点击高级搜索按钮')
            this.searchFlag = '1';
            // console.log('现在按钮变为普通搜索')
            this.simpleQueryForm.filters.type = '';
            this.simpleQueryForm.likeFilters.name = '';
            this.simpleQueryForm.likeFilters.platform = '';

        },
        simpleQuery:function () {
            // console.log('点击普通搜索按钮')
            this.searchFlag = '0';
            // console.log('现在按钮变为高级搜索')
            this.complexQueryForm.likeFilters.name = '';
            this.complexQueryForm.likeFilters.platform = '';
            this.complexQueryForm.filters.type = '';
            this.complexQueryForm.likeFilters.cpuNum = '';
            this.complexQueryForm.filters.status = '';
        },
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadInstanceTable', [this.tableId]);

        },
        complexQueryData:function () {
          this.$store.state.context[this.tableId].load = true;
          var params = this.complexQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadInstanceTable', [this.tableId]);
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
