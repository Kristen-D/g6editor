<template>

  <div class="whitebackground Whitespace">
    <div class="top-title">面板自定义</div>

    <div :class="['ordinary-search', 'clearfloat']">

      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-select v-model="params.roleId" placeholder="请选择权限" clearable class="my-tool">
            <el-option v-for="item in roleList" :key="item.id" :label="item.text" :value="item.id">
            </el-option>
        </el-select>

        <el-select v-model="params.permissionId" placeholder="请选择菜单" clearable class="my-tool">
            <el-option v-for="item in menuList" :key="item.permission_id" :label="item.name" :value="item.permission_id">
            </el-option>
        </el-select>

        <el-form-item label="">
          <el-button @click="qry()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>



  <el-row>
    <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r" >
      <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>添加</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>
</el-row>
    <el-dialog title="格式错误" :visible.sync="formatError" width="30%" style="overflow:inherit">
      <div v-for="item in errorList" style="height:150px;overflow-y:scroll">
          <div>
            {{item.error}}
          </div>
      </div>
    </el-dialog>

   <editTable ref="editTable" :id="tableId" :params="params"  ></editTable>


  </div>








</div>
</template>

<script>
import {mapState} from 'vuex'
import editTable from './GridTable.vue'

export default {
    components: { editTable} ,
    data(){

        return {
            params:{roleId:null,permissionId:null,pageSize:9,pageIndex:1},
            menuList:[],
            roleList:[],
        }
    },
    computed:{

   },
   methods:{

     addRow(){
       let params = { gridPageId:-1,gridPageName:""};
       this.$router.push({name:'dynamicContext', params:params }) ;
     },
     qry(){
       this.$refs.editTable.loadTable();
     },
     delCheckedRows(){
       var rows = this.$refs.editTable.multipleSelection;
       let vm = this;
       if(rows.length<=0){
         this.$alert("请先选中用户");
         return;
       }
       this.$confirm('此操作将删除选中行, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() =>
       {
         var  idsArr = [];
         rows.forEach(row=>{
           idsArr.push(row.grid_page_id);
         })
         var ids = idsArr.join(",");
         await vm.common.req( "/ssa/viewPlugins/deleteGridPageByIds.do", {'ids':ids}) ;
         vm.$refs.editTable.loadTable();
       })
     }
   },
   created :async function() {
     let vm = this;
     vm.common.req("/ssa/viewPlugins/listMenu.do").then(data => {
         this.menuList = data;
     });

     vm.common.req("/ssa/viewPlugins/listRole.do").then(data => {
         this.roleList = data;
     });

  }
}
</script>
