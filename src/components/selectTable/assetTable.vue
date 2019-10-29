<template>
    <div class="whitebackground">
      <div :class="['ordinary-search', 'clearfloat']">
        <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
          <el-form-item class="m-b-0">
            <el-select clearable placeholder="操作系统" v-model="simpleQueryForm.osId">
              <el-option-group
                v-for="group in assetOs"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="m-b-0">
            <el-input clearable placeholder="资产名称" v-model="simpleQueryForm.assetName"></el-input>
          </el-form-item>
          <el-form-item class="m-b-0">
            <el-input clearable placeholder="IP地址" v-model="simpleQueryForm.assetIp"></el-input>
          </el-form-item>
          <el-form-item class="m-b-0">
            <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :id="tableId" :data="tableConf.tableData" v-loading ="tableConf.load" @clearSelection="clearSelect"
                ref="assetTable" element-loading-spinner="el-icon-loading" stripe @select="handleSelectionChange" @select-all="handleSelectAll">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="资产名称" align="center" prop="assetName">
        </el-table-column>
        <el-table-column label="IP地址" align="center" prop="vip">

        </el-table-column>
        <el-table-column label="资产类型" align="center" prop="type2Name">
        </el-table-column>
        <el-table-column label="操作系统" align="center" prop="osName">
        </el-table-column>
        <el-table-column label="业务系统" align="center" prop="bizName">
        </el-table-column>
      </el-table>

      <div style="text-align: right;">
        <el-pagination :current-page.sync="tableConf.pageIndex" background
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       layout="total,sizes, prev, pager, next, jumper"
                       :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
      </div>
      <div style="margin-top: 40px;text-align: right;">
        <el-button size="small" type="primary" plain @click="confirm">确定</el-button>
        <el-button size="small" plain @click="cancel">取消</el-button>
      </div>
    </div>
</template>

<script>
  import common from '../js/common'
    export default {
      data(){
        return{
          simpleQueryForm : {
            assetName : '',
            assetIp : '',
            osId: ''
          },
          assetOs:[],
          assetOsUrl : '/ssa/asset/listAssetOs4select.do',

          tableConf :{
            total: 0,
            tableData: [],
            pageSize: 10,
            pageIndex: 1,
            load : true,
            tableUrl: "/ssa/asset/pageAsset2.do",
            params: {},
            multipleSelection: [],

          }
        }
      },
      methods : {
        cancel : function(){
          this.clearSelect();
          this.$emit('cancelAssetSelect');
        },
        confirm : function(){
          this.clearSelect();
          this.$emit('confirmAssetSelect',this.tableConf.multipleSelection);
        },
        clearSelect(){
          this.$refs.assetTable.clearSelection();
        },
        simpleQueryData : async function(){
          var params = this.simpleQueryForm;
          this.tableConf.pageSize = 10;
          this.tableConf.pageIndex = 1;
          params.pageSize = this.tableConf.pageSize;
          params.pageIndex = this.tableConf.pageIndex;
          var data =  await common.req(this.tableConf.tableUrl, params);
          this.tableConf.tableData = data.rowData;
          this.tableConf.total = data.total;
          this.tableConf.load = false;

        },
        handleSelectAll(selection){
          if(selection.length > 0){
            selection.forEach(item => {
              var flag = false;
              this.tableConf.multipleSelection.forEach(data =>{
                if(item.id == data.id){
                  flag = true;
                }
              })
              if(!flag){
                this.tableConf.multipleSelection.push(item);
              }
            })
          }
        },
        handleSelectionChange(selection,row) {
          debugger;
          if(selection.length > 0){
            var flag = false;
            this.tableConf.multipleSelection.forEach(item =>{
              if(item.id == row.id){
                flag = true;
              }
            })
            if(!flag){
              this.tableConf.multipleSelection.push(row);
            }
          }else{
            for(var i = 0; i < this.tableConf.multipleSelection.length; i++){
              if(this.tableConf.multipleSelection[i].id == row.id){
                this.tableConf.multipleSelection.splice(i,1);
              }
            }

          }
          console.log(this.tableConf.multipleSelection)
        },
        async handleCurrentChange(pageIndex){
          var params = {};
          this.tableConf.pageIndex = pageIndex;
          params.pageIndex = this.tableConf.pageIndex;
          var data =  await common.req(this.tableConf.tableUrl, params);
          this.tableConf.tableData = data.rowData;
          this.tableConf.total = data.total;
          this.tableConf.load = false;
        },
        async handleSizeChange(pageSize){
          var params = {};
          this.tableConf.pageSize = pageSize;
          params.pageSize = this.tableConf.pageSize;
          var data =  await common.req(this.tableConf.tableUrl, params);
          this.tableConf.tableData = data.rowData;
          this.tableConf.total = data.total;
          this.tableConf.load = false;
        },
      },
      created :  async  function(){


        var param = {};
        this.assetOs =  await  common.req(this.assetOsUrl,param);
        var data =  await common.req(this.tableConf.tableUrl, param);
        this.tableConf.tableData = data.rowData;
        this.tableConf.total = data.total;
        this.tableConf.load = false;
      }
    }
</script>

<style scoped>

</style>
