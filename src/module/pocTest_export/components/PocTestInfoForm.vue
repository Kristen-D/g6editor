<template>
<div class="">
      <div class="whitebackground Whitespace">
        <div class="top-title" v-if="!this.$route.params.nameMachine">新增</div>
        <div class="top-title" v-if="this.$route.params.nameMachine">编辑</div>


        <el-form :model="pocInfoForm" :rules="rules" ref="pocInfoForm" label-width="130px" class="form-contral">
              <div  v-if="!advancedFlag">
                      <el-form-item label="图标:" prop="photoIcon" >
                        <el-input v-model="pocInfoForm.photoIcon" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="名称:" prop="nameMachine" required>
                        <el-input v-model="pocInfoForm.nameMachine" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="平台:" prop="platform" >
                        <el-input v-model="pocInfoForm.platform" style="width:300px;"></el-input>
                      </el-form-item>

                      <el-form-item label="策略:" prop="strategy" >
                        <el-input v-model="pocInfoForm.strategy" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="状态灯:" prop="statusLamp" >
                        <el-input v-model="pocInfoForm.statusLamp" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="状态:" prop="status" >
                        <el-input v-model="pocInfoForm.status" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="成功发送策略:" prop="sucSendStrategy" >
                        <el-input v-model="pocInfoForm.sucSendStrategy" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="版本:" prop="version" >
                        <el-input v-model="pocInfoForm.version" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="Hypervisor:" prop="hypervisor" >
                        <el-input v-model="pocInfoForm.hypervisor" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item label="组:" prop="groupName" >
                        <el-input v-model="pocInfoForm.groupName" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" class="button-p-3" @click="submitForm('pocInfoForm')">保存</el-button>
                        <el-button type="gray" class="button-p-3" @click="resetForm('pocInfoForm')">取消</el-button>
                      </el-form-item>
              </div>
        </el-form>
      </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pocInfoForm: {
        photoIcon:'',
        nameMachine: '',
        platform: '',

        strategy:'',
        statusLamp:'',
        status:'',
        sucSendStrategy:'',
        version:'',
        hypervisor:'',
        groupName:"",
      },

      data:'',
      // advancedFlag:'',
      detailShowFlag: '',
      tableId: this.$route.params.tableId,
      rules: {

        nameMachine: [
          { type: 'string',required: true, message: '名称', trigger: 'blur' },
        ],


      }
    };
  },
  computed: {
    ...mapState({
      // advancedFlag: state => !state.context.operateFlag,
    })
  },
  methods: {


    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(this.pocInfoForm);
          let data = await this.common.reqBackState('/ssa/pocTestExport/addOrModifyPocInfo.do', this.pocInfoForm, this);
          if (data.state) {
            this.clearSessionStorage();
            this.$message({
              type: 'success',
              message: data.message
            });
            this.$store.dispatch('reloadTable', this.tableId);
          } else {
            this.$message({
              type: 'error',
              message: data.message
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('pocInfoFormData');
      this.$router.go(-1);
      // this.$router.push({name:'context', params:this.$route.params.param})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    async initDataList() {


    }
  },
  created: function() {
    if (this.$route.params) {
      this.pocInfoForm = {...this.pocInfoForm,...this.$route.params};

      let siteInfo = JSON.stringify(this.pocInfoForm);
      sessionStorage.pocInfoFormData = siteInfo;
    }else if (sessionStorage.pocInfoFormData) {
      this.pocInfoForm = JSON.parse(sessionStorage.pocInfoFormData);
      // if(this.pocInfoForm.operateFlag) {
      //   this.advancedFlag=true;//查看模式
      // }

    }

  },
  destroyed: function() {
    sessionStorage.removeItem('pocInfoFormData');
  }
}
</script>

<style>

</style>
