<template>
  <el-dialog
    class="job-detail-dialog"
    :title="dialog.job.flowName + ' - 任务详情'"
    :visible.sync="dialog.visible"
    width="85%">
    <div class="job-detail" v-loading="loading">
      <div ref="graph" class="detail-graph"></div>
      <div class="report" @click="go">可视配置</div>
      <div class="detail-logger">
        <el-tabs>
          <el-tab-pane label="日志">
            <pre v-html="dialog.job.flowJobLog"></pre>
          </el-tab-pane>
          <el-tab-pane label="数据预览">
            <el-table
              v-if="result && result.length > 0"
              :data="result"
              border
              size="mini"
              style="width: 100%">
              <el-table-column :key="key" :prop="key" v-for="(item, key) in result[0]" :label="key"></el-table-column>
            </el-table>
            <div v-else>无数据预览</div>
          </el-tab-pane>
        </el-tabs>
        <div class="refresh-panel">
          自动刷新频率：
          <el-select size="mini" style="width: 100px" v-model="refreshTime" placeholder="请选择">
            <el-option label="30秒" :value="30"></el-option>
            <el-option label="1分钟" :value="60"></el-option>
            <el-option label="5分钟" :value="300"></el-option>
            <el-option label="30分钟" :value="1800"></el-option>
          </el-select>
          <el-button @click="refresh" type="text">手动刷新</el-button>
        </div>
      </div>
      <div class="detail-properties">
        <el-tabs>
          <el-tab-pane label="配置">
            <div class="node-setting" v-if="node.appDesc">
              <div><span>节点名称:</span>{{node.appDesc}}</div>
              <div v-if="node.description"><span>节点描述:</span>{{node.description}}</div>
              <template v-if="node.properties">
                <div :key="key" v-for="(value, key) in node.properties">
                  <span><pre>{{key}}:</pre></span><pre>{{node.properties[key]}}</pre>
                </div>
              </template>
            </div>
            <div v-else>请先选择一个节点。</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- <el-dialog
      class="result-dialog"
      title="数据预览"
      :visible.sync="result.visible"
      width="60%">
    </el-dialog> -->
  </el-dialog>
</template>

<script>
import axios from 'axios'
import Api from '../common/Api'
import G6EditorStatic from '../common/G6EditorStatic'
import OnlineEditorGraph from '../common/OnlineEditorGraph'

var JSONBigInt = require('json-bigint')({"storeAsString": true});

export default {
  name: 'jobDetail',
  props: ['dialog'],  // apps、dslText、job
  watch: {
    // 'dialog.job.jobExecutionId' () {    
    //   this.node = {}; 
    //   this.result = [];
    //   this.createGraph();
    // },
    'dialog.visible' () {
      if (this.dialog.visible) {
        this.refresh();
      } else {
        clearTimeout(this.timerId)
      }
    }
  },
  data () {
    return {
      node: {},
      result: [],
      loading: false,
      refreshTime: 30,
      timerId: null,
      logs: []
      // result: {visible: false}
    }
  },
  methods: {
    go () {
      location.href = "/cboard/content.do#/config/widget";
    },
    async createGraph () {
      this.loading = true;
      let logRsp = await axios.post(Api.getModelLogByJobId + `${this.dialog.job.flowJobId}.do`)
      let log = ''
      logRsp.data.data.map(v => {
        if (!v.appId) {
          log = log + `${v.createTime} ${v.level} ${v.detail} \n`;
        }
      })
      this.dialog.job.flowJobLog = log
      let jobSteps = await axios.post(Api.getModelPreviewByJobId+ `${this.dialog.job.flowJobId}.do`);
      this.$refs.graph && (this.$refs.graph.innerHTML = null)
      new OnlineEditorGraph(this.$refs.graph, JSON.parse(this.dialog.dsltext), jobSteps.data.data, logRsp.data.data, (ev) => {
        if (ev.item) {
          console.log(ev.item)
          if (ev.item.type === 'node' && ev.item.model.appId) {
            axios.get(Api.getAppBySsaAppId + `${ev.item.model.appId}.do`).then(rp => {
              this.node = rp.data.data;
              this.node.properties = ev.item.model.properties;
            })
            this.dialog.job.flowJobLog = ev.item.model.log
            if (ev.item.model.detail) {
              this.result = JSONBigInt.parse(ev.item.model.detail)
            } else {
              this.result = [];
            }
          }
        } else {
          this.node = {}
          this.dialog.job.flowJobLog = log
        } 
      });
      this.loading = false
    },
    refresh() {
      this.node = {}; 
      this.result = [];
      this.createGraph();
      this.timerId && clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.refresh();
      }, this.refreshTime * 1000)
    }
  }
  
}
</script>

<style scoped>
  .job-detail {
    height: 600px;
    width: 100%;
    padding: 0 200px 300px 0;
    /* background:#F2F2F2; */
    position: relative;
    border-top: 1px solid #e4e7ed;
  }
  .detail-graph {
    height: 100%;
    width: 100%;
  }
  .detail-logger {
    height: 300px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    position: absolute;
    border-top: 1px solid #e4e7ed;
    z-index: 10;
    padding-top: 40px;
    padding-right: 200px;
    user-select: text;
  }
  .detail-properties {
    width: 200px;
    position: absolute;
    background: white;
    top: 0;
    right: 0;
    bottom: 0;
    border-left: 1px solid #e4e7ed;
    z-index: 11;
    padding-top: 40px;
    user-select: text;
  }
  .report {
    position: absolute;
    right: 230px;
    top: 10px;
    border: 1px solid #409EFF;
    width: 70px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #409EFF;
    z-index: 999;
    cursor: pointer;
  }
  .node-setting div {
    padding: 0;
    margin: 0 0 7px 0;
  }
  .node-setting div span{
    font-weight: bold;
    padding: 5px 0;
    display: block;
  }
  .refresh-panel {
    position: absolute;
    right: 300px;
    top: 0;
    height: 40px;
    line-height: 40px;
  }
</style>

<style>
  .job-detail-dialog .el-dialog__body {
    padding: 0;
  }
  .job-detail-dialog .el-tabs {
    height: 100%;
    position: relative;
    top: -40px;
  }
  .job-detail-dialog .el-tabs .el-tabs__header.is-top .el-tabs__nav-scroll{
    padding-left: 10px;
  }
  .job-detail-dialog .el-tabs__content {
    overflow: auto;
    height: 100%;
    padding: 5px;
  }
  .job-detail-dialog .el-dialog {
    margin-top: 30px !important;
  }
  .job-detail-dialog .el-tabs__header {
    margin: 0;
  }
  .job-detail-dialog .el-form-item__label {
    padding-bottom: 0;
    color: black;
    font-size: 14px;
  }
  .job-detail-dialog .el-table .cell {
    line-height: normal;
  }
  .job-detail-dialog .el-table th,
  .job-detail-dialog .el-table tr td {
    padding: 0;
  }
  .job-detail-dialog input {
    padding: 0 5px;
  }
  .job-detail-dialog textarea {
    padding: 0 5px;
    min-height: 80px;
  }
</style>

