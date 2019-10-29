<template>
<div >
  <el-form ref="form" label-width="80px">
  <el-form-item label="特殊资源">
  <el-col class="line" :span="8">
  <el-tag>规则名:</el-tag>
<el-tag type="primary">木马病毒</el-tag>
</el-col>
<el-col class="line" :span="8">
  <el-tag>规则名:</el-tag>
<el-tag type="primary">木马病毒</el-tag>
</el-col>
  </el-form-item>
</el-form>
</div>

</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
export default {
    data(){
        return {
          defConf:{},
          //自定义属性
        }
    },
   props:['id'],
   computed:{
     ...mapState({
        params:state=>state.context.params,
        eventGradeList:state=>state.context.eventGradeList,
        eventThreatTypeList:state=>state.context.eventThreatTypeList,
        productTypeList:state=>state.context.productTypeList,
    })},
   watch:{
		 params:function(params){
        this.$store.commit('setParams',[this.id,params]);
        this.$store.dispatch('reloadTable',this.id);
		 }
	 },
   methods:{

     //处理翻页时候的事件
     handleCurrentChange(pageIndex){
       this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
     },
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },
     fmtEventGradeType(val){
          //  console.log(this.eventGradeList);
        for(var item in this.eventGradeList) {
            if (val==this.eventGradeList[item].id){
              return this.eventGradeList[item].text;
            }
        }

     },
     fmtEventThreatType(val){
        for(var item in this.eventThreatTypeList) {
            if (val==this.eventThreatTypeList[item].id){
              return this.eventThreatTypeList[item].text;
            }
        }

     },
     fmtProductType(val){

        for(var item in this.productTypeList) {
            if (val==this.productTypeList[item].id){
              return this.productTypeList[item].text;
            }
        }

     },

   },
   created :function() {
    var defConf = {
    total:0,
    loading: false,
    tableData:[],
    pageSize:5,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/statsReports/getEventTrendsByDetail.do",
    params:{myStartTime:null,myEndTime:null}
   };
    defConf.params = this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    // this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
