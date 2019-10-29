<template >
  <el-col :span="10">
  <div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">安全指数</h3>
  </div>
  <div class="el-panel-white-body" style="min-height:276px;">
      <el-row>
    <el-col :span="5" class="SI">
         <div>{{totalScore}}</div>
       <p>{{fmtScoreStr(totalScore)}}</p>
       <!-- <p>City State<i class="ion-ios7-speedometer-outline" style="margin-left: 6px; font-weight: 600"></i></p> -->
    </el-col>
    <el-col :span="19">
<!--
        <ul class="SI-ul1 clearfloat">
        <li class="active"><div class="half-circle"><span class="span2">76</span></div><label>有害程序</label></li>
        <li class="active"><div class="circle"><span class="span3">100</span></div><label>网络攻击</label></li>
        <li><div class="circle"><span class="span3">100</span></div><label>信息破坏</label></li>
      </ul>
-->
        <ul class="si-ul11 clearfloat">
        <li  v-for="m in eventTypeList" :class="m.class" @click="changeActive(m.pid)" v-show="m.pid=='200'||m.pid=='300'||m.pid=='400'?true:false"><scorePieBig  :param="m.pid"   :id="m.name" :class="m.class"></scorePieBig></li>
        </ul>

      <ul class="SI-ul2 clearfloat" v-for="m in eventTypeList" v-show="m.class=='active'?true:false">
        <li v-for="n in m.data"><scorePie  :param="n.id"   :id="n.short_name" :myname="n.name"></scorePie></li>
      </ul>
    </el-col>
  </el-row>
  </div>
</div>
</el-col>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import scorePie from './ScorePie.vue'
import scorePieBig from './ScorePieBig.vue'
import echarts from 'echarts'
export default {
  components: { scorePie,scorePieBig},
  computed:{
    ...mapState({
       params:state=>state.context.params,
        test:state=>state.context.test,
        scorelist:state=>state.context.scorelist,
        totalScore:state=>state.context.totalScore,
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              eventTypeList:[],
              params:{dateRange:'week'},
              childData:[],
              pid:0
   				 }
   		 },

    methods: {
      changeActive(value){
        for(var item in this.eventTypeList) {
            if (this.eventTypeList[item].pid==value){
               this.eventTypeList[item].class="active";
            }else{
               this.eventTypeList[item].class="";
            }
        }
        this.fmtChildData();
      },
      fmtScoreList(val){

         for(var item in this.scorelist) {
             if (val==this.scorelist[item].id){
               return this.scorelist[item].score;
             }
         }

      },
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      fmtScoreStr(val){

         if (val>=80){
           return "状态良好";
         }else if(val>=60){
            return "有待提升";
         }else{
            return "极度危险";
         }

      },
      fmtChildData(){

         for(var item in this.eventTypeList) {
             if (this.eventTypeList[item].class=="active"){
                this.pid=this.eventTypeList[item].pid;
             }
         }

         for(var item in this.eventTypeList) {
             if (this.eventTypeList[item].pid==this.pid){
                 this.childData=this.eventTypeList[item].data;
             }
         }

      // console.log(this.childData);
      },


      async loadMapChart(){

        this.eventTypeList = await this.commonAjax.req("/ssa/situationAnaly/getEventTypelistByPid.do", this.params);
        var data = await this.commonAjax.req("/ssa/situationAnaly/getScoreList.do", this.params);
        this.$store.state.context.scorelist=data.scorelist;
        this.fmtChildData();

      },

    },
  created :function() {

  },
  mounted: async function() {
    // this.loadMapChart();
  }

}
</script>
