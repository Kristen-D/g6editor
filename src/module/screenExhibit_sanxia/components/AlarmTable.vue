<template >
<div >
  <big-screen-grid-header
    title="告警"
    subtitle="（近7天）">
        					   <el-table :data="tableData"  class="table" max-height="180" ref ="table">
        							  <el-table-column prop="alarm_type" label="事件类型"  align="left" show-overflow-tooltip="true"></el-table-column>
        							  <el-table-column prop="alarm_grade" label="级别"  align="center"show-overflow-tooltip="true">
                          <template slot-scope="scope">
                          <span >{{ fmtalarmGradeList(scope.row.alarm_grade) }}</span>
                          </template>
                        </el-table-column>
        							  <el-table-column prop="dst_ip" label="目标IP" align="center"show-overflow-tooltip="true"></el-table-column>
        							  <!-- <el-table-column prop="status" label="业务系统" align="center"show-overflow-tooltip="true"></el-table-column> -->
                        <el-table-column prop="alarm_time" label="时间" align="center"show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="status" label="状态" align="center"show-overflow-tooltip="true">
                          <template slot-scope="scope">
                          <span >{{ fmtStatus(scope.row.status) }}</span>
                          </template>
                        </el-table-column>

        						</el-table>
    			</big-screen-grid-header>
</div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import BigScreenGridHeader from "./BigScreenGridHeader";
export default {
      components: {BigScreenGridHeader},
  computed:{
    ...mapState({

   })},

   data(){
   				 return {
            defConf: {},
            tableData:[{}]
   				 }
   		 },


    methods: {
      fmtalarmGradeList(val){
        if(val==2){
          return "中危";
        }else{
          return "高危";
        }
      },
      fmtStatus(val){
        if(val==2){
          return "未处置";
        }else{
          return "已处置";
        }
      },
      // refresh() {
      //   this.$store.commit('setParams',[this.id, this.params]);
      //   this.$store.dispatch('reloadTable',this.id);
      // },




    },
  created :async function() {
    let data = await this.common.req("/ssa/screenExhibit/getAlarmTable.do",null,null);
		this.tableData = data;

  },
  mounted: async function() {

  }

}

</script>

<style>
.el-table tr{
  background-color: transparent
}
.el-table{
  color: #fff;
  background-color: transparent
}
.el-table th{
  background-color: transparent
}

.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: transparent;
    color: #fff
}


.el-table--enable-row-hover .el-table__body tr:hover>td {
	background-color: transparent;

}
</style>
