<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">超集字段管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="index == 1">查看</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="index == 2">新增</el-breadcrumb-item>
        <el-breadcrumb-item v-else="index == 3">编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 详细信息 -->
      <div class="el-panel" v-if="index == 1">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">查看</h3>
        </div>
        <div class="el-panel-body">
          <el-form :model="infoData" label-width="100px">
            <el-form-item label="输入字段编码:">
              <p>{{infoData.fieldName}}</p>
            </el-form-item>
            <el-form-item label="输入编码类型:">
              <p>{{infoData.fieldType}}</p>
            </el-form-item>
            <el-form-item label="输入编码描述:">
              <p>{{infoData.fieldDesc}}</p>
            </el-form-item>
            <el-form-item label="更新时间:">
              <p>{{infoData.time}}</p>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="update">编辑</el-button>
              <el-button type="primary" size="small" @click="deleteData">删除</el-button>
              <el-button type="gray" size="small" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 编辑/新增信息 -->
      <div class="el-panel" v-show="index != 1">
        <div class="el-panel-heading">
          <h3 class="el-panel-title" v-if="index == 3" >编辑</h3>
          <h3 class="el-panel-title" v-if="index == 2" >新增</h3>
        </div>
        <div class="el-panel-body">
          <el-form  ref="infoData" :rules="rules" :model="infoData" label-width="120px">
            <el-form-item label="输入字段编码"  prop="fieldName" >
              <el-input v-model="infoData.fieldName" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="输入编码类型"  prop="fieldType" >
              <el-input v-model="infoData.fieldType" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="输入编码描述"  prop="fieldDesc" >
              <el-input v-model="infoData.fieldDesc" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="更新时间"  prop="time" >
              <el-date-picker v-model="infoData.time"  size="medium" type="date" style="width:30%"  @change="stringDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  size="small" @click="save(infoData)">保存</el-button>
              <el-button type="gray" size="small" @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      params:{},
      index:'',
      rules:{
        // 优先级校验
        fieldType: [
          { required: true, message: '请填写编码类型', trigger: 'blur,change' }
        ]
      },
      infoData:{
        fieldName:'',
        fieldType:'',
        fieldDesc:'',
        time:'',
        ruleId:''
      }
    }
  },
  methods:{
    stringDate(val){
      this.infoData.time = this.dateFormat(val);
    },
    dateFormat(val){
      if(val!=null){
        var date = new Date(val);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day  = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        if(month<10){
          month = '0'+month;
        }
        if(day<10){day = '0'+day;}
        if(hour<10){hour = '0'+hour;}
        if(minutes<10){minutes = '0'+minutes;}
        if(second<10){second = '0'+second;}
        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+second;
      }
    },
    update(){
      this.index = 3;
    },
    deleteData(){
      var params = {
        id:this.infoData.ruleId
      };
      // console.log(params);
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.common.req("/ssa/superField/deleteSuperFieldData.do",params).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.$router.go(-1);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    save(infoData){
      this.$refs.infoData.validate((valid) => {
       if (valid) {
         if(this.index == 2){
           this.common.req("/ssa/superField/addSuperFieldData.do",this.infoData).then(data => {
         //  console.log(data);
             this.$message({
               message: '新增成功',
               type: 'success'
             });
             this.$router.go(-1);
           })

         }else if(this.index == 3){

           this.common.req("/ssa/superField/updateSuperFieldData.do",this.infoData).then(data => {
         //  console.log(data);
             this.$message({
               message: '编辑成功',
               type: 'success'
             });
             this.$router.go(-1);
           })
         }
        }
      });

    },
    getParams(){
      if (this.$route.params.index) {
        this.params = this.$route.params;
        let knowledgeDetailsInfo = JSON.stringify(this.$route.params);
        sessionStorage.knowledgeDetailsInfo = knowledgeDetailsInfo;
      } else if (sessionStorage.knowledgeDetailsInfo) {
        this.params = JSON.parse(sessionStorage.knowledgeDetailsInfo);
      }
    },
    getData(){
      this.index = this.params.index;
      this.infoData = this.params.params;
      // console.log(this.infoData);
    }

  },
  destroyed: function() {
    sessionStorage.removeItem('params');
  },
  created(){
    this.getParams();
    this.getData();

  }
}
</script>

<style>
/* .el-form-item .el-form-item__label {width: 120px;} */
</style>
