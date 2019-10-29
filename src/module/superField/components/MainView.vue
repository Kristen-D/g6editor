<template>
<div class="container-fluid">
  <div class="el-panel">
    <div class="el-panel-heading">
      <h3 class="el-panel-title">超集字段</h3>
    </div>

  <div class="el-panel-body">
    <div class="search-form">


        <!--普通搜索-->
        <div class="ordinary-search" v-show="!isMoreSearch">
            <el-button style="float:right"  type="text" id="search-tag1" @click="isMoreSearch=true" class="btn-search text-info"><i class="imgicon search-icon"></i>高级搜索</el-button>
          <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
            <el-form-item>
              <el-input v-model="searchParams.fieldName" placeholder="输入字段编码" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchParams.fieldType" placeholder="输入编码类型" ></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary"  @click="searchData">搜索</el-button></el-form-item>
          </el-form>



        </div>
        <!--高级搜索-->
        <div class="senior-search" v-show="isMoreSearch">
            <el-button style="float:right" type="text" size="medium" id="search-tag2" @click="isMoreSearch=false"  class="btn-search text-info"><i class="imgicon search-icon2"></i>普通搜索</el-button>
          <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom" style="line-height: 36px;">
            <el-form-item label="输入字段编码">
              <el-input v-model="searchParams.fieldName" placeholder="输入字段编码" ></el-input>
            </el-form-item>
            <el-form-item label="输入编码类型">
              <el-input v-model="searchParams.fieldType" placeholder="输入编码类型" ></el-input>
            </el-form-item>
            <el-form-item label="输入编码描述">
              <el-input v-model="searchParams.fieldDesc" placeholder="输入编码描述" ></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker v-model="searchParams.time" type="date" placeholder="更新时间" @change="stringDate"></el-date-picker>
            </el-form-item>


            <el-button type="primary"   @click="searchData" style="margin-left:15px;">搜索</el-button>


          </el-form>

        </div>
      </div>

      <div class="" style="height: 50px; line-height: 50px;">
        <label class="el-panel-subtitle f-bold">列表</label>
        <span class="float-r">
          <el-button type="primary" size="small" @click="toDetail(2,{})">新增</el-button>
          <el-button type="primary" size="small" @click="deleteInfo(true)" >删除</el-button>
          <!-- <el-button type="" size="small"><i class="el-icon-refresh f-bold"></i></el-button> -->
        </span>
      </div>
      <div class="">
        <el-table :data="infoData"  style="width: 100%" class="white-table" @selection-change="handleSelectionChange"  v-if="infoData.length>0">
          <el-table-column type="selection"></el-table-column>
          <el-table-column  prop="fieldName" align="center" label="字段编码"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="fieldType" align="center" label="编码类型"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="fieldDesc" align="center" label="编码描述"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="time" align="center"  label="更新时间"  :show-overflow-tooltip="true"></el-table-column>


          <el-table-column  label="操作" align="center" >
            <template scope="scope">
              <el-button type="text" class="text-info" @click="toDetail(3,scope.row)">编辑</el-button>
              <span class="vert-bar-color">|</span>
              <el-button type="text" class="text-info" @click="deleteInfo(false,scope.row)" >删除</el-button>
              <!-- <span class="vert-bar-color">|</span>
              <el-button type="text" @click="toForm(scope.row,true)" class="text-info">查看</el-button> -->
              <span class="vert-bar-color">|</span>
              <el-button type="text"  class="text-info" @click="toDetail(1,scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!--表格无数据时显示-->
      <div class="wrapper-page animated fadeInDown" v-if="infoData.length==0">
        <div class="error-page animated flipInX">
          <img src="/../static/images/nodate.png" alt="none">
          <div class="error-page-content">
            <label class="text-999">无数据</label>
          </div>
        </div>
      </div>
      <div class="pagelocation">
        <!-- <span>每页显示</span> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next" class="pagination"></el-pagination>
      </div>
  </div>
</div>
</div>

</template>

<script>
export default {
  data(){
    return{
      multipleSelection:[],
      isMoreSearch:false,

      infoData:[],
      pageSize:10,
      pageIndex:1,
      total:0,
      searchParams:{
        fieldName:'',
        fieldType:'',
        fieldDesc:'',
        time:''
      }
    }
  },
  methods:{
    stringDate(val){

      // var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ;
      this.searchParams.time = this.dateFormat(val);

    },
    dateFormat(val){
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
    },
    toDetail(index,param){
      // console.log(index);
      this.$router.push({
        name:'detail',
        params:{
          index:index,
          params:param
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    deleteInfo(val,param){
      var params = {
        id:''
      };
      var state = true;
      if(val){
        if(this.multipleSelection.length != 0){
          for(var i=0;i<this.multipleSelection.length;i++){
            params.id = params.id + this.multipleSelection[i].ruleId + ',';
          }
          params.id = params.id.substr(0,params.id.length-1);
        }else {
          state = false;
        }
      }else {
          params.id = param.ruleId;
      }
      if(state){
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
            this.getData();
            // this.$router.go(-1);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      // console.log(params);

    },
    searchData(){
      // console.log(this.searchParams);
      this.getData();
    },

    getData(){
      var params = {...this.searchParams,pageSize:this.pageSize, pageIndex:this.pageIndex};
      this.common.reqDef("/ssa/superField/getSuperFieldData.do", params).then(data => {
        // console.log(data.data);
        this.infoData = data.data.rowData;
        this.total = data.data.total;
      })
    },
    //改变一页的数据量
    handleSizeChange(val){
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val){
      this.pageIndex = val;
      this.getData();
    },
    getInfoData(){},
    // searchParams(val){
    //
    // }
  },
  created(){
    this.getData();
  }
}
</script>

<style lang="css">
</style>
