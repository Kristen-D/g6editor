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
                    <el-form-item label="名称" >
                      <el-input clearable placeholder="名称" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <HostTable :tableId="tableId"></HostTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import HostTable from './HostTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        HostTable,
      },
      data(){
        return {
          tableId: 'hostTable',
          simpleQueryForm:{
              likeFilters:{
              name:''
            } ,
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
            this.complexQueryForm.filters.state = '';
        },
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadHostTable', [this.tableId]);

        },
        complexQueryData:function () {
          this.$store.state.context[this.tableId].load = true;
          var params = this.complexQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadHostTable', [this.tableId]);
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
