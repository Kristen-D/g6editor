<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">事件管理</el-breadcrumb-item>
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
          <el-form   :model="infoData" label-width="90px">
            <el-form-item label="输入字段:">
              <p>{{infoData.matchinfield}}</p>
            </el-form-item>
            <el-form-item label="规则:">
              <p>{{infoData.matchexpression}}</p>
            </el-form-item>
            <el-form-item label="输出字段:">
              <p>{{infoData.matchoutfield}}</p>
            </el-form-item>
            <el-form-item label="输出值:">
              <p>{{infoData.resultoutvalue}}</p>
            </el-form-item>
            <el-form-item label="设备类型:">
              <p>{{infoData.devicetype}}</p>
            </el-form-item>
            <el-form-item label="优先级:">
              <p>{{infoData.priority}}</p>
            </el-form-item>
            <el-form-item label="描述"  style="max-width:800px">
              <p class="textarea">{{infoData.description}}</p>
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
          <el-form ref="infoData" :rules="rules" :model="infoData" label-width="90px">
            <el-form-item label="输入字段"  prop="matchinfield" >
              <el-input v-model="infoData.matchinfield" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="规则">
              <el-input v-model="infoData.matchexpression" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="输出字段">
              <el-input v-model="infoData.matchoutfield" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="输出值">
              <el-input v-model="infoData.resultoutvalue" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-input v-model="infoData.devicetype" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="优先级"  prop="priority" >
              <el-input v-model="infoData.priority" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="infoData.description" size="medium" style="width:30%"></el-input>
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
        matchinfield: [{ required: true, message: '请填写输入字段', trigger: 'blur' }],
        priority: [{ pattern: /^[0-9]*$/, message: '级别只能为数字' ,trigger: 'change'}]
      },
      infoData:{
        matchinfield:'',
        matchexpression:'',
        matchoutfield:'',
        resultoutvalue:'',
        devicetype:'',
        priority:'',
        description:'',
        ruleId:''
      }
    }
  },
  methods:{
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
        this.common.req("/ssa/eventClassification/deleteEventClassificationData.do",params).then(data => {
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
           this.common.req("/ssa/eventClassification/addEventClassificationData.do",this.infoData).then(data => {
         //  console.log(data);
             this.$message({
               message: '新增成功',
               type: 'success'
             });
             this.$router.go(-1);
           })

         }else if(this.index == 3){
           if(this.infoData.priority == '' ||this.infoData.priority == null ){
             this.infoData.priority = 0;
           }
           this.common.req("/ssa/eventClassification/updateEventClassificationData.do",this.infoData).then(data => {
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

<style lang="css">
</style>
