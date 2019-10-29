<template>
<div class="">
        <el-form :model="whoIsForm"  ref="whoIsForm" label-width="135px" class="blue-table">
                  <el-form-item label="DOMAIN"  >
                    <div   >{{whoIsForm.root_domain}}</div>
                  </el-form-item>
                  <el-form-item label="注册日期"  >
                    <div   >{{whoIsForm.create_date}}</div>
                  </el-form-item>
                  <el-form-item label="过期日期"  >
                    <div   >{{whoIsForm.expire_date}}</div>
                  </el-form-item>
                  <el-form-item label="更新日期"  >
                    <div   >{{whoIsForm.updated_date}}</div>
                  </el-form-item>
                  <el-form-item label="注册商"  >
                    <div  >{{whoIsForm.registrar_name}}</div>
                  </el-form-item>
                  <el-form-item label="注册商电话"  >
                    <div   >{{whoIsForm.registrar_phone}}</div>
                  </el-form-item>
                  <el-form-item label="注册商邮箱" >
                    <div   >{{whoIsForm.registrar_email}}</div>
                  </el-form-item>
                  <el-form-item label="注册人"  >
                    <div   >{{whoIsForm.registrant_name}}</div>
                  </el-form-item>
                  <el-form-item label="注册人电话"  >
                    <div   >{{whoIsForm.registrant_phone}}</div>
                  </el-form-item>
                  <el-form-item label="注册人邮箱"  >
                    <div   >{{whoIsForm.registrant_email}}</div>
                  </el-form-item>
                  <el-form-item label="who is服务器"  >
                    <div   >{{whoIsForm.whi_is_server}}</div>
                  </el-form-item>
                  <el-form-item label="dns服务器"  >
                    <div   >{{whoIsForm.dns}}</div>
                  </el-form-item>
                  <el-form-item label="域名状态"  >
                    <div   >{{whoIsForm.domain_status}}</div>
                  </el-form-item>
                  <el-form-item label="黑白域名"  >
                    <div   >{{whoIsForm.is_white}}</div>
                  </el-form-item>
                  <!-- <el-form-item label="详细内容"  required>
                    <div  >{{whoIsForm.raw_data}}</div>
                  </el-form-item> -->
                  <el-form-item label="">
                    <el-button type="text"  @click="resetForm('whoIsForm')">返回</el-button>
                  </el-form-item>

        </el-form>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {

    return {
      whoIsForm:{},



    };
  },
  computed: {
    ...mapState({

    })
  },
  methods: {


    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('whoIsFormData');
      // this.$router.go(-1);
      this.$router.push({name:'blackDomainInfoForm', params:this.$route.params.domainData})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },

  },
  created: function() {
    // if (this.$route.params) {
      this.whoIsForm = this.$route.params.whoIsData;
      let whoInfo = JSON.stringify(this.whoIsForm);
      sessionStorage.whoIsFormData =whoInfo;
    // }

  },
  destroyed: function() {
    sessionStorage.removeItem('whoIsFormData');
  }
}
</script>

<style scoped="">

</style>
