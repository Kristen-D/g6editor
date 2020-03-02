<template>
<div>
  <section>
    <div class="container-fluid">
      <div class="el-panel">
        <div class="top-title">{{title}}</div>
        <el-collapse class="custom-collapse" v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="el-collapse-heading">
                <h4 class="el-panel-title2">基本属性</h4><label>(<span>*</span>必填)</label>
              </div>
            </template>
            <div class="el-panel-body">
              <el-form :model="instanceBase" :rules="rules" ref="instanceBase" label-position="right" class="flexStart custom-form">
                <el-form-item label="选择云" prop="cloudId">
                  <el-select v-model="instanceBase.cloudId" clearable placeholder="选择云" @change="getCloudData">
                    <el-option
                      v-for="item in CloudData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择镜像" prop="imageId">
                  <el-select v-model="instanceBase.imageId" clearable placeholder="选择镜像" @change="getImageData">
                    <el-option
                      v-for="item in imageData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input v-model="instanceBase.name" clearable placeholder="名称" class="custom-width"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input v-model="instanceBase.description" clearable placeholder="描述" class="custom-width"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      <div class="fix-bottom-button">
        <el-button type="primary" size="medium" @click="saveResource">创建</el-button>
        <el-button type="gray" size="medium" @click="goBack">返回</el-button>
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
          return{
            title: '创建云主机',
            CloudData:[],
            imageData:[],
            rules:{
              cloudId: [{required: true, message: '请先选择云', trigger: 'blur'}],
            },
            activeNames: ['1'],
            instanceBase:{
              cloudId:'',
              imageId:'',
              name: '',
              description: '',
            },
            handle: ''
          }
      },

      methods:{
          getCloudData:async function() {
              // let obj = {};
              // obj = this.CloudData.find((item) => {
              //     return item.id === oId;
              // });
              this.getImageData();
          },
              getImageData:async function() {
                  // this.imageData=[];
                  // this.instanceBase.imageId=null;

                  // 二级联动，根据云id查询镜像。云有改动的时候onchange，才加载镜像菜单。
                  var imageParams = {
                      "filters": {
                          "cloudId":this.instanceBase.cloudId ,
                          "oemInteralUseOnly":0
                      }
                  };
                  if(this.instanceBase.cloudId!==0){
                      await this.utils.reqObjBackState('/sdsec/web/respool/image/query', imageParams).then(data => {
                          this.imageData = data.data;
                          // console.log(this.imageData)
                      });
                  }

          },
        saveResource: async function(){
          if(!this.checkForm("instanceBase")) return;
          var params= {};
          params = this.instanceBase;
          var result = await this.utils.reqObjBackState('/sdsec/web/respool/instance/createInstance', params);
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

      watch: function(){
        // this.getCloudData();
      },

      created: async function(){
          // 查云
          var cloudParams= {"filters":{"poolType":"virtual"}};
          await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/query',cloudParams).then(data => {
              this.CloudData = data.data;
          });

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
