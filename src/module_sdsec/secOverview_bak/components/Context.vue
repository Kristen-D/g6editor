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
            <el-tabs class="noBottom  ssas-tabs" v-model="tabActiveName">
              <el-tab-pane label="服务概览" name="1">
              </el-tab-pane>

            </el-tabs>
            <secOverviewTable :tableId="tableId"></secOverviewTable>
          </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import secOverviewTable from './secOverviewTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        secOverviewTable,
      },
      data(){
        return {
          tableId: 'overviewTable',
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
          this.$store.dispatch('loadsecOverviewTable', [this.tableId]);

        },
        complexQueryData:function () {
          this.$store.state.context[this.tableId].load = true;
          var params = this.complexQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('loadsecOverviewTable', [this.tableId]);
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
