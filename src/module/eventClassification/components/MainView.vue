<template>
<div class="container-fluid">
  <div class="el-panel">
    <div class="el-panel-heading">
      <h3 class="el-panel-title">事件分级分类定义</h3>
    </div>

  <div class="el-panel-body">
    <div class="search-form">


        <!--普通搜索-->
        <div class="ordinary-search" v-show="!isMoreSearch">
            <el-button style="float:right"  type="text" id="search-tag1" @click="isMoreSearch=true" class="btn-search text-info"><i class="imgicon search-icon"></i>高级搜索</el-button>
          <el-form :rules="rules"  ref="searchParams" :inline="true" :model="searchParams" class="demo-form-inline setfrom">
            <el-form-item>
              <el-input v-model="searchParams.matchinfield" placeholder="输入输入字段" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchParams.matchexpression" placeholder="输入规则" ></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary"  @click="searchData(searchParams)">搜索</el-button></el-form-item>
          </el-form>



        </div>
        <!--高级搜索-->
        <div class="senior-search" v-show="isMoreSearch">
            <el-button style="float:right" type="text" size="medium" id="search-tag2" @click="isMoreSearch=false"  class="btn-search text-info"><i class="imgicon search-icon2"></i>普通搜索</el-button>
          <el-form :rules="rules" ref="searchParams" :inline="true" :model="searchParams" class="demo-form-inline setfrom" style="line-height: 36px;">
            <el-form-item label="输入字段">
              <el-input v-model="searchParams.matchinfield" placeholder="输入字段" ></el-input>
            </el-form-item>
            <el-form-item label="规则">
              <el-input v-model="searchParams.matchexpression" placeholder="输入规则" ></el-input>
            </el-form-item>
            <el-form-item label="输出字段">
              <el-input v-model="searchParams.matchoutfield" placeholder="输入输出字段" ></el-input>
            </el-form-item>
            <el-form-item label="输出值">
              <el-input v-model="searchParams.resultoutvalue" placeholder="输入输出值" ></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-input v-model="searchParams.devicetype" placeholder="输入设备类型"></el-input>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-input v-model="searchParams.priority" placeholder="输入优先级" ></el-input>
            </el-form-item>


            <el-button type="primary"   @click="searchData(searchParams)" style="margin-left:15px;">搜索</el-button>


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
          <el-table-column  prop="matchinfield" align="center" label="输入字段"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="matchexpression" align="center" label="规则"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="matchoutfield" align="center" label="输出字段"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="resultoutvalue" align="center"  label="输出值"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="devicetype" align="center" label="设备类型"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="priority" align="center" label="优先级"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column  prop="description" align="center" label="描述"  :show-overflow-tooltip="true"></el-table-column>

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
    //自定义校验
    var checkPriority = (rule, value, callback) => {
      if(value!= ''){
        var reg = /^[0-9]+.?[0-9]*$/;
       if (!reg.test(value)) {
         return callback(new Error('级别只能为数字'));
       }else {
         callback();
       }
     }else {
       callback();
     }

   };
    return{
      multipleSelection:[],
      isMoreSearch:false,

      infoData:[],
      pageSize:10,
      pageIndex:1,
      total:0,
      searchParams:{
        matchinfield:'',
  			matchexpression:'',
  			matchoutfield:'',
  			resultoutvalue:'',
  			devicetype:'',
  			priority:''
      },

      rules: {
        priority: [ { validator: checkPriority, trigger: 'blur' }]
      }
    }
  },
  methods:{
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
    },
    searchData(searchParams){
      this.$refs.searchParams.validate((valid) => {
       if (valid) {
          this.getData();
        }
      });
    },

    getData(){
       var params = {...this.searchParams,pageSize:this.pageSize, pageIndex:this.pageIndex};
       this.common.reqDef("/ssa/eventClassification/getEventClassificationData.do", params).then(data => {
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
