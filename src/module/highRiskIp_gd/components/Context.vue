<template>


  <div class="whitebackground Whitespace" style="padding-left:10px;padding-right:10px;">
    <div class="top-title"></div>
      <el-form :inline="true" :model="queryForm" ref="queryForm" label-width="80px">

        <el-form-item label="">
          <el-input placeholder="源IP" v-model="mparams.src_ip"> </el-input>
        </el-form-item>

        <el-form-item label="">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" v-model="mparams.startTime_date" placeholder="选择撞库起始日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" v-model="mparams.endTime_date" placeholder="选择撞库结束日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button  @click="qryData(0)" type="primary">查询</el-button>
          <el-button type="primary" class="button-p-2" @click="exportReport">导出</el-button>
        </el-form-item>
      </el-form>


      <div class="top-title-1 float-l">高危Ip列表</div>
    <dataListTable :id="interfaceId"></dataListTable>
</div>
</div>

</template>

<script>
import commonAjax from 'components/js/common.js'
import {
mapState
} from 'vuex'
import dataListTable from './DataListTable.vue'
export default {
components: {
  dataListTable
},
  data() {
    return {
      //自定义属性
      interfaceId: "interfaceId",
      mparams: {
      	src_ip:"",
        startTime:"",
        startTime_date:null,
      	endTime:"",
        endTime_date:null
      },

    }
  },
  computed: {
    ...mapState({
      // orgList:state=>state.context.orgList,
      // userList:state=>state.context.userList,
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList,
      // productTypeList:state=>state.context.productTypeList,
    })
  },
  methods: {
    exportReport() {
      this.mparams.startTime = commonAjax.formatDate(this.mparams.startTime_date,"yyyy-MM-dd");
      this.mparams.endTime = commonAjax.formatDate(this.mparams.endTime_date,"yyyy-MM-dd");
      var param = "type=highIp&exportFileName=" + "撞库IP信息表";
      //var params = this.queryForm;
      if (this.mparams.startTime != null && this.mparams.startTime != "") {
        param = param + "&startTime=" + this.mparams.startTime;
      }

      if (this.mparams.endTime != null && this.mparams.endTime != "") {
        param = param + "&endTime=" + this.mparams.endTime;
      }


      if (this.mparams.src_ip != null && this.mparams.src_ip != "") {
        param = param + "&src_ip=" + this.mparams.src_ip;
      }

      //alert(params);
      window.location.href = "/ssa/hitLibrary/exportReport.do?" + param;
    },
    qryData(val) {
      this.mparams.startTime = commonAjax.formatDate(this.mparams.startTime_date,"yyyy-MM-dd");
      this.mparams.endTime = commonAjax.formatDate(this.mparams.endTime_date,"yyyy-MM-dd");
        var tableId = this.interfaceId;
        var params = this.mparams;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },

    //methods end
  },
  created: function() {
    //this.$store.dispatch('loadListTypeList');
  }
}
</script>
<style>
.top-title-1 {
    padding-left: 20px;
    margin-bottom: 20px;
    /* margin-top: 10px; */
    /* border-bottom: 1px solid #e1e3e4; */
    font-size: 16px;
    /* line-height: 40px; */
    color: #000;
    font-weight: 500;
}
</style>
