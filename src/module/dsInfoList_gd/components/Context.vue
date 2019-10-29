<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
    <div class="top-title" > </div>
    <toolbar :id="toolbarId"></toolbar>
    <dsInfoListTable :id="notDotableId"></dsInfoListTable>
</div>

</template>

<script>
import commonAjax from 'components/js/common.js'
import {
mapState
} from 'vuex'
import toolbar from './Toolbar.vue'
import dsInfoListTable from './DsInfoListTable.vue'
// import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
components: {
  toolbar,
  dsInfoListTable
  //selectOrganization
},
  data() {
    return {
      //自定义属性
      activeName: 'notDotableId',
      toolbarId:'notDotableId',
      notDotableId:'notDotableId',
      dotableId: 'dotableId',
    }
  },
  computed: {
    ...mapState({
    //  orgList:state=>state.context.orgList,
    //  userList:state=>state.context.userList,
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList,
    //  productTypeList:state=>state.context.productTypeList,
    })
  },
  methods: {
    handleClick(tab){
      this.toolbarId = tab.name;
    },
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
    this.$store.dispatch('loadListNewTypeList');
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
