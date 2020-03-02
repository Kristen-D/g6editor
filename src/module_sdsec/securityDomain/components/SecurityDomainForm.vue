<!--新增安全域-->
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
                <el-form :model="securityDomainBase" ref="securityDomainBase" label-width="140px">
                  <el-form-item label="安全域名称：" prop="name" required>
                    <el-input v-model="securityDomainBase.name" clearable placeholder="请输入" class="setwidth-per25"></el-input>
                  </el-form-item>

                  <el-form-item label="IP：" required>
                    <el-row>
                        <el-input v-model="securityDomainBase.ipRange" clearable placeholder="192.168.1.1" class="setwidth-per25"></el-input>
<!--                      <el-input-->
<!--                        type="textarea"-->
<!--                        style="width:380px;"-->
<!--                        placeholder="地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6"-->
<!--                        :autosize="{ minRows:1, maxRows:5}"-->
<!--                      ></el-input>-->
                    </el-row>
<!--                    <el-row v-for="(item, index) in securityDomainBase.ipSet">-->
<!--                      <el-input clearable placeholder="192.168.1.1" class="setwidth-per25"></el-input>-->
<!--                      <el-button type="text" size="small" style="color:red" @click="deleteIpRangeSet(index)">删除</el-button>-->
<!--                    </el-row>-->

                    <el-row>
                      <el-button type="text" size="small" @click="addIpRangeSet"><i><img
                        src="/static/sdsec/image/addIcon.png"
                        class="image"></i>添加更多IP/IP段</el-button>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="备注：" prop="description">
                    <el-input   type="textarea" v-model="securityDomainBase.description" clearable placeholder="请输入" class="setwidth-per25"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" size="medium" @click="saveDomain">提交</el-button>
                    <el-button type="gray" size="medium" @click="goBack">取消</el-button>
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

    export default {

      data(){
          // let validateIpRange = (rule, value, callback) => {
          //     if (value === '' || value === null) {
          //         callback('请输入ip段');
          //     }
          //     if (value.includes(',')) {
          //         let ipRanges = value.split(',');
          //         let flag = false
          //         for (let i = 0; i < ipRanges.length; i++) {
          //             if (!checkIpRange(ipRanges[i])) {
          //                 flag = true
          //                 break
          //             }
          //         }
          //         if (flag) {
          //             callback(new Error('格式错误，地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6'));
          //         } else {
          //             callback();
          //         }
          //     } else {
          //         if (checkIpRange(value)) {
          //             callback();
          //         } else {
          //             callback(new Error('格式错误，地址范围请用-表示，掩码范围用/表示，网段之间用,表示;示例：192.168.1.2/5,192.168.2.3-192.168.4.5,192.168.5.6'));
          //         }
          //     }
          //
          //     function checkIpRange(ipRange) {
          //         let pat = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
          //         if (ipRange.includes('/')) {
          //             let ips = ipRange.split('/');
          //             if (pat.test(ips[0])) {
          //                 if (parseInt(ips[1]) <= 32) {
          //                     return true
          //                 } else {
          //                     return false
          //                 }
          //             } else {
          //                 return false
          //             }
          //         }else if(ipRange.includes('-')){
          //             let ips = ipRange.split('-');
          //             if (!pat.test(ips[0]) || !pat.test(ips[1])) {
          //                 return false
          //             }else if(parseInt(ips[0].replace(".","").replace(".","").replace(".","")) >= parseInt(ips[1].replace(".","").replace(".","").replace(".",""))){
          //                 return false;
          //             }else{
          //                 return true
          //             }
          //         }else {
          //             return pat.test(ipRange);
          //         }
          //     }
          // };
          return{
            title: '创建',
            rules:{
              // name: [{required: true, message: '请输入安全域名称', trigger: 'blur'}],
              // ipRange: [
              //     { required: true, message: '请输入租户网段地址', trigger: 'blur' },
              //     { validator: validateIpRange, trigger: 'blur' }
              //   ],
            //   poolType: [{required: true, message: '请选择安全域类型'}],
            //   // poolSupplier:[{required: true, message: '请选择厂商'}],
            },
            // activeNames: ['1'],
            securityDomainBase:{
                name: '',
                description:'',
                ipRange:[],

            },

            // fileList : [],
            handle: ''
          }
      },

      methods:{
          //添加IP段
          addIpRangeSet(){
              this.securityDomainBase.ipRange.push({

              });
          },
          //删除IP

          deleteIpRangeSet(index){
              this.$confirm('此操作将删除本条，是否继续？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.securityDomainBase.ipRange.splice(index, 1);
              })
              console.log('delete', this.securityDomainBase.ipRange)
          },
        saveDomain: async function(){
          if(!this.checkForm("securityDomainBase")) return;

            let ipList = [];
            ipList.push(this.securityDomainBase.ipRange);
            // for (let j = 0, len = this.securityDomainBase.ipRange.length; j < len; j++) {
            //     let ipData = this.securityDomainBase.ipRange[j];
            //     ipList.push(ipData);
            //     console.log(ipList)
            // }
            this.securityDomainBase.ipRange = ipList;

            let params = {
                "name": this.securityDomainBase.name,
                "description": this.securityDomainBase.description,
                "cidr":["10.21.34.51"],
                "ipSet": this.securityDomainBase.ipRange,
            };

          var result = await this.utils.reqObjBackState('/sdsec/web/serchain/securitydomain/saveSecurityDomain', params);
          if(result){
            this.$message({message: "Success", type:'success'});
            this.goBack();
          }else{
            this.$message({message: "Fail", type:'error'});
          }
        },
        goBack: function(){
          this.$router.go(-1);
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

      },

      computed: {
      },

      created: async function(){

        var handle = this.$route.params.handle;
        // console.log('handle1:', handle)
        this.handle = handle;
          // console.log('handle2:',this.handle)
        if (handle == 'update'){
          this.title = '修改';
          var id = this.$route.params.id;
          // console.log('id: ',id)
          var securityDomainBase = await this.utils.reqObjBackState('/sdsec/web/serchain/securitydomain/updateSecurityDomain',{'id':id});
          this.securityDomainBase = securityDomainBase.data;
            console.log('this.securityDomainBase:', this.securityDomainBase)


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
