<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
    <div class="top-title" > </div>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="notDotableId">
        <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
          <el-button type="primary" size="small" @click="creatTask">创建任务</el-button>
            <el-button type="primary" size="small" @click="creatVulTask">创建漏洞扫描任务</el-button>
          <!-- <el-button type="primary" size="small" @click="exportReport">导出</el-button> -->
          <!-- <el-button type="primary" size="small" @click="spCheckedRows">审核</el-button> -->
        </div>
        <taskListTable :id="notDotableId"></taskListTable>

      </el-tab-pane>

      <el-tab-pane label="正在运行" name="dotableId">
            <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
              <el-button type="primary" size="small" @click="creatTask">创建任务</el-button>
              <el-button type="primary" size="small" @click="creatVulTask">创建漏洞扫描任务</el-button>
            </div>
        <taskListTable :id="dotableId"></taskListTable>
        <!-- <vulnerabilitychart :dateRange="dateRange"></vulnerabilitychart> -->
      </el-tab-pane>

    </el-tabs>


</div>

</template>

<script>
import commonAjax from 'components/js/common.js'
import {
mapState
} from 'vuex'

import taskListTable from './TaskListTable.vue'
// import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
components: {
  taskListTable
  //selectOrganization
},
  data() {
    return {
      //自定义属性
      activeName: 'notDotableId',
      notDotableId:'notDotableId',
      dotableId: 'dotableId',
    }
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
    handleClick(tab){
      this.$store.dispatch('reloadTable', tab.name);
    },
    async creatTask() {
        var params = {};
        params.tkey = "taskForm";
        this.$router.push({name:"taskForm",params:params});

    },
    async creatVulTask() {
        var params = {};
        params.tkey = "vulTaskForm";
        this.$router.push({name:"vulTaskForm",params:params});

    },
    //methods end
  },
  created: function() {
    // this.$store.dispatch('loadListTypeList');
    // this.$store.dispatch('loadListNewTypeList');
  }
}
</script>
<style>
.top-title-1 {
    padding-left: 20px;
    margin-bottom: 20px;
    /* margin-top: 10px; */
    /* border-bottom: 1px solid #e1e3e4; */
    font-size: 16px;
    /* line-height: 40px; */
    color: #000;
    font-weight: 500;
}
</style>
