<template >
<div>


<el-row>

  <el-col :span="19">
  <systemDetail></systemDetail>
  <systemForm></systemForm>
  </el-col>
  <el-col :span="18" :offset="1">
    <systemInfo></systemInfo>
  </el-col>
</el-row>

<el-row v-show="this.$route.params.handle == 'view'">
  <br/>
  <el-col :span="18" :offset="1">
    <el-button type="gray" @click="goBack">返回</el-button>
  </el-col>
</el-row>


</div>
</template>

<script>
import systemInfo from './SystemInfo'
import systemForm from './SystemForm'
import systemDetail from './SystemDetail.vue'
export default {
  components: {
    systemInfo,
    systemForm,
    systemDetail
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted:function(){


  }
}
</script>
