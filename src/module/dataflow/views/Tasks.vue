<template>
  <container class="task"
    @currentChange="pageChange"
    v-loading="page.loading"
    size="mini"
    style="background: white"
    :page="page">
    <template slot="toolbar">
      <el-tabs v-model="search.type" @tab-click="tabHandleClick">
        <el-tab-pane label="在线场景" name="1"></el-tab-pane>
        <el-tab-pane label="离线场景" name="0"></el-tab-pane>
      </el-tabs>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="search.name" placeholder="场景名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="search.status" placeholder="运行状态">
            <el-option v-for="(item, key) in statusList" :label="item" :key="key" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onRefresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <!-- <el-table-column>
        <template slot-scope="props">
           <div v-if="props.row.flowJobLog" style="padding-bottom: 10px;">
            日志： {{props.row.flowJobLog}}
          </div>
          <div class="graph" :id="'graph-' + props.row.flowJobId"></div>
          <el-table v-if="props.row.data.length > 0" :data="props.row.data" size="mini" stripe border style="width: 100%">
            <el-table-column show-overflow-tooltip prop="stepName" label="任务名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="start" label="开始时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="end" label="结束时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="status" label="状态"></el-table-column>
          </el-table>
          <div v-else style="text-align: center">无数据</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="flowJobId" label="任务ID"></el-table-column>
      <el-table-column prop="flowName" label="场景名称"></el-table-column>
      <!-- <el-table-column prop="flowType" label="场景类型">
        <template slot-scope="props">
          <div>{{props.row.flowType == 1 ? '在线' : '离线'}}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="contextName" label="模型环境"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="props">
          <div>{{fmtStatus(props.row)}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="realname" label="用户"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column width="150px" label="操作">
        <template slot-scope="props">
          <!-- <i class="el-icon-delete" title="删除" @click="stop(props.row)"></i> -->
          <el-button v-if="isRunning(props.row)" type="danger" size="mini" @click="stopFlow(props.row)">停止 </el-button>
          <el-button size="mini" @click="showJobDetail(props.row)">查看</el-button>
        </template>
      </el-table-column>
    </template>
    <job-detail :dialog="jobDetail"></job-detail>
  </container>
</template>

<script>
import axios from 'axios';
import Api from '../common/Api';
import Container from '../components/Container'
import { dateFmt } from '../common/Util';
import G6Flow from '../common/G6Flow';
import JobDetail from '../components/JobDetail'

const ONLINE_STATUS = {'COMPLETED': '运行中', 'FAILED': '失败', 'STOPPED':'已停止', '': '所有状态'}
const OFFLINE_STATUS = {'COMPLETED': '完成', 'FAILED': '失败', 'STARTING':'启动中', 'STARTED':'已启动', 'STOPPED':'已停止', '': '所有状态'}

export default {
  name: 'tasks',
  components: { Container, JobDetail },
  data () {
    return {
      statusMap: {'COMPLETED':'完成','FAILED':'失败','RUNNING':'运行中','STARTING':'启动中','STARTED':'已启动','STOPPED':'已停止','STOPPING':"停止中", '': '所有状态'},
      page: {
        data: [],
        pageIndex: 1,
        total: 10,
        loading: false
      },
      jobDetail: {
        visible: false,
        dsltext: '',
        apps: [],
        job: ''
      },
      search: {
        name: '',
        status: '',
        type: '1'
      },
      statusList: OFFLINE_STATUS,
    }
  },
  created () {
    this.getTasks();
  },
  methods: {
    fmtStatus(row){
      let status = "";
      if(row.flowType == 1 && this.isRunning(row)){      
        return '运行中';
      } 
      return this.statusMap[row.status];
    },
    isRunning(row){ 
      let status = row.status ;
      let stopFlag = status == "STARTING" || status == "STARTED";
      if(row.flowType == 0){
        return stopFlag;
      }         
      return stopFlag ||  row.status == "COMPLETED";
    },
    stopFlow(row){
      this.$confirm('此操作将停止任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {...row}; 
        params.createTime = null;
          axios.post(Api.stopFlowJob, params).then(result=>{
            this.getTasks();
              this.$message({
              type: 'success',
              message: result.data.message,
            });
          });
      }) 
    },
    onSubmit () {
      this.getTasks();
    },
    onRefresh () {
      this.getTasks();
    },
    pageChange (index) {
      this.page.pageIndex = index;
      this.getTasks();
    },
    tabHandleClick () {
      if (this.search.type == '0') {
        this.statusList = OFFLINE_STATUS;
      } else {
        this.statusList = ONLINE_STATUS;
      }
      this.search.status = ''
      this.getTasks();
    },
    async getTasks() { 
      let params = {
        pageIndex: this.page.pageIndex, pageSize: 10,
        type: this.search.type
      };
      this.search.name && (params.name = this.search.name)
      this.search.status && (params.status = this.search.status)

      let response = await axios.post(Api.getTasks, params);
      this.page.total = response.data.total;
      this.page.data = response.data.rowData.map(v => {
        v.data = [];
        v.createTime = dateFmt(v.createTime, 'MM-dd hh:mm:ss');
        return v;
      });
    },
    async showJobDetail (job) {
      if (this.jobDetail.apps.length === 0) {
        let rp = await axios.post(Api.getAppList);
        this.jobDetail.apps = rp.data.data;
      }
      this.jobDetail.visible = true;
      this.jobDetail.dsltext = job.dsltext;
      // this.jobDetail.jobExecutionId = job.jobExecutionId;
      this.jobDetail.job = job;
    }
  }
}
</script>

<style scoped>
.task {
  margin: 0 10px;
}
.task .el-icon-delete{
  color: #f56c6c;
  font-size: 16px !important;
  cursor: pointer;
}
</style>

