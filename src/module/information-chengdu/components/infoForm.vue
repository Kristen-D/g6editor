<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">资讯管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布资讯</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 详细信息 -->
      <div class="el-panel" v-if="isDetail">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">发布资讯</h3>
        </div>
        <div class="el-panel-body">
          <el-form :model="infoData" label-width="90px">
            <el-form-item label="资讯标题：">
              <p>{{infoData.title}}</p>
            </el-form-item>
            <el-form-item label="类别：">
              <p>{{infoData.infoType}}</p>
            </el-form-item>
            <el-form-item label="发布时间：">
              <p>{{infoData.infoDate}}</p>
            </el-form-item>
            <el-form-item label="资讯内容："  style="max-width:800px">
              <p class="textarea">{{infoData.content}}</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="isDetail=false">编辑</el-button>
              <el-button type="primary" size="small" @click="deleteInfo">删除</el-button>
              <el-button type="primary" size="small">预览</el-button>
              <el-button type="gray" size="small" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 编辑/新增信息 -->
      <div class="el-panel" v-if="!isDetail">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">发布资讯</h3>
        </div>
        <div class="el-panel-body">
          <el-form ref="infoData" :rules="rules" :model="infoData" label-width="90px">
            <el-form-item label="资讯标题" required prop="title">
              <el-input v-model="infoData.title" size="medium" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="类别" required prop="infoType">
              <el-select v-model="infoData.infoType" placeholder="请选择活动区域" size="medium">
                <el-option :label="item.name" :value="item.value" v-for="item in infoType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required prop="infoDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="infoData.infoDate" size="medium"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动形式" required style="max-width:800px" prop="content">
              <el-input type="textarea" v-model="infoData.content" :autosize="{ minRows:6, maxRows:12}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAndUpdate" size="small">保存</el-button>
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
      return{
        isDetail:false,
        infoData:{
          id:'',
          title:'',
          content:'',
          infoType:'',
          infoDate:'',
        },
        //类型数据
        infoType:[],
        //规则
        rules:{
          // 标题校验
          title: [{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请输入资讯标题'))
              }else if(true){
                callback(new Error('这功能还没实现呢'))
              }else {
                callback()
              }
            }, trigger:'blur' }],
          infoType: [{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请选择类别'))
              }else if(true){
                callback(new Error('这功能还没实现呢'))
              }else {
                callback()
              }
            }, trigger:'blur' }],
          infoDate: [{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请选择活动时间'))
              }else if(true){
                callback(new Error('这功能还没实现呢'))
              }else {
                callback()
              }
            }, trigger:'blur' }],
          content: [{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请输入活动形式'))
              }else if(true){
                callback(new Error('这功能还没实现呢'))
              }else {
                callback()
              }
            }, trigger:'blur' }],
        },
      }
    },
    methods:{
      getParams(){
        this.isDetail = this.$route.params.isDetail;
      },
      //获取详细数据
      getInfoDetail(){
        if(this.$route.params.data!=null){
          this.infoData = this.$route.params.data;
        }
      },
      //保存和更新数据
      addAndUpdate(){
        this.$refs['infoData'].validate((valid) => {
          if(valid){
            console.log(this.infoData);
            if(this.infoData.id == '' || this.infoData.id == null){
              this.common.req("/ssa/information/addInformation.do",this.infoData).then(data => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              })
              this.$router.go(-1);
            }else{
              this.common.req("/ssa/information/updateInfo.do",this.infoData).then(data => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
              })
              this.$router.go(-1);
            }
          }else {
            console.log('校验失败了');
          }

        })
      },
      //删除数据
      deleteInfo(){
        var params = {
          orgId:this.$route.params.orgId,
          id:[this.infoData.id]
        };
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(params);
          this.common.req("/ssa/information/deleteInfo.do",params).then(data => {
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
      //获取类型
      getInfoType(){
        this.common.req("",null).then(data => {

        })
        this.infoType = [{
          name:'类型一',
          value:'1'
        },{
          name:'类型二',
          value:'2'
        }]
      },
    },
    mounted:function(){
      this.getInfoDetail();
      this.getInfoType();
    },
    created:function(){
      this.getParams();
    }
  }
</script>
