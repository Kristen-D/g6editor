<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item>扫描任务</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="el-panel">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">任务详情</h3>
        </div>
        <div class="el-panel-body">
          <el-form :model="taskInfoData" label-width="120px" ref="taskInfoData">
            <el-form-item label="扫描ID：">{{taskInfoData.taskId}}</el-form-item>
            <el-form-item label="任务名称：">{{taskInfoData.taskTypeName}}</el-form-item>
            <el-form-item label="状态：">{{taskInfoData.stateName}}</el-form-item>
            <el-form-item label="任务类型：">{{taskInfoData.taskTypeName}}</el-form-item>
            <el-form-item label="扫描策略：">{{taskInfoData.strategyName}}</el-form-item>

            <div class="el-sub-panel-heading">
              <h3 class="el-panel-title">子任务</h3>
            </div>
            <el-table :data="subTaskData"  style="width: 100%;margin-top:20px" class="white-table" border>
              <el-table-column  prop="domainName"  label="扫描对象" min-width="120" :show-overflow-tooltip="true" align="center"></el-table-column>
              <el-table-column  prop="orgName"  label="归属机构" min-width="120" :show-overflow-tooltip="true" align="center"></el-table-column>
              <el-table-column  prop="startTime"  label="开始时间" align="center"></el-table-column>
              <el-table-column  prop="finishTime"  label="结束时间" min-width="80" align="center"></el-table-column>
              <el-table-column  prop="statename"  label="状态" min-width="80" align="center"></el-table-column>
              <el-table-column  label="操作" align="center">
                <template scope="scope">
                  <label v-if="scope.row.state=== 6 ">
                    <el-button type="text"  @click="getSubTaskDetail(scope.row)" style="color:#00a0fe;">获取结果</el-button>
                  </label>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item>
              <el-button type="primary" size="small" @click="$router.go(-1)" style="display:inline-block;margin-top:18px">返回</el-button>
              <div class="pagelocation" style="display:inline-block;float:right !important;">
                <span>每页显示</span>
                <el-pagination @size-change="changeSize" @current-change="changePage" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next" class="pagination"></el-pagination>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

    <el-dialog title="子任务详情" :visible.sync="isSubTaskDetail" class="subtask-dialog-panel dialog-panel">
      <div class="" id="">
        <table class="tableborder">
          <tr>
            <td>扫描对象</td>
            <td>
              <el-popover ref="popover1" placement="right-end" width="300" trigger="hover" content="这是一段内容，这是一段内容。">
              </el-popover>
              <div class="autocut" v-popover:popover1>{{subTaskDetail.domainName}}</div>
            </td>
            <td>开始时间</td>
            <td>{{subTaskDetail.startTime}}</td>
            <td>结束时间</td>
            <td>{{subTaskDetail.finishTime}}</td>
          </tr>
          <tr>
            <td>状态</td>
            <td>{{subTaskDetail.stateName}}</td>
            <td>IP</td>
            <td>{{subTaskDetail.scan_device_ip}}</td>
            <td>端口</td>
            <td>{{subTaskDetail.scan_device_port}}</td>
          </tr>
          <tr>
            <td>等级统计</td>
            <td colspan="5" class="levelcount">
              <!-- <div style="color:#ba1f00">紧急：<span>{{subTaskDetail.hasOwnProperty('紧急')?subTaskDetail['紧急']:0}}</span></div> -->
              <div style="color:#ff2a00">高危：<span>{{subTaskDetail.hasOwnProperty('高危')?subTaskDetail['高危']:0}}</span></div>
              <div style="color:#ff8400">中危：<span>{{subTaskDetail.hasOwnProperty('中危')?subTaskDetail['中危']:0}}</span></div>
              <div style="color:#ffdd3f">低危：<span>{{subTaskDetail.hasOwnProperty('低危')?subTaskDetail['低危']:0}}</span></div>
            </td>
          </tr>
        </table>
        <div class="collapse-height">
          <el-collapse v-model="activeNames"  @change="handleChange" class="changicon">
            <el-collapse-item v-for="(item, index) in subTaskVulList" :name="index">
              <template slot="title">
                <span>{{item.eventName}}</span>
              <span class="m-l-10">网站扫描结果</label></span>
            </template>
              <div>漏洞_{{index+1}}</div>
              <p>标题：{{item.eventName}}</p>
              <p>cve_id：{{item.cveId===-1?'':item.cveId}}</p>
              <p>漏洞发现时间：</p>
              <div v-for="(problemUrl, index) in item.problemUrls">
                <p>涉及url_{{index+1}}：{{problemUrl.problemUrl}}</p>
                <p>描述：</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="dialog-button-center">
          <el-button type="gray" @click="isSubTaskDetail=false" class="dialog-button-padding">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      //任务详情数据
      taskInfoData: {
        taskId:''
      },
      //子任务数据
      subTaskData:[],
      //分页参数
      pageIndex:1,
      pageSize:10,
      total:0,
      //显示子任务详情
      isSubTaskDetail:false,
      //子任务详情数据
      subTaskDetail:{},
      //威胁来源
      subTaskVulList:[],
    }
  },
  methods: {
    //获取任务数据
    getTaskData(){
      this.taskInfoData = this.$route.params.data;
    },
    //获取子任务数据
    getSubTaskList(){
      var params = {
        task_id:this.taskInfoData.taskId,
        // task_id:64,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
      }
      this.common.req("/ssa/loophole/getSubTaskList.do",params).then(data => {
        this.total = data.total;
        this.subTaskData = data.rowData;
      })
    },
    //换页
    changePage(pageIndex){
      this.pageIndex = pageIndex;
      this.getSubTaskList();
    },
    //更换显示数据量
    changeSize(pageSize){
      this.pageSize = pageSize;
      this.getSubTaskList();
    },
    //获取子任务详情
    getSubTaskDetail(row){
      var params = {
        subTaskSeq:row.subTaskSeq
      }
      this.common.req("/ssa/loophole/getSubTaskDetail.do",params).then(data => {
        this.subTaskDetail = data.subTaskDetail;
        this.subTaskVulList = data.list;
      })
      this.isSubTaskDetail = true;
    },
    handleChange(val) {
      console.log(val);
    }

  },
  mounted: function(){
    this.getSubTaskList();
  },
  created: function() {
    this.getTaskData();
  },
}
</script>

<style media="screen">
  .collapse-height{height: 400px;overflow: auto;}
  .subtask-dialog-panel .el-dialog {width: 50%;}
  .subtask-dialog-panel .el-collapse{border: none;}
  .subtask-dialog-panel .el-collapse-item__wrap{border-bottom: none;background-color: inherit;}
  table.tableborder{margin-bottom: 10px;border-collapse: collapse;width: 100%;}
  .tableborder td{border: 1px solid #e1e3e4;}
  .tableborder td{padding: 10px; line-height: 20px;text-align: center;}
  .tableborder td:nth-of-type(odd){background: #f5f6fa;width: 13%;}

  td.levelcount >div{float: left;width: 24.5%;border-right: 1px solid #E1E3E4;}
  td.levelcount >div:last-child{border: 0;}
</style>
