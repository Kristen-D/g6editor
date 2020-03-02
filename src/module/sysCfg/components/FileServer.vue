<template>
  <div style="padding-bottom: 18px;"  >
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">{{form.typeName}}</h3>
      </div>
       <div class="el-panel-white-body p-l-50 clearfloat">
  <el-form  :model="form"   ref="form" label-width="150px" class="sys-cfg-form">
   <el-form-item label="服务器IP:" prop="fileHost"  >
        <el-input v-model="form.fileHost" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="上传端口:" prop="filePort"  >
        <el-input v-model="form.filePort" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="上传用户名:" prop="fileUserName"  >
        <el-input v-model="form.fileUserName" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="密码:" prop="filePassword"  >
       <el-input v-model="form.filePassword" style="width:50%" type="password">   </el-input>
        <testBtn ref="fileTest" @click="testFileServer" ></testBtn>
   </el-form-item>
  
   <el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
  </el-form-item>
 </el-form>
</div>
</div>
</div>
</template>
<script>
import testBtn from './TestButton.vue';
export default {
  components:{testBtn},
    data() {
        return {
          form:{type:"fileServer",typeName:"文件服务器",fileHost:"",filePort:'22',fileUserName:"",filePassword:"",filePath:""},
        }
    },
    methods: {
      async  save(){
          let result =  await  this.common.reqDef("/ssa/sysCfg/saveSysCfg.do",this.form);
          if(result.state){
              this.$alert(result.message, '成功');
          }else{
              this.$alert(result.message, '失败');
          }

         },


        async testFileServer(){
          let  result =  await  this.common.req("/ssa/sysCfg/testFilePath.do",this.form);
          this.$refs.fileTest.changeButton(result);

         }
    },

    created: async function() {
      this.common.req("/ssa/sysCfg/getCfg.do",this.form).then(data=>{
        this.form = {...this.form,...data};
      })
    },
    mounted: function() {


    }

}

</script>
