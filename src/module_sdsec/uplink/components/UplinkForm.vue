<!--新增链路，包括保存、返回按钮-->
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
                <el-form :model="uplinkBase" ref="uplinkBase" label-position="right" class="flexStart custom-form">
                  <el-form-item label="防护CIDR" prop="uplinkBase.cidr">
                    <el-input v-model="uplinkBase.cidr" clearable placeholder="防护CIDR" class="custom-width"></el-input>
                  </el-form-item>


                  <el-form-item label="可选资源池">
                    <el-select v-model="respoolList.name" clearable placeholder="资源池" class="custom-width">
                      <el-option v-for="item in respoolList" :key="item.name" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>

                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="fix-bottom-button">
            <el-button type="primary" size="medium" @click="saveResource">保存</el-button>
            <el-button type="gray" size="medium" @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        title: '新增链路',
        rules: {},
        activeNames: ['1'],
        uplinkBase: {},
        respoolList: {},

        // fileList : [],
        handle: ''
      }
    },

    methods: {
      saveResource: async function () {
        if (!this.checkForm("uplinkBase")) return;

        var params = {};

        this.uplinkBase.respoolId = this.respoolList.name;

        params = this.uplinkBase;

        var result = await this.utils.reqObjBackState('/sdsec/web/serchain/uplink/saveOrUpdateUpLink', params);
        // console.log('res2:', result)
        if (result) {
          this.$message({message: "Success", type: 'success'});
          this.goBack();
        } else {
          this.$message({message: "Fail", type: 'error'});
        }
      },
      goBack: function () {
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

    computed: {},

    created: async function () {

      var handle = this.$route.params.handle;

      this.handle = handle;

      if (handle == 'update') {
        this.title = '修改链路';
        var id = this.$route.params.id;
        var uplinkBase = await this.utils.reqObjBackState('/sdsec/web/serchain/uplink/getUpLinkById', {'id': id});
        this.uplinkBase = uplinkBase.data;

      } else {
        var param = {};
        var uplinkBase = await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/pageQuery', param);
        this.respoolList = uplinkBase.data;
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
