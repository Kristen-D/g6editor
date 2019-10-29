<template>
  <div class="whitebackground Whitespace">
    <div class="top-title">阻断IP管理</div>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="阻断中" name="interfaceId">
            <div class="top-title"></div>
          <dataListTable :id="interfaceId"></dataListTable>
        </el-tab-pane>
        <el-tab-pane label="历史阻断IP" name="dotableId">
          <div class="top-title"></div>
          <hisDataListTable :id="dotableId"></hisDataListTable>
          <!-- <vulnerabilitychart :dateRange="dateRange"></vulnerabilitychart> -->
        </el-tab-pane>
      </el-tabs>

</div>
</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
mapState
} from 'vuex'
import dataListTable from './DataListTab.vue'
import hisDataListTable from './HisDataListTab.vue'

export default {
components: {
  dataListTable,
  hisDataListTable
},
  data() {
    return {
      //自定义属性
      activeName: 'interfaceId',
      interfaceId:'interfaceId',
      dotableId: 'dotableId',
      mparams: {
      	src_ip:"",
      	hit_time:"",
        hit_time_date:null
      }
    }
  },
  methods: {
      handleClick(tab){
      }
  },
  created: function() {
  }
}
</script>
