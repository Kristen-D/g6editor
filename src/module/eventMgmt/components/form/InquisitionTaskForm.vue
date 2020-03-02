<template>
<!-- 现场勘验表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">现场勘验</div>

  <el-form class="form-contral" :model="inquisitionTaskForm" ref="inquisitionTaskForm" :rules="inquisitionRules" label-width="85px">
    <el-form-item label="事件名称">
      {{this.params.event_handling_header}}
    </el-form-item>
    <el-form-item label="事件原因" prop="event_reason">
      <el-input placeholder="结合相关证件材料描述攻击过程" type="textarea" v-model="inquisitionTaskForm.event_reason"></el-input>
    </el-form-item>
    <el-form-item label="证据材料" prop="evidence_material">
      <el-upload ref="upload" action="/ssa/eventMgmt/completeInquisitionTask.do" :on-success="handleSuccess" :auto-upload="false" :multiple="false" :data="inquisitionTaskForm">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
      </el-upload>
      <el-input placeholder="证据描述" type="textarea" rows="5" v-model="inquisitionTaskForm.evidence_material"></el-input>
    </el-form-item>
    <el-form-item label="系统数据破坏程度">
      <el-input placeholder="系统数据破坏程度" v-model="inquisitionTaskForm.data_destruction_degree"></el-input>
    </el-form-item>
    <el-form-item label="系统服务破坏程度">
      <el-input placeholder="系统服务破坏程度" v-model="inquisitionTaskForm.service_destruction_degree"></el-input>
    </el-form-item>
    <el-form-item label="对系统用户影响">
      <el-input placeholder="对系统用户影响" v-model="inquisitionTaskForm.user_effects"></el-input>
    </el-form-item>

    <el-form-item  label="技术协查">
      <el-button type="text" @click="goTechnical()">+新建</el-button>
      <el-card id="card" v-show="technicalList.length >0">
        <div v-for="item in technicalList" >
        <div @click="showTechnicalDetail(item)" style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
        <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
        </div>
</el-card>
</el-form-item>







<el-form-item>
  <el-button type="primary" @click="inquisitionTaskSubmit">提交</el-button>
  <el-button type="gray" @click="goBack">返回</el-button>
</el-form-item>
</el-form>
<technicalForm v-on:reloadTechnical="getTechnicalByBussiness" :taskName="'EVENTMGMT_INQUISITIONTASK'" :src="this.params.event_handling_header+'技术协查'" :id="this.params.event_handling_id"></technicalForm>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import technicalForm from './TechnicalForm'
export default {
  props: ["params"],
  components: {
    technicalForm
  },
  computed: {
    ...mapState({
      technicalVisible: state => state.process.technicalVisible,
    })
  },
  data() {
    return {
      dialogVisible: false,
      technicalList: [],
      inquisitionTaskForm: {
        event_handling_id: null,
        //事件原因
        event_reason: "",
        //系统数据破坏程度
        data_destruction_degree: "",
        //系统服务破坏程度
        service_destruction_degree: "",
        //证据描述
        evidence_material: "",
        //对系统用户影响
        user_effects: ""

      },
      inquisitionRules: {
        event_reason: [{
          required: true,
          message: '请输入事件原因',
          trigger: 'blur'
        }],
        evidence_material: [{
          required: true,
          message: '请输入证据描述',
          trigger: 'blur'
        }]

      }
    }
  },
  methods: {
    showTechnicalDetail(item) {
      var param = item;
      param.handle = "view";
      param.tkey = "";
      // alert(JSON.stringify(param));
      this.$router.push({
        name: 'technicalHandle',
        params: param
      });
    },
    handleSuccess(response, file, fileList) {

      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goBack();
      }
    },
    //提交勘验表单
    async inquisitionTaskSubmit() {
      if (!this.utils.checkForm("inquisitionTaskForm", this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.inquisitionTaskForm;
      params.taskId = taskId;
      if (this.$refs["upload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/eventMgmt/completeInquisitionTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["upload"].uploadFiles.length == 1) {
        this.$refs["upload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }

    },
    goBack() {
      this.$router.go(-1);
    },
    goTechnical() {
      this.$store.state.process.technicalVisible = true;
    },
    //获取协查信息
    getTechnicalByBussiness() {
      var param = {};
      param.bussiness_type = "EVENTMGMT_INQUISITIONTASK";
      param.bussiness_id = this.params.event_handling_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    }
  },
  mounted: function() {
    //   $("#card").slimScroll({
    //         height: '200px',
    //  });
  },
  created: function() {
    this.inquisitionTaskForm.event_handling_id = this.params.event_handling_id;
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
