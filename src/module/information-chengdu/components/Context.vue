<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="el-panel">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">资讯管理</h3>
        </div>
        <div class="el-panel-body">
          <div class="search-form">
            <!--普通搜索-->
            <div class="ordinary-search" v-show="!isMoreSearch">
              <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
                <el-form-item>
                  <el-input v-model="searchParams.title" placeholder="标题" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-time-select v-model="searchParams.infoDate" placeholder="所有时间" size="mini"></el-time-select>
                </el-form-item>
                <el-form-item><el-button type="primary" size="mini" @click="getInfoData(true)">搜索</el-button></el-form-item>
              </el-form>
              <el-button type="text" id="search-tag1" @click="isMoreSearch=true" class="btn-search text-info"><i class="imgicon search-icon"></i>高级搜索</el-button>
            </div>
            <!--高级搜索-->
            <div class="senior-search" v-show="isMoreSearch">
              <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom" >
                <el-form-item label="标题">
                  <el-input v-model="searchParams.title" placeholder="所有标题" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input v-model="searchParams.content" placeholder="所有内容" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select placeholder="所有类型" v-model="searchParams.infoType" size="mini">
                    <el-option :label="item.name" :value="item.value" v-for="item in infoType"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发布时间">
                  <el-time-select v-model="searchParams.infoDate" placeholder="所有时间" size="mini"></el-time-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="getInfoData(true)">搜索</el-button>
                </el-form-item>
              </el-form>
              <el-button type="text" size="medium" id="search-tag2" @click="showLessSearch" class="btn-search text-info"><i class="imgicon search-icon2"></i>普通搜索</el-button>
            </div>
          </div>
          <div class="" style="height: 50px; line-height: 50px;">
            <label class="el-panel-subtitle f-bold">资讯列表</label>
            <span class="float-r">
              <el-button type="primary" size="small" @click="toForm(null,false)">发布</el-button>
              <el-button type="primary" size="small" @click="deleteInfo(true)">删除</el-button>
              <el-button type="" size="small" @click="getInfoData"><i class="el-icon-refresh f-bold"></i></el-button>
            </span>
          </div>
          <div class="">
            <el-table :data="infoData"  style="width: 100%" class="white-table"  @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column  prop="title"  label="标题" min-width="200" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column  prop="content"  label="内容" min-width="200" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column  prop="infoType"  label="类型"></el-table-column>
              <el-table-column  prop="infoDate"  label="发布时间" min-width="80"></el-table-column>
              <el-table-column  label="操作">
                <template scope="scope">
                  <el-button type="text" class="text-info" @click="toForm(scope.row,false)">编辑</el-button>
                  <span class="vert-bar-color">|</span>
                  <el-button type="text" class="text-info" @click="deleteInfo(false,scope.row)">删除</el-button>
                  <span class="vert-bar-color">|</span>
                  <el-button type="text" @click="toForm(scope.row)" class="text-info">查看</el-button>
                  <span class="vert-bar-color">|</span>
                  <el-button type="text" @click="preview(scope.row)" class="text-info">预览</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagelocation">
              <span>每页显示</span>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next" class="pagination"></el-pagination>
            </div>
          </div>
          <!--表格无数据时显示-->
          <div class="wrapper-page animated fadeInDown hidden">
            <div class="error-page animated flipInX">
              <img src="/../static/images/cd/console/images/nodate.png" alt="none">
              <div class="error-page-content">
                <label class="text-999">安全状态良好，无任何攻击</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data () {
      return {
        //组织id
        orgId:'',
        //是否显示高级搜索
        isMoreSearch:false,
        //搜索参数
        searchParams:{
          title:'',
          content:'',
          infoType:'',
          infoDate:''
        },
        //分页参数
        pageIndex:1,
        pageSize:10,
        total:0,
        //类型数据
        infoType:[],
        //表格数据
        infoData:[],
        //表格复选框参数
        multipleSelection: [],
      }
    },
    methods: {
      //获取组织参数
      getParams(){
        //获取组织id
        this.orgId = 27;
      },
      //显示较少的搜索
      showLessSearch(){
        this.isMoreSearch = false;
        this.searchParams.content = '';
        this.searchParams.infoType = '';
      },
      //复选框方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //换一页显示的数据量
      handleSizeChange(pageSize){
        this.pageSize = pageSize;
        this.getInfoData();
      },
      //换页
      handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getInfoData();
      },
      //获取类型
      getInfoType(){
        this.common.req("/ssa/information/getInfoType.do",null).then(data => {
          this.infoType = [{
            name:'类型一',
            value:'1'
          },{
            name:'类型二',
            value:'2'
          }]
        })
      },
      //获取表格数据
      getInfoData(isSearch){
        if(isSearch){
          this.pageIndex = 1;
        }
        var params = {
          ...this.searchParams,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
        this.common.req("/ssa/information/getInfoData.do",params).then(data => {
          this.infoData = [{
              id:'1',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'安全资讯',
  					  infoDate:'2013-03-03',
  				  },{
              id:'2',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'亚信安全新闻',
  					  infoDate:'2013-03-03',
  				  },{
              id:'3',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'亚信安全新闻',
  					  infoDate:'2013-03-03',
  				  },{
              id:'4',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'安全资讯',
  					  infoDate:'2013-03-03',
  				  },{
              id:'5',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'安全资讯',
  					  infoDate:'2013-03-03',
  				  },{
              id:'6',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'亚信安全新闻',
  					  infoDate:'2013-03-03',
  				  },{
              id:'7',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'安全资讯',
  					  infoDate:'2013-03-03',
  				  },{
              id:'8',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'安全资讯',
  					  infoDate:'2013-03-03',
  				  },{
              id:'9',
  					  title:'亚信安全受邀出席2017检法信息化融创大赛',
  					  content:'11月24日，2017年检法信息化融合发展创新大会在京举行',
  					  infoType:'亚信安全新闻',
  					  infoDate:'2013-03-03',
  				  },
  			  ];
        })
      },
      //查看详情，编辑，发布跳转页
      toForm(val,isDetail){
        this.$router.push({
          name:'infoForm',
          params:{
            orgId:this.orgId,
            isDetail:isDetail==false?false:true,
            data:val
          }
        })
      },
      //单个，批量删除
      deleteInfo(val,data){
        var params = {
          orgId:this.orgId,
          ids:''
        };
        if(val){
          for(var i=0;i<this.multipleSelection.length;i++){
            params.ids = params.ids + this.multipleSelection[i].id + ',';
          }
          params.ids = params.ids.substr(0,params.ids.length-1);
        }else{
          params.ids += data.id;
        }
        if(params.ids.length==0){
          this.$message({
            message: '请先选中删除对象',
            type: 'warning'
          });
        }else{
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
            })
            this.multipleSelection = [];
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //预览
      preview(){

      }


    },
    mounted: function() {
      this.getInfoType();
      this.getInfoData();
    },
    created:function() {
      this.getParams();
    }

  }
</script>
