<template>
  <container class="flow" @currentChange="pageChange" :page="page">
    <template slot="toolbar">
      <el-button type="primary" @click="createFlow(0)">创建离线流程</el-button>
      <el-button type="primary" @click="createFlow(1)">创建在线流程</el-button>
    </template>
    <template slot="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>{{props.row.dsltext}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="flowId" label="#"></el-table-column>
      <el-table-column prop="flowName" label="名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          {{props.flowType > 0 ? '在线' : '离线'}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="contextName" label="Context"></el-table-column> -->
      <el-table-column show-overflow-tooltip prop="flowParams" label="参数"></el-table-column>
      <el-table-column show-overflow-tooltip prop="dsltext" label="流程dsl"></el-table-column>
      <!-- <el-table-column prop="runningTaskId" label="Task"></el-table-column> -->
      <el-table-column width="350px">
        <template slot-scope="props">
          <!-- <template v-if="props.row.runningTaskId > 0">
            <el-button type="primary" disabled>运行中</el-button>
            <el-button type="inforn" @click="showTasks(props.row)">详情</el-button>
          </template>-->
          <template>
            <el-button type="primary" @click="showFlowJob(props.row)">启动</el-button>
          </template>
          <el-button type="warning" @click="edit(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteFlow(props.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <div>{{props.row.name}}</div>
        </template>
      </el-table-column>-->
    </template>
    <el-dialog title="详情" :visible.sync="task.visible" width="60%">
      <el-tabs v-model="task.active">
        <el-tab-pane label="流程图" name="first">
          <div ref="graph" class="graph"></div>
        </el-tab-pane>
        <el-tab-pane label="运行任务" name="second">
          <el-table :data="task.data" size="mini" stripe border style="width: 100%">
            <el-table-column show-overflow-tooltip prop="stepName" label="名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="start" label="开始时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="end" label="结束时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="status" label="状态"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="运行流程" :visible.sync="flowJob.visible" v-loading="page.loading" width="30%">
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
        <el-button type="primary" @click="startFlowJob">启动</el-button>
      </div>
    </el-dialog>
  </container>
</template>

<script>
import Container from "../components/Container";
import G6 from "@antv/g6";
import axios from "axios";
import Api from "../common/Api";
import { dateFmt } from "../common/Util";
import { toG6Graph } from "../common/Convertor";
import G6Flow from "../common/G6Flow";

export default {
  components: { Container },
  data() {
    return {
      page: {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        loading: false
      },
      flowJob: {
        extendJobId: null,
        visible: false
      },
      flowJobList: [],
      task: {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        visible: false,
        active: "first"
      },
      currentFlow: null,
      params: ""
    };
  },
  created() {
    this.getFlows();
  },
  methods: {
    startFlowJob() {
      this.page.loading = true;
      axios.post(Api.startFlowJob, this.flowJob).then(resp => {
        let resutl = resp.data;
        this.$alert(resutl.message, "消息");
        this.flowJob.visible = false;
        this.page.loading = false;
      });
    },
    showFlowJob(item) {
      this.flowJob.visible = true;
      this.flowJob = { ...this.flowJob, ...item };
      axios.post(Api.getFlowHisJob, item).then(result => {
        // console.log(result.data);

        this.flowJobList = result.data.data;
      });
    },
    createFlow(type) {
      this.$router.push("/editor?type=" + type);
    },
    async changeStatus(item) {
      try {
        this.page.loading = true;
        let rp = await axios.post(Api.changeFlowStatus, item);
        this.$message({
          message: rp.data.state ? "启动成功！" : "启动失败！",
          type: rp.data.state ? "info" : "danger"
        });
        this.getFlows();
      } catch (e) {
        this.$message({ message: "启动失败！", type: "danger" });
      } finally {
        this.page.loading = false;
      }
    },
    edit(item) {
      this.$router.push(`/editor?id=${item.flowId}`);
    },
    pageChange(index) {
      this.page.pageIndex = index;
      this.getFlows();
    },
    async getFlows() {
      let response = await axios.post(Api.getFlows, {
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      });
      this.page.total = response.data.total;
      this.page.data = response.data.rowData;
    },
    async deleteFlow(item) {
      await this.$confirm('确定删除该流程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      let response = await axios.post(Api.deleteFlow, {
        flowId: item.flowId
      });
      this.getFlows();
    },
    async showTasks(item) {
      this.task.visible = true;
      let response = await axios.post(
        `${Api.getStepTasks}?id=${item.runningTaskId}`,
        {
          pageIndex: this.task.pageIndex,
          pageSize: this.task.pageSize
        }
      );
      if (response.data.rowData) {
        this.task.data = response.data.rowData.map(row => {
          row.start = dateFmt(row.startTime, "MM-dd hh:mm:ss");
          row.end = dateFmt(row.endTime, "MM-dd hh:mm:ss");
          return row;
        });
      } else {
        this.task.data = [];
      }
      response = await axios.post(Api.toolParseTaskTextToGraph, {
        dsl: item.dsltext,
        name: "unknown"
      });
      // 绘图
      new G6Flow(this.$refs.graph, response.data.graph);
    }
  }
};
</script>