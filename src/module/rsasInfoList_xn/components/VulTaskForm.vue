<template>
<div>
  <div class="top-title" >创建漏洞扫描任务</div>
  <el-form  ref="vulTaskForm" :rules="rules" :model="vulTaskForm">
    <el-form-item label="任务名称：" prop="name" required>
      <el-input type="text"   v-model="vulTaskForm.name" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="扫描目标：" prop="targets" required>
      <el-input type="text"   v-model="vulTaskForm.targets" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="漏洞模板：" prop="template_id" required>
      <el-input type="text"   v-model="vulTaskForm.template_id" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="cltaskSubmit('vulTaskForm')">完成</el-button>
      <el-button type="gray" @click="goback">取消</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
// import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
  components: {
    //selectOrganization
  },
  computed: {
    ...mapState({
      // orgList: state => state.context.orgList,
      //orgMap: state => state.context.orgMap
    })
  },
  data() {
    return {

      tableId: this.$route.params.tableId,
      rules: {
        name: [{
          required: true,
          message: '请输入任务名称!',
          trigger: 'blur'
        }],
        targets: [{
          required: true,
          message: '请输入扫描目标!',
          trigger: 'blur'
        }],
        template_id: [{
          required: true,
          message: '请输入漏洞模板!',
          trigger: 'blur'
        }],
      },
      vulTaskForm: {
        name:"",
        targets: "",
        template_id:"1"
      },
    };
  },
  methods: {
    headSel(){
        // this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header
    },
    goback(){
        this.$router.go(-1);
    },
    async cltaskSubmit() {
      this.$refs["vulTaskForm"].validate(async(valid) => {
        if (valid){
        var params = {};
        params = this.vulTaskForm;
        params.username="admin";
        params.password="nsfocus@2012";
        params.format="json";
        var msg = await this.common.req("/rsas/api/task/vul/create",params, this);
        if(msg.ret_msg=="success"){
          this.$message({message:"创建成功,任务ID:"+msg.data.task_id,type: 'success' });
          this.$router.go(-1);
        }else{
          this.$message({message: "创建失败:"+msg.data.param_error,type: 'error'});
        }

      }
    });
    },

  },
  mounted: function() {
  },
  created: async function() {

  }
}
</script>

<style>

</style>
