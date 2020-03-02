<template>
<div style="margin-bottom:30px;">

  <el-card class="box-card" style="margin-top:20px;">
    <div slot="header" class="clearfix">
      {{this.$route.params.fromTitle}}
    </div>






    <el-form v-if="this.$route.params.handle !='create' " label-width="100px">
      <el-form label-width="100px">
        <el-form-item label="告警流程:">
          <a v-if="hiTasks.length > 0" style="color:#3b9dda;cursor:pointer;" @click="dialogVisible = true">处置流程</a>
          <i class="el-icon-view" style="color:#3b9dda;cursor:pointer;"   @click="showProcessTrace()"></i>
        </el-form-item>
      </el-form>
      <el-form-item label="告警类别:">
        <span>{{fmtalarmParentTypeList(alarm.alarm_parent_type)}}</span>
      </el-form-item>
      <el-form-item label="告警类型:">
        <span> {{fmtalarmTypeList(alarm.alarm_type) }}</span>
      </el-form-item>
      <el-form-item label="告警级别:">
        <span>{{fmtalarmGradeList(alarm.alarm_grade) }}</span>
      </el-form-item>
      <el-form-item label="备注:" style="width:50%">
        <span>{{alarm.remark}}</span>
      </el-form-item>
      <el-form-item label="附件" v-show="this.file.attachment_filename != null && this.file.attachment_filepath != ''">
        <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="downloadFile()">{{file.attachment_filename}}</a>
      </el-form-item>

      <el-form-item label="" v-if="this.$route.params.handle =='look' ">
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="this.$route.params.handle == 'create' || this.$route.params.handle == 'update' " :rules="alarmRules" ref="alarmForm" :model="alarmForm" label-width="100px">

      <el-form-item label="告警类别" prop="alarm_parent_type">
        <el-select v-model="alarmForm.alarm_parent_type" placeholder="请选择告警类别">
          <el-option v-for="item in alarmParentTypeList" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警类型" prop="alarm_type">
        <el-select v-model="alarmForm.alarm_type" placeholder="请选告警类型">
          <el-option v-for="item in alarmTypeList" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警级别" prop="alarm_grade">
        <el-select v-model="alarmForm.alarm_grade" placeholder="请选择告警级别">
          <el-option v-for="item in alarmGradeList" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门管理员" prop="user_id">
        <el-select v-model="alarmForm.user_id" placeholder="部门管理员" clearable>
          <el-option v-for="item in users" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="备注" style="width:50%">
        <el-input type="textarea" v-model="alarmForm.remark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="alarmIndoUpload" :action="handleUrl" :on-success="handleSuccess" :data="alarmForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="alarmInfoSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>


    <el-form v-if="this.$route.params.handle == 'pNotifyTask' " :rules="pNotifyTaskRules" ref="pNotifyTaskForm" :model="pNotifyTaskForm" label-width="100px">
      <el-form-item label="下发地市">
        <el-radio-group v-model="pNotifyTaskForm.isNotify">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下发部门" v-if="pNotifyTaskForm.isNotify == true" prop="municipalAARoles">
        <el-select v-model="pNotifyTaskForm.municipalAARoles" clearable placeholder="请选择下发部门">
          <el-option v-for="item in municipalAAList" :key="item.role_id" :label="item.title" :value="item.role_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" style="width:50%">
        <el-input type="textarea" v-model="pNotifyTaskForm.pNotifyTaskRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="pNotifyTaskUpload" action="/ssa/alarmManagerJs/completepNotifyTask.do" :on-success="handleSuccess" :data="pNotifyTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="pNotifyTaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>






    <el-form v-if="this.$route.params.handle == 'mAuditTask' " :model="mAuditTaskForm" label-width="100px">
      <el-form-item label="是否通过" required>
        <el-radio-group v-model="mAuditTaskForm.mAuditPass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见" style="width:50%">
        <el-input type="textarea" v-model="mAuditTaskForm.mAuditTaskRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="mAuditTaskUpload" action="/ssa/alarmManagerJs/completemAuditTask.do" :on-success="handleSuccess" :data="mAuditTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="mAuditTaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="this.$route.params.handle == 'pAudit1Task' " :model="pAudit1TaskForm" label-width="100px">
      <el-form-item label="是否通过" required>
        <el-radio-group v-model="pAudit1TaskForm.isProvincialPass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见" style="width:50%">
        <el-input type="textarea" v-model="pAudit1TaskForm.provincialRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="pAudit1TaskUpload" action="/ssa/alarmManagerJs/completepAudit1Task.do" :on-success="handleSuccess" :data="pAudit1TaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="pAudit1TaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>


    <el-form v-if="this.$route.params.handle == 'pAudit2Task' " :model="pAudit2TaskForm" label-width="100px">
      <el-form-item label="是否通过" required>
        <el-radio-group v-model="pAudit2TaskForm.pAudit2Pass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见" style="width:50%">
        <el-input type="textarea" v-model="pAudit2TaskForm.pAudit2TaskRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="pAudit2TaskUpload" action="/ssa/alarmManagerJs/completepAudit2Task.do" :on-success="handleSuccess" :data="pAudit2TaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="pAudit2TaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>







    <el-form v-if="this.$route.params.handle == 'mNotifyTask' " :rules="mNotifyTaskRules" ref="mNotifyTaskForm" :model="mNotifyTaskForm" label-width="100px">

      <el-form-item label="部门管理员" prop="user_id">
        <el-select v-model="mNotifyTaskForm.user_id" placeholder="部门管理员" clearable>
          <el-option v-for="item in users" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注" style="width:50%">
        <el-input type="textarea" v-model="mNotifyTaskForm.mNotifyTaskRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="mNotifyTaskUpload" action="/ssa/alarmManagerJs/completemNotifyTask.do" :on-success="handleSuccess" :data="mNotifyTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="mNotifyTaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="this.$route.params.handle == 'mHandleTask' " :model="mhandleTaskForm" label-width="100px">
      <el-form-item label="处置内容" style="width:50%">
        <el-input type="textarea" v-model="mhandleTaskForm.mhandleTaskRemark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload ref="mhandleTaskUpload" action="/ssa/alarmManagerJs/completemhandleTask.do" :on-success="handleSuccess" :data="mhandleTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="mhandleTaskSubmit">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>





  </el-card>


  <el-card class="box-card" style="margin-top:20px;">
    <div slot="header" class="clearfix">
      告警信息
    </div>
    <template v-for="(bitem,bindex) in infoOptions">
     <a v-if  v-if="bitem.type=='string'" > {{bitem.data}}</a>
     <div  v-if="bitem.type=='tableInfo'"  style="margin-top:30px;">
       <div class="el-panel-white-subtitle">{{bitem.label}}</div>
       <paramsTable :columns="bitem.columns" :tableData = "bitem.tableData" ></paramsTable>
     </div>
    </template>


    <!-- <div style="margin-top:30px;">
      <div class="el-panel-white-subtitle">关联事件</div>
      <defTable @currentChange="showEventInfo" ref="eventTable" :highlight-current-row="true" :params="eventParams" :loadUrl="eventUrl">
        <template slot="fixedColumn">
          <el-table-column    prop=""    label="事发时间">
            <template slot-scope="scope">
              <div style="cursor:pointer;">
                 {{scope.row.logTime_dt}}
              </div>
             </template>
        </el-table-column>
        </template>
      </defTable>

      <div style="margin-top:15px;width:100%;height:666px;float:left;overflow:auto;" v-show="eventShow">
        <dataTotalTable :tableData="eventData"></dataTotalTable>
      </div>
    </div> -->
    <div style="margin-top:30px;">
      <div class="el-panel-white-subtitle">关联事件</div>
      <defTable
        @currentChange="showEventInfo"
        ref="eventTable"
        :highlight-current-row="true"
        :pageSize="30"
        style="margin-top:15px;width:20%;height:666px;float:left;"
        :params="eventParams"
        :loadUrl="eventUrl"
      >
        <template slot="fixedColumn">
          <el-table-column prop label="事发时间">
            <template slot-scope="scope">
              <div style="cursor:pointer;">{{scope.row.logTime_dt}}</div>
            </template>
          </el-table-column>
        </template>
      </defTable>

      <div style="margin-top:15px;width:80%;height:666px;float:left;overflow:auto;" v-show="eventShow">
        <dataTotalTable :tableData="eventData"></dataTotalTable>
      </div>
    </div>
  </el-card>

  <el-dialog title="流程轨迹" :visible.sync="processVisible" width="60%">
    <img width="100%" :src="processTrace" alt="流程轨迹图">
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="processVisible = false">确 定</el-button>
    </span>
  </el-dialog>



  <el-dialog title="处置流程" :visible.sync="dialogVisible" width="50%">
    <el-collapse v-model="activeNames" class="Check-the-process-state-collapse" @change="showTaskDeTail($event)">
      <el-collapse-item class="processcollapse-item" v-for="(item, index) in hiTasks" :name="item.processInstanceId+','+item.taskDefinitionKey+','+item.id">
        <template slot="title">
            <span class="processcollapse-itemnane" > {{item.name}}</span>
            &nbsp;&nbsp;<label>{{ formatDate(item.endTime)}}</label>
            &nbsp;&nbsp;<span class="processcollapse-itemperson" >{{item.assignee}}</span>
        </template>
        <div>
          <mainDetail :ref="item.id"></mainDetail>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import defTable from 'components/table/DefTable.vue'
import processForm from 'components/processInfo/ProcessForm.vue'
import common from 'components/js/common.js'
import dataTotalTable from '../../netAttack/components/DataTotalTable.vue'
import paramsTable from 'components/processInfo/ParamsTable.vue'
import mainDetail from './detail/MainDetail'


export default {
  components: {
    paramsTable,
    processForm,
    dataTotalTable,
    defTable,
    mainDetail
  },

  computed: {
    ...mapState({
      alarmParentTypeList: state => state.context.alarmParentTypeList,
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList
    })
  },
  data() {
    return {

      pNotifyTaskRules: {
        municipalAARoles: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      },
      alarmRules: {
        user_id: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      },
      mNotifyTaskRules: {
        user_id: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      },
      users: [],
      detailMap: {
        pNotifyTask: "pNotifyTaskDetail",
        pAudit1Task: "pAudit1TaskDetail",
        mNotifyTask: "mNotifyTaskDetail",
        mHandleTask: "mHandleTaskDetail",
        mAuditTask: "mAuditTaskDetail",
        pAudit2Task: "pAudit2TaskDetail"
      },

      store: [],
      activeNames: [],
      handleUrl: "/ssa/alarmManagerJs/startProcess.do",
      dialogVisible: false,
      processVisible: false,
      hiTasks: [],
      alarm: {
        alarm_id: null,
        alarm_parent_type: null,
        alarm_type: null,
        alarm_grade: null,
        remark: ""
      },
      alarmForm: {
        alarm_id: null,
        alarm_parent_type: null,
        alarm_type: null,
        alarm_grade: null,
        remark: "",
        system_name: "",
        user_id: null
      },

      mhandleTaskForm: {
        mhandleTaskRemark: "",
      },
      mNotifyTaskForm: {
        user_id: null,
        mNotifyTaskRemark: ""
      },
      municipalAAList: [],
      pNotifyTaskForm: {
        isNotify: false,
        municipalAARoles: null,
        pNotifyTaskRemark: ""
      },
      municipalApproveForm: {
        isMunicipalApprovePass: false,
        municipalRemark: ""

      },
      mAuditTaskForm: {
        mAuditPass: false,
        mAuditTaskRemark: ""
      },

      pAudit1TaskForm: {
        isProvincialPass: false,
        provincialRemark: ""
      },
      pAudit2TaskForm: {
        pAudit2Pass: false,
        pAudit2TaskRemark: ""
      },
      file: {
        attachment_filename: null,
        attachment_filepath: null
      },
      eventData: [],
      eventShow: false,
      eventParams: {
        alarmId: null,
      },
      eventUrl: "/ssa/alarmManagerJs/getSolrQuery.do",
      infoOptions: [{
          type: "string",
          data: ""
        },
        {
          label: "基础信息",
          type: "tableInfo",
          name: "info",
          columns: [],
          tableData: []
        },
        {
          label: "源信息",
          type: "tableInfo",
          name: "info2",
          columns: [],
          tableData: []
        },
        {
          label: "目标信息",
          type: "tableInfo",
          name: "info3",
          columns: [],
          tableData: []
        }
      ]



    }
  },
  methods: {

    async showTaskDeTail(activeNames, e) {
      var id;
      for (id in activeNames) {
        var task = activeNames[id];
        if (this.store[task] == undefined) {
          var taskAttr = task.split(",");
          var processId = taskAttr[0];
          var tkey = taskAttr[1];
          var taskId = taskAttr[2];
          var params = {};
          params.taskId = taskId;
          params.processInstanceId = processId;
          params.alarm_id = this.$route.params.alarm_id;
          params.tkey = tkey;
          var detail = this.$refs[taskId][0];

          detail.currentDetail = this.detailMap[tkey];
          params.tkey = tkey;
          this.$refs[taskId][0].params = params;
          this.store[task] = "in";
        }
      }
    },
    showProcessTrace() {
      this.processTrace = "/ssa/processMgmt/processTrace.do?processId=" + this.$route.params.processInstanceId + "&r=" + Math.random();
      this.processVisible = true;
    },

    formatDate(date) {
      if (date == null) {
        return "";
      }
      return this.utils.formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss");
    },
    downloadFile() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.alarm.alarm_id + "&bussiness_type=" + "alarmMgmtJsProcess";
      window.location.href = fileUrl;
    },
    fmtalarmGradeList(val) {
      for (var item in this.alarmGradeList) {
        if (val == this.alarmGradeList[item].value) {
          return this.alarmGradeList[item].label;
        }
      }
    },
    fmtalarmTypeList(val) {
      for (var item in this.alarmTypeList) {
        if (val == this.alarmTypeList[item].value) {
          return this.alarmTypeList[item].label;
        }
      }
    },

    fmtalarmParentTypeList(val) {
      for (var item in this.alarmParentTypeList) {
        if (val == this.alarmParentTypeList[item].value) {
          return this.alarmParentTypeList[item].label;
        }
      }
    },

    showEventInfo(currentRow, oldCurrentRow) {
      this.eventShow = true;
      currentRow.processShow = false,
        this.eventData = currentRow;
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

    setAlarmInfoTable(data) {

      if (data.src_area) {
        let area = data.src_area.split(",");
        data.src_country = area[0];
        if (area.length >= 2) {
          data.src_city = area[1];
        }
      }


      if (data.alarm_type) {
        data.alarmTypeName = this.fmtalarmTypeList(data.alarm_type);
      }

      if (data.alarm_parent_type) {
        data.alarmParentType = this.fmtalarmParentTypeList(data.alarm_parent_type);
      }

      let infoOptions = this.infoOptions;
      //告警信息
      infoOptions[0].data = data.alarm_desc;
      //基础信息
      infoOptions[1].tableData = [data];
      infoOptions[1].columns = [{
            label: "类别",
            name: "alarmParentType"
          },
          {
            label: "类型",
            name: "alarmTypeName"
          },
          {
            label: "级别",
            name: "alarmGradeName"
          },
          {
            label: "关键字",
            name: "alarm_key"
          },
          {
            label: "累计次数",
            name: "sum"
          }
        ],
        //源信息
        infoOptions[2].tableData = [data];
      infoOptions[2].columns = [{
          label: "源IP",
          name: "src_ip"
        },
        {
          label: "资产标识",
          name: "src_asset_id"
        },
        {
          label: "组织机构",
          name: "src_org_name"
        },
        {
          label: "国家",
          name: "src_country"
        },
        {
          label: "城市",
          name: "src_city"
        },
      ];
      //目标信息
      infoOptions[3].tableData = [data];
      infoOptions[3].columns = [{
          label: "目标IP",
          name: "dst_ip"
        },
        {
          label: "资产标识",
          name: "dst_asset_id"
        },
        {
          label: "组织机构",
          name: "dst_org_name"
        },
      ]

    },
    async alarmInfoSubmit() {
      if (!this.utils.checkForm("alarmForm", this)) return;
      var params = {};
      params = this.alarmForm;

      if (this.$refs["alarmIndoUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req(this.handleUrl, params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["alarmIndoUpload"].uploadFiles.length == 1) {
        this.$refs["alarmIndoUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },




    async mNotifyTaskSubmit() {
      if (!this.utils.checkForm("mNotifyTaskForm", this)) return;

      var params = {};
      params = this.mNotifyTaskForm;
      params.taskId = this.$route.params.taskId;
      params.alarm_id = this.$route.params.alarm_id;
      if (this.$refs["mNotifyTaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completemNotifyTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["mNotifyTaskUpload"].uploadFiles.length == 1) {
        this.$refs["mNotifyTaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },




    async mhandleTaskSubmit() {
      var params = {};
      params = this.mhandleTaskForm;
      params.taskId = this.$route.params.taskId;

      params.alarm_id = this.$route.params.alarm_id;
      if (this.$refs["mhandleTaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completemhandleTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["mhandleTaskUpload"].uploadFiles.length == 1) {
        this.$refs["mhandleTaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },

    async pAudit1TaskSubmit() {
      var params = {};
      params = this.pAudit1TaskForm;
      params.taskId = this.$route.params.taskId;
      params.alarm_id = this.$route.params.alarm_id;
      if (this.$refs["pAudit1TaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completepAudit1Task.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["pAudit1TaskUpload"].uploadFiles.length == 1) {
        this.$refs["pAudit1TaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },


    async pAudit2TaskSubmit() {
      var params = {};
      params = this.pAudit2TaskForm;
      params.taskId = this.$route.params.taskId;
      params.alarm_id = this.$route.params.alarm_id;
      if (this.$refs["pAudit2TaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completepAudit2Task.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["pAudit2TaskUpload"].uploadFiles.length == 1) {
        this.$refs["pAudit2TaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },


    async mAuditTaskSubmit() {
      var params = {};
      params = this.mAuditTaskForm;
      params.taskId = this.$route.params.taskId;
      params.alarm_id = this.$route.params.alarm_id;
      if (this.$refs["mAuditTaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completemAuditTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["mAuditTaskUpload"].uploadFiles.length == 1) {
        this.$refs["mAuditTaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },






    async pNotifyTaskSubmit() {
      if (!this.utils.checkForm("pNotifyTaskForm", this)) return;
      var params = {};
      this.pNotifyTaskForm.taskId = this.$route.params.taskId;
      this.pNotifyTaskForm.alarm_id = this.$route.params.alarm_id;
      params = this.pNotifyTaskForm;


      if (this.$refs["pNotifyTaskUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/alarmManagerJs/completepNotifyTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["pNotifyTaskUpload"].uploadFiles.length == 1) {
        this.$refs["pNotifyTaskUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function() {
    let alarmId = this.$route.params.alarm_id;
    let alarm = await this.common.req("/ssa/alarmManagerJs/getAlarmInfoById.do", {
      alarmId: alarmId
    })

    var attachment = await this.common.req("/ssa/alarmManagerJs/getAttachment.do", {
      bussiness_type: "alarmMgmtJsProcess",
      bussiness_id: alarmId
    });

    if (attachment != null) {
      this.file = attachment;
    }
    if (this.$route.params.handle == "update") {
      this.handleUrl = "/ssa/alarmManagerJs/completeModifyAlarmInfoTask.do"
      this.alarmForm.taskId = this.$route.params.tId;
    }
    var vm = this;
    if (this.$route.params.status != 0 && this.$route.params.processInstanceId != null) {
      this.common.req("/ssa/alarmManagerJs/listHiTask.do", {
        processInstanceId: this.$route.params.processInstanceId
      }).then(function(data) {
        vm.hiTasks = data;
      });
    }


    if (this.$route.params.handle == 'pNotifyTask') {
      this.common.req("/ssa/alarmManagerJs/getSystemRoles.do", {
        system_name: this.$route.params.system_name,
        role_type: 1
      }).then(function(data) {
        vm.municipalAAList = data;
      });
    }
    this.alarm = alarm;
    this.eventParams.alarmId = alarmId;


    this.common.req("/ssa/alarmManagerJs/getUpmsUsers.do", {
      system_name: this.$route.params.system_name

    }).then(function(data) {
      vm.users = data;
    });

    this.$refs.eventTable.loadTableData();
    await this.setAlarmInfoTable(alarm);

  },
  mounted: async function() {
    this.alarmForm.alarm_id = this.$route.params.alarm_id;
    this.alarmForm.alarm_parent_type = this.$route.params.alarm_parent_type + "";
    this.alarmForm.alarm_type = this.$route.params.alarm_type;
    this.alarmForm.alarm_grade = this.$route.params.alarm_grade + "";
    this.alarmForm.area_id = this.$route.params.area_id;
    this.alarmForm.system_name = this.$route.params.system_name;
  }
}
</script>
<style>
.link {
  color: #3b9dda;
}
</style>
