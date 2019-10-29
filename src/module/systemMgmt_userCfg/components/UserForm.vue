<template>
<div class="whitebackground Whitespace">
  <div class="top-title" v-if="this.$route.params.userId===-1">新增用户</div>
  <div class="top-title" v-if="this.$route.params.userId!==-1">编辑用户</div>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="用户信息" name="first">
      <el-form ref="userForm" :model="userForm" label-width="150px" :rules="rules">
        <el-form-item label="用户登录名" prop="username">
          <el-input v-if="this.$route.params.userId ==-1"  v-model="userForm.username" style="width:300px;"></el-input>
          <el-tag v-else type="primary">{{userForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="用户姓名" prop="realname">
          <el-input v-model="userForm.realname" style="width:300px;"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userForm.sex" style="width:300px;">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否认证" prop="sex">
          <el-radio-group v-model="userForm.authState" style="width:300px;">
            <el-radio :label="1">已认证 </el-radio>
            <el-radio :label="0">未认证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属组织" prop="orgidsArr">
          <cap :options="orgList" style="width:300px" clearable change-on-select placeholder="选择菜单" :props="props" v-model="userForm.orgidsArr" root-id="-1"> </cap>

        </el-form-item>

        <el-form-item label="用户角色" prop="roleidsArr">
          <el-select v-model="userForm.roleidsArr" multiple clearable placeholder="请选择" style="width:300px;">
            <el-option v-for="item in roleList" :key="item.id" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型" prop="personType">
          <el-radio-group v-model="userForm.personType" style="width:300px;">
            <el-radio :label="1">安全专家 </el-radio>
            <el-radio :label="2">普通人员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作年限" prop="workExperience">
          <el-input-number v-model="userForm.workExperience" style="width:300px;"  :min="0" :max="100"></el-input-number>
        </el-form-item>

        <el-form-item label="擅长领域" prop="specializedFields">
          <el-input v-model="userForm.specializedFields" style="width:300px;"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="userForm.phone" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址" prop="email">
          <el-input v-model="userForm.email" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm('userForm')">保存</el-button>
          <el-button @click="cancelForm('userForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <el-tab-pane v-if="this.$route.params.userId!==-1" label="认证信息" name="second">
      <authForm type="info" :userId = "userForm.userId"></authForm>


     </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import authForm from '../../userAuth/components/userAuthForm.vue'
import cap from 'components/Cascader/CascaderPlus'
import {
  mapState
} from 'vuex'
export default {
  components: {
    cap,
    authForm
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (this.userForm.userId != -1) {
        callback();
      }
      this.common.reqBackState("/ssa/authority/userCfg/checkUserName.do", {
        username: value
      }, this).then(data => {
        if (data.state) callback();
        else callback(new Error(data.message));
      })

    }

    let validateRealname = (rule, value, callback) => {
      callback();
    }

    let validatePhone = (rule, value, callback) => {
      let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/;
      if (reg.test(value)) callback();
      else callback(new Error('手机号码输入错误'));
    }

    let validateEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(value)) callback();
      else callback(new Error('邮箱输入错误'));
    }

    return {
      activeName:'first',
      tableId:null,
      userForm: {
        userId:-1,
        username: "",
        realname: "",
        sex: 1,
        authState:0,
        orgidsArr: [],
        roleidsArr: [],
        phone: "",
        email: "",
        personType:1,
        workExperience:null,
        specializedFields:'',
      },

      //  props:{value:"VALUE"},
      rules: {
        username: [{
            required: true,
            message: '登录名不可为空',
            trigger: 'blur'
          },
          {
            validator: validateUsername,
            trigger: 'blur'
          },
        ],
        realname: [{
            required: true,
            message: '姓名不可为空',
            trigger: 'blur'
          },
          {
            validator: validateRealname,
            trigger: 'blur'
          },
        ],

        orgidsArr: [{
          required: true,
          message: '所属组织不可为空'
        }],
        roleidsArr: [{
          required: true,
          message: '用户角色不可为空'
        }],
        phone: [{
            required: true,
            message: '联系方式不可为空',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            trigger: 'blur'
          },
        ],

        email: [{
            required: true,
            message: '邮件不可为空',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
           roleList:state=>state.context.roleList,
           orgList:state=>state.context.orgList,
       })

  },
  methods: {
    clearSessionStorage() {
      sessionStorage.removeItem('userForm');
      //window.top.delCrumb();
      this.$router.go(-1);
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    saveForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.userForm.roleids = this.userForm.roleidsArr.join(",");
          this.userForm.orgids = this.userForm.orgidsArr[this.userForm.orgidsArr.length-1];
          let data = await this.common.reqBackState('/ssa/authority/userCfg/saveUser.do', this.userForm, this);
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
    getParamsToObj(obj,params){
      for (var p in obj) {
        if(params[p])obj[p] = params[p];
      }
    }
  },
  created: async function() {

  let userId = this.$route.params.userId;
   this.tableId = this.$route.params.tableId;
  if (userId) {
    if (userId != -1) {
       this.userForm = {...this.$route.params};
    } else {
      this.userForm.userId = userId;
    }
    sessionStorage.params = JSON.stringify(this.userForm);

  } else if (sessionStorage.params) {
    await this.$store.dispatch('loadOrgList');
    await this.$store.dispatch('loadRoleList');
    Vue.nextTick(()=>{
        this.userForm = JSON.parse(sessionStorage.params);
    })

  }
},
  destroyed: function() {
    sessionStorage.removeItem('userForm');
  }
}
</script>

<style>

</style>
