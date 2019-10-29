<template >
  <div class="el-panel-white">
 <div class="el-panel-white-heading"><h3 class="el-panel-white-title">通知通报</h3></div>
 <div class="el-panel-white-body" style="padding: 6px;!important">

      <el-tabs v-model="activeName">
      <el-tab-pane   name="first" class="workbench-tabs">
        <p slot="label">通知<span class="tabsNum">{{noticeList.total}}</span></p>
       <div  class="position_box">
          <div id="inner-content2">
          <ul class="work_tabs_cont work_tabs_cont2">
            <li v-for="m in noticeList.rowData" @click="goDetail('1')">
             <p>{{m.notice_name}}</p>
             <p class="p2">{{m.my_time}}</p>
            </li>
          </ul>
          </div>
          <div class="work_tabs_bg"></div>
      </div>
      </el-tab-pane>
      <el-tab-pane   name="third" class="workbench-tabs">
    <p slot="label">通报<span class="tabsNum">{{noticeList2.total}}</span></p>
      <div  class="position_box">
          <div id="inner-content2">
          <ul class="work_tabs_cont work_tabs_cont2">
            <li v-for="m in noticeList2.rowData" @click="goDetail('2')">
             <p>{{m.notice_name}}</p>
             <p class="p2">{{m.my_time}}</p>
            </li>
          </ul>
          </div>
          <div class="work_tabs_bg"></div>
      </div>
      </el-tab-pane>
      </el-tabs>

</div>
</div>

</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({
       params:state=>state.context.params,
        test:state=>state.context.test,
   })},

   data(){
   				 return {
              history:[],
              activeName:"first",
              params:{notice_status:'1',notice_type:'1'},
              noticeList:[],
              noticeList2:[],
   				 }
  },

    methods: {
      goDetail(type) {
        var _iframe = window.parent.document.getElementById("_main_iframe");
        var path = "";
        if (type == '1') {
          path = "/ssa/alertNotice/begin.do";
        } else if (type == '2') {
          path = "/ssa/alertNoticeBulletn/begin.do";
        }
        $.hash("url", path);
        var url = $.hash("url");
        Vue.nextTick(() => {
          _iframe.contentWindow.location.replace(url);
        })
      },
      fmtHistory(val,count){

         for(var item in this.history) {
             if (val==this.history[item].event_attack_phase){
               return count-this.history[item].count;
             }
         }
          return 0;
      },
      fmtShowHistory(val,count){

         for(var item in this.history) {
             if (val==this.history[item].event_attack_phase){
               if(this.history[item].count-count==0){
                 return false;
               }else{
                 return true;
               }
             }
         }

        return false;

      },
      changeTime(value){
        if (value==1){
          this.params.dateRange="day";
        }else if(value==2){
          this.params.dateRange="week";
        }else if(value==3){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },

      async loadMapChart(){
        this.params.notice_status="1";
        this.params.notice_type="1";
        var data = await this.utils.req("/ssa/workBench/getLogTop10.do", this.params);
        this.noticeList=data;


        this.params.notice_status="1";
        this.params.notice_type="2";
        var data = await this.utils.req("/ssa/workBench/getLogTop10.do", this.params);
        this.noticeList2=data;


      }

    },
  mounted: async function() {
     this.loadMapChart();
    $(".tabs-panel > li").click(function(){
       $(this).addClass("active").siblings("li").removeClass();
    });

    $("#inner-content1,#inner-content2,#inner-content3,#inner-content4").slimScroll({
          height: '290px',
   });
  }

}
</script>
