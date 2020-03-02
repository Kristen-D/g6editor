<!--新增资源池-->
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
            <el-form :model="message" ref="resourcePoolBase" label-width="140px">
              <el-form-item label="消息标题：" prop="name">
                <el-input v-model="message.name" clearable placeholder="请输入" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item label="消息内容：" prop="poolType">
                <el-input type="textarea" v-model="message.content" clearable placeholder="请输入" class="setwidth-per25"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="saveResource">提交</el-button>
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
      return{
        message:{
          name: '',
          content: ''
        },

        title:'创建消息',
        // fileList : [],
        handle: ''
      }
    },

    methods:{
      saveResource: async function(){
        if(!this.checkForm("message")) return;
        var params= {};
        params = this.resourcePoolBase;
        // console.log('par:', params)

        var result = await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/saveOrUpdate', params);
        // console.log('res2:', result)
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
        var flag = false;q
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

        this.title = '修改消息';
        var id = this.$route.params.id;
        // console.log('id: ',id)
        var resourcePoolBase = await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/get',{'id': id});
        this.resourcePoolBase = resourcePoolBase.data;
        // console.log('res1:', this.resourcePoolBase)

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
