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
<!--                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">-->
                  <el-form :inline="true" :model="params" ref="params" class="demo-form-inline">
                      <el-form-item label="租户编号">
                        <el-input v-model="params.code" placeholder="租户唯一编号"></el-input>
                      </el-form-item>
                      <el-form-item label="名称">
                        <el-input v-model="params.name" placeholder="租户名称"></el-input>
                      </el-form-item>
<!--                      <el-form-item label="所在地" >-->
<!--                        <cap :loadData="loadData" clearable change-on-select placeholder="选择地区" v-model="params.areaIdArr" root-id="0" class="el-cascader"></cap>-->
<!--                      </el-form-item>-->

                        <el-button type="primary" size="small" @click="search">搜索</el-button>

                  </el-form>
                </div>
              </div>
              <TenantTable :id="tableId"></TenantTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import TenantTable from './TenantTable.vue'
    // cap 所在地下拉框
    import cap from 'components/Cascader/CascaderPlus'

    export default {
        components: {
            TenantTable,cap
        },
        data(){
            return {
                tableId: 'tenantTable',
                params: {
                    code: '',
                    name: '',
                    areaId: ''
                },
                exportDialogShow: false,
                customColShow: false,
                // 自定义列表所有列
                columns: [],
                // 自定义列
                customColumnList: [],
                // 默认列
                defaultColumns: [],
                // 向子组件传递的列
                columnList: [],
                //暂存的列，取消时用
                tempColumns: [],
                loadData: {
                    url: "/ssa/organization/getAreaByPid.do",
                    maxLevel: 3,
                    backFillUrl: "/ssa/organization/getAllPaerntById.do"
                },
            }

        },
        methods:{
            // 搜索
            search() {
                if (this.params.areaIdArr != null) {
                    this.params.areaId = this.params.areaIdArr[this.params.areaIdArr.length - 1];
                }
                this.$store.commit('setParams', [this.tableId, this.params]);
                this.$store.dispatch('reloadTable', this.tableId);
            },
        }

    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-cascader{
    line-height: 0px;
  }

</style>
