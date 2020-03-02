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
                <div class="ordinary-search">
                  <el-form :inline="true" :model="simpleQueryForm">
                    <el-form-item label="名称" >
                      <el-input clearable placeholder="名称" v-model="simpleQueryForm.likeFilters.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="镜像格式" style="display: inline-block; margin-left: 20px;">-->
                    <el-form-item label="镜像格式" style="display: inline-block;;">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.format">
                        <el-option label="iso" value="iso"></el-option>
                        <el-option label="qcow2" value="qcow2"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="容量">
                    <el-input clearable placeholder="容量" v-model="simpleQueryForm.likeFilters.size"></el-input>
                  </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
              </div>
                <ImageTable :tableId="tableId"></ImageTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import ImageTable from './ImageTable.vue'
    import {mapState} from 'vuex'
    export default {
      components:{
        ImageTable,
      },
      data(){
        return {
          tableId: 'imageTable',
          simpleQueryForm:{
              filters:{format:''},
              likeFilters:{
              name:'',
              size:''
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
          this.$store.dispatch('loadImageTable', [this.tableId]);

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
