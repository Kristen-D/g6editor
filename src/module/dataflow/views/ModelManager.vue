<template>
  <div class="model-manager" v-loading="loading">
    <el-container>
      <!-- <el-header height="40px" class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>模型管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header> -->
      <el-container class="content">
        <el-aside width="200px">
          <el-tabs v-model="activeTemplate" @tab-click="handleViewChange">
            <el-tab-pane name="my" label="我的场景">
              <!-- <ul class="list">
                <li :key="item.flowId"
                  :class="{active: item.flowId === currentFlow.flowId}"
                  @click="selectFlow(item)"
                  v-for="item in page.data">
                  {{item.flowName}}
                </li>
              </ul> -->
              <el-input
                v-model="filter"
                placeholder="场景名称"
                prefix-icon="el-icon-search" 
                size="mini"></el-input>
              <el-menu
                :default-active="activeFlow + ''"
                @select="selectFlow"
                class="el-menu-vertical"
              >
                <el-menu-item
                    :key="item.flowId"
                    v-for="item in page.data"
                    :index="item.flowId + ''"
                  >{{item.flowName}}</el-menu-item>
              </el-menu>
            </el-tab-pane>
            <el-tab-pane name="template" label="场景模板">
              <el-menu
                :default-active="currentFlow.sceneId + ''"
                :default-openeds="['1']"
                @select="selectFlow"
                class="el-menu-vertical"
              >
                <el-submenu :key="i" :index="index" v-for="(index, i) in ['1']">
                  <span slot="title">{{index=='1'?'网络和通信安全': (i=='2' ? '设备和计算安全': '应用和数据安全')}}</span>
                  <!-- <span slot="title">{{(i==1 ? '公共': '离线')}}</span> -->
                  <el-menu-item
                    :key="item.sceneId"
                    v-for="item in template.data.filter(v => v.dataType == index)"
                    :index="item.sceneId + ''"
                  >{{item.flowName}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-tab-pane>
          </el-tabs>
          <!-- <h5 class="aside-title"> -->
            <!-- 所有模型 -->
            <!-- <i @click="addModel" class="el-icon-plus" title="增加"></i> -->
            <!-- <el-button  size="mini" style="float: right; margin-top: 6px;" type="primary"></el-button> -->
          <!-- </h5> -->
         
        </el-aside>
        <el-main :class="{'prop': views.includes('属性'), 'log': views.includes('任务')}">
          <h5 class="main-title">
            <template v-if="activeTemplate === 'my'">
              <i @click="editModel" class="el-icon-edit" title="修改"></i>
              <i @click="delModel" class="el-icon-delete" title="删除"></i>
              <i title="启动" @click="showFlowJob()" class="el-icon-caret-right"></i>
              <div class="btn-add" @click="addModel(0)"><i class="el-icon-plus" title="增加"></i>离线</div>
              <div class="btn-add" @click="addModel(1)"><i class="el-icon-plus" title="增加"></i>在线</div>
            </template>
            <template v-if="activeTemplate === 'template'">
              <div class="btn-add" @click="addModel(2)"><i class="el-icon-plus" title="增加"></i>用它创建场景</div>
            </template>

            <!-- <el-button @click="editModel" size="mini" type="primary">修改</el-button>
            <el-button @click="delModel" size="mini" type="danger">删除</el-button> -->
            <div style="float: right">
              <div style="float: left;">视图：</div>
              <el-checkbox-group v-model="views" style="float: left">
                <el-checkbox label="属性"></el-checkbox>
                <el-checkbox label="任务"></el-checkbox>
              </el-checkbox-group>
            </div>
          </h5>
          <div class="graph" ref="graph"></div>
          <div class="properties" v-if="views.includes('属性')">
            <el-tabs>
              <el-tab-pane label="属性">
                <el-form size="mini" label-position="top">
                  <el-form-item label="场景名称">
                    <el-input v-model="currentFlow.flowName" type="text" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="类别">
                    <el-input v-model="currentFlow.flowTypeText" type="text" readonly></el-input>
                  </el-form-item>
                  <el-form-item v-if="currentFlow.createTimeText" label="创建时间">
                    <el-input v-model="currentFlow.createTimeText" type="text" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="场景描述">
                    <el-input :autosize="{ minRows: 2, maxRows: 6}" v-model="currentFlow.description" type="textarea" readonly></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="标签">
                    <el-tag>标签一</el-tag>
                    <el-tag>标签一</el-tag>
                  </el-form-item> -->
                </el-form>
              </el-tab-pane>
              <!-- <el-tab-pane label="配置">
                配置
              </el-tab-pane> -->
            </el-tabs>
          </div>
          <div class="logger" v-if="views.includes('任务')">
            <el-tabs>
              <el-tab-pane label="所有任务">
                <div class="list">
                  <div class="item" v-for="job in jobs" :key="job.flowJobId">
                      {{job.createTime + '  ' + currentFlow.flowName}}
                    <!-- <span v-if="isRunning(job)" @click="stopFlow(job)" class="stop">停止</span> -->
                    <span @click="jumpJobDetail(job)" class="stop">查看</span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="运行流程" :visible.sync="flowJob.visible" width="30%">
      <el-form ref="flowJob" :model="flowJob">
        <el-form-item label="任务继承">
          <el-select v-model="flowJob.extendJobId" placeholder="请选择活动区域">
            <el-option
              v-for="item in flowJobList"
              :key="item.flowJobId"
              :label="item.flowJobId"
              :value="item.flowJobId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flowJob.visible = false">取消</el-button>
        <el-button :loading="loading" type="primary" @click="startFlowJob">启动</el-button>
      </div>
    </el-dialog>
    <job-detail :dialog="jobDetail"></job-detail>
  </div>
</template>

<script>
import axios from 'axios'
import Api from '../common/Api'
import G6EditorStatic from '../common/G6EditorStatic'
import OnlineEditorGraph from '../common/OnlineEditorGraph'
import { dateFmt } from '../common/Util'
import JobDetail from '../components/JobDetail'
import { toG6Graph } from '../common/Convertor'

const STATUS = {'COMPLETED':'完成','FAILED':'失败','RUNNING':'运行中','STARTING':'启动中','STARTED':'已启动','STOPPED':'已停止','STOPPING':"停止中"}

export default {
  name: 'modelManager',
  components: {
    JobDetail
  },
  data () {
    return {
      page: {
        data: [],
        pageIndex: 1,
        pageSize: 1000,
        loading: false,
        filterData: []
      },
      template: {
        data: [],
        pageIndex: 1,
        pageSize: 1000
      },
      views: ['属性', '任务'],
      currentFlow: {},
      jobs: [],
      jobSteps: [],
      apps: [],
      activeTemplate: 'my',
      loading: false,
      activeFlow: '',
      flowJob: {
        extendJobId: null,
        visible: false
      },
      flowJobList: [],
      jobDetail: {
        visible: false,
        dsltext: '',
        apps: [],
        job: '',
        flowType: 0
      },
      filter: '',
      query: {}
    }
  },
  created (params) {
    this.query = this.$route.query;
    if (this.query.type && this.query.type == 'template') {
      this.activeTemplate = 'template'
      this.getTemplates();
    } else {
      this.getFlows();
    }
  },
  watch: {
    filter () {
      this.page.data = this.page.filterData.filter(v => {
        return this.filter ? v.flowName.indexOf(this.filter) != -1 : true;
      })
    }
  },
  methods: {
    handleViewChange ({name}, event) {
      if (name === 'template' && this.template.data.length === 0) {
        this.getTemplates();
      } else if (name === 'my' && this.page.data.length === 0) {
        this.getFlows();
      } else if (name === 'template') {
        this.selectFlow(this.template.data[0].sceneId);
      } else if (name === 'my') {
        this.selectFlow(this.page.data[0].flowId);
      }
    },
    addModel (type) {
      // type === 2 基本模板创建的
      if (type !== 2) {
        this.$router.push('/editor?type=' + type);
      } else {
        this.$router.push('/editor?type=' + type + '&id=' + this.currentFlow.sceneId);
      }
    },
    editModel () {
      this.$router.push(`/editor?id=${this.currentFlow.flowId}`);
    },
    jumpJobDetail(job) {
      this.jobDetail.visible = true;
      this.jobDetail.apps = this.apps;
      this.jobDetail.dsltext = this.currentFlow.dsltext;
      this.jobDetail.flowType = this.currentFlow.flowType;
      // this.jobDetail.jobExecutionId = job.jobExecutionId;
      this.jobDetail.job = job;
      this.jobDetail.job.flowName = this.currentFlow.flowName;
    },
    showFlowJob() {
      this.flowJob.visible = true;
      this.flowJob = { ...this.flowJob, ...this.currentFlow };
      axios.post(Api.getFlowHisJob, this.currentFlow).then(result => {
        this.flowJobList = result.data.data || [];
      });
    },
    startFlowJob() {
      this.loading = true;
      axios.post(Api.startFlowJob, this.flowJob).then(resp => {
        let result = resp.data;
        axios.post(Api.onlineServerStart, {
          id: result.data,
          params: this.flowJob.flowParams,
          type: this.currentFlow.flowType
        }).then(resp => {
          this.$alert(resp.data.message, "消息");
          this.flowJob.visible = false;
          this.getJobsByFlowId(this.currentFlow.flowId)
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        })
      });
    },
    async delModel () {
      await this.$confirm('此操作将永久删除场景, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await axios.post(Api.deleteFlow, { flowId: this.currentFlow.flowId });
      this.getFlows();
    },
    async getFlows () {
      let response = await axios.post(Api.getFlows, {
        pageIndex: this.page.pageIndex, pageSize: this.page.pageSize
      });
      const base64 = new Base64();
      this.page.total = response.data.total;
      this.page.data = response.data.rowData.map(v => {
        v.dsltext = base64.decode(v.dsltext);
        v.flowTypeText = v.flowType === 0 ? '离线' : '在线'
        v.createTimeText = dateFmt(v.createTime, 'yyyy-MM-dd hh:mm:ss')
        return v;
      });
      this.page.filterData = [...this.page.data]
      if (this.page.data.length > 0) {
        if (this.query.id && this.query.id > 0) {
          this.currentFlow = this.page.data.find(v => v.flowId == this.query.id);
          this.query.id = -1;
        } else {
          this.currentFlow = this.page.data[0];
        }
        this.activeFlow = this.currentFlow.flowId;
        this.getJobsByFlowId(this.currentFlow.flowId);
      }
    },
    async getTemplates() {
      let response = await axios.post(Api.getTemplates, {
        pageIndex: this.page.pageIndex, pageSize: this.page.pageSize
      });
      this.template.total = response.data.total;
      this.template.data = response.data.rowData.map(v => {
        v.flowTypeText = v.flowType === 0 ? '离线' : '在线'
        // v.createTime = dateFmt(v.createTime, 'yyyy-MM-dd hh:mm:ss')
        return v;
      }).filter(v => v.dataType == 1);

      if (this.template.data.length > 0) {
        if (this.query.id &&this.query.id > 0) {
          this.currentFlow = this.template.data.find(v => v.sceneId == this.query.id);
          this.query.id = -1;
        } else {
          this.currentFlow = this.template.data[0];
        }
        this.activeFlow = this.currentFlow.sceneId;
        this.createGraph();
      }
    },
    selectFlow (flow) {
      if (this.activeFlow != flow) {
        this.activeFlow = flow;
        if (this.activeTemplate === 'my') { // 是否是我的场景
          this.currentFlow = this.page.data.filter(v => v.flowId == flow)[0];
          this.getJobsByFlowId(this.currentFlow.flowId)
        } else {
          this.currentFlow = this.template.data.filter(v => v.sceneId == flow)[0];
          this.createGraph();
        }
      }
    },
    async getJobsByFlowId (id) {
      this.loading = true;
      let response = await axios.post(Api.getJobsByFlowId + `${id}.do?type=${this.currentFlow.flowType}`, );
      this.jobs = response.data.data.map(v => {
        v.dateTime = dateFmt(v.createTime, 'yyyy-MM-dd hh:mm:ss');
        v.statusText =  '运行中';
        return v;
      });
      this.createGraph();
      this.loading = false;
    },
    async getJobSteps (id) {
      let response = await axios.post(`${Api.getStepTasks}?id=${id}`, {
        pageIndex: 1, pageSize: 100
      })
      this.jobSteps = response.data.rowData;
    },
    async createGraph () {
      if (!this.currentFlow.dsltext) {
        this.$refs.graph && (this.$refs.graph.innerHTML = null)
        return ;
      }
      // 绘图
      this.$refs.graph && (this.$refs.graph.innerHTML = null)

      // 获取model preview 数据
      if (this.jobs.length > 0) {
        let rp = await axios.post(Api.getModelPreviewByJobId+ `${this.jobs[0].flowJobId}.do`);
        this.jobSteps = rp.data.data
      } else {
        this.jobSteps = []
      }
      new OnlineEditorGraph(this.$refs.graph, JSON.parse(this.currentFlow.dsltext), this.jobSteps, null);
    }
  }
}
</script>

<style scoped>
  .model-manager {
    height: 100%;
    padding: 0 10px;
  }
  .model-manager .breadcrumb {
    padding-top: 15px;
  }
  .model-manager .content {
    background: white;
  }
  .model-manager .aside-title {
    height: 40px;
    line-height: 40px;
    padding: 0 8px; 
    border-bottom: 1px solid #e4e7ed;
  }
  .model-manager .list {
    padding: 5px;
  }
  .model-manager .list li {
    padding: 5px;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
  }
  .model-manager .list li.active,
  .model-manager .list li:hover {
    color: #409EFF;
  }
  .model-manager .graph {
    height: 100%; width: 100%;
    /* background:#F2F2F2 */
  }
  .model-manager .el-icon-plus {
    margin-top: 12px;
    cursor: pointer;
    color: #409EFF;
    font-size: 16px !important;
  }
  .model-manager .el-icon-delete{
    color: #f56c6c;
  }
  .model-manager .el-icon-edit,
  .model-manager .el-icon-caret-right,
  .model-manager .el-icon-delete {
    font-size: 16px !important;
    cursor: pointer;
    margin-left: 8px;
  }
  .model-manager .main-title {
    height: 40px;
    line-height: 40px;
    padding: 0 8px; 
    border-bottom: 1px solid #e4e7ed;
  }
  .model-manager .properties {
    position: absolute;
    width: 200px;
    right: 0;
    top: 0;
    border-left: 1px solid #F2F2F2;
    bottom: 0;
    z-index: 11;
    background: white;
    padding-top: 40px;
  }
  .model-manager .logger {
    position: absolute;
    z-index: 10;
    height: 160px;
    bottom: 0;
    left: 0;
    width: 100%;
    /* overflow: auto; */
    padding-top: 40px;
    border-top: 1px solid #f2f2f2;
  }
  .model-manager .logger .aside-title {
    background: #eef1f5;
  }
  .model-manager .logger .list {
    overflow: auto;
    height: 100%;
    padding-right: 210px;
  }
  .model-manager .logger .list .stop {
    float: right;
    color: #409EFF;
    cursor: pointer;
  }
  .model-manager .logger .list .item {
    line-height: 25px;
    height: 25px;
    cursor: pointer;
  }
  .model-manager .logger .list .item:hover {
    background: #eef1f5;
  }
  .model-manager .btn-add {
    display: inline-block;
    padding-left: 10px;
    cursor: pointer;
  }
  .model-manager .btn-add i {
    margin-left: 3px;
    margin-right: 3px;
    float: left;
    line-height: 15px;
  }
  .model-manager .stop {
    padding: 0 10px;
  }
</style>

<style lang="">
  .model-manager .el-aside {
    height: 100%;
    border-right: 1px solid #F2F2F2;
    padding-top: 40px;
  }
  .model-manager .content .el-main {
    padding: 0;
    position: relative;
    overflow: hidden;
  }
  .model-manager .content .el-main.prop {
    padding-right: 200px;
  }
  .model-manager .content .el-main.log {
    padding-bottom: 200px;
  }
  .model-manager .content .el-main .aside-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0px;
  }
  .model-manager .el-tabs__header {
    margin: 0;
  }
  .model-manager .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .model-manager .el-checkbox+.el-checkbox {
    margin-left: 10px;
  }
  .model-manager .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .model-manager .el-form-item {
    margin-bottom: 5px;
  }
  .model-manager .el-menu {
    border: none;
    padding: 10px 0;
  }
  .model-manager .el-submenu__title,
  .model-manager .el-submenu .el-menu-item,
  .model-manager .el-menu-item {
    height: 30px;
    line-height: 30px;
  }
  .model-manager .el-submenu__title {
    padding: 0;
  }
  .model-manager .content .el-tabs {
    height: 100%;
    position: relative;
    top: -40px;
  }
  .model-manager .content .el-tabs .el-tabs__header.is-top .el-tabs__nav-scroll{
    padding-left: 10px;
  }
  .model-manager .content .el-tabs__content {
    overflow: auto;
    height: 100%;
    padding: 5px;
  }
  .model-manager .el-tabs__nav-wrap::after {
    background-color: #f2f2f2;
  }
</style>
