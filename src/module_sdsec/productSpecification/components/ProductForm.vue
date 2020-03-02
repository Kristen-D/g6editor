<!--新增产品规格-->
<template>
  <div>
    <section>
      <div class="container-fluid">
        <div class="el-panel">
          <div class="el-panel-heading">
            <div class="el-panel-title">{{title}}</div>
          </div>
          <div class="el-panel-body">
            <div style="margin:20px;">
              <div class="el-subpanel-heading  no-bottom">
                <h4 class="el-subpanel-title">基本信息</h4>
              </div>
            </div>
            <el-form :model="productBase" ref="productBase" label-width="140px">
              <el-form-item label="产品名称：" prop="name" :rules="{ required: true, message: '请输入产品名称', trigger: 'blur' }">
                <el-input v-model="productBase.name" clearable placeholder="产品名称" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item label="产品规格：">
                <el-checkbox-group  v-model="productBase.propertiesList" size="medium" @change="propertiesListChange">
                  <el-checkbox v-for="(item, index) in serviceVersion" :label="item.label" :value="item.propertyDefaultValue" border>
                  </el-checkbox>
<!--                  <el-checkbox  :true-label="1" :false-label="0" label="标准版" border></el-checkbox>-->
<!--                  <el-checkbox  :true-label="1" :false-label="0" label="企业版" border></el-checkbox>-->
<!--                  <el-checkbox  :true-label="1" :false-label="0" label="旗舰版" border></el-checkbox>-->
                </el-checkbox-group>
                  </el-form-item>
              <el-form-item label="月单价：" prop="billingRules">
                <el-input v-model="productBase.billingRules" clearable placeholder="月单价" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item label="月折扣：" prop="discount">
                <el-input v-model="productBase.discount" clearable placeholder="月折扣" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item label="总配额：" prop="quota">
                <el-input v-model="productBase.quota" clearable placeholder="定制资源池最多可以售卖该服务的数量" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item label="描述：" prop="description">
                <el-input v-model="productBase.description" clearable placeholder="用一句话描述该产品特性" style="width: 16%"></el-input>
                <span style="padding-left: 1%"v-model="serviceIcon">产品图标：
                  <el-upload
                    style="display:inline-block"
                    action="http://localhost:8080/module_sdsec/productSpecification"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :data = "productBase">
                    <el-button type="text">点击上传</el-button>
                  </el-upload>
                </span>
              </el-form-item>
              <el-form-item label="订单处理方式：" prop="orderHandleStyle">
                <el-select v-model="productBase.orderHandleStyle" disabled placeholder="管理员审批" class="setwidth-per25">
                  <el-option label="系统自动审批" value="Auto-Approval"></el-option>
                  <el-option label="管理员审批" value="Manual-Approval"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="售卖状态：" prop="status" >
                <el-select v-model="productBase.status" class="setwidth-per25 ">
                  <el-option label="上架（租户可购买）" value="on"></el-option>
                  <el-option label="下架（租户不可见）" value="off"></el-option>
                  <el-option label="草稿（规格信息待定）" value="draft"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="安全组件类型：" prop="subjectType" >
                <el-select class="setwidth-per25" v-model="productBase.subjectType" @change=handleSelectChange>
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务版本：" prop="subject">
                <el-select class="setwidth-per25" v-model="productBase.subject" >
                  <el-option
                    v-for="item in componentData"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="saveProduct">提交</el-button>
                <el-button type="gray" size="medium" @click="goBack">取消</el-button>
              </el-form-item>


<!--                  <el-form-item label="安全组件" prop="serviceType">-->
<!--                    <el-select clearable placeholder="安全组件" v-model="image.name">-->
<!--                      <el-option v-for="item in image" :key="item.name" :label="item.name" :value="item.id"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->


                </el-form>
              </div>


          <el-collapse v-if="'1' == '0'" class="custom-collapse" v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="el-collapse-heading">
                  <h4 class="el-panel-title2">定制信息</h4><label>(<span>*</span>必填)</label>
                </div>
              </template>
              <el-button type="primary" icon="el-icon-plus" @click="addDays" size="small">新增输入项</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="addDays2" size="small">新增复选组</el-button>

              <div class="el-panel-body">
                <h4 class="el-panel-title3">单选服务项</h4>
                <el-row v-for="(item, index) in productBase.propertiesList">
                  <el-form :model="productBase.propertiesList" ref="productBase.propertiesList"
                           class="flexStart custom-form" :rules="rules1">
                    <!--                  <el-form :model="productBase.propertiesList" ref="productBase.propertiesList" class="flexStart custom-form.el-form .el-form-item" :rules="rules1">-->

                    <el-form-item label="输入项名称" prop="label">
                      <el-input v-model="productBase.propertiesList[index].label" clearable placeholder="输入项名称"
                                class="custom-width"></el-input>
                    </el-form-item>
                    <el-form-item label="输入项释义" prop="description">
                      <el-input v-model="productBase.propertiesList[index].description" clearable placeholder="输入项释义"
                                class="custom-width"></el-input>
                    </el-form-item>
                    <el-form-item label="输入项keyword" prop="propertyKey">
                      <div>
                        <el-radio-group v-model="productBase.propertiesList[index].propertyKey" size="medium">
                          <el-radio label="ProtectIP"></el-radio>
                          <el-radio label="UDP"></el-radio>
                          <el-radio label="ICMP"></el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="是否开放给用户" prop="required">
                      <div>
                        <el-radio-group v-model="productBase.propertiesList[index].required" size="medium">
                          <el-radio label="yes">是</el-radio>
                          <el-radio label="no">否</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <el-button icon="el-icon-delete" @click="delDays(index)" type="info" size="mini">
                      删除
                    </el-button>
                    <el-button icon="el-icon-plus" @click="addDays()" type="primary" size="mini">新增
                    </el-button>
                  </el-form>
                </el-row>
              </div>


              <div class="el-panel-body">
                <h4 class="el-panel-title3">可选服务组</h4>
                <el-row v-for="(item, index) in form">
                  <el-col>
                    <el-form :model="form" ref="form" label-position="right" class="flexStart custom-form"
                             :rules="rules2">

                      <el-form-item label="复选组名" prop="multipleGroupName">
                        <el-input v-model="form[index].multipleGroupName" clearable placeholder="复选组名"
                                  class="custom-width"></el-input>
                      </el-form-item>
                      <el-button icon="el-icon-delete" @click="delDays2(index)" type="info" size="mini">删除</el-button>

                    </el-form>
                  </el-col>

                  <el-col v-for="(item, index1) in form[index].formList">
                    <el-form :model="form[index].formList" ref="form[index].formList" label-position="right"
                             class="flexStart custom-form" :rules="rules3">
                      <el-form-item :label="'复选项名称'" prop="label">
                        <el-input v-model="form[index].formList[index1].label" clearable placeholder="复选项名称"
                                  class="custom-width"></el-input>
                      </el-form-item>
                      <el-form-item :label="'复选项释义'" prop="description">
                        <el-input v-model="form[index].formList[index1].description" clearable placeholder="复选项释义"
                                  class="custom-width"></el-input>
                      </el-form-item>
                      <el-button icon="el-icon-delete" @click="delDays1(index,index1)" type="info" size="mini">删除
                      </el-button>
                      <el-button icon="el-icon-plus" @click="addDays1(index)" type="primary" size="mini">新增
                      </el-button>
                    </el-form>
                  </el-col>
                </el-row>
              </div>


            </el-collapse-item>
          </el-collapse>
<!--          <div class="fix-bottom-button">-->
<!--            <el-button type="primary" size="medium" @click="saveProduct">保存</el-button>-->
<!--            <el-button type="gray" size="medium" @click="goBack">返回</el-button>-->
<!--          </div>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                title: '创建',
                rules: {
                    name: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
                    serviceType: [{required: true, message: '请选择服务类型', trigger: 'blur'}],
                },
                // rules1:{
                //     label: [{required: true, message: '请填入服务', trigger: 'blur'}],
                // },
                // rules2:{
                //     multipleGroupName:[{required: true, message:'请填入所选组', trigger: 'blur'}],
                // },
                // rules3:{
                //     description: [{required: true, message: '请填入服务', trigger: 'blur'}],
                // },
                serviceVersion: [
                    {
                        "label": "标准版",
                        "propertyDefaultValue": "1",
                        "multipleGroupName": "产品规格"
                    },
                    {
                        "label": "企业版",
                        "propertyDefaultValue": "1",
                        "multipleGroupName": "产品规格"
                    },
                    {
                        "label": "旗舰版",
                        "propertyDefaultValue": "1",
                        "multipleGroupName": "产品规格"
                    }
                ],
                options: [{
                    value: 'WAF',
                    label: 'web应用防火墙'
                }, {
                    value: 'IPS',
                    label: '入侵防御系统'
                }, {
                    value: 'SCAN',
                    label: '漏洞扫描系统'
                }, {
                    value: 'ANTIVIRUS',
                    label: '防病毒系统'
                }, {
                    value: 'FIREWALL',
                    label: '防火墙'
                }],
                componentData:[],
                selectedVersion:[],
                productBase: {
                    name: '',
                    billingRules:'',
                    discount:'',
                    quota:'',
                    description: '',
                    // serviceIcon:'',
                    orderHandleStyle:'Manual-Approval',
                    status:'',
                    subjectType:'',
                    subject:'',
                    propertiesList:[],
                    // tenantId: '',
                    // createrId: '',
                    // serviceCategory: '',
                },
                choosedImage: '',
                imageList: [],
                image: [],
                form: [],
                fileList: [],
                handle: '',
                activeNames: ['1'],
            }
        },

        methods: {
            //根据组件类型显示服务版本选项
            handleSelectChange:async function(val){
                console.log(val)
                let componentData = await this.utils.reqObjBackState("/sdsec/web/securitypool/securitycomponent/querySecurityComponent", {"filters":{"types":[val]}});
                this.componentData =componentData.data;
                console.log(this.componentData)
            },
            //版本多选
            propertiesListChange(val){
                this.selectedVersion = val;
                console.log('this.selectedVersion',  this.selectedVersion)
            },
            //提交
            saveProduct: async function () {
                if (!this.checkForm("productBase")) return;
                let params= {};
                // 将选中的版本数据添加至propertiesList
                let productVersionList = [];
                for (let i in this.selectedVersion) {
                    let group = {
                        "label": this.selectedVersion[i],
                        "propertyDefaultValue": "1",
                        "multipleGroupName": "产品规格"
                    };
                    console.log('group', group)
                    productVersionList.push(group);
                }
                    this.productBase.propertiesList = productVersionList;
                    params = this.productBase;
                    console.log('this.productBase传回后端', this.productBase)
                    let result = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/saveOrUpdateProductSpecificationAndProperty', params);
                    if (result) {
                        this.$message({message: "Success", type: 'success'});
                        this.$router.go(-1);
                    } else {
                        this.$message({message: "Fail", type: 'error'});
                    }
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
            goBack: function () {
                this.$router.go(-1);
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            // saveProduct: async function () {
            //     if (!this.checkForm("productBase")) return;
            //     // if (!this.checkForm("form")) return;
            //     // if (!this.checkForm("productBase")) return;
            //
            //     var params = {};
            //     // 将form中的数据添加至propertiesList
            //     for (let j = 0, len = this.form.length; j < len; j++) {
            //         var datalist1 = [];
            //         for (let i = 0, len = this.form[j].formList.length; i < len; i++) {
            //             var datalist = [];
            //             datalist = this.form[j].formList[i];
            //             datalist1 = this.form[j].multipleGroupName;
            //             var group = {
            //                 'multipleGroupName': datalist1,
            //                 'label': datalist.label,
            //                 'description': datalist.description
            //             };
            //             this.productBase.propertiesList.push(group);
            //         }
            //     }
            //     var form = [
            //         {
            //             "label": "1C",
            //             "multipleGroupName": "虚拟核心",
            //             "description": "1核",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "2C",
            //             "multipleGroupName": "虚拟核心",
            //             "description": "2核",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "4C",
            //             "multipleGroupName": "虚拟核心",
            //             "description": "4核",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "8C",
            //             "multipleGroupName": "虚拟核心",
            //             "description": "8核",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "16C",
            //             "multipleGroupName": "虚拟核心",
            //             "description": "16核",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "2G",
            //             "multipleGroupName": "内存容量",
            //             "description": "2G内存",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "4G",
            //             "multipleGroupName": "内存容量",
            //             "description": "4G内存",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "8G",
            //             "multipleGroupName": "内存容量",
            //             "description": "8G内存",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "16G",
            //             "multipleGroupName": "内存容量",
            //             "description": "16G内存",
            //             "multiple": 1
            //         },
            //         {
            //             "label": "32G",
            //             "multipleGroupName": "内存容量",
            //             "description": "32G内存",
            //             "multiple": 1
            //         }
            //     ];
            //     this.productBase.propertiesList = form;
            //     this.productBase.serviceCategory = this.image.name;
            //     params = this.productBase;
            //     var result = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/saveOrUpdateProductSpecificationAndProperty', params);
            //     if (result) {
            //         this.$message({message: "Success", type: 'success'});
            //         this.goBack();
            //     } else {
            //         this.$message({message: "Fail", type: 'error'});
            //     }
            // },
            addDays() {
                this.productBase.propertiesList.push({
                    label: '',
                    description: '',
                    propertyKey: ''
                });
            },
            delDays(index) {
                this.productBase.propertiesList.splice(index, 1);
            },
            addDays1(index) {
                this.form[index].formList.push({
                    label: '',
                    description: '',
                    propertyKey: ''
                });
            },
            delDays1(formIndex, index) {
                this.form[formIndex].formList.splice(index, 1);
            },
            addDays2() {
                var obj = {
                    multipleGroupName: '',
                    formList: [{
                        label: '',
                        description: ''
                    }],
                };
                this.form.push(obj);
            },
            delDays2(index) {
                this.form.splice(index, 1);
            },
            checkForm1(formName) {
                var flag = false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            },

        },

        computed: {},

        created: async function () {
            // var image = await this.utils.reqObjBackState('/sdsec/web/respool/image/pageQuery', {});
            // this.image = image.data;
            // console.log('111', this.image);
            // this.image = this.image.filter(obj => "" !== obj.componentType && obj.componentType != null && typeof (obj.componentType) !== undefined);
            // console.log('handle1:', this.image)
            var handle = this.$route.params.handle;
            console.log('handle1:', handle)
            this.handle = handle;
            console.log('handle2:',this.handle)
            if (handle == 'update') {
                this.title = '修改';
                var id = this.$route.params.id;
                console.log('id: ',id)
                var productBase = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {'id': id});
                this.productBase = productBase.data;
                console.log('res1:', this.productBase)

            }
        },
        watch: {
            form: function (oldVal, curval) {
                console.log("watch:" + JSON.stringify(curval));
            },

            product: function (choosedImage) {
                console.log("product" + choosedImage)
            }
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
