<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击阶段</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="attack" id="">
        <ul class="attack-phases" id="attack-nav">
          <li v-for="m in current" :class="[activePhase===m.event_attack_phase? 'active':'']" @click="changeActivePhase(m.event_attack_phase)">
            <i v-if="fmtHistory(m.event_attack_phase,m.count) ==0" class="el-icon-minus equal-color"></i>
            <i v-if="fmtHistory(m.event_attack_phase,m.count) <0" class="el-icon-caret-bottom down-color"></i>
            <i v-if="fmtHistory(m.event_attack_phase,m.count) >0" class="el-icon-caret-top up-color"></i>
            <span>{{m.count}}</span>
            {{m.event_attack_phase}}
          </li>
          <!-- <li class="" id="attackstep1"><i class="el-icon-caret-bottom down-color"></i><span>63</span>情况刺探</li>
          <li class="" id="attackstep2"><i class="el-icon-caret-top up-color"></i><span>55</span>弱点攻击</li>
          <li class="" id="attackstep3"><i class="el-icon-caret-top up-color"></i><span>76</span>命令控制</li>
          <li class="" id="attackstep4"><i class="el-icon-caret-bottom down-color"></i><span>86</span>渗透感染</li>
          <li class="" id="attackstep5"><i class="el-icon-caret-top up-color"></i><span>53</span>资产发掘</li>
          <li class="active" id="attackstep6"><i class="el-icon-minus equal-color"></i><span>98</span>攻击窃取</li> -->

      



        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activePhase'],
  data() {
    return {
      current:[],
      history:[],
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/situationAnaly/getEventAttackPhase.do', {dateRange: 'month'}, this).then((data) => {
        this.formatData(data);
      })
    },
    formatData(data) {
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
    changeActivePhase(name) {
      this.$emit('changeActivePhase', name)
    }

  },
  mounted: function() {
    this.getInitData();
  }
}
</script>

<style lang="css">
</style>
