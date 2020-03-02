<template>
<div>
  <el-dialog :visible.sync="dialogVisible" size="small">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
    <el-form ref="authForm" :model="authForm" label-width="250px" style="width:50%" :rules="rules">
      <el-form-item label="认证状态" prop="authState">
        <el-tag v-if="authForm.authState==0" type="danger">未认证</el-tag>
        <el-tag v-else type="success">已认证</el-tag>
      </el-form-item>

      <el-form-item label="所属部门" prop="dept">
        <el-input v-if="type=='edit'" v-model="authForm.dept" ></el-input>
          <el-tag v-else-if="isNull(authForm.dept)" type="primary">{{authForm.dept}}</el-tag>
      </el-form-item>

      <el-form-item label="办公电话" prop="tellphone">
        <el-input v-if="type=='edit'" v-model="authForm.tellphone" ></el-input>
        <el-tag v-else-if="isNull(authForm.tellphone)" type="primary">{{authForm.tellphone}}</el-tag>
      </el-form-item>

      <el-form-item label="职务职称" prop="position">
        <el-input v-if="type=='edit'"  v-model="authForm.position" ></el-input>
        <el-tag v-else-if="isNull(authForm.position)" type="primary">{{authForm.position}}</el-tag>
      </el-form-item>




      <el-form-item label="单位名称" prop="unitName">
        <el-input v-if="type=='edit'" v-model="authForm.unitName" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitName)" type="primary">{{authForm.unitName}}</el-tag>
      </el-form-item>
      <el-form-item label="单位邮箱" prop="unitEmail">
        <el-input v-if="type=='edit'" v-model="authForm.unitEmail" ></el-input>
        <el-tag  v-else-if="isNull(authForm.unitEmail)" type="primary">{{authForm.unitEmail}}</el-tag>
      </el-form-item>
      <el-form-item label="单位办公电话" prop="unitTellphone">
        <el-input v-if="type=='edit'" v-model="authForm.unitTellphone" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitTellphone)" type="primary">{{authForm.unitTellphone}}</el-tag>
      </el-form-item>

      <el-form-item label="单位负责人姓名" prop="unitBossName">
        <el-input v-if="type=='edit'" v-model="authForm.unitBossName" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitBossName)" type="primary">{{authForm.unitBossName}}</el-tag>
      </el-form-item>

      <el-form-item label="单位负责人职务" prop="unitBossPosition">
        <el-input v-if="type=='edit'"  v-model="authForm.unitBossPosition" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitBossPosition)" type="primary">{{authForm.unitBossPosition}}</el-tag>
      </el-form-item>

      <el-form-item label="单位负责人办公电话" prop="unitBossTellphone">
        <el-input v-if="type=='edit'"  v-model="authForm.unitBossTellphone" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitBossTellphone)" type="primary">{{authForm.unitBossTellphone}}</el-tag>
      </el-form-item>

      <el-form-item label="单位负责人手机" prop="unitBossPhone">
        <el-input v-if="type=='edit'" v-model="authForm.unitBossPhone" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitBossPhone)" type="primary">{{authForm.unitBossPhone}}</el-tag>
      </el-form-item>

      <el-form-item label="单位负责人邮箱" prop="unitBossEmail">
        <el-input v-if="type=='edit'" v-model="authForm.unitBossEmail" ></el-input>
        <el-tag v-else-if="isNull(authForm.unitBossEmail)" type="primary">{{authForm.unitBossEmail}}</el-tag>
      </el-form-item>


      <el-form-item label="身份证" prop="idCard">

        <el-upload v-if="type=='edit'"
        :file-list="authForm.idCardList"
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-success="handleUploadIdCardSuccess"
        :on-remove="handleUploadIdCardRemove"
        :before-upload="beforeAvatarUpload"
        >
        <i class="el-icon-plus"></i>

      </el-upload>
      <img v-else v-for="item in authForm.idCardList" class="pic-view" :src="item.url" @click="handlePreview(item)" ></img>
      </el-form-item>

      <el-form-item label="工作证" prop="workCard">
        <el-upload v-if="type=='edit'"
        :file-list="authForm.workCardList"
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-success="handleUploadWorkCardSuccess"
        :on-remove="handleUploadWorkCardRemove"
        :before-upload="beforeAvatarUpload"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <img v-else v-for="item in authForm.workCardList" class="pic-view" :src="item.url" @click="handlePreview(item)" ></img>
      </el-form-item>

      <el-form-item label="单位证明" prop="unitProof">
        <el-upload v-if="type=='edit'"
        :file-list="authForm.unitProofList"
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-success="handleUploadUnitProofSuccess"
        :on-remove="handleUploadUnitProofRemove"
        :before-upload="beforeAvatarUpload"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <img v-else v-for="item in authForm.unitProofList" class="pic-view" :src="item.url" @click="handlePreview(item)" ></img>
      </el-form-item>
      <el-form-item v-if="type=='edit'" >
          <el-button type="primary" @click="saveUserAuthInfo">提交认证</el-button>
        </el-form-item>
    </el-form>


  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    components: { } ,
    props:['type','userId'],
    data(){
      let validatePhone = (rule, value, callback) => {
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/;
        if (reg.test(value)) callback();
        else callback(new Error('手机号码输入错误'));
      }

      let validateEmail = (rule, value, callback) => {
        let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (reg.test(value)) callback();
        else callback(new Error('邮箱输入错误'));
      }
        return {
          loadUserAuthInfoUrl:"/ssa/authority/userAuth/getUserAuthInfo.do",
          uploadUrl:"/ssa/authority/userAuth/upload.do",
          saveUrl:"/ssa/authority/userAuth/saveUserAuthInfo.do",
          authForm:{
            authState:0,
            unitName:null,
            unitEmail:null,
            unitTellphone:null,
            dept:null,
            tellphone:null,
            position:null,
            idCardList:[],
            workCardList:[],
            unitBossName:null,
            unitBossPosition:null,
            unitBossTellphone:null,
            unitBossPhone:null,
            unitBossEmail:null,
            unitProofList:[],
          },
          rules:{
            dept:[{ required: true,   message: '所属部门不可为空',   trigger: 'blur' }],
            unitName:[{ required: true,   message: '单位名称不可为空',   trigger: 'blur' }],
            unitBossName:[{ required: true,   message: '单位负责人不可为空',   trigger: 'blur' }],
            unitBossPhone:[
              { required: true,   message: '单位负责人电话不可为空',   trigger: 'blur' },
              {   validator: validatePhone,   trigger: 'blur' }],
            unitBossEmail:[{ required: true,   message: '单位负责人邮箱不可为空',   trigger: 'blur' },
              {   validator: validateEmail,   trigger: 'blur' }],
          },
          dialogVisible:false,
        }
    },
    computed:{
      ...mapState({

     })
   },
   methods:{
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
     isNull(value){
       return value&& value!=null && value != "";
     },
     handlePreview(file){
       this.dialogImageUrl = file.url;
        this.dialogVisible = true;
     },
     handleUploadIdCardRemove(file, fileList){
         this.handleUploadRemove( file, fileList,'idCardList');
     },
     handleUploadWorkCardRemove(file, fileList){
       this.handleUploadRemove( file, fileList,'workCardList');
     },
     handleUploadUnitProofRemove(file, fileList){
       this.handleUploadRemove( file, fileList,'unitProofList');
     },
     handleUploadRemove(file, fileList,name){
       this.authForm[name] = [];
       fileList.forEach(f=>{
         var item = {name:f.name,url:f.url};
         this.authForm[name].push(item);
       });
     },
     handleUploadIdCardSuccess(response, file, fileList){
        this.handleUploadSuccess(response, file, fileList,'idCardList');
     },
     handleUploadWorkCardSuccess(response, file, fileList){
        this.handleUploadSuccess(response, file, fileList,'workCardList');
     },
     handleUploadUnitProofSuccess(response, file, fileList){
        this.handleUploadSuccess(response, file, fileList,'unitProofList');
     },
     handleUploadSuccess(response, file, fileList,name){
       if(response.state){
         file.url = response.data;
         var item = {name:file.name,url:file.url};
         this.authForm[name].push(item);
          console.log(this.authForm[name])
       }
     },
     saveUserAuthInfo(){
       this.$refs.authForm.validate(async(valid) => {
         if (valid) {
         this.authForm.idCard = JSON.stringify(this.authForm.idCardList) ;
         this.authForm.workCard = JSON.stringify(this.authForm.workCardList) ;
         console.log(this.authForm.unitProofList);
         this.authForm.unitProof = JSON.stringify(this.authForm.unitProofList) ;
           let data = await this.common.reqBackState(this.saveUrl, this.authForm, this);
           if (data.state) {
             this.$message({ type: 'success',  message: data.message  });
           } else {
             this.$message({ type: 'error', message: data.message });
           }
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
   },
   created :async function() {
     var params = {};
     if(this.type != "edit" && this.userId){
       params.userId = this.userId
     }
     this.common.req(this.loadUserAuthInfoUrl, params, this).then(data=>{
       this.authForm =  $.extend(this.authForm,data);

     if(this.authForm.idCard && this.authForm.idCard!='null')   if(this.authForm.idCard)this.authForm.idCardList =eval("("+ this.authForm.idCard+")");
      if(this.authForm.workCard &&  this.authForm.workCard!='null')this.authForm.workCardList =eval("("+ this.authForm.workCard+")");
      if(this.authForm.unitProof &&  this.authForm.unitProof!='null')this.authForm.unitProofList =eval("("+ this.authForm.unitProof+")");
     });

  }
}
</script>
<style>
.pic-view{
  width:150px;
  height:150px;
  margin-left: 15px;
  cursor:pointer;
}
</style>
