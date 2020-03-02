<template>

  <div class="whitebackground Whitespace">
      <poi ref="poi" :params="poi_params" ></poi>
    <div class="top-title">用户管理</div>

    <div :class="['ordinary-search', 'clearfloat']">

      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="">
          <el-input placeholder="用户姓名"   v-model="params.realname"> </el-input>
        </el-form-item>
        <el-form-item label="">
        <el-input placeholder="登录名"   v-model="params.username"> </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select  v-model="params.roleids" clearable  placeholder="用户权限">
            <el-option
              v-for="item in roleList"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="qryUser()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>



  <el-row>
    <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r" >
      <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>添加</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
      <el-button v-if="loginUser.userId==1"   type="primary" size="small" @click="resetPwd()"><i class="el-icon-time m-r-8"></i>重置密码</el-button>
      <el-button type="primary" size="small" @click="doExport()"><i class="icon-add m-r-8"></i>导出</el-button>
    </div>
</el-row>
    <el-dialog title="格式错误" :visible.sync="formatError" width="30%" style="overflow:inherit">
      <div v-for="item in errorList" style="height:150px;overflow-y:scroll">
          <div>
            {{item.error}}
          </div>
      </div>
    </el-dialog>

    <el-tabs v-model="authState" @tab-click="tabsClick">

   <el-tab-pane label="认证用户" name="1">
   </el-tab-pane>

   <el-tab-pane label="未认证用户" name="0">
   </el-tab-pane>
 </el-tabs>
    <editTable ref="editTable" :id="tableId"  ></editTable>

  </div>








</div>
</template>

<script>
import {mapState} from 'vuex'
import editTable from './UserEditTable.vue'
import poi from 'components/export/Export.vue'

export default {
    components: { editTable,poi} ,
    data(){

        return {
          tableId:"userCfg",
          params:{username:null,roleids:null,realname:""},
          poi_params:{poi_type:'',poi_id:null,poi_columns:null,sql_params:null},
          delSelectedUser:"/ssa/authority/userCfg/delCheckedRows.do",
          resetPwdUrl:"/ssa/authority/userCfg/resetPwd.do",
          formatError: false,
          errorList: [],
          loginUser:{userId:null},
        }
    },
    computed:{
      ...mapState({
         roleList:state=>state.context.roleList,
         orgList:state=>state.context.orgList,
         menuName:state=>state.context.menuName,
         authState:state=>state.editTable.authState,
     })
   },
   methods:{
     doExport(){

       this.poi_params.sqlParams = JSON.stringify(this.params);
       this.poi_params.poiType = "excel";
       this.poi_params.poiColumns = JSON.stringify(this.$refs.editTable.getTableColunms());
    //   this.poi_params.poiColumns = JSON.stringify([{name:"id",value:'id'},{name:'msg_time',value:'msg_time'},{name:'product_area_name',value:'product_area_name'},{name:'event_src_ip',value:'event_src_ip'},{name:'event_id',value:'event_id'}]);
       this.$refs.poi.doExport("/ssa/authority/userCfg/export.do")

     },
     tabsClick(tab){
        this.$store.commit("setAuthState",tab.name);
        this.qryUser();
     },
     resetPwd(){
       var rows = this.$store.state.editTable[this.tableId].multipleSelection;

       if(rows.length<=0){
         this.$alert("请先选中用户");
         return;
       }

       this.$confirm('此操作将重置密码, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() =>
       {
               var user_ids = [];
               rows.forEach(row=>{
                 user_ids.push(row.userId);
               })
              var ids = user_ids.join(",");
              var msg = await   this.common.reqDef(this.resetPwdUrl,{ids:ids});
              this.$message({   type: 'success',     message: msg.message   });
       })
     },
     beforeUpload(file) {
       let lastname = file.name.substring(file.name.length-4);
       if(lastname !== 'xlsx') {
         this.$alert('文件格式错误！');
         return false;
       }
     },
    downloadTemplate() {
       var fileUrl = "/ssa/authority/userCfg/downloadTemplate.do";
       window.location.href = fileUrl;
     },
     handleSuccess(response, file, fileList) {
       let rs = response.result;
       if(response.state){
         if(rs.error==='empty'){
           this.$message({ type: 'error', message: rs.errmsg});
         }else if (rs.error==='format') {
           this.errorList = rs.wrongList;
           this.formatError = true;
         }else {
           this.$message({type: 'success', message: rs});
           this.$store.dispatch('reloadTable', this.tableId);
         }

        }else{
          this.$message({ type: 'error', message: rs});
        }
     },

     qryUser(){
       this.$store.commit('setParams',[this.tableId,this.params]);
       this.$store.dispatch('reloadTable',this.tableId);
     },
     addRow(){
       let row = {userId:-1};
       row.tableId = this.tableId;
       row.roleList = this.roleList;
       row.orgList = this.orgList;
      // window.top.setCrumb({name:"添加"});
       this.$router.push({name:'userForm', params:row }) ;
      //  var newRow = {user_id:-1,role_id:null};
        //this.$store.dispatch('addRow',[this.tableId,newRow]);
     },
     async delCheckedRows(){
       //console.log(this.selectedOptions)
       var rows = this.$store.state.editTable[this.tableId].multipleSelection;

       if(rows.length<=0){
         this.$alert("请先选中用户");
         return;
       }

       this.$confirm('此操作将删除该行, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() =>
       {
               var user_ids = [];
               rows.forEach(row=>{
                 user_ids.push(row.userId);
               })
              var ids = user_ids.join(",");
              var msg = await   this.common.req(this.delSelectedUser,{ids:ids});
              await this.$store.dispatch('reloadTable',this.tableId);
              this.$message({   type: 'success',     message: msg.message   });
       })
     },

//methods end
   },
   created :async function() {

     if(window.top != window){
       this.loginUser = window.top.getLoginUser()
     }else{
       this.common.req("/ssa/main/getLoginUser.do").then(data=>{
 				 this.loginUser = data;
 			})
     }
       this.$store.dispatch('loadOrgList');
       this.$store.dispatch('loadRoleList');
  }
}
</script>
