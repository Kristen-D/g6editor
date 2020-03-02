<template>
  <div style="padding-bottom: 18px;"  >
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">{{form.typeName}}</h3>
      </div>
       <div class="el-panel-white-body p-l-50 clearfloat">
  <el-form  :model="form"  ref="form" label-width="150px" class="sys-cfg-form">
   <el-form-item label="短信认证:" prop="isMsg"  >
    <el-radio-group v-model="form.isMsg">
     <el-radio :label="'1'">是</el-radio>
     <el-radio :label="'0'">否</el-radio>
   </el-radio-group>
   </el-form-item>


   <el-form-item label="登录锁定:"  >
     登录失败<el-input class="time-input" v-model="form.lockedFreq" ></el-input>次后自动锁定
     锁定时间<el-input class="time-input" v-model="form.lockedTime"  ></el-input>分钟
   </el-form-item>

   <el-form-item label="密码找回:"  >
     <el-radio-group v-model="form.findPwd">
      <el-radio label="mail">邮箱</el-radio>
      <el-radio label="msg">短信</el-radio>
      <el-radio label="phone">电话</el-radio>
    </el-radio-group>
   </el-form-item>
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

export default {

    data() {
        return {
          form:{  type:"login",typeName:"登录账户",isMsg:'0',findPwd:"mail",lockedFreq:5,lockedTime:30},
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
