<!--服务链列表页-->
<template>
  <div>
    <div class = "el-panel-heading flexBetween">
      <label class = "el-panel-title">服务链列表</label>
      <div>
        <el-button type = "primary" size = "small" @click = "addEditorChain">添加服务链</el-button>
        <el-button type = "primary" size = "small" @click = "addServiceChain">添加服务链</el-button>
        <el-button type = "primary" size = "small" @click = "deleteServiceChainBatch">批量删除</el-button>
        <el-button type = "primary" size = "small" @click = "startServiceChainBatch">批量启用</el-button>
        <el-button type = "primary" size = "small" @click = "stopServiceChainBatch">批量停用</el-button>
      </div>
    </div>
<!--表格布局-->
    <el-table :id = "tableId" :data = "tableConf.tableData" v-loading = "tableConf.load"
              element-loading-spinner = "el-icon-loading" stripe @selection-change = "handleSelectionChange">
      <el-table-column type = "selection">
      </el-table-column>
<!--      <el-table-column label = "服务链ID" prop = "id" align="center">-->
<!--      </el-table-column>-->

      <el-table-column label = "服务链名称" prop = "name" align="center">
      </el-table-column>
      <el-table-column label = "逻辑串联节点数" prop = "cascadeCount" align="center">
      </el-table-column>
      <el-table-column label = "逻辑旁路节点数" prop = "bypassCount" align="center">
      </el-table-column>
<!--      <el-table-column label="服务链状态" prop="state">-->
<!--        <template slot-scope="scope">-->
<!--          {{recStateFmt(scope.row.state)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" prop="status" align="center">
        <template slot-scope="scope">
          {{statusFmt(scope.row.status)}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="showServiceChainDetail(scope.row)" style="cursor: pointer;" >编辑</el-button>
          <el-button type="text" @click="deleteServiceChainBatch" style="cursor: pointer;" >删除</el-button>
          <el-button type="text" v-if ="scope.row.status =='on' "@click="stopServiceChainBatch" style="cursor: pointer;" >停用</el-button>
          <el-button type="text" v-if ="scope.row.status =='off' "@click="startServiceChainBatch" style="cursor: pointer;" >启用</el-button>
          <el-button type="text" @click="showServiceChainDetail(scope.row)" style="cursor: pointer;" >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ['tableId'],
      data(){

        return{
          pageIndex : 1,
          pageSize : 10,
          total : 30,
          tableConf : {},
          tableData:[],
        }
      },

      methods:{
        dateTimeFormat(time){
              return TimeFormat(time);
          },
        addEditorChain: function() {
          /*this.$router.push({
            name : "serviceChainForm",
          })*/
        },
        addServiceChain: function(){
          var params = {};
          params.handle = 'add';
          this.$router.push({
            name : "serviceChainForm",
          })
        },
        updateServiceChain: function(row){
          // console.log(id)
          var params = {id : row.id};
          // console.log(params)
          params.handle = 'update';
          this.$router.push({
            name : 'serviceChainForm',
            params : params
          })

        },
        deleteServiceChainBatch: async function () {
          // console.log('点击批量删除按钮')
            let rows = this.$store.state.context[this.tableId].multipleSelection;
            if (rows.length <= 0) {
              this.$alert("请选中删除数据!", {
                type: 'warning'
              });
              return;
            }
            this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
              let ids = [];
              rows.forEach(row => {
                ids.push(row.id);
              });
                let param = {
                    'ids': ids,
                    "deleted":1};
              let msg = await this.utils.reqObjBackState("/sdsec/web/serchain/servicechain/batchUpdate", param);
              this.$message({
                type: 'success',
                message: "Success"
              });
              this.$store.dispatch('reloadTable', this.tableId);
            })
          },
        startServiceChainBatch:function(){
              var rows = this.$store.state.context[this.tableId].multipleSelection;
              if (rows.length <= 0) {
                  this.$alert("请选中数据!", {
                      type: 'warning'
                  });
                  return;
              }
              // console.log('rows',rows)
              this.$confirm('此操作将启用选中条目，是否继续？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async() => {
                  var ids = [];
                  rows.forEach(row => {
                      ids.push(row.id);
                  });
                  let param = {
                      'ids': ids,
                      'status': 'off' };
                  let msg = await this.utils.reqObjBackState("/sdsec/web/serchain/servicechain/batchUpdate", param);
                  for(let i = 0; i<=rows.length; i++){
                      return rows[i].status='on'
                  }
              })

          },
        stopServiceChainBatch:function(){
            var rows = this.$store.state.context[this.tableId].multipleSelection;
            if (rows.length <= 0) {
                this.$alert("请选中数据!", {
                    type: 'warning'
                });
                return;
            }
            // console.log('rows',rows)
            this.$confirm('此操作将停用选中条目，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var ids = [];
                rows.forEach(row => {
                    ids.push(row.id);
                });
                let param = {
                    'ids': ids,
                    'status': 'on' };
                let msg = await this.utils.reqObjBackState("/sdsec/web/serchain/servicechain/batchUpdate", param);
                for(let i = 0; i<=rows.length; i++){
                    return rows[i].status='off'
                }
            })

        },
        showServiceChainDetail: function (row) {
            this.$router.push({path: 'serviceChainDetail/'+row.id})
        },
        handleSelectionChange(selectedRow){
          this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
          return;
        },
        handleSizeChange(pageSize){
          this.$store.dispatch('handleSizeChange',[this.tableId,pageSize]);
        },
        handleCurrentChange(pageIndex){
          this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
        },

        recStateFmt :function(state){
          var str = '';
          if(state){
            if(state == 'Configured-not-yet' ){
                str = '未配置策略';
            }else if(state == 'Configure-success'){
                str = '配置策略成功';
              }else if(state == 'Configuring'){
                str = '配置策略中';
              }else if(state == 'Configure-fail'){
                str = '配置策略失败';
            }else if(state == 'Configure-clear'){
                str = '配置已重载';
            }
          }
          return str;
        },
        statusFmt:function(status){
            var str = '';
            if(status){
                if(status == 'on' ) {
                    str = '已启用';
                }else if(status == 'off'){
                    str = '已停用';
                }
            }
            return str;
          },
      },
      created:async function () {
        // let loginUser;
        // await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
        //     loginUser = currentLoginUser.data
        // });
        let tableConf = {
          total: 0,
          tableData: [],
          pageSize: 10,
          pageIndex: 1,
          load : true,
          tableUrl: "/sdsec/web/serchain/servicechain/pageQuery",
          params: {
              "orderBy":["create_time"],
              "orderType":"desc",
              // "filters":{
              //     "createrId": loginUser.userId,
              //     "tenantId": loginUser.tenantId
              // },
          },
          multipleSelection: [],
        }
        this.$store.commit('registerConf', [this.tableId, tableConf]);
        this.tableConf = this.$store.state.context[this.tableId];
        this.$store.dispatch('reloadTable', this.tableId);

      }
    }
</script>

<style scoped>

</style>
