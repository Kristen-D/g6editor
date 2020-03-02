<!--产品规格详情-基本信息页-->
<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">基本属性</h4>
          </div>
        </template>
        <div class="el-panel-body" id="detail">
          <el-form :model="messageBase" label-width="120px" label-position="right" class="flexStart custom-form">
            <el-form-item label="消息标题：" prop="name">
              <label>{{messageBase.name}}</label>
            </el-form-item>
            <el-form-item label="消息内容： ">
              <label v-if="messageBase.serviceType =='protect'">防护类</label>
              <label v-if="messageBase.serviceType =='audit'">审计类</label>
            </el-form-item>
          </el-form>
          <el-form label-width="120px" label-position="right">
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

  export default {
    props: ["detail"],
    data() {
      return {
        id: this.$route.params.id,
        // activeNames : ["1","2","3"],
        activeNames: ["1"],
        messageBase: {},

      }
    },
    methods: {



    },
    created: async function () {
      // console.log('InfoId：', id)
      var messageBase = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {'id': this.id});
      this.messageBase = messageBase.data;
      // console.log('this:',this.messageBase)
    }






  }
</script>

<style>
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
    width: 70%;
  }

  .addbutton {
    padding-right: 20px !important;
    line-height: 40px;
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

  #detail .el-form-item__label {
    float: left;
  }

  #attrDiv .el-form-item__label {
    float: left;
  }

</style>
