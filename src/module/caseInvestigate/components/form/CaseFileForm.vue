<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">案件归档</div>

  <el-form class="form-contral" ref="caseFileForm" :model="caseFileForm" label-width="85px">
    <el-row>
      <el-col :span="16" :offset="1">
        <el-form-item label="案件串并">
          <el-tag style="margin-left:10px;" v-for="tag in selectedCase" :key="tag.case_id"  type="primary">
            {{tag.case_name}}
          </el-tag>
          <br>
          <el-button type="text" @click="dialogVisible=true">添加关联案件</el-button>
        </el-form-item>

        <el-form-item label="人员信息">
          <el-input type="textarea" rows="5" v-model="caseFileForm.person_info"></el-input>
        </el-form-item>

        <el-form-item label="威胁目的">
          <el-input type="textarea" rows="5" v-model="caseFileForm.threat_target"></el-input>
        </el-form-item>

        <el-form-item label="威胁对象">
          <el-input type="textarea" rows="5" v-model="caseFileForm.threat_object"></el-input>
        </el-form-item>

        <el-form-item label="威胁方法">
          <el-input type="textarea" rows="5" v-model="caseFileForm.threat_method"></el-input>
        </el-form-item>

        <el-form-item label="有害资产">
          <el-input type="textarea" rows="5" v-model="caseFileForm.harmful_asset"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="caseFileFormSubmit">提交</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>

      </el-col>
    </el-row>
  </el-form>




  <el-dialog title="选择案件" :visible.sync="dialogVisible" width="85%">

    已选:

    <el-tag style="margin-left:10px;" v-for="tag in this.$store.state.table.caseSelected" :closable="true"  @close="handleClose(tag)" :hit="true" :key="tag.case_id" type="primary">{{tag.case_name}}</el-tag>

    <div style="border-bottom: 1px solid #e1e3e4;margin-top: 10px ;"></div>

    <toolbar :id="tableId" ></toolbar>
    <caseInvestigateMyTask ref="caseInvestigateMyTask" :isHighlight="true" :id="tableId"></caseInvestigateMyTask>
    <br>
    <div style="text-align:center !important;">
        <el-button @click="handleDialog()">取 消</el-button>
        <el-button type="primary" @click="handleDialog()">确 定</el-button>
    </div>

  </el-dialog>


</div>
</template>

<script>
import toolbar from '../ToolBar'
import caseInvestigateMyTask from '../CaseInvestigateMyTask'
export default {
  components: {
    caseInvestigateMyTask,toolbar
  },
  props: ["params"],
  data() {
    return {
      selectedCase: [],
      tableId: "caseFileTable",
      dialogVisible: false,
      caseFileForm: {
        case_id: null,
        case_id_related: "",
        person_info: "",
        harmful_asset: "",
        threat_target: "",
        threat_object: "",
        threat_method: ""
      }
    }
  },
  methods: {
    handleClose(tag) {
      this.$store.state.table.caseSelected.splice(this.selectedCase.indexOf(tag), 1);
      delete this.$store.state.table.isStored[tag.case_id];
    },
    // closeListen(flag){
    //  this.dialogVisible =false;
    // },

    //案件审核表单提交
    async caseFileFormSubmit() {
      if (this.selectedCase.length > 0) {
        var arr = [];
        this.selectedCase.forEach(function(item) {
          arr.push(item.case_id);
        });
        this.caseFileForm.case_id_related = arr.join(",");
      }
      var taskId = this.params.taskId;
      var params = {};
      params = this.caseFileForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/caseInvestigate/completeCaseFileTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    handleDialog() {
      this.selectedCase = this.$store.state.table.caseSelected;
      // this.$store.state.table.caseSelected = [];
      this.$refs.caseInvestigateMyTask.clearSelection();
      this.dialogVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {
    this.caseFileForm.case_id = this.params.case_id;
  }

}
</script>
