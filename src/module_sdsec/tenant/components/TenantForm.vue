<template>
  <div>
    <section>
    <div class="container-fluid">
      <div class="el-panel">
          <div class="top-title" v-if="!this.tenantForm.tenantId">租户信息设置</div>
          <div class="top-title" v-if="this.tenantForm.tenantId">编辑租户信息</div>
        <div class="el-panel-body">
          <el-form :model="tenantForm" :rules="rules" ref="tenantForm" label-width="120px" class="form-contral">
            <el-form-item label="租户编号" prop="code">
              <el-input v-model="tenantForm.code" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="tenantForm.name" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item label="全称" prop="fullName">
              <el-input v-model="tenantForm.fullName" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item label="IP网段" prop="ipRange">
              <el-input
                type="textarea"
                v-model="tenantForm.ipRange"
                style="width:380px;"
                placeholder="地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6"
                :autosize="{ minRows:1, maxRows:5}"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在地" prop="areaIdArr">
              <cap
                style="width:380px;"
                :loadData="loadData"
                v-model="tenantForm.areaIdArr"
                @change="validateAreaIdArr"
                clearable
                change-on-select
                placeholder="选择地区"
                root-id="0"
              ></cap>
            </el-form-item>
            <el-form-item label="安全服务设备" prop="deviceList" class="tree-menu-item">
              <el-tree
                :data="treeMenu"
                :props="props"
                show-checkbox
                @check-change="handleCheckChange"
                :default-expanded-keys="['-1']"
                node-key="id"
                ref="tree"
                style="height:100%;overflow-y:scroll"
              ></el-tree>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="tenantForm.description" style="width:380px;" :autosize="{ minRows:6, maxRows:12}"></el-input>
            </el-form-item>
            <el-form-item v-if="this.$route.params.tenantId">
              <el-button type="primary" class="button-p-3" @click="submitForm('tenantForm')">提交</el-button>
              <el-button type="gray" class="button-p-3" @click="resetForm('tenantForm')">取消</el-button>
            </el-form-item>
            <div v-if="!this.$route.params.tenantId">
              <el-button type="gray" @click="goback('tenantForm')">上一步</el-button>
              <el-button type="primary" @click="submitForm('tenantForm')">下一步</el-button>
            </div>
      </el-form>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {
    cap
  },
  data() {
    let validateCode = async (rule, value, callback) => {
      // if (value === '' || value === null) {
      //   callback();
      // }
      let pat = new RegExp("^[a-zA-Z0-9_]{3,30}$");
      if (pat.test(value)) {
        let result = await this.common.reqBackState("/ssa/tenant/checkTenantExist.do", { tenantId: this.tenantForm.tenantId, code: this.tenantForm.code })
        if (result.state) {
          callback();
        } else {
          callback(new Error('租户CODE已存在，请重新输入'));
        }
      } else {
        callback(new Error('3-30个字符，支持英文、数字、"_"的组合'));
      }
    };
    let validateName = async (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_-]{2,200})$");
      if (value == null || value.length == 0) {
        callback(new Error('请输入租户名称'));
      } else if (pat.test(value)) {
        let result = await this.common.reqBackState("/ssa/tenant/checkTenantExist.do", { tenantId: this.tenantForm.tenantId, name: this.tenantForm.name })
        if (result.state) {
          callback();
        } else {
          callback(new Error('租户名称已存在，请重新输入'));
        }
      } else {
        callback(new Error('2-200个字符，支持中英文、数字、"_"的组合'));
      }
    };
    let validateFullName = async (rule, value, callback) => {
        let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_-]{2,200})$");
        if (value == null || value.length == 0) {
            callback(new Error('请输入租户全称'));
        } else if (pat.test(value)) {
            let result = await this.common.reqBackState("/ssa/tenant/checkTenantExist.do", { tenantId: this.tenantForm.tenantId, fullName: this.tenantForm.fullName })
            if (result.state) {
                callback();
            } else {
                callback(new Error('租户全称已存在，请重新输入'));
            }
        } else {
            callback(new Error('2-200个字符，支持中英文、数字、"_"的组合'));
        }
    };
    let validateIpRange = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback('请输入ip段');
      }
      if (value.includes(',')) {
        let ipRanges = value.split(',');
        let flag = false
        for (let i = 0; i < ipRanges.length; i++) {
          if (!checkIpRange(ipRanges[i])) {
            flag = true
            break
          }
        }
        if (flag) {
          callback(new Error('格式错误，地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6'));
        } else {
          callback();
        }
      } else {
        if (checkIpRange(value)) {
          callback();
        } else {
          callback(new Error('格式错误，地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6'));
        }
      }

      function checkIpRange(ipRange) {
        let pat = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if (ipRange.includes('/')) {
          let ips = ipRange.split('/');
          if (pat.test(ips[0])) {
            if (parseInt(ips[1]) <= 32) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        }else if(ipRange.includes('-')){
          let ips = ipRange.split('-');
          if (!pat.test(ips[0]) || !pat.test(ips[1])) {
            return false
          }else if(parseInt(ips[0].replace(".","").replace(".","").replace(".","")) >= parseInt(ips[1].replace(".","").replace(".","").replace(".",""))){
            return false;
          }else{
            return true
          }
        }else {
          return pat.test(ipRange);
        }
      }
    };
    var validateDevice = (rule, value, callback) => {
      this.tenantForm.deviceList = this.$refs.tree.getCheckedKeys(true);
      if (this.tenantForm.deviceList.length <= 0) {
        callback(new Error('请选择安全设备列表！'));
      }
      callback();
    };
    var validateAreaIdArr = (rule, value, callback) => {
      if (this.tenantForm.areaIdArr == null || this.tenantForm.areaIdArr.length == 0) {
        callback(new Error('请选择地区'));
      } else {
        callback();
      }
    };
    return {
      loadData: { url: "/ssa/organization/getAreaByPid.do", maxLevel: 3, backFillUrl: "/ssa/organization/getAllPaerntById.do" },
      tenantForm: {
        tenantId: '',
        code: '',
        name: '',
        areaId: '',
        fullName: '',
        ipRange: '',
        description: '',
        areaIdArr: [],
      },
      treeMenu: [],
      props: {
        label: 'name',
        children: 'children',
      },
      tableId: this.$route.params.tableId,
      rules: {
        code: [
          { required: true, message: '请输入租户唯一编号', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入租户名称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' },
        ],
        fullName: [
          { required: true, message: '请输入租户全称', trigger: 'blur'},
          { validator: validateFullName, trigger: 'blur' }
        ],
        ipRange: [
          { required: true, message: '请输入租户网段地址', trigger: 'blur' },
          { validator: validateIpRange, trigger: 'blur' }
        ],
        deviceList: [
          // { required: true, message: '请选择安全设备', trigger: 'blur' },
          { required: true, validator: validateDevice, trigger: 'blur' }
        ],
        description: [{
          required: false,
          min: 0,
          max: 1000,
          message: '租户描述不得超过1000个长度',
          trigger: 'blur'
        }],
        areaIdArr: [{
          required: true,
          validator: validateAreaIdArr,
          message: '请选择地区'
        }],
      }
    };
  },
  computed: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.tenantForm.areaIdArr && this.tenantForm.areaIdArr.length > 0) {
            this.tenantForm.areaId = this.tenantForm.areaIdArr[this.tenantForm.areaIdArr.length - 1];
          }
          this.tenantForm.devices = this.$refs.tree.getCheckedKeys(true).join()
          if (!this.$route.params.tenantId) {
            //进入下一页，权限设置
            sessionStorage.tenantEntity = JSON.stringify(this.tenantForm)
            this.$router.push({ name: 'authForm' })
          } else {
            let result = await this.common.reqBackState("/ssa/tenant/update.do", this.tenantForm, this);
            if (result.state) {
              this.$message({ message: result.message, type: 'success' });
              this.clearSessionStorage()
            } else {
              this.$message({ message: result.message, type: 'error' });
            }
          }
        } else {
          return false;
        }
      });
    },
    clearSessionStorage() {
      sessionStorage.removeItem('tenantForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    goback() {
      this.$router.go(-1);
    },
    validateAreaIdArr() {
      for (var i = 0; i < this.$refs['tenantForm'].$children.length; i++) {
        if (this.$refs['tenantForm'].$children[i].prop == "areaIdArr") {
          this.$refs['tenantForm'].$children[i].validateDisabled = false;
          if (this.tenantForm.areaIdArr == null || this.tenantForm.areaIdArr.length == 0) {
            this.$refs['tenantForm'].$children[i].validateMessage = "请选择地区";
            this.$refs['tenantForm'].$children[i].validateState = "error";
          } else {
            this.$refs['tenantForm'].$children[i].validateMessage = "";
            this.$refs['tenantForm'].$children[i].validateState = "success";
          }
        }
      }
    },
    async initData() {
        // 此处报错
      let data = await this.common.req("/ssa/tenant/getDeviceList.do");
      let treeMap = this.common.fmtListToTree(data, "id");
      this.treeMenu = [{ name: '全部', id: '-1', children: treeMap.tree }];
    }
  },
  mounted: function () {
    this.initData();
    if (this.$route.params.tenantId) {
      this.tenantForm = { ...this.$route.params };
      let tenantInfo = JSON.stringify(this.$route.params);
      sessionStorage.tenantForm = tenantInfo;
    } else if (sessionStorage.tenantForm) {
      this.tenantForm = JSON.parse(sessionStorage.tenantForm);
    } else if (sessionStorage.tenantEntity) {
      this.tenantForm = JSON.parse(sessionStorage.tenantEntity);
    }
    if (this.tenantForm.deviceList && this.tenantForm.deviceList.length > 0) {
      this.$refs.tree.setCheckedKeys(this.tenantForm.deviceList);
    }
  },
  destroyed: function () {
    sessionStorage.removeItem('tenantForm');
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
