<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>


  <el-form ref="taskInspectForm" :model="taskInspectForm" :rules="taskInspectFormRules" label-width="100px">

    <el-row>
      <el-col :span="9" :offset="1">
        <el-form-item label="被检查单位" prop="inspected_org">
          <selectOrganization  v-model="taskInspectForm.inspected_org" :orgType="2"  placeholder="被检查单位"  ></selectOrganization>
        </el-form-item>

        <el-form-item label="检查时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择起始日期" v-model="taskInspectForm.inspection_time_start"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">~</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="taskInspectForm.inspection_time_end"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="检查地点" prop="inspection_address">
          <el-input v-model="taskInspectForm.inspection_address"></el-input>
        </el-form-item>

        <el-form-item label="检查事项">
          <el-checkbox-group v-model="checkeItems">
            <div v-for="(item,index) in inspectionItems">
              <el-checkbox :label="item.value">{{index+1}}、{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="上传附件">
          <a class="file m-r-18" v-show="this.params.attachment_filepath != null && this.params.attachment_filepath != ''" @click="downloadFile()" style="cursor:pointer">{{this.params.attachment_filename}}</a>
          <el-button v-show="this.params.attachment_filepath != null && this.params.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>
          <el-upload v-show="this.params.attachment_filepath == null || this.params.attachment_filepath == ''" ref="taskInspectUpload" action="/ssa/taskInspect/saveTaskInspect.do" :on-success="handleSuccess" :data="taskInspectForm" :auto-upload="false">
            <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <h4 class="sub-title">基本信息</h4>
    </el-row>

    <el-row>
      <el-col :span="12" :offset="1">

        <!-- <el-form-item label="文号" >
          <el-col :span="8">
            <el-form-item prop="word">
              公信安 检字【
              <el-input style="width:30%;" v-model.number="taskInspectForm.word"  auto-complete="off"></el-input>】
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="num">
              第<el-input style="width:30%;" v-model.number="taskInspectForm.num"  auto-complete="off"></el-input>号
            </el-form-item>
          </el-col>
        </el-form-item> -->

          <el-form-item label="检查单位">
            <el-input placeholder="太原市公安局" style="width:215px;" :disabled="true"></el-input>
          </el-form-item>

        <el-form-item label="填发日期">
          <el-date-picker type="date" placeholder="选择填发日期" style="width:215px;" v-model="taskInspectForm.send_time"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>


    <el-row>
      <h4 class="sub-title">人员安排</h4>
    </el-row>

    <el-row>
      <el-col :span="9" :offset="1">
        <el-form-item label="承办人" prop="undertaker">
          <el-select v-model="taskInspectForm.undertaker" placeholder="请选择承办人">
            <el-option v-for="item in superviseList" :label="item.realname" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="批准人" prop="approver">
          <el-select v-model="taskInspectForm.approver" placeholder="请选择批准人">
            <el-option v-for="item in leaderList" :label="item.realname" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="检查人员" prop="inspectors">
          <el-select v-model="taskInspectForm.inspectors" placeholder="请选择检查人员">
            <el-option v-for="item in handleList" :label="item.realname" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系人">
          <el-radio-group v-model="taskInspectForm.linkman">
            <el-radio :label="1">承办人</el-radio>
            <el-radio :label="2">批准人</el-radio>
            <el-radio :label="3">检查人员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-col :span="11">
            <el-input :disabled="true" v-model="taskInspectForm.phone"></el-input>
          </el-col>

        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="saveTaskInspect">保存</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components:{
    selectOrganization
  },
  props: ["params"],
  watch: {
    'taskInspectForm.linkman': {
      handler: function(val, oldVal) {
        if (val == 1) {
          var supervise = this.superviseMap[this.taskInspectForm.undertaker];
          this.taskInspectForm.phone = supervise.phone;
        } else if (val == 2) {
          var leader = this.leaderMap[this.taskInspectForm.approver];
          this.taskInspectForm.phone = leader.phone;
        } else if (val == 3) {
          var handle = this.handleMap[this.taskInspectForm.inspectors];
          this.taskInspectForm.phone = handle.phone;
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      leaderList: state => state.process.leaderList,
      leaderMap: state => state.process.leaderMap,
      handleList: state => state.process.handleList,
      handleMap: state => state.process.handleMap,
      superviseList: state => state.process.superviseList,
      superviseMap: state => state.process.superviseMap,
      inspectionItems: state => state.process.inspectionItems
    })
  },
  data() {
    return {
      title:"新建任务",
      //检查事项
      checkeItems: [],
      taskInspectForm: {
        task_inspect_id: null,
        inspected_org: null,
        //检查开始时间
        inspection_time_start: "",
        //检查结束时间
        inspection_time_end: "",
        //检查地点
        inspection_address: "",
        inspection_item: "",
        // word: null,
        // num: null,
        inspect_org: null,
        send_time: "",
        //承办人
        undertaker: null,
        //批准人
        approver: null,
        //检查人员
        inspectors: null,
        linkman: null,
        phone: "",

      },
      taskInspectFormRules: {
        inspected_org: [{
          type: 'number',
          required: true,
          message: '请输入被检查单位',
          trigger: 'change'
        }],
        // inspection_time_start: [{
        //   type: 'date',
        //   required: true,
        //   message: '请选择开始日期',
        //   trigger: 'change'
        // }],
        inspection_address: [{
          required: true,
          message: '请输入检查地点',
          trigger: 'blur'
        }],
        // word: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        // num: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        // send_time: [{
        //   type: 'date',
        //   required: true,
        //   message: '请选择填发日期',
        //   trigger: 'change'
        // }],
        undertaker: [{
          type: 'number',
          required: true,
          message: '请选择承办人',
          trigger: 'change'
        }],
        approver: [{
          type: 'number',
          required: true,
          message: '请选择批准人',
          trigger: 'change'
        }],
        inspectors: [{
          type: 'number',
          required: true,
          message: '请选择检查人员',
          trigger: 'change'
        }]

      }
    }
  },
  methods: {
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    goBack() {
      this.$router.go(-1);
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
    async saveTaskInspect() {
      if (!this.utils.checkForm("taskInspectForm", this)) return;
      this.taskInspectForm.inspection_item = this.checkeItems.join(",");

      if (this.taskInspectForm.inspection_time_start != null && this.taskInspectForm.inspection_time_start != "") {
        this.taskInspectForm.inspection_time_start = this.utils.formatDate(new Date(this.taskInspectForm.inspection_time_start), "yyyy-MM-dd hh:mm:ss")
      }

      if (this.taskInspectForm.inspection_time_end != null && this.taskInspectForm.inspection_time_end != "") {
        this.taskInspectForm.inspection_time_end = this.utils.formatDate(new Date(this.taskInspectForm.inspection_time_end), "yyyy-MM-dd hh:mm:ss")
      }

      if (this.taskInspectForm.send_time != null && this.taskInspectForm.send_time != "") {
        this.taskInspectForm.send_time = this.utils.formatDate(new Date(this.taskInspectForm.send_time), "yyyy-MM-dd hh:mm:ss")
      }
      //太原公安组织机构id
      this.taskInspectForm.inspect_org = 5;

      if (this.$refs["taskInspectUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/taskInspect/saveTaskInspect.do", this.taskInspectForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["taskInspectUpload"].uploadFiles.length == 1) {
        this.$refs["taskInspectUpload"].submit();

      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }

    },
    downloadFile() {
      var params = {};
      params.tkey = "taskInspectTask";
      params.task_inspect_id = this.taskInspectForm.task_inspect_id;
      this.$store.dispatch('downloadFile', [params]);
    },
    async deleteFile() {
      var msg = await this.utils.req("/ssa/taskInspect/deleteFile.do", {
        task_inspect_id: this.taskInspectForm.task_inspect_id
      }, this);
      this.$message({
        message: msg,
        type: 'success'
      });
      this.params.attachment_filepath = "";
    }
  },
  created: function() {
    if (this.params.handle == 'update') {
      this.title = "编辑任务";
      this.taskInspectForm = this.params;
      this.checkeItems = this.params.checkeItems;
    }


  }
}
</script>
