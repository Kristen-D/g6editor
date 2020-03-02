<template>

  <div class="whitebackground Whitespace">
    <div class="top-title">系统设置</div>
    <login></login>
    <sysInfo></sysInfo>
    <middleware></middleware>
    <fileServer></fileServer>
    <mailServer></mailServer>
  </div>
  <!--viewFramework-product end-->

</template>

<script>
  import {
    mapState
  }
  from 'vuex'
  import debounce from 'lodash.debounce'
  import cap from 'components/Cascader/CascaderPlus'
  import middleware from './Middleware'
  import login from './login'
  import sysInfo from './SysInfo'
  import mailServer from './MailServer'
  import fileServer from './FileServer'
  export default {
    components: {
      middleware,
      login,
      sysInfo,
      mailServer,
      fileServer
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        menuName: state => state.context.menuName,
      })
    },

    methods: {

    },

    created: async function () {

      },
      mounted: function () {


      }

  }

</script>
<style>
  .sys-cfg-form {
    padding-left: 50px;
  }

  .time-input {
    width: 50px;
    padding: 0px 5px 0px 5px;
  }

</style>
