<template >


  <el-row>
   <div class="el-panel-white">
     <div class="el-panel-white-heading">
       <h3 class="el-panel-white-title">攻击阶段</h3>
       <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
          <el-tab-pane label="今天" name="day" ></el-tab-pane>
          <el-tab-pane label="近7天" name="week" ></el-tab-pane>
          <el-tab-pane label="近30天" name="month" ></el-tab-pane>
       </el-tabs>
     </div>
      <div class="el-panel-white-body p-l-50 clearfloat">
        <!-- class="index-top-panel" -->
      <div  v-for="m in current" @click="getDrillData(m.event_attack_phase,m.count)" style="float: left; width: 10%; margin-right: 4.6666%;padding-left: 2%;cursor: pointer;">
        <div class="m-b-14" >
          <!-- <label>{{m.event_attack_phase}}</label> -->
          {{m.event_attack_phase}}
          <i v-if="fmtHistory(m.event_attack_phase,m.count) ==0" class="ion-stats-bars m-l-27p c-blue"></i>
          <i v-if="fmtHistory(m.event_attack_phase,m.count) <0" class="ion-stats-bars m-l-27p c-green"></i>
          <i v-if="fmtHistory(m.event_attack_phase,m.count) >0" class="ion-stats-bars m-l-27p c-red"></i>
        </div>
        <div>
          <span class="f-s-28">{{m.count}}</span>

          <span v-if="fmtHistory(m.event_attack_phase,m.count) ==0" class="m-l-22p c-blue">
            <i class="ion-minus  m-r-8"></i>
            --
          </span >
          <span v-if="fmtHistory(m.event_attack_phase,m.count) >0" class="m-l-22p c-red">
            <i  class="ion-arrow-up-b m-r-8"></i>
            +&nbsp;{{Math.abs(fmtHistory(m.event_attack_phase,m.count))}}
          </span >
          <span v-if="fmtHistory(m.event_attack_phase,m.count) <0" class="m-l-22p c-green">
            <i  class="ion-arrow-down-b m-r-8"></i>
            -&nbsp;{{Math.abs(fmtHistory(m.event_attack_phase,m.count))}}
          </span >
        </div>
      </div>

     </div>
   </div>
 </el-row>
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
   	          isOpen:false,
   						currentIndex:-1,
              eventTypelist:[],
              scorelist:[],
              current:[],
              history:[],
              params:{dateRange:'month'}
   				 }
  },

    methods: {

      getDrillData(title,count) {
        this.params.pattackPhase_s=title;
        this.params.old_total=count;
        this.params.time=this.params.dateRange;
        this.params.module = 'attackPhase_drilling';
        this.params.detailUrl = '/ssa/situationAnaly/getEventAttackPhaseDetail.do';
        this.$store.commit('openDrillDialogTable', this.params);
        this.$store.dispatch('getDrillColumns', [this, title]);
        this.$store.dispatch('loadDrillTableData');
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
        Vue.nextTick(()=>{
          this.initData();
        })
      },
      initData(){
        this.commonAjax.req("/ssa/situationAnaly/getEventAttackPhase.do", this.params).then(data=>{
          this.loadMapChart(data);
        });
      },
       loadMapChart(data){
        this.history=data.history;
        this.current=data.current;

        var newData=[];
        var nameData=['情报刺探','弱点攻击','命令控制','渗透感染','资料发掘','攻击窃取'];

        for(var i = 0; i < 6; i++){
            var child={event_attack_phase:'0',count:0};
            child.event_attack_phase=nameData[i];
            newData.push(child);
        };




        for(var i = 0; i < newData.length; i++){


        for(var j = 0; j < this.current.length; j++){
          var dataUnit = this.current[j];

           if(dataUnit.event_attack_phase==newData[i].event_attack_phase){
              newData[i].count=dataUnit.count;
           }

        };
    };

    this.current=newData;

  }

    },
  created :function() {

  },
  mounted:  function() {
      this.initData(); 
    $(".tabs-panel > li").click(function(){
       $(this).addClass("active").siblings("li").removeClass();
    });
  }

}
</script>
