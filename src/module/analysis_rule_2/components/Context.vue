<template>

  <div class="container-fluid Whitespace">

    <template v-if="editPanel==0">
      <div class="top-title">规则编辑器</div>
      <el-row :gutter="30">
        <el-col :span="4">
          <RuleTypeTree></RuleTypeTree>
        </el-col>
        <el-col :span="20">
          <SimpleSearch v-if="searchPanel==0"></SimpleSearch>
          <ComplexSearch v-else></ComplexSearch>
          <EditToolbar></EditToolbar>
          <ResultTable></ResultTable>
        </el-col>
      </el-row>
    </template>
    <template v-if='editPanel==1'>

      <EditRule></EditRule>
    </template>
    <template v-if='editPanel==2'>

      <ShowRule></ShowRule>
    </template>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import SimpleSearch from './SimpleSearch.vue'
  import ComplexSearch from './ComplexSearch.vue'
  import EditToolbar from './EditToolbar.vue'
  import ResultTable from './ResultTable.vue'
  import EditRule from './EditRule.vue'
  import RuleTypeTree from './RuleTypeTree.vue'
  import ShowRule from './ShowRule.vue'
  export default {
    components: {
      SimpleSearch,
      ComplexSearch,
      EditToolbar,
      ResultTable,
      EditRule,
      RuleTypeTree,
      ShowRule
    },
    computed: {
      ...mapState({
        menuName: state => state.context.menuName,
        searchPanel: state => state.context.searchPanel,
        editPanel: state => state.context.editPanel
      })
    },
    methods: {
      ...mapActions({
        getConfigTypeList: 'getConfigTypeList',
        getDeviceInfoList: 'getDeviceInfoList',
        getDeviceInfoList2: 'getDeviceInfoList2',
        getAttrData: 'getAttrData',
        getFuncData: 'getFuncData',
        getEventAttrData: 'getEventAttrData',
        getAttrFunctionList: 'getAttrFunctionList',
        getAttrParamList: 'getAttrParamList',
        getEventOutAttrValueList: 'getEventOutAttrValueList',
        getEventOutAttrList: 'getEventOutAttrList',
        getEventTypeList2: 'getEventTypeList2',
        // getRuleAttrDataList:'getRuleAttrDataList',
        getEventTypeList: 'getEventTypeList'

      })
    },
    created: function () {

    },
    mounted: function () {
      //this.getSubSystemList();
      this.getConfigTypeList();
      this.getDeviceInfoList();
      this.getAttrData();
      this.getFuncData();
      this.getEventAttrData();
      this.getAttrParamList();
      this.getAttrFunctionList();
      this.getEventOutAttrValueList();
      this.getEventOutAttrList();
      // this.getRuleAttrDataList();
      this.getEventTypeList2();
      this.getDeviceInfoList2();
      this.getEventTypeList();
    }
  }

</script>
<style>

</style>
