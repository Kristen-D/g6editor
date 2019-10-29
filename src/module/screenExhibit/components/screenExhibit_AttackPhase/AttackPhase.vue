<template>
  <el-row :gutter="30" class="container-wrap">
    <el-col :span="7">
      <el-row>
        <attackphaseoverview :activePhase="activePhase" @changeActivePhase="changeActivePhase"></attackphaseoverview>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <eventrisk :activePhase="activePhase"></eventrisk>

        </el-col>
        <el-col :span="12">
          <eventasset :activePhase="activePhase"></eventasset>

        </el-col>
      </el-row>

      <el-row>
        <attackevent :activePhase="activePhase"></attackevent>

      </el-row>

    </el-col>

    <el-col :span="17">
      <attackphasemap :activePhase="activePhase"></attackphasemap>



          <attackdetails :activePhase="activePhase" id="attackdetailsID"></attackdetails>


    </el-col>

  </el-row>
</template>

<script>
import attackphaseoverview from './AttackPhaseOverView.vue'
import eventrisk from './EventRisk.vue'
import eventasset from './EventAsset.vue'
import attackdetails from './AttackDetails.vue'
import attackevent from './AttackEvent.vue'
import attackphasemap from './AttackPhaseMap.vue'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
    })
  },
  components: {
    attackphaseoverview, eventrisk, eventasset,
    attackdetails, attackevent, attackphasemap
  },
  data() {
    return {
      activePhase: '',
      phases: ['情报刺探', '弱点攻击', '命令控制', '渗透感染', '资料发掘', '攻击窃取'],
      i: 0
    }
  },
  methods: {
    changeActivePhase(name) {
      this.activePhase = name;
    },
    autoChangePhase() {
      let self=this;
      this.activePhase = this.phases[this.i];
      if(self && !self._isDestroyed) {
        setInterval(() => {

            if(this.activeScreen===2){
              if (self && !self._isDestroyed) {
                  self.i++;
                  if(self.i === 6) {
                    self.i = 0;
                  }
                  self.activePhase = self.phases[self.i];
              }
            }

        }, 20000);
      }

    }
  },
  created: function() {
    this.autoChangePhase();
  }
}
</script>

<style>

</style>
