<template >
<div>
  <el-row>
  <el-col :span="18" :offset="1">
  <alarmInfoForm ></alarmInfoForm>
  <alarmInfo></alarmInfo>
  </el-col>
  </el-row>
  <!-- <el-row >
    <br/>
    <el-col :span="18" :offset="2">
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-col>
  </el-row> -->
</div>
</template>

<script>
import alarmInfo from './AlarmInfo'
import alarmInfoForm from './AlarmInfoForm'
export default {
  components: {
    alarmInfo,
    alarmInfoForm
  },
  methods: {
    goBack() {
          this.$router.go(-1);
      }
    }
}
</script>
