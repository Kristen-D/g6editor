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
              <div class="search sass-search">

                <!--普通搜索-->
                <div class="ordinary-search" v-if="searchFlag=='0'">
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">

                    <el-form-item label="链路名称">
                      <el-input clearable placeholder="链路名称" v-model="simpleQueryForm.likeFilters.linkName"></el-input>
                    </el-form-item>
                    <el-form-item label="防护CIDR">
                      <el-input clearable placeholder="防护CIDR" v-model="simpleQueryForm.likeFilters.cidr"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="资源池类型" style="display: inline-block; margin-left: 20px;">-->
<!--                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.resourcepool.poolType">-->
<!--                        <el-option label="物理资源池" value="physical"></el-option>-->
<!--                        <el-option label="虚拟资源池" value="virtual"></el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
                </div>
                <!--高级搜索-->

              </div>
              <UplinkTable :tableId="tableId"></UplinkTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import UplinkTable from './UplinkTable.vue'
    import {mapState} from 'vuex'

    export default {
        components: {
            UplinkTable,
        },
        data() {
            return {
                tableId: 'uplinkTable',
                simpleQueryForm: {
                    filters: {},
                    likeFilters: {
                        linkName: '',
                        cidr: ''
                    },
                },

                searchFlag: '0',
            }
        },

        methods: {

            simpleQueryData: function () {
                // console.log("点击搜索按钮");
                this.$store.state.context[this.tableId].load = true;
                var params = this.simpleQueryForm;

                this.$store.commit('setParams', [this.tableId, params]);
                this.$store.dispatch('loadUplinkTable', [this.tableId]);

            },
        },
        computed: {
            ...mapState({})
        },
        created: async function () {
        }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }

</style>
