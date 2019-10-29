<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="1">
        <el-row>
          <alarmDetail style="margin-bottom:20px;" :tkey="tkey" :alarmviewDetail="alarmviewDetail" :eventSpDetail="eventSpDetail"
            :eventClDetail="eventClDetail">
          </alarmDetail>
        </el-row>
        <el-row>
          <alarmInfo></alarmInfo>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import alarmInfo from './AlarmInfo.vue'
  import alarmDetail from './AlarmDetail.vue'
  export default {
    components: {
      alarmInfo,
      alarmDetail
    },
    data() {
      return {
        tkey: "",
        alarmviewDetail: {},
        eventSpDetail: {},
        eventClDetail: {}
      }
    },
    created: async function () {
      if (this.$route.params.tkey != null) {
        var params = {};
        this.tkey = this.$route.params.tkey;
        //alert(this.tkey);
        params.alarm_id = this.$route.params.alarm_id;
        //  alert(this.$route.params.alarm_id);
        this.alarmviewDetail = await this.$store.dispatch('getAlarmHandleInfoById', [params]);
        //  if (this.tkey == 'alarmSh') {
        //   this.eventSpDetail = await this.$store.dispatch('getEventSpDetail', [params]);
        // }else if (this.tkey == 'alarmCl') {
        //    this.eventClDetail = await this.$store.dispatch('getEventClDetail', [params]);
        //  }
      }
    }
  }

</script>

<style>

</style>
