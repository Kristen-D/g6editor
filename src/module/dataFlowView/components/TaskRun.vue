<template>
  <div style="padding-top: 15px;">
    <h3 class="el-panel-title2">最近运行</h3>
    <ul class="flexStart taskRun">
      <li v-for="(item, index) in taskRunData" :key="index" @click="taskDialogShow(item)" style="cursor: pointer;">
        <h4 class="hname">{{item.name}}</h4>
        <p class="icon">
          <i :class="statusIcons[item.status]"></i>
          <label>{{item.label}}</label>
        </p>
        <p>{{item.time}}</p>
      </li>
    </ul>
    <!-- <DialogTaskDetails :taskDialog="taskDialog" @taskVisible="taskVisible"></DialogTaskDetails> -->
    <job-detail :dialog="jobDetail"></job-detail>
  </div>
</template>
<script>
// import DialogTaskDetails from "./Dialog-TaskDetails.vue"
import JobDetail from '../../dataflow/components/JobDetail'
import Api from '../../dataflow/common/Api'
import axios from 'axios'
export default {
  components: {
    JobDetail,
  },
  props: ['taskRunData'],
  data() {
    return {
      taskDialog: false,
      statusIcons: {
        'STARTED':'icon-runring c-primary', 
        'COMPLETED':'icon-success c-sucess', 
        'FAILED':'icon-fail c-fail', 
        'STOPPED':'icon-suspend c-suspend'
        },
      jobDetail: {
        visible: false,
        dsltext: '',
        apps: [],
        job: ''
      }
    };
  },
  methods: {
    async taskDialogShow(job) {
      if (this.jobDetail.apps.length === 0) {
        let rp = await axios.post(Api.getAppList);
        this.jobDetail.apps = rp.data.data;
      }
      this.jobDetail.visible = true;
      this.jobDetail.dsltext = job.dsltext;
      this.jobDetail.jobExecutionId = job.jobExecutionId;
      this.jobDetail.job = job;

    }
  }
};
</script>
<style scoped>
.taskRun {
  margin-top: 16px;
}
.taskRun li {
  border: 1px solid #e1e3e4;
  width: 20%;
  min-width: 150px;
  margin-right: 20px;
  text-align: left;
  padding: 12px 18px;
  padding-bottom: 20px;
  font-size: 14px;
}
.taskRun li:last-child {
  margin-right: 0;
}
.taskRun li .hname {
  height: 42px;
}
.taskRun li .icon {
  margin: 10px auto;
  color: #3e4956;
}
.taskRun li .icon > i {
  font-size: 3em;
  vertical-align: middle;
}
.taskRun li .icon > label {
  font-size: 20px;
  padding-left: 10px;
  vertical-align: middle;
}

.c-primary {
  color: #3498db;
}
.c-sucess {
  color: #2ecc71;
}
.c-fail {
  color: #ef4836;
}
.c-suspend {
  color: #f0db2b;
}
</style>