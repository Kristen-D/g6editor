<template>
<div id="sidebal-middle" class="viewFramework-product">

  <div class="viewFramework-product-body body-bgcolor" id="mainFrameBody" style="top:0px!important">
    <div id="app" class="container-padding" style="padding-top:15px!important">

      <el-row :gutter="16">

        <el-col :lg="5" :md="7">
          <todoTask ref="todoTask"></todoTask>
          <notice ref="notice"></notice>
        </el-col>
        <el-col :lg="14" :md="11">
          <shanXiMap ref="shanXiMap"></shanXiMap>
          <taskCountLine ref="taskCountLine"></taskCountLine>
        </el-col>

        <el-col :lg="5" :md="6">
          <threatWarn ref="threatWarn"></threatWarn>
          <eventHandle ref="eventHandle"></eventHandle>
          <smartManage ref="smartManage"></smartManage>
          <caseInvestigate ref="caseInvestigate"></caseInvestigate>
        </el-col>
      </el-row>
    </div>

  </div>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import todoTask from './TodoTask.vue'
import notice from './Notice.vue'
import taskCountLine from './TaskCountLine.vue'
import threatWarn from './ThreatWarn.vue'
import eventHandle from './EventHandle.vue'
import smartManage from './SmartManage.vue'
import shanXiMap from './ShanXiMap.vue'
import caseInvestigate from './CaseInvestigate'
import taskInspect from './TaskInspect'
import utils from 'components/js/common.js'
export default {
  components: {
    todoTask,
    notice,
    taskCountLine,
    threatWarn,
    eventHandle,
    smartManage,
    shanXiMap,
    caseInvestigate,
    taskInspect
  },
  data() {
    return {
      activeName: "first"
    }
  },
  methods: {

  },
  
  created: function() {

  }

}
</script>
