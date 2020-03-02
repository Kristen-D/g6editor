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
                <MessageTable :tableId="tableId"></MessageTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import MessageTable from './MessageTable'
    import {mapState} from 'vuex'
    export default {
      components:{
        MessageTable,
      },
      data(){
        return {
          tableId: 'messageTable',
        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('', [this.tableId]);
        },

        dateChange:function () {

        }

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
