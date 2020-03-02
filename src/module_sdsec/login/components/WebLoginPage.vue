<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <div class="tip" v-if="form.errorMessage">{{ form.errorMessage }}</div>
        <el-form-item prop="tenantId">
          <el-select v-model="form.tenantId" placeholder="请选择账户类型" id="tenantId">
            <el-option
              v-for="item in form.tenants"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="name">
          <el-input type="text" prefix-icon="fa fa-user" placeholder="账户" v-model="form.name" id="name">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="fa fa-lock" placeholder="密码" v-model="form.password" id="password">
          </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <el-row type="flex" align="middle" justify="space-between">
            <el-input class="validCode" type="text" placeholder="验证码" v-model="form.captcha" id="captcha">
            </el-input>
            <img class="img-valiCode" @click="getPinBaseCode()" alt  />
          </el-row>
        </el-form-item>
        <!--<el-form-item prop="autoLogin">
          <el-checkbox v-model="form.autoLogin">自动登录</el-checkbox>
          <el-link class="forgetPassord">忘记密码</el-link>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" size="small" class="loginBtn" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                  name: '',
                  password: '',
                  captcha: '',
                  tenantId: '',
                  tenants: [],
                  autoLogin: false,
                  errorMessage: null
                },
                captchaFlag: "true",
                captchaUuid: null,
                captchaLi: false,
                showTenantList: false,
                rules: {
                    tenantId: [
                        { required: true, message: '请选择账户类型', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入您的账户', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'blur' }
                    ],
                    captcha: [
                        { required: true, message: '请输入您的验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getPinBaseCode: function () {
                var vm = this;
                $.ajax({
                    type: "post",
                    url: "/sso/getPinBaseCode.do",
                    dataType: "json",
                    success: function (result) {
                        var data = result.data;
                        var imgCode = data.imgCode;
                        vm.captchaUuid = data.captchaUuid;
                        vm.setCaptchaFlag(data);
                        if (result.state) {
                            var img = "data:image/jpg;base64," + imgCode;
                            $(".img-valiCode").attr("src", img);
                        }
                    },
                    error: function (msg) {
                        //	alert(msg)
                        var x = []
                        for (var s in msg) {
                            x.push(s + ":" + msg[s])
                        }
                        alert(x.join(","))
                    }
                });
            },
            tomd5: function (str) {
                var m = md5(str + "66f1b370c660445a8657bf8bf1794486").toUpperCase();
                var captcha = this.form.captcha;
                if (this.captchaFlag == "true") {
                    m = md5(m + captcha.toUpperCase()).toUpperCase();
                }
                return m;
            },
            submit: function () {
                let form = this.form;
                if (form.name == "" || form.name == null) {
                    $('#name').focus();
                    form.name = "";
                    return;
                } else if (form.password == "" || form.password == null) {
                    $('#password').focus();
                    form.password = "";
                    return;
                } else if ((form.captcha == "" || form.captcha == null) && form.captchaFlag == "true") {
                    $('#captcha').focus();
                    form.captcha = ""
                    return;
                } else if (form.tenantId == "" || form.tenantId == null) {
                    $('#tenantId').focus();
                    form.tenantId = ""
                    return;
                }
                var backurl = this.GetQueryString("backurl");
                var vm = this;
                $.ajax({
                    type: "post",
                    url: "/sso/login.do",
                    data: {
                        tenantId: form.tenantId,
                        backurl: backurl,
                        password: this.tomd5(form.password),
                        username: form.name,
                        captcha: form.captcha,
                        captchaFlag: this.captchaFlag,
                        msgCode: $("#msgCode").val(),
                        captchaUuid: this.captchaUuid
                    },
                    dataType: "json",
                    success: function (data) {
                        localStorage.setItem('tenantId', vm.form.tenantId);
                        if (data.code == 1) {
                            vm.form.errorMessage = "";
                            window.location = data.data + "&" + "random_date=" + new Date().getTime();
                        } else {
                            vm.form.errorMessage = data.data;
                            vm.getPinBaseCode();
                        }
                    },
                    error: function (msg) {
                        // alert($.toJSON(msg))
                        console.log(msg);
                    }
                })
            },
            GetQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            setCaptchaFlag: function (flag) {
                if (this.captchaFlag != flag.captchaFlag) {
                    this.getPinBaseCode();
                }
                this.captchaFlag = flag.captchaFlag;
                if (flag.captchaFlag == "true") {
                    this.captchaLi = true;
                    try {
                        if (typeof (eval(changeStyle)) == "function") {
                            changeStyle();
                        }
                    } catch (e) {
                        //alert("not function");
                    }
                } else {
                    this.captchaLi = false;
                }
                // if (flag.msgCodeFlag == "true") {
                //	 $('#codeLi').show();
                // } else {
                //	 $('#codeLi').hide();
                // }
            },
            getTenantList: function () {
                var vm = this;
                $.ajax({
                    type: "post",
                    url: "/sso/getTenantList.do",
                    dataType: "json",
                    success: function (result) {
                        if (result.state) {
                            vm.form.tenants = result.data
                            let tenantId = localStorage.getItem('tenantId')
                            if (tenantId) vm.form.tenantId = tenantId
                        } else {
                            vm.form.errorMessage = result.message
                        }
                    },
                    error: function (msg) {
                        console.log(msg);

                    }
                });
            },
            getTenantCfg() {
                $.ajax({
                    type: "post",
                    url: "/sso/isMulTenant.do",
                    dataType: "json",
                    success: (result) => {
                        if (result.state && result.data == 1) {
                            this.showTenantList = true
                            this.getTenantList();
                        } else {
                            this.form.tenantId = '-1'
                            this.showTenantList = false
                        }
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                });
            }
        },
        mounted: function () {

        },
        created: async function () {
            this.getPinBaseCode();
            // this.getTenantCfg();
            this.getTenantList();
            let vm = this;
            document.onkeydown = function (e) {
                let key = window.event.keyCode;
                if (key === 13) {
                    vm.submit();
                }
            }
        }
    }
</script>

<style>
.login-form .el-select {
  width: 100%;
}
.login-form .validCode {
  width: 54%;
}
.login-form .img-valiCode {
  width: 44%;
  height: 32px;
}
.login-form .forgetPassord {
  float: right;
  font-family: MicrosoftYaHeiUI;
  color: rgba(0,123,232,1);
  cursor: pointer;
}
.login-form .loginBtn {
  width: 100%;
  border-radius: 2px;
}
.login-form .tip {
  background-color: red;
  border-radius: 3px;
  padding: 2px 10px;
  margin-bottom: 10px;
  font-size: 12px;
}
</style>
