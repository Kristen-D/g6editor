<template>
  <div style="padding-bottom: 18px;"  >
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">{{form.typeName}}</h3>
      </div>
       <div class="el-panel-white-body p-l-50 clearfloat">
  <el-form  :model="form"   ref="form" label-width="150px" class="sys-cfg-form">
   <el-form-item label="地址:" prop="mailhost"  >
        <el-input v-model="form.mailhost" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="端口:" prop="mailport"  >
        <el-input v-model="form.mailport" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="用户名:" prop="mailuser"  >
        <el-input v-model="form.mailuser" style="width:50%" >   </el-input>
   </el-form-item>

   <el-form-item label="密码:" prop="mailpwd"  >
       <el-input v-model="form.mailpwd" style="width:50%" type="password">   </el-input>
         <testBtn ref="mailTest" @click="testMail" ></testBtn>
   </el-form-item>
   <!-- <el-form-item label="邮箱地址:" prop="mailAddr"  >
        <el-input v-model="form.mailAddr" style="width:50%" >   </el-input>

   </el-form-item> -->

   <el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
  </el-form-item>
 </el-form>
</el-card>
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
          form:{type:"mailServer",typeName:"邮件服务器",mailhost:"",mailport:"22",mailuser:"",mailpwd:""},
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
         async testMail(){
             let  result =  await  this.common.req("/ssa/sysCfg/testMail.do",this.form);
             this.$refs.mailTest.changeButton(result);
           },

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
