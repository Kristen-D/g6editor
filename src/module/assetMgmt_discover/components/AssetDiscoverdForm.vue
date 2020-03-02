<template>
  <div class="whitebackground Whitespace">
    <!-- <div class="top-title" v-if="!this.$route.params.assetCode">新增新发现资产信息</div> -->
    <div class="top-title">编辑新发现资产信息</div>

    <el-form :model="assetInfoForm" :rules="rules" ref="assetInfoForm" label-width="110px" class="form-contral">
      <div class="el-sub-panel">
        <div class="el-sub-panel-heading"><h4 class="sub-title">发现信息</h4></div>
        <el-form-item label="发现ID"  >
          <el-input v-model="discoverdForm.discoverId" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="发现时间"  >
          <el-input v-model="discoverdForm.discoverdTime" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备供应商" >
          <el-input v-model="discoverdForm.vendor" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="OS名称" >
          <el-input v-model="discoverdForm.os" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="OS供应商" >
          <el-input v-model="discoverdForm.osVendor" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="开机时间" >
          <el-input v-model="discoverdForm.lastboot" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-radio-group v-model="discoverdForm.state">
            <el-radio label="up">up</el-radio>
            <el-radio label="down">down</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="el-sub-panel">
        <div class="el-sub-panel-heading"><h4 class="sub-title">资产信息</h4></div>
        <el-form-item label="资产编号" prop="assetCode" required>
          <el-input v-model="assetInfoForm.assetCode" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="资产名称" prop="assetName" required>
          <el-input v-model="assetInfoForm.assetName" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="资产别名" prop="assetAlias">
          <el-input v-model="assetInfoForm.assetAlias" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="productId" required>
          <el-select v-model="assetInfoForm.productId" placeholder="请选择设备" style="width:300px;">
            <el-option :label="d.productName" :value="d.productId" v-for="d in devices"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键设备" prop="assetKey" required>
          <el-radio-group v-model="assetInfoForm.assetKey">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="el-sub-panel">
        <div class="el-sub-panel-heading"><h4 class="sub-title">资产拓扑</h4></div>
        <el-form-item label="资产内网IP" required>
            <el-input v-model="assetInfoForm.assetIp" style="width:300px;"></el-input>
        </el-form-item>
          <el-form-item label="资产内网端口" >
            <el-input v-model="assetInfoForm.assetPort" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="资产外网IP" >
            <el-input v-model="assetInfoForm.assetOutIp" style="width:300px;"></el-input>
        </el-form-item>
      </el-form-item>
        <el-form-item label="资产外网端口" >
          <el-input v-model="assetInfoForm.assetOutPort" style="width:300px;"></el-input>
      </el-form-item>
        <el-form-item label="资产MAC">
          <el-input v-model="assetInfoForm.assetMac" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="物理位置" prop="assetLocation" required>
          <el-input v-model="assetInfoForm.assetLocation" placeholder="" style="width:300px;"></el-input>
        </el-form-item>
      </div>

      <div class="el-sub-panel">
        <div class="el-sub-panel-heading"><h4 class="sub-title">资产归属</h4></div>
        <el-form-item label="所属机构" prop="assetOrgArray" required>
          <cap :options="orgs" style="width:300px" clearable change-on-select placeholder="请选择所属机构" :props="props" v-model="assetInfoForm.assetOrgArray" root-id="-1"> </cap>
        </el-form-item>
        <el-form-item label="所属子系统" prop="subSystem" required>
          <el-select v-model="assetInfoForm.subSystem" placeholder="" style="width:300px;">
            <el-option :label="ss.systemName" :value="ss.systemId" v-for="ss in subSystems"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产负责人" prop="assetOwner" required>
          <el-select v-model="assetInfoForm.assetOwner" placeholder="" style="width:300px;">
            <el-option :label="u.userName" :value="u.userId" v-for="u in users"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人" prop="assetUser" required>
          <el-select v-model="assetInfoForm.assetUser" placeholder="" style="width:300px;">
            <el-option :label="u.userName" :value="u.userId" v-for="u in users"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人电话" prop="userPhone" required >
          <el-input v-model="assetInfoForm.userPhone" placeholder="" style="width:300px;"></el-input>
        </el-form-item>
      </div>
      <div class="el-sub-panel">
        <div class="el-sub-panel-heading"><h4 class="sub-title">其他</h4></div>
        <el-form-item label="CIA" >
          <el-input v-model="assetInfoForm.assetCia" placeholder="" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="资产描述" prop="assetDesc">
          <el-input type="textarea" v-model="assetInfoForm.assetDesc" style="width:380px;" :autosize="{ minRows:1, maxRows:5}"></el-input>
        </el-form-item>
      </div>
      <el-checkbox v-model="saved" style="margin-left:9%; top: -20px;">添加至现有资产信息</el-checkbox>
      <el-form-item style="margin-left: 100px;">
        <el-button type="primary" class="button-p-3" @click="submitForm('assetInfoForm')">保存</el-button>
        <el-button type="gray" class="button-p-3" @click="resetForm('assetInfoForm')">返回</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {
    cap
  },
  data() {
    let validateAssetCode = (rule, value, callback) => {
      let pat = new RegExp("^[a-zA-Z0-9_]{3,30}$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('3-30个字符，支持英文、数字、"_"的组合'));
      }
    };
    let validateAssetName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_]{2,30})$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('2-30个字符，支持中英文、数字、"_"的组合'));
      }
    };
    let validateAssetMac = (rule, value, callback) => {
      let pat = new RegExp("^[a-zA-Z0-9-]{2,40}$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('2-40个字符，支持中英文、数字、"-"的组合'));
      }
    };
    let validateAssetLocation = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_]{2,60})$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('2-60个字符，支持中英文、数字、"_"的组合'));
      }
    };
    let validateUserPhone = (rule, value, callback) => {
      let pat = new RegExp("^([1][3,4,5,7,8][0-9]{9})|([0][1-9]{2,3}-[0-9]{5,10})|([1-9]{1}[0-9]{5,8})$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('格式错误，请重新输入'));
      }
    };
    let validateAssetCia = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_]{1,8})$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('1-8个字符，支持中英文、数字、"_"的组合'));
      }
    };
    let validateAssetIp = (rule, value, callback) => {
      let pat = new RegExp("^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))).){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))$");
      if(pat.test(value)){
        if(this.ipRange===null||this.ipRange===''){
          return callback(new Error('请先设置IP段'));
        }
        let ipRangeArray = [];
        let ipArray = value.split('.');
        if(this.ipRange.includes(',')){
          ipRangeArray = this.ipRange.split(',');
        }else {
          ipRangeArray.push(this.ipRange);
        }

        let matchFlag = true;
        for(let i = 0; i < ipRangeArray.length; i++) {
          let flag = false;
          let ipr = ipRangeArray[i];
          let iprAarr = ipr.split('.');
          for (let j = 0; j < iprAarr.length; j++) {
             let ix = iprAarr[j];
             if(ix !== "*" && ix !== ipArray[j]){
                flag = true;
                break;
             }
          }
          if(!flag) {
            matchFlag = false;
            break;
          }
        }
        if(matchFlag){
          callback(new Error('IP地址段错误'));
        }else {
          callback();
        }

      }else {
        callback(new Error('格式错误，请重新输入'));
      }
    };
    return {
      assetInfoForm: {
        assetId: '',
        assetCode: '',
        assetName: '',
        productId: '',
        assetOrg: '',
        assetOrgArray: [],
        assetOwner: '',
        assetUser: '',
        subSystem: '',
        assetKey: '',
        assetAlias: '',
        assetDesc: '',
        assetMac: '',
        assetIp: '',
        assetPort:'',
        assetOutIp: '',
        assetOutPort:'',
        userPhone: '',
        assetCia: '',
        assetLocation: ''
      },
      discoverdForm: {
        discoverId: '',
        discoverdTime: '',
        vendor: '',
        os: '',
        osVendor: '',
        lastboot: '',
        state: '',
        ip:'',
        mac:''
      },
      saved: false,
      devices: [],
      subSystems: [],
      orgs: [],
      users: [],
      tableId: this.$route.params.tableId,
      rules: {
        assetCode: [
          { required: true, message: '请输入资产编号',trigger: 'blur' },
          { validator: validateAssetCode, trigger: 'blur' }
        ],
        assetName: [
          { required: true, message: '请输入资产名称', trigger: 'blur' },
          { validator: validateAssetName, trigger: 'blur' }
        ],
        productId: [{
          type: 'number',
          required: true,
          message: '请选择设备',
          trigger: 'change'
        }],
        assetOrgArray: [{
          type: 'array',
          required: true,
          message: '请选择资产所属机构',
          trigger: 'change'
        }],
        assetOwner: [{
          type: 'number',
          required: true,
          message: '请选择负责人',
          trigger: 'change'
        }],
        assetUser: [{
          type: 'number',
          required: true,
          message: '请选择使用人',
          trigger: 'change'
        }],
        subSystem: [{
          required: true,
          message: '请选择子系统',
          trigger: 'change'
        }],
        assetKey: [{
          required: true,
          message: '请选择是否关键设备',
          trigger: 'change'
        }],
        assetAlias: [{
          required: false,
          message: '请输入事件名称',
          trigger: 'blur'
        }],
        assetDesc: [{
          required: false,
          min: 0,
          max: 200,
          message: '请输入资产描述',
          trigger: 'blur'
        }],
        assetMac: [
          { required: true, message: '请输入资产MAC', trigger: 'blur'},
          { validator: validateAssetMac, trigger: 'blur' }
        ],
        assetIp: [
          { required: true, message: '请输入资产IP', trigger: 'blur'},
          { validator: validateAssetIp, trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入使用人电话', trigger: 'blur' },
          { validator: validateUserPhone, trigger: 'blur' }
        ],
        assetCia: [
          { required: true, message: '请输入资产CIA', trigger: 'blur' },
          { validator: validateAssetCia, trigger: 'blur' }
        ],
        assetLocation: [
          { required: true, message: '请输入资产位置', trigger: 'blur' },
          { validator: validateAssetLocation, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ipRange: function() {
      let orgId = this.assetInfoForm.assetOrg;
      let ip;
      if(orgId){
        this.orgs.forEach((o) => {
          if(o.orgId === orgId){
            ip = o.ipRange;
            return false;
          }
        });
        return ip;
      };
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if(!this.saved) {
            this.$message('请勾选保存行为');
            return;
          }
          this.assetInfoForm.assetOrg = this.assetInfoForm.assetOrgArray[this.assetInfoForm.assetOrgArray.length-1];
          let data = await this.common.reqBackState('/ssa/assetDiscover/saveDiscoverdAsset.do', this.assetInfoForm, this);
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
      sessionStorage.removeItem('discoverdForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    async initDataList() {
      let [devs, ssList, ipRangeList, userList, orgList] = await Promise.all([
        this.common.req('/ssa/assetMgmt/getAllProductInfos.do', {}, this),
        this.common.req('/ssa/assetMgmt/getSubSystemList.do', {}, this),
        this.common.req('/ssa/assetMgmt/getOrgIpRangeList.do', {}, this),
        this.common.req('/ssa/assetMgmt/getUserList.do', {}, this),
        this.common.req('/ssa/assetMgmt/getOrgList.do', {}, this)
      ]);
      this.devices = devs;
      this.subSystems = ssList;
      this.ipRanges = ipRangeList;
      this.users = userList;
      this.orgs = orgList;
    }
  },
  created: function() {
    if (this.$route.params.discoverId) {
      this.discoverdForm = this.$route.params;
      let discoverdForm = JSON.stringify(this.$route.params);
      console.log(discoverdForm);
      sessionStorage.discoverdForm = discoverdForm;
    }else if (sessionStorage.discoverdForm) {
      this.discoverdForm = JSON.parse(sessionStorage.discoverdForm);
      console.log(this.discoverdForm);
    }
    this.assetInfoForm.assetIp = this.discoverdForm.ip;
    this.assetInfoForm.assetMac = this.discoverdForm.mac;
    this.initDataList();
  },
  destroyed: function() {
    sessionStorage.removeItem('assetInfoForm');
  }
}
</script>

<style>

</style>
