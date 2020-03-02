<template>
  <!--侦查单位调查报告 -->
  <div class="whitebackground Whitespace">
    <div class="top-title">侦查部门调查报告</div>

    <el-form class="form-contral"  ref="investigateReportForm" :model="investigateReportForm"  label-width="85px">
      <el-form-item label="事件名称">
        {{this.params.event_handling_header}}
      </el-form-item>
      <el-form-item label="侦查单位现场处置">
        <el-input placeholder="案件侦查部门现场处置情况" v-model="investigateReportForm.invest_hnale_info"></el-input>
      </el-form-item>


     <el-form-item  label="技术协查">
         <el-button type="text" @click="goTechnical()">新建</el-button>
            <el-card id="card" v-if="technicalList.length > 0">
              <!-- <div slot="header" class="clearfix">

              </div> -->
              <div v-for="item in technicalList">
              <div style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
              <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
              </div>
      </el-card>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="investigateReportSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
    <technicalForm v-on:reloadTechnical="getTechnicalByBussiness" :src="this.params.event_handling_header+'技术协查'" :taskName="'EVENTMGMT_INVESTIGATEREPORTTASK'" :id="this.params.event_handling_id"></technicalForm>

  </div>



</template>

<script>
import {mapState} from 'vuex'
import technicalForm from './TechnicalForm'
export default {
  props:["params"],
  components: {
    technicalForm
  },
  computed: {
    ...mapState({
      technicalVisible: state => state.process.technicalVisible,
    })
  },
  data(){
    return {
      investigateReportForm: {
        event_handling_id: null,
        invest_hnale_info:"",

      },
      technicalList:[]
    }
  },
  methods:{

    //侦查部门调查报告
    async investigateReportSubmit() {
      if (!this.utils.checkForm("investigateReportForm",this)) return;
      var params = {};
      params = this.investigateReportForm;
      var taskId = this.params.taskId;
      params.tkey = this.params.tkey;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/eventMgmt/completeReportTask.do", params, this);
      this.$message({ type: "success", message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    },
    //获取协查信息
    getTechnicalByBussiness() {
      var param = {};

      param.bussiness_type = "EVENTMGMT_INVESTIGATEREPORTTASK";
      param.bussiness_id = this.params.event_handling_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    },
    goTechnical() {
      this.$store.state.process.technicalVisible = true;
    }
  },
  created:function(){
    this.investigateReportForm.event_handling_id = this.params.event_handling_id;
    this.getTechnicalByBussiness();
  }
}
</script>

<style media="screen">
  .el-card__header{
    padding: 8px 10px;
  }

  .el-card__body{
    padding: 10px;
  }
</style>
