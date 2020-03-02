<template>
<div class="">

       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.id">新增报表</div>
         <div class="top-title" v-if="this.$route.params.id">编辑报表</div>

         <el-form :model="reportTemplateForm" :rules="rules" ref="reportTemplateForm" id="reportTemplateForm" name="reportTemplateForm" label-width="130px">
           <el-form-item label="模版名称" prop="templateName" required>
             <el-input v-model="reportTemplateForm.templateName" style="width:504px;"></el-input>
           </el-form-item>
           <!-- <el-form-item label="统计语句" prop="reportSql" required>
             <el-input type="textarea" v-model="reportTemplateForm.reportSql" style="width:504px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
           </el-form-item> -->
           <el-form-item label="模版描述" prop="description">
             <el-input type="textarea" v-model="reportTemplateForm.description" style="width:504px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item label="报表链接信息" prop="urls" required>
             <div class=" m-b-14" v-for="(item, index) in reportTemplateForm.urls">
               <el-input v-model="item.tabName" placeholder="请输入Tab名称" class="w-160"></el-input>
							 <el-input v-model="item.reportUrl" placeholder="请输入报表链接名" class="w-260"></el-input>
							 <label v-if="reportTemplateForm.urls.length>1" class="delet font-color m-l-30" @click="deleteRow(index)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
					    </div>
              <div @click="addReportUrl"><label  class="add font-color">添加输出字段</label></div>
             <!-- <el-table :data="reportTemplateForm.urls" border style="width: 80%">
              <el-table-column label="Tab名称" width="150" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.tabName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="报表链接" width="302" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.reportUrl"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50" align="center">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table> -->
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('reportTemplateForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('reportTemplateForm')">取消</el-button>
             <!-- <el-button v-if="this.$route.params.id" type="primary" class="button-p-3" @click="modifyUpload">修改Excel/Word模版</el-button> -->
             <!-- <el-button type="primary" class="button-p-4" @click="addReportUrl"><i class="el-icon-plus el-icon-right"></i></el-button> -->
           </el-form-item>
         </el-form>
         <el-dialog title="上传Excel/Word模版" :visible.sync="uploadTemplateShow" width="30%">
             <el-upload style="width:300px;"
              class="upload-demo"
              ref="upload"
              action="/ssa/reportTemplateManage/uploadTemplate.do"
              :data="reportTemplateForm"
              :file-list="fileList"
              :multiple="true"
              :auto-upload="false"
              :on-success="handleSuccess"
              >
              <el-button type="primary" class="button-p-3" slot="trigger">选取文件</el-button>
              <el-button type="gray" class="button-p-3" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xlsx/docx文件</div>
             </el-upload>
         </el-dialog>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateUrls = (rule, value, callback) => {
      if(value.length<1){
        callback(new Error("请至少添加一条报表链接"));
      }else {
        let flag = false;
        for (let i = 0; i < value.length; i++) {
          let v = value[i];
          let name = v.tabName;
          let url = v.reportUrl;
          if(!name.trim() || name.trim()==='' ||
            !url.trim() || url.trim()===''){
            flag = true;
            break;
          }
        }
        if(flag) {
          callback(new Error("报表链接信息不得为空"));
        }else {
          callback();
        }
      }
    };
    return {
      reportTemplateForm: {
        id: '',
        templateName: '',
        // reportSql: '',
        description: '',
        urls: [{tabName:"", reportUrl:""},{tabName:"", reportUrl:""}],
        permissionId: ''
      },
      tableId: this.$route.params.tableId,
      rules: {
        templateName: [
          { required: true, message: '请输入模版名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        // reportSql: [
        //   { required: true, message: '请输入统计语句', trigger: 'blur' },
        //   { min: 20, max: 2000, message: '长度在 20 到 2000 个字符', trigger: 'blur' }
        // ],
        description: [
          { required: false, min: 0, max: 200, message: '请输入200个以内的字符', trigger: 'blur'}
        ],
        urls: [
          { validator: validateUrls, trigger: 'blur' }
        ],
      },
      fileList: [],
      uploadTemplateShow: false,
      uploadFlag: { excel: false, word: false }
    };
  },
  computed: {

  },
  methods: {
    deleteRow(index) {
      console.log(index);
      this.reportTemplateForm.urls.splice(index, 1);
    },
    addReportUrl() {
      this.reportTemplateForm.urls.push({tabName:"", reportUrl:""});
    },
    modifyUpload() {
      this.uploadTemplateShow = true;
    },
    handleSuccess(response, file, fileList) {
      if(response.state) {
        if(file.name.endsWith(".xlsx")){
          this.uploadFlag.excel = true;
        }else {
          this.uploadFlag.word = true;
        }
        if(this.uploadFlag.excel && this.uploadFlag.word ){
          if(this.$route.params.id){
            this.uploadTemplateShow = false;
            this.$message({type: 'success', message: '上传成功！'});
          }else {
            this.clearSessionStorage();
            this.$message({type: 'success', message: '上传成功！'});
            this.$store.dispatch('reloadTable', this.tableId);
          }

        }
      }else {
        this.$message({type: 'error', message: '上传失败, 请重新上传！'});
        this.$refs.upload.clearFiles();
      }

    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitForm(formName) {
      console.log(this.reportTemplateForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result = await this.common.requestWithComplexContent('/ssa/reportTemplateManage/addOrModifyTemplate.do', JSON.stringify(this.reportTemplateForm), this);
          if(result.state) {
            // if(this.$route.params.id) {
              this.clearSessionStorage();
              this.$message({type: 'success', message: result.message});
              this.$store.dispatch('reloadTable', this.tableId);
            // }else {
            //   this.reportTemplateForm.id = result.data;
            //   this.uploadTemplateShow = true;
            // }

          }else{
            this.$message({type: 'error', message: result.message});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('reportTemplateForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  created: function() {
    if (this.$route.params.id) {
      this.reportTemplateForm = this.$route.params;
      let reportTemplateInfo = JSON.stringify(this.$route.params);
      sessionStorage.reportTemplateForm = reportTemplateInfo;
    }else if (sessionStorage.reportTemplateForm) {
      this.reportTemplateForm = JSON.parse(sessionStorage.reportTemplateForm);
      this.$route.params.id = this.reportTemplateForm.id;
    }
    if(this.reportTemplateForm.excelTemplate) {
      this.fileList.push({name:this.reportTemplateForm.excelTemplate});
    }
    if(this.reportTemplateForm.wordTemplate) {
      this.fileList.push({name:this.reportTemplateForm.wordTemplate});
    }

  },
  destroyed: function() {
    sessionStorage.removeItem('reportTemplateForm');
  }
}
</script>

<style>

</style>
