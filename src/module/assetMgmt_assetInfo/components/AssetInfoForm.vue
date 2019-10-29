<template>
<div class="">
      <div class="whitebackground Whitespace">
        <div class="top-title" v-if="!this.$route.params.assetCode">新增资产信息</div>
        <div class="top-title" v-if="this.$route.params.assetCode">编辑资产信息</div>

        <el-form :model="assetInfoForm" :rules="rules" ref="assetInfoForm" label-width="100px" class="form-contral">
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
          <el-form-item label="所属机构" prop="assetOrg" required>
            <!-- <el-select v-model="assetInfoForm.assetOrg" placeholder="所属机构" style="width:300px;">
              <el-option :label="org.orgName" :value="org.orgId" v-for="org in orgs"></el-option>
            </el-select> -->
            <cap :options="orgs" style="width:300px" clearable change-on-select placeholder="选择菜单" :props="props" v-model="assetInfoForm.assetOrg" root-id="-1"> </cap>

          </el-form-item>
          <!-- <el-form-item label="资产内网IP" prop="assetIp" >
            <el-tooltip class="item" effect="light" :content="'内网IP地址段：'+ipRange" placement="right">
              <el-input v-model="assetInfoForm.assetIp" style="width:300px;"></el-input>
            </el-tooltip>
          </el-form-item> -->
          <el-form-item label="资产内网IP" prop="assetIp" required>
            <el-input v-model="assetInfoForm.assetIp" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="内网端口" prop="assetPort" >
              <el-input v-model="assetInfoForm.assetPort" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="外网IP" prop="assetOutIp" >
              <el-input v-model="assetInfoForm.assetOutIp" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="外网端口" prop="assetOutPort" >
              <el-input v-model="assetInfoForm.assetOutPort" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="域名" prop="url" >
              <el-input v-model="assetInfoForm.url" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="资产MAC" prop="assetMac">
            <el-input v-model="assetInfoForm.assetMac" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="资产负责人" prop="assetOwner" required>
            <el-select v-model="assetInfoForm.assetOwner" placeholder="资产负责人" style="width:300px;">
              <el-option :label="u.userName" :value="u.userId" v-for="u in users"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用人" prop="assetUser" required>
            <el-select v-model="assetInfoForm.assetUser" placeholder="使用人" style="width:300px;">
              <el-option :label="u.userName" :value="u.userId" v-for="u in users"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用人电话" prop="userPhone" required >
            <el-input v-model="assetInfoForm.userPhone" placeholder="请输联系方式" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="所属子系统" prop="subSystem" required>
            <el-select v-model="assetInfoForm.subSystem" placeholder="所属子系统" style="width:300px;">
              <el-option :label="ss.systemName" :value="ss.systemId" v-for="ss in subSystems"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物理位置" prop="assetLocation" required>
            <el-input v-model="assetInfoForm.assetLocation" placeholder="请输入物理位置" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="CIA" prop="assetCia" required>
            <el-input v-model="assetInfoForm.assetCia" placeholder="请输入CIA" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="资产描述" prop="assetDesc">
            <el-input type="textarea" v-model="assetInfoForm.assetDesc" style="width:380px;" :autosize="{ minRows:6, maxRows:12}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-p-3" @click="submitForm('assetInfoForm')">提交</el-button>
            <el-button type="gray" class="button-p-3" @click="resetForm('assetInfoForm')">取消</el-button>
            <!-- <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button> -->
          </el-form-item>
        </el-form>
      </div>

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
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9_-]{2,30})$");
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

    let validateAssetPort = (rule, value, callback) => {
      if(value===null||value===''){
       callback();
      }

      var re =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
          if (re.test(value)){
           callback();
         }else{
           callback(new Error('格式错误，请重新输入'));
         }
    };

    let validateAssetOutIp = (rule, value, callback) => {
      if(value===null||value===''){
       callback();
      }
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
          if (re.test(value)){
           callback();
         }else{
           callback(new Error('格式错误，请重新输入'));
         }
    };

    let validateAssetOutPort = (rule, value, callback) => {
      if(value===null||value===''){
       callback();
      }
      var re =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
          if (re.test(value)){
           callback();
         }else{
           callback(new Error('格式错误，请重新输入'));
         }
    };

    let validateAssetIp = (rule, value, callback) => {
      // if(value===null||value===''){
      //  callback();
      // }
      let pat = new RegExp("^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))$");
      if(pat.test(value)){
        callback();
        // if(this.ipRange===null||this.ipRange===''||typeof(this.ipRange)=="undefined"){
        //   return callback(new Error('请先设置所属机构IP段'));
        // }
        //
        //   $.ajax({
        //     type:"POST",
        //     url:"/ssa/netAttack/getIpRangeExit.do",
        //     dataType:"json",
        //     data:{"ip":value,"ipRangeStr":this.ipRange},
        //     beforeSend:function(){
        //       //some js code
        //     },
        //     success:function(msg){
        //       // console.log(msg.data);
        //       if(msg.data==0){
        //           callback(new Error('IP地址段不符，请重新输入！'));
        //       }else{
        //           callback();
        //       }
        //
        //     },
        //     error:function(){
        //       console.log("error")
        //       callback();
        //     }
        //   })



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
        assetOrg: [],
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
        url:'',
        userPhone: '',
        assetCia: '',
        assetLocation: ''
      },
      devices: [],
      subSystems: [],
      orgs: [],
      ipRanges:[],
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
        assetOrg: [{
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
          { required: false, message: '请输入资产内部IP', trigger: 'blur'},
          { validator: validateAssetIp, trigger: 'blur' }
        ],
        assetPort: [
          { required: false, message: '请输入资产内部端口', trigger: 'blur'},
          { validator: validateAssetPort, trigger: 'blur' }
        ],
        assetOutIp: [
          { required: false, message: '请输入资产外部IP', trigger: 'blur'},
          { validator: validateAssetOutIp, trigger: 'blur' }
        ],
        assetOutPort: [
          { required: false, message: '请输入资产外部端口', trigger: 'blur'},
          { validator: validateAssetOutPort, trigger: 'blur' }
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
      let orgId = this.assetInfoForm.assetOrg[this.assetInfoForm.assetOrg.length-1];
      let ip = '';
      if(orgId){
        this.ipRanges.forEach((o) => {
          if(o.orgId === orgId){
            ip = ip + o.ipRange+",";
          }
        });
        return ip.substring(0, ip.length-1);
      };
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.assetInfoForm.assetOrg = this.assetInfoForm.assetOrg[this.assetInfoForm.assetOrg.length-1]
          let data = await this.common.reqBackState('/ssa/assetMgmt/addOrModifyAssetInfo.do', this.assetInfoForm, this);
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
      sessionStorage.removeItem('assetInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    async initDataList() {
      let [devs, ssList, ipRangeList, userList] = await Promise.all([
        this.common.req('/ssa/assetMgmt/getAllProductInfos.do', {}, this),
        this.common.req('/ssa/assetMgmt/getSubSystemList.do', {}, this),
        this.common.req('/ssa/assetMgmt/getOrgIpRangeList.do', {}, this),
        this.common.req('/ssa/assetMgmt/getUserList.do', {}, this)
      ]);
      this.devices = devs;
      this.subSystems = ssList;
      this.ipRanges = ipRangeList;
      this.users = userList;

      // let devs = await this.common.req('/ssa/assetMgmt/getAllProductInfos.do', {}, this);
      // this.devices = devs;
      // let ssList = await this.common.req('/ssa/assetMgmt/getSubSystemList.do', {}, this);
      // this.subSystems = ssList;
      // // let orgList = await this.common.req('/ssa/assetMgmt/getOrganizationList.do', {}, this);
      // let orgList = await this.common.req('/ssa/assetMgmt/getOrgList.do', {}, this);
      // this.orgs = orgList;
      // let ipRangeList = await this.common.req('/ssa/assetMgmt/getOrgIpRangeList.do', {}, this);
      // this.ipRanges = ipRangeList;
      // let userList = await this.common.req('/ssa/assetMgmt/getUserList.do', {}, this);
      // this.users = userList;
    }
  },
  created: async function() {
    this.initDataList();
    let orgList = await this.common.req('/ssa/assetMgmt/getOrgList.do', {}, this);
    this.orgs = orgList;
    if (this.$route.params.handle=='update') {
      this.assetInfoForm = this.$route.params;
      let assetInfo = JSON.stringify(this.$route.params);
      sessionStorage.assetInfoForm = assetInfo;
    }else if (sessionStorage.assetInfoForm) {
      this.assetInfoForm = JSON.parse(sessionStorage.assetInfoForm);
      this.$route.params.assetId = this.assetInfoForm.assetId;
    }

  },
  destroyed: function() {
    sessionStorage.removeItem('assetInfoForm');
  }
}
</script>

<style>

</style>
