<template>
  <div>
    <section>
      <div class="container-fluid">
            <div class="el-panel">
              <div class="el-panel-heading">
                <div class="el-panel-title" v-if="userForm.userId == -1">创建</div>
                <div class="el-panel-title" v-if="userForm.userId != -1">编辑</div>
              </div>
              <div class="el-panel-body">
                <div style="margin:20px;">
                  <div class="el-subpanel-heading  no-bottom">
                    <h4 class="el-subpanel-title">基本信息</h4>
                  </div>
                </div>
                <el-form ref="userForm" :model="userForm" label-width="140px" :rules="rules">
                  <el-form-item label="用户登录名：" prop="username">
                    <el-input v-if="this.$route.params.userId ==-1" v-model="userForm.username" class="setwidth-per25"></el-input>
                    <el-tag v-else type="primary">{{userForm.username}}</el-tag>
                  </el-form-item>
<!--                  密码后端暂无，待改-->
                  <el-form-item label="密码：" prop="password">
                    <el-input v-model="userForm.password" class="setwidth-per25"></el-input>
                  </el-form-item>
                  <el-form-item label="用户姓名：" prop="name">
                    <el-input v-model="userForm.name" class="setwidth-per25"></el-input>
                  </el-form-item>
                  <el-form-item label="性别：" prop="gender">
                    <el-radio-group v-model="userForm.gender" class="setwidth-per25">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="所属组织：" prop="orgidsArr">
                    <cap
                      :disabled="disabled"
                      :options="orgList"
                      @change="validateOrgIds"
                      style="width: 25%"
                      change-on-select
                      clearable
                      placeholder="请选择"
                      v-model="userForm.orgidsArr"
                      root-id="-1"
                    ></cap>
                  </el-form-item>
                  <el-form-item label="用户角色：" prop="roleidsArr">
                    <el-select v-model="userForm.roleidsArr" :disabled="disabled" multiple clearable placeholder="若无角色，请先创建" class="setwidth-per25">
                      <el-option v-for="item in roleList" :key="item.id" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="人员类型：" prop="personType">
                    <el-radio-group v-model="userForm.personType" class="setwidth-per25">
                      <el-radio :label="1">安全专家</el-radio>
                      <el-radio :label="2">普通人员</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="工作年限：" prop="workExperience">
                    <el-input-number v-model="userForm.workExperience" class="setwidth-per25" :min="0" :max="100"></el-input-number>
                  </el-form-item>
                  <el-form-item label="手机：" prop="phone">
                    <el-input v-model="userForm.phone" class="setwidth-per25"></el-input>
                  </el-form-item>
                  <el-form-item label="邮件地址：" prop="email">
                    <el-input v-model="userForm.email" class="setwidth-per25"></el-input>
                  </el-form-item>


                  <el-form-item>
                    <el-button type="primary" size="medium" @click="saveForm('userForm')">提交</el-button>
                    <el-button type="gray" size="medium" @click="cancelForm('userForm')">取消</el-button>
                  </el-form-item>
                </el-form>

              </div>
            </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cap from 'components/Cascader/CascaderPlus'

    export default {
        components: {
            cap,
        },

      data(){
          let validateUsername = (rule, value, callback) => {
              if (this.userForm.userId != -1) {
                  callback();
              }
              let pat = new RegExp("^([a-zA-Z0-9_-]{2,20})$");
              if (pat.test(value)) {
                  this.common.reqBackState("/ssa/authority/userCfg/checkUserName.do", {
                      username: value
                  }, this).then(data => {
                      if (data.state) callback();
                      else callback(new Error(data.message));
                  })
              } else {
                  callback(new Error('2-20个字符，支持英文、数字、"_"的组合，不支持中文'));
              }


          }

          let validatename = (rule, value, callback) => {
              if (value.length > 50) {
                  callback(new Error('用户姓名长度不能超过50'));
              } else {
                  callback();
              }
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
              activeName: 'first',
              tableId: null,
              disabled: false,
              userForm: {
                  userId: -1,
                  username: "",
                  name: "",
                  gender: 1,
                  orgidsArr: [],
                  roleidsArr: [],
                  phone: "",
                  email: "",
                  personType: 1,
                  workExperience: null,
                  orgId: ""
              },
              // roleList: [],
              // orgList: [],
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
                  name: [
                      {
                          required: true,
                          message: '姓名不可为空',
                          trigger: 'blur'
                      },
                      {
                          validator: validatename,
                          trigger: 'blur'
                      },
                  ],
                  orgId: [
                      {
                          required: true,
                          trigger: 'change',
                          message: '请选择所属组织'
                      }
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
                roleList: state => state.context.roleList,
                orgList: state => state.context.orgList,
            })

        },

      methods:{
          clearSessionStorage() {
              sessionStorage.removeItem('userForm');
              //window.top.delCrumb();
              // this.$router.go(-1);
              this.$router.push({ name: 'context', params: this.$route.params.param })
          },
          cancelForm(formName) {
              this.$refs[formName].resetFields();
              this.clearSessionStorage();
          },
          saveForm(formName) {
              this.$refs[formName].validate(async (valid) => {
                  if (valid) {
                      this.userForm.roleids = this.userForm.roleidsArr.join(",");
                      this.userForm.orgId = this.userForm.orgidsArr[this.userForm.orgidsArr.length - 1];
                      let data = await this.common.reqBackState('/ssa/authority/userCfg/saveUser.do', this.userForm, this);
                      if (data.state) {
                          this.clearSessionStorage();
                          this.$message({
                              type: 'success',
                              message: data.message
                          });
                          // this.goBack();
                      } else {
                          this.$message({
                              type: 'error',
                              message: data.message
                          });
                      }
                  } else {
                      return false;
                  }
              });
          },
          validateOrgIds() {
              for (var i = 0; i < this.$refs['userForm'].$children.length; i++) {
                  if (this.$refs['userForm'].$children[i].prop == "orgidsArr") {
                      this.$refs['userForm'].$children[i].validateDisabled = false;
                      if (this.userForm.orgidsArr == null || this.userForm.orgidsArr.length == 0) {
                          this.$refs['userForm'].$children[i].validateMessage = "请选择所属组织";
                          this.$refs['userForm'].$children[i].validateState = "error";
                      } else {
                          this.$refs['userForm'].$children[i].validateMessage = "";
                          this.$refs['userForm'].$children[i].validateState = "success";
                      }
                  }
              }
          },
          getParamsToObj(obj, params) {
              for (var p in obj) {
                  if (params[p]) obj[p] = params[p];
                  if (params['gender'] === 0) {
                      obj[p] = params[p];
                  }
              }
          }

      },
        mounted: async function () {
            if (this.$route.params.row) {
                let userId = this.$route.params.row.userId;
                this.tableId = this.$route.params.row.tableId;
                if (userId != -1) {
                    this.userForm = { ...this.$route.params.row };
                } else {
                    this.userForm.userId = userId;
                }
                sessionStorage.userForm = JSON.stringify(this.$route.params.row);
            } else if (sessionStorage.userForm) {
                this.userForm = JSON.parse(sessionStorage.userForm);
                await this.$store.dispatch('loadOrgList');
                await this.$store.dispatch('loadRoleList');
            }
            delete this.userForm.tableId;
            if(this.userForm.userId == window.top.getLoginUser().userId){
                this.disabled = true;
            } else {
                this.disabled = false;
            }
        },
        destroyed: function () {
            sessionStorage.removeItem('userForm');
        },

      created: async function(){


      }
    }
</script>

<style scoped>
  .el-collapse-heading {
    padding: 0 15px;
  }

  .el-collapse-heading h4 {
    display: inline-block;
  }

  .el-collapse-heading label {
    padding-left: 5px;
    color: #999;
    font-size: 12px;
    line-height: 14px;
  }

  .el-collapse-heading label span {
    color: #f00;
    padding-right: 3px;
  }

  .custom-inputwidth {
    width: 16.48% !important
  }

  .custom-width {
    width: 50%;
  }

  .addbutton {
    padding-right: 20px !important;
    line-height: 40px;
  }

  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
  }

  .top-title {
    padding-left: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e3e4;
    font-size: 16px;
    line-height: 55px;
    color: #000;
    font-weight: 500;
    text-shadow: 0 0 black;
  }
</style>
<style>
  .custom-form .el-form-item__label {
    float: none;
  }

  .custom-collapse.el-collapse {
    border-top: none;
  }

  .custom-collapse .el-collapse-item__header, .custom-collapse .el-collapse-item__wrap {
    border-bottom: none;
  }

  .custom-collapse .el-collapse-item__content {
    padding-bottom: 0;
  }

  .custom-collapse .el-collapse-item.is-active .el-collapse-item__header {
    border-bottom: 1px solid #ebeef5;
  }

  .custom-form.el-form .el-form-item {
    width: calc(100% / 3);
  }

  .custom-form {
    flex-wrap: wrap;
  }

</style>
