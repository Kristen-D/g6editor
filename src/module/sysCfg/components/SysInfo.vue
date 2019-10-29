<template>
  <div style="padding-bottom: 18px;"  >

    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">{{form.typeName}}</h3>
      </div>
       <div class="el-panel-white-body p-l-50 clearfloat">
         <el-form  :model="form"   ref="form" label-width="150px" class="sys-cfg-form">
          <el-form-item label="平台全称:" prop="sysFullName"  >
               <el-input v-model="form.sysFullName" style="width:50%" >   </el-input>
          </el-form-item>

          <el-form-item label="平台缩写:" prop="sysName"  >
               <el-input v-model="form.sysName" style="width:50%" >   </el-input>
          </el-form-item>

          <el-form-item label="平台Logo:" prop="sysLogo"  >
            <el-upload
            action="/ssa/sysCfg/upload.do"
             class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            >
             <img v-if="form.sysLogo" :src="form.sysLogo" class="avatar">
               <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="平台位置:" prop="sysArea"  >
            <cap :options="areaList" style="width:300px" clearable change-on-select placeholder="选择菜单" :props="props" v-model="form.sysArea" root-id="0" ></cap>
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
import cap from 'components/Cascader/CascaderPlus'

export default {
  components: {
    cap
  },
    data() {
        return {
          props:{value:"id",label:"name"},
          areaList:[],
          form:{type:"sysInfo",typeName:"平台信息",sysFullName:"",sysName:"",sysLogo:"",sysArea:[]},
        }
    },
    methods: {
      beforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return (isJPG||isPNG) && isLt5M ;
      },
      handleUploadSuccess(response, file){
        console.log(response);
        file.url = response.data;
         this.form.sysLogo = response.data;
      },
      async  save(){
        this.form.sysArea = this.form.sysArea[this.form.sysArea.length-1]
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

      this.common.req("/ssa/sysCfg/listArea.do",this.form).then(data=>{
        this.areaList = data;
          this.form.sysArea = this.form.sysArea.split(",");
      })
    },
    mounted: function() {


    }

}

</script>

<style  >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height:68px;
    line-height:58px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 68px;
    display: block;
  }

</style>
