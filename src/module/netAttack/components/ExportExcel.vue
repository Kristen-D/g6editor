<template>
<div>
  <span class="demonstration">确认导出当前所查询到的数据吗？</span>
  <!-- <el-date-picker
    v-model="dateTime"
    type="daterange"
    align="left"
    style="width:220px"
    placeholder="选择日期范围"
    :picker-options="pickerOptions">
  </el-date-picker> -->
<div class="float-r">
  <el-button type="primary" @click="exportExcel" :loading="loadSet" >{{bottonName}}</el-button>
</div>
</div>

</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
export default {
    data(){
        return {
          defConf:{},
          pickerOptions: {
  shortcuts: [{
    text: '今天之内',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '7天之内',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '30天之内',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
      picker.$emit('pick', [start, end]);
    }
  }],

},
          dateTime:"",

          //自定义属性
        }
    },
   props:['id'],
   computed:{
     ...mapState({
        bottonName:state=>state.context.bottonName,
        loadSet:state=>state.context.loadSet
    })},
   methods:{
     exportExcel(){
        // if(this.dateTime[0]==null||this.dateTime[0]==""){
        //   this.$message({message: '请先选择时间范围！',type: 'warning'});
        // }else{
          //  var startTime = commonAjax.formatDate(this.dateTime[0],"yyyy-MM-dd");
          //  var endTime = commonAjax.formatDate(this.dateTime[1],"yyyy-MM-dd");
           $(window).attr('location',this.$store.state.context.currentUrl);
           this.$store.state.context.bottonName="导出中,请稍候...";
           this.$store.state.context.loadSet=true;
        // }
     },

   },
   mounted :function() {


  }
}
</script>
