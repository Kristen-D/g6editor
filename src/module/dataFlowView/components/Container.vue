<template>
  <div>
    <div class="container-fluid">
      <div class="el-panel">
        <div class="el-panel-heading">
          <div class="header-guide float-r">
            <a @click="senceDialog=true">
              <i class="icon-guide"></i>场景引导
            </a>
            <a @click="algorithmDialog=true">
              <i class="icon-algorithm"></i>算法引导
            </a>
            <a href="/dataflow/begin.do#model">更多</a>
          </div>
          <h4 class="el-panel-title">场景</h4>
        </div>
        <div class="el-panel-mbody">
          <el-row :gutter="30">
            <el-col :span="6">
              <div style="height: 320px;">
                <EchartsPie :pd="scenePieData"></EchartsPie>
              </div>
            </el-col>
            <el-col :span="18">
              <SceneTabs :sceneData="sceneData" @openSceneGuide="senceDialog=true"></SceneTabs>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="el-panel">
        <div class="el-panel-heading">
          <span class="float-r text-primary text-s">
            <a href="/dataflow/begin.do#tasks" title>更多</a>
          </span>
          <h4 class="el-panel-title">任务</h4>
        </div>
        <div class="el-panel-mbody">
          <el-row :gutter="30">
            <el-col :span="6">
              <div style="height: 300px;">
                <EchartsPie :pd="taskData"></EchartsPie>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="height: 300px;">
                <EchartsTLine :pd="lineList"></EchartsTLine>
              </div>
            </el-col>
          </el-row>
          <TaskRun :taskRunData="taskRunData" v-if="taskRunData.length>0"></TaskRun>
        </div>
      </div>
    </div>
    <DialogScenesGuide :senceDialog="senceDialog" @sencesVisible="sencesVisible"></DialogScenesGuide>
    <DialogAlgorithmGuide :algorithmDialog="algorithmDialog" @algorithmVisible="algorithmVisible"></DialogAlgorithmGuide>
  </div>
</template>
<style scped>
.header-guide a {
  padding: 0 13px;
  color: #007be8;
  border-right: 2px solid #e1e3e4;
  cursor: pointer;
  font-size: 14px;
}
.header-guide a:last-child {
  padding-right: 0;
  border-right: none;
}
.header-guide a i {
  color: #c7d7e0;
  margin-right: 5px;
  vertical-align: middle;
}
.header-guide a:hover > i {
  color: #a9b7bf;
}
</style>

<script>
import SceneTabs from "./SceneTabs.vue"
import TaskRun from "./TaskRun.vue"
import EchartsPie from "./Echarts-Pie.vue"
import DialogScenesGuide from "./Dialog-ScenesGuide.vue"
import DialogAlgorithmGuide from "./Dialog-AlgorithmGuide.vue"
import EchartsTLine from "./Echarts-task-line.vue"

export default {
  components: {
    SceneTabs,
    TaskRun,
    EchartsTLine,
    EchartsPie,
    DialogScenesGuide,
    DialogAlgorithmGuide
  },
  data() {
    return {
      senceDialog: false,
      algorithmDialog: false,
      sceneData: [],
      taskRunData: [],
      scenePieData: {
        text: '49',
        subtext: '场景',
        name: '场景类型',
        assign: true,
        color: ['#35a2ff', '#448aff', '#12cbf6', '#0065ba',],
        piedata: [
          // { value: 0, name: '我的场景' },
          // { value: 0, name: '网络和通信安全' },
          // { value: 0, name: '设备和计算安全' },
          // { value: 0, name: '应用和数据安全' },
        ]
      },
      taskData: {
        text: '63',
        subtext: '任务',
        name: '任务状态',
        // color: ['#2ecc71', '#f72e00', '#f0db2b', '#3498db',],
        piedata: [
          // { value: 30, name: '成功' },
          // { value: 54, name: '失败' },
          // { value: 6, name: '已停止' },
          // { value: 10, name: '运行中' },

        ]
      },
      lineList: {
        // color: ['#2ecc71', '#f72e00', '#f0db2b', '#3498db', '#4834d4'],
        name: ['成功', '失败', '已停止', '运行中', '总数'],
        xaxis: [],
        data: [],
        tip: { timestr: '时间' },
      }

    };
  },
  methods: {
		getInitData() {
			this.common.reqBackState("/dataflow/view/secene/pie.do").then(result => {
        if (!result.state) {
          return
        }
       this.scenePieData.piedata = result.data.list;
       this.scenePieData.text = result.data.total;
      })
      this.common.reqBackState("/dataflow/view/secene.do").then(result => {
        if (!result.state) {
          return
        }
       this.sceneData = result.data;
      })
      this.common.reqBackState("/dataflow/view/task/pie.do").then(result => {
        if (!result.state) {
          return
        }
       this.taskData.piedata = result.data.list;
       this.taskData.text = result.data.total;
      })
      this.common.reqBackState("/dataflow/view/task/line.do").then(result => {
        if (!result.state) {
          return
        }
       this.lineList.data = result.data;
      })
      this.common.reqBackState("/dataflow/view/task/latest.do").then(result => {
        if (!result.state) {
          return
        }
       this.taskRunData = result.data;
      })
		},
    sencesVisible(visitable) {
      this.senceDialog = visitable;
    },
    algorithmVisible(visitable) {
      this.algorithmDialog = visitable;
    },
    /*生成group*day随机数据*/
    autoCreateRanData(group, day) {
      var arrdata = [];
      var total = [];
      //创建随机group*day数组
      if (day && group) {
        for (var i = 0; i < group; i++) {
          arrdata[i] = new Array();
          for (var j = 0; j < day; j++) {
            arrdata[i].push(parseInt((10 + Math.random() * 10).toFixed(0)));
          };

        };

        this.lineList.data = arrdata;
        for (var j = 0; j < day; j++) {
          var sum = 0;
          for (var i = 0; i < group; i++) {
            sum += this.lineList.data[i][j];
          };
          total.push(sum);
        };
        //与前几组数据合并在一起
        this.lineList.data.push(total);//合并数据
      }
    },
  },
  created() {
		// this.autoCreateRanData(4, 30);
		this.getInitData();
  }
};

</script>