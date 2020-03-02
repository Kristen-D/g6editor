<template >
<div>
  <el-row>
  <el-col :span="18" :offset="1">
  <noticeInfoForm ></noticeInfoForm>
  <noticeInfo></noticeInfo>
  </el-col>
  </el-row>
  <!-- <el-row v-show="this.$route.params.handle == 'view'">
    <br/>
    <el-col :span="18" :offset="2">
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-col>
  </el-row> -->
</div>
</template>

<script>
import noticeInfo from './NoticeInfo'
import noticeInfoForm from './NoticeInfoForm'
export default {
  components: {
    noticeInfo,
    noticeInfoForm
  },
  methods: {
    goBack() {
          this.$router.go(-1);
      }
    }
}
</script>
