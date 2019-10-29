<template >
<div class="whitebackground Whitespace">
  <div class="top-title" v-if="this.$route.params.handle == 'add'">新增</div>
  <div class="top-title" v-if="this.$route.params.handle == 'update'">编辑</div>

  <el-form label-width="90px" :rules="rules" :model="alarmRepositoryForm" ref="alarmRepositoryForm">

    <el-form-item label="告警类型" prop="alarm_type">
      <el-select v-model="alarmRepositoryForm.alarm_type" placeholder="告警类型" style="width:300px;">
        <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="告警类型" prop="alarm_typeArr">
      <el-cascader :options="alarmTypeOption" style="width:300px" clearable  placeholder="选择类型" :props="cascaderConfig" v-model="alarmRepositoryForm.alarm_typeArr" > </el-cascader>
    </el-form-item> -->
    <el-form-item label="告警级别" prop="alarm_level">
      <el-select v-model="alarmRepositoryForm.alarm_level" placeholder="告警级别" style="width:300px;">
        <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="告警名称" prop="alarm_name">
      <el-input v-model="alarmRepositoryForm.alarm_name" placeholder="告警名称" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="告警描述" prop="alarm_desc" required>
      <el-input type="textarea" rows="6" v-model="alarmRepositoryForm.alarm_desc" placeholder="告警描述" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="处置建议" >
      <el-input type="textarea" rows="4" v-model="alarmRepositoryForm.propose" placeholder="处置建议" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="相关引用" >
      <el-input type="textarea" rows="4" v-model="alarmRepositoryForm.rel_references" placeholder="相关引用" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="影响系统" >
      <el-input  v-model="alarmRepositoryForm.system" placeholder="影响系统" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="漏洞编号" prop="cveid" >
      <el-input  v-model="alarmRepositoryForm.cveid" placeholder="请输入“CVE-年-编号”格式的编号" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-form-item>
  </el-form>


</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import utils from 'components/js/common.js'
export default {

  data() {
    let alarmDescName = (rule, value, callback) => {
      let pat = new RegExp("^([\w\W]{1,255})$")
      if (pat.test(value)) {
        callback();
      } else {
        callback(new Error('只能输入小于或等于255个字符'))
      }
    };
    let cveId = (rule, value, callback) => {
      let pat = new RegExp("^CVE-[0-9]{4}[-]{1}[0-9]{1,}$");
      if(value !=''){
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error('格式为：CVE-年-编号'))
        }
      }else{
        callback();
      }
    };
    return {
      cascaderConfig: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      alarmRepositoryForm: {
        id: null,
        alarm_level: null,
        alarm_type:null,
        alarm_typeArr:[],
        alarm_name:'',
        propose: '',
        rel_references: '',
        system: '',
        cveid: '',
        insert_time:null,
      },
      rules: {
        cveid:[{
              validator: cveId,
              trigger: 'blur'
        }],
        alarm_name: [{
          // validator: alarmDescName,
          required: true,
          message: '请输入告警名称',
          trigger: 'blur'
        }],
        alarm_desc: [{
          required: true,
           message: '输入告警内容',
          // validator: alarmDescName,
          trigger: 'blur'
        },{ min: 1, max: 256, message: '长度在 1 到 255 个字符', trigger: 'blur' }],
        alarm_typeArr: [{
          type:'array',
          required: true,
          message: '请选择告警类型',
          trigger: 'change'
        }],
        alarm_type: [{
          required: true,
          message: '请选择告警类型',
          trigger: 'change'
        }],
        alarm_level: [{
          required: true,
          message: '请选择告警级别',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList,
      userList: state => state.context.userList,
      alarmTypeOption:state=>state.context.alarmTypeTreeOption
    })
  },
  methods: {
    checkForm() {
      var flag = false;
      this.$refs["alarmRepositoryForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    async onSubmit() {
      if (this.checkForm()) {
      //  this.alarmRepositoryForm.alarm_type = this.alarmRepositoryForm.alarm_typeArr[this.alarmRepositoryForm.alarm_typeArr.length-1]
        var result = await utils.reqBackState("/ssa/alarmRepository/saveData.do", this.alarmRepositoryForm, this);
        if(result.state){
          this.$message({ type: 'success',   message: result.message });
        }else {
          this.$message({ type: 'error',   message: result.message });
        }
          this.goBack();
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function() {
    if (this.$route.params.handle == "update") {
      this.alarmRepositoryForm.id = this.$route.params.alarmRepositoryForm.id;
      this.alarmRepositoryForm.alarm_type = this.$route.params.alarmRepositoryForm.alarm_type.toString();
      this.alarmRepositoryForm.alarm_name = this.$route.params.alarmRepositoryForm.alarm_name;
    //  this.alarmRepositoryForm.alarm_typeArr = this.$route.params.alarmRepositoryForm.alarm_typeArr;
      this.alarmRepositoryForm.alarm_level = this.$route.params.alarmRepositoryForm.alarm_level.toString();
      this.alarmRepositoryForm.alarm_desc = this.$route.params.alarmRepositoryForm.alarm_desc;
      this.alarmRepositoryForm.propose = this.$route.params.alarmRepositoryForm.propose;
      this.alarmRepositoryForm.rel_references = this.$route.params.alarmRepositoryForm.rel_references;
      this.alarmRepositoryForm.system = this.$route.params.alarmRepositoryForm.system;
      this.alarmRepositoryForm.cveid = this.$route.params.alarmRepositoryForm.cveid;
    }
  }


}
</script>
<style>
.cron-help {
  padding: 3px;
  margin-left: 5px;
  color: #4db3ff;
  font-size: 18px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
