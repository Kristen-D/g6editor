<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
    <div class="top-title"></div>
    <toolbar :id="toolbarId"></toolbar>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="高危Ip" name="interfaceId">
          <div class="top-title-1 float-l">高危Ip列表</div>
          <dataListTable :id="interfaceId"></dataListTable>
        </el-tab-pane>
        <el-tab-pane label="高危账户" name="dotableId">
            <div class="top-title-1 float-l">高危账户列表</div>
          <highAccountListTable :id="dotableId"></highAccountListTable>
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
import toolbar from './Toolbar.vue'
import dataListTable from './DataListTable.vue'
import highAccountListTable from './HighAccountListTable.vue'

export default {
components: {
  dataListTable,
  toolbar,
  highAccountListTable
},
  data() {
    return {
      //自定义属性
      activeName: 'interfaceId',
      toolbarId:'interfaceId',
      interfaceId:'interfaceId',
      dotableId: 'dotableId',
      mparams: {
      	src_ip:"",
      	hit_time:"",
        hit_time_date:null
      },

    }
  },
  computed: {
    // ...mapState({
    //   // orgList:state=>state.context.orgList,
    //   // userList:state=>state.context.userList,
    //   // alarmTypeList:state=>state.context.alarmTypeList,
    //   // alarmGradeList:state=>state.context.alarmGradeList,
    //   // productTypeList:state=>state.context.productTypeList,
    // })
  },
  methods: {
      handleClick(tab){
        this.toolbarId = tab.name;
      },
    qryData(val) {
        this.mparams.hit_time = commonAjax.formatDate(this.mparams.hit_time_date,"yyyy-MM-dd");
        var tableId = this.interfaceId;
        var params = this.mparams;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },

    //methods end
  },
  created: function() {
    //this.$store.dispatch('loadListTypeList');
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
