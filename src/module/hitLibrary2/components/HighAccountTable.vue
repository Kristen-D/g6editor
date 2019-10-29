<template >
<div class="el-panel">
					<div class="el-panel-heading">
						<h4 class="el-panel-title">高危账户</h4>
						<el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
						     <el-tab-pane label="今天" name="day"></el-tab-pane>
						     <el-tab-pane label="近7天" name="week"></el-tab-pane>
						     <el-tab-pane label="近30天" name="month"></el-tab-pane>
					    </el-tabs>
					</div>
					<div class="el-panel-body">
    					    <el-table :data="defConf.tableData" v-loading="defConf.loading" class="table" max-height="240">
    							  <el-table-column  label="序号" width="100" align="center">
    									 <template scope="scope">
    										 <span class="square">{{ scope.row.index }}</span>
    									</template>
    								</el-table-column>
    							  <el-table-column prop="account" label="被撞账户"  align="left" show-overflow-tooltip="true"></el-table-column>
    							  <el-table-column prop="hit_time" label="撞库时间"  align="center"show-overflow-tooltip="true"></el-table-column>
    							  <el-table-column prop="inform_time" label="通知时间" align="center"show-overflow-tooltip="true"></el-table-column>
    							  <el-table-column prop="status" label="状态" align="center"show-overflow-tooltip="true"></el-table-column>
                    <div slot="empty" >
                            <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
                              <i class="el-icon-document"></i> 没有相关数据！
                            </div>

                            <div class="" v-if="'wrong' === defConf.loading">
                              <i class="el-icon-warning"></i> 数据加载错误！ 点击
                              <el-button type="text" @click="refresh">刷新</el-button>
                            </div>

                            <div class="" v-if="'load' === defConf.loading">
                              <i class="el-icon-loading"></i> 正在读取数据，请稍后...
                            </div>
                    </div>
    						</el-table>
				   </div>
				</div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import accountTable from './AccountTable.vue'
import echarts from 'echarts'
export default {
      components: {accountTable},
  computed:{
    ...mapState({

   })},

   data(){
   				 return {
            defConf: {},
            activeName:'week',
            id:"accountTableId",
            params:{dateRange:'week'},
            index:0,
   				 }
   		 },


    methods: {
			changeIndex(){
				return ++this.index
			},
      changeTime(value){
        this.params = {dateRange:this.activeName}
        this.refresh();
      },
      refresh() {
        this.$store.commit('setParams',[this.id, this.params]);
        this.$store.dispatch('reloadTable',this.id);
      },




    },
  created :function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 100,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/hitLibrary2/getHighRiskAccount.do",
      params: {},
    };
		defConf.params=this.params;
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  },
  mounted: async function() {

  }

}
</script>
