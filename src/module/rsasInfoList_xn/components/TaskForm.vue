<template>
<div>
  <div class="top-title" >创建任务</div>
  <el-form  ref="taskForm" :rules="rules" :model="taskForm">

    <el-form-item label="任务类型：" prop="type" required>
    <el-select v-model="taskForm.type" placeholder="请选择任务类型"  style="width:500px;">
      <el-option label="漏洞扫描任务" value="1"></el-option>
      <el-option label="系统配置核查任务" value="2"></el-option>
      <el-option label="系统评估任务+系统配置核查任务" value="3"></el-option>
      <el-option label="口令猜测任务" value="4"></el-option>
      <el-option label="web应用扫描任务" value="8"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="配置文件："  required>
      <input type="file" @change="getFile($event)" style="width:500px;"></input>
      <a href="/static/template/config.xml" target="_blank" class="dialog-downloadtext font-color">下载配置文件模版</a>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm($event)">完成</el-button>
      <el-button type="gray" @click="goback">取消</el-button>
    </el-form-item>
  </el-form>


  <!-- <form>
  <input type="text" value="1" v-model="taskForm.type" placeholder="请输入任务类型"><br/>
  <input type="file" @change="getFile($event)"><br/>
  <button @click="submitForm($event)">提交</button>
</form> -->

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

      },
       taskForm: {
        config_xml:"",
        type: "1",
      },
    };
  },
  methods: {
    getFile(event) {
      this.taskForm.config_xml = event.target.files[0];
      console.log(this.taskForm.config_xml);
     },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('type', this.taskForm.type);
        formData.append('config_xml', this.taskForm.config_xml);
        formData.append('username',"admin");
        formData.append('password','nsfocus@2012');
        formData.append('format','json');
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let vm=this;
        this.$http.post('/rsas/api/task/create', formData, config).then(function (res) {
          if (res.status === 200) {
            if(res.data.ret_msg=="success"){
              vm.$message({message:"创建成功,任务ID:"+res.data.data.task_id,type: 'success' });
              vm.$router.go(-1);
            }else{
              vm.$message({message: "创建失败:"+res.data.ret_msg,type: 'error'});
            }
          }
        })
      },
    headSel(){
        // this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header
    },
    goback(){
        this.$router.go(-1);
    },
    async cltaskSubmit() {
      this.$refs["taskForm"].validate(async(valid) => {
        if (valid){
        var params = {};
        params = this.taskForm;
        params.username="admin";
        params.password="nsfocus@2012";
        params.format="json";
        var msg = await this.common.req("/rsas/api/task/create",params, this);
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
