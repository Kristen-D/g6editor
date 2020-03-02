<template >
<div>


<el-row>

  <el-col :span="19">
  <unitDetail></unitDetail>
  <unitForm></unitForm>
  </el-col>
  <el-col :span="18" :offset="1">
    <unitInfo></unitInfo>
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
import unitInfo from './UnitInfo'
import unitForm from './UnitForm'
import unitDetail from './UnitDetail'
export default {
  components: {
    unitInfo,
    unitForm,
    unitDetail
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
