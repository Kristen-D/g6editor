<template >
<div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">事件处置</h3>
    <el-tabs class="float-r day-tabs m-r--30" v-model="daytabs" @tab-click="changeTime">
      <el-tab-pane label="今天" name="1"></el-tab-pane>
      <el-tab-pane label="近7天" name="2"></el-tab-pane>
      <el-tab-pane label="近30天" name="3"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="el-panel-white-body">
    <div class="work_cont postion_r" style="height:125px">
      <dl class="number_s2">
        <dt>{{todoTasks}}<span>/{{hiTasks}}</span></dt>
        <dd>待处理／已处理</dd>
      </dl>
      <div style="height:120px" class="work_box" id="eventHandleMap"></div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import echarts from 'echarts'
export default {

  data() {
    return {
      params: {
        dateRange: 'month',
        myType: 'eventMgmtProcess'
      },
      todoTasks: '',
      hiTasks: '',
      total: '',
      daytabs: "3"
    }
  },
  methods: {
    changeTime(value) {
      if (value.name == 1) {
        this.params.dateRange = "day";
      } else if (value.name == 2) {
        this.params.dateRange = "week";
      } else if (value.name == 3) {
        this.params.dateRange = "month";
      }
      this.loadMapChart();
    },
    async loadMapChart() {
      var data = await this.utils.req("/ssa/workBench/getTodoTasksByType.do", this.params);
      var data2 = await this.utils.req("/ssa/workBench/getHiTasksByType.do", this.params);
      var myChart = echarts.init(document.getElementById("eventHandleMap"));

      this.todoTasks = data.total;
      this.hiTasks = data2.total;
      this.total = this.todoTasks + this.hiTasks;


      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}-占比({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['待办任务']
        },
        series: [{
          name: '事件处置',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: (1 - this.hiTasks / this.total) * 100,
            name: '待办',
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#007be8'
              },
              emphasis: {
                color: '#007be8'
              }
            }
          }, {
            value: this.hiTasks / this.total * 100,
            name: '占位',
            label: {
              normal: {
                formatter: '\n比例',
                textStyle: {
                  color: '#555',
                  fontSize: 12
                }
              }
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#e1e3e4'
              },
              emphasis: {
                color: '#e1e3e4'
              }
            },
            hoverAnimation: false
          }]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
  },

  mounted: async function() {
    this.loadMapChart();
  }

}
</script>
