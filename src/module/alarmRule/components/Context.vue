<template>

  <div class="whitebackground Whitespace">

    <template v-if="editPanel==0">
      <div class="top-title">告警规则编辑器</div>
      <div>
        <!-- <el-col :span="4">
          <RuleTypeTree></RuleTypeTree>
        </el-col> -->
        <el-col class="float-r">
          <SimpleSearch v-if="searchPanel==0"></SimpleSearch>
          <ComplexSearch v-else></ComplexSearch>
          <EditToolbar></EditToolbar>
          <ResultTable></ResultTable>
        </el-col>
      </div>
    </template>
    <template>

      <EditRule v-if='editPanel==1'></EditRule>
    </template>
    <template>

      <ShowRule v-if='editPanel==2'></ShowRule>
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
  import ShowRule from './ShowRule.vue'
  export default {
    components: {
      SimpleSearch,
      ComplexSearch,
      EditToolbar,
      ResultTable,
      EditRule,
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
        getAlarmTypeList: 'getAlarmTypeList',
        getAlarmGradeList: 'getAlarmGradeList',
        getAttrData: 'getAttrData',
        getAlarmAttrData: 'getAlarmAttrData',
        getFuncData: 'getFuncData',
        getEventAttrData: 'getEventAttrData',
        getAttrFunctionList: 'getAttrFunctionList',
        getAttrParamList: 'getAttrParamList',
        getEventOutAttrValueList: 'getEventOutAttrValueList',
        getEventOutAttrList: 'getEventOutAttrList'

      })
    },
    created: function () {

    },
    mounted: function () {
      this.getAlarmTypeList();
      this.getAlarmGradeList();
      this.getAttrData();
      this.getAlarmAttrData();
      this.getFuncData();
      this.getEventAttrData();
      this.getAttrParamList();
      this.getAttrFunctionList();
      //  this.getEventOutAttrValueList();
      //  this.getEventOutAttrList();
    }
  }

</script>
<style>

</style>
