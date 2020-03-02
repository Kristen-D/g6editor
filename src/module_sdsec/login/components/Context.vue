<template>
  <el-row type="flex" justify="center" align="middle" class="login-bg">
    <el-col :span="13">
      <LoginMain></LoginMain>
    </el-col>
  </el-row>
</template>

<script>
    import LoginMain from './LoginMain.vue'

    export default {
        components: {
            LoginMain,
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        created: async function () {
        }
    }
</script>

<style>
  .login-bg {
    height: 100%;
    background: url("/static/sdsec/image/login-bg.png") no-repeat center;
    background-size: cover;
  }
  .login-bg > div{
    height: 42em;
    margin-bottom: 4%;
  }
</style>
