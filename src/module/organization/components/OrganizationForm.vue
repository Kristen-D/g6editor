<template>
<div class="whitebackground Whitespace">
  <div class="top-title">编辑组织机构</div>
  <el-row>
    <el-col :offset="1" :span="8">
      <el-form :model="organizationForm" :rules="organizationRules" ref="organizationForm" label-width="120px">
        <el-form-item label="组织机构名称" prop="name">
          <el-input v-model="organizationForm.name"></el-input>
        </el-form-item>

        <el-form-item label="外网地址" prop="out_ip">
          <el-input v-model="organizationForm.out_ip"></el-input>
        </el-form-item>

        <el-form-item label="内网网段" prop="inner_ip_range">
          <el-input v-model="organizationForm.inner_ip_range"></el-input>多个网段之间用","隔开
        </el-form-item>




        <!-- <el-form-item label="组织机构类型" prop="pid" >
          <el-select v-model="organizationForm.pid" filterable clearable placeholder="选择组织机构类型" @change="changeCharger()">
            <el-option v-for="item in orgList"  :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="所属机构" prop="pidArr" required>
          <el-cascader :options="orgDatas" style="width:300px" clearable change-on-select placeholder="选择机构" :props="cascaderConfig" v-model="organizationForm.pidArr"  @change="changeCharger()"> </el-cascader>
        </el-form-item>

        <el-form-item label="组织机构负责人" prop="charger">
          <el-select v-model="organizationForm.charger"  filterable placeholder="事发单位负责人" clearable>
            <el-option v-for="item in chargers" :label="item.realname" :value="item.user_id">
            </el-option>
          </el-select>

        </el-form-item>

        <!-- <el-form-item label="所属机构"  prop="pid">
          <el-cascader :options="orgDatas" :props="cascaderConfig" v-model="organizationForm.pid" placeholder="请选择机构"  change-on-select @change="changeCharger()">
          </el-cascader>
        </el-form-item> -->
        <el-form-item label="地区" prop="areaIdArr">
          <cap  :loadData="loadData" clearable change-on-select placeholder="选择菜单"   v-model="organizationForm.areaIdArr" root-id="0"> </cap>
        </el-form-item>



        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="organizationForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button type="gray" @click="goBack()">返回</el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {
    cap
  },
  data() {

    var validateOutIp = (rule, value, callback) => {
      if (value == null || value == "") {
        return callback();
      }else{
        let pat = new RegExp("^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))).){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)|)))$");
        let matchFlag = true;
        if(pat.test(value)){
          callback();
        }else{
           callback(new Error('IP地址段错误'));
        }

      }

    };

    var validateIp = (rule, value, callback) => {

      if (value == null || value == "") {
        return callback();
      }else{
        let pat = new RegExp("^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)|\\*)).){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)|\\*)))$");
        let matchFlag = true;
        var arr = value.split(",");
        for (var item in arr) {
          if(!pat.test(arr[item])){
             matchFlag = false;
          }
        }
        if (!matchFlag) {
           callback(new Error('IP地址段错误'));
         } else {
           callback();
         }
      }
    };


    return {
      cascaderConfig: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      loadData:{url:"/ssa/organization/getAreaByPid.do",maxLevel:3,backFillUrl:"/ssa/organization/getAllPaerntById.do"},
      organizationForm: {
        areaIdArr:null,
        name: "",
        description: "",
        area_id: null,
        out_ip: "",
        inner_ip_range: "",
        pidArr: [],
        pid:null,
        newpid: null,
        organization_id: null,
        charger:null
      },
      chargers:[],
      orgDatas:[],

      organizationRules: {
        name: [{
          required: true,
          message: '请输入组织机构名称',
          trigger: 'blur'
        }, ],
        areaIdArr: [{
          required: true,
          message: '请选择地区'
        }],
        pid: [{
          required: true,
          message: '请选择组织机构类型'
        }],
        pidArr: [{
          type:"array",
          required: true,
          message: '请选择组织机构'
        }],
        inner_ip_range: [{
          validator: validateIp,
          trigger: 'blur'
        }],
        out_ip:[{
          validator: validateOutIp,
          trigger: 'blur'
        }]
      },
    }
  },
  computed: {
    ...mapState({
      areaList: state => state.context.areaList,
      orgList: state => state.context.orgList
    })
  },
  methods: {

    goBack() {
      this.$router.go(-1);
    },
    async save() {
      if (!this.checkForm("organizationForm")) return;
      this.organizationForm.area_id = this.organizationForm.areaIdArr[this.organizationForm.areaIdArr.length-1];
      this.organizationForm.pid = this.organizationForm.pidArr[this.organizationForm.pidArr.length-1]
      var msg = await this.utils.req("/ssa/organization/saveOrganization.do", this.organizationForm, this);
      this.$message({
        message: msg,
        type: 'success'
      });
      this.goBack();
    },
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    async changeCharger(){
      if (this.organizationForm.pidArr.length >0){
        var param = {};
        param.pid = this.organizationForm.pidArr[this.organizationForm.pidArr.length-1];
        var users = await this.utils.req("/ssa/organization/getUsersByOrgPid.do",param , this);
        this.chargers = users;
      }
     //  map.id = this.organizationForm.pid;
     //  var orgdata =  await this.utils.req("/ssa/organization/getChildRenOrg.do",map , this);
     //  //alert(orgdata);
     //  alert(JSON.stringify(orgdata));
     // this.orgDatas = orgdata;
    }
  },
  created: async function() {
    var users = await this.utils.req("/ssa/organization/getAllUsers.do", null, this);
    this.chargers = users;

    var orgData =  await this.utils.req('/ssa/organization/getChildRenOrg.do', {}, this)
    this.orgDatas = orgData;

    //alert(JSON.stringify(this.orgDatas));
    if(this.$route.params.handle == "update"){
        this.organizationForm =   this.$route.params.organizationForm;
    }


  }
}
</script>
