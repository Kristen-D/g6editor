<template>
  <div>
    <div class = "el-panel-heading flexBetween">
      <!-- 演示临时修改一下 -->
<!--      <label class = "el-panel-title">云主机列表</label>-->
<!--      <div>-->
<!--        <el-button type = "primary" size = "small" plain @click = "addResource">创建云主机</el-button>-->
<!--        <el-button type = "primary" size = "small" plain @click = "deleteResourceBatch">删除</el-button>-->
<!--      </div>-->
      <label class = "el-panel-title">安全服务列表</label>
      <div>
        <el-button type = "primary" size = "small" plain @click = "demo">启动</el-button>
        <el-button type = "primary" size = "small" plain @click = "demo">停止</el-button>
      </div>
      <!-- 演示临时修改一下 -->
    </div>
<!--表格布局-->
    <el-table :id = "tableId" :data = "tableConf.tableData" v-loading = "tableConf.load"
              element-loading-spinner = "el-icon-loading" stripe @selection-change = "handleSelectionChange">
      <el-table-column type = "selection">
      </el-table-column>
      <el-table-column label = "名称" align = "center" prop = "name">
        <template slot-scope="scope">
          <div style = "cursor: pointer;color: #409eff" @click = "showResourceDetail(scope.row)">
            {{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="平台" align="center" prop="platform">
      </el-table-column>
      <el-table-column label="云主机类型" align="center" prop="type">
        <template slot-scope="scope">
          {{typeStateFmt(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="虚拟化类型" align="center" prop="hypervisorType">
      </el-table-column>
      <el-table-column label="CPU核心数量" align="center" prop="cpuNum">
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          {{statusStateFmt(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="内存容量" align="center" prop="memorySize">
        <template slot-scope="scope">
          {{sizeFormat(scope.row.memorySize)}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column label="同步时间" align="center" prop="syncTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.syncTime)}}
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center">-->
<!--        <template scope="scope">-->
<!--          <span title="删除" @click="deleteResource(scope.row)" style="cursor: pointer;"><i class="el-icon-delete"></i></span>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
        }
      },

      methods:{
          dateTimeFormat(time){
              return TimeFormat(time);
          },
        // 演示临时修改一下 ------
        demo: function(){
          this.$message({
            // message: msg,
            message: "Success",
            type: 'success'
          });
        },
        // 演示临时修改一下  ------
        addResource: function(){
          var params = {};
          params.handle = 'add';
          this.$router.push({
            name : "instanceForm",
          })
        },

        deleteResource: function(row){
            // console.log('点击每行的删除按钮')
            this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              var id = row.id;
              var param = {'id': id};
              var msg = await this.utils.reqObjBackState("/sdsec/web/respool/instance/deleteInstance", {'id': id}, this);
                this.$message({
                // message: msg,
                message: "Success",
                type: 'success'
              });
              this.$store.dispatch('reloadTable', this.tableId);
            })
        },
        deleteResourceBatch: function () {//待改
          // console.log('点击批量删除按钮')
            var rows = this.$store.state.context[this.tableId].multipleSelection;
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
              var ids = [];
              rows.forEach(row => {
                ids.push(row.id);
              });
              var msg = await this.utils.reqObjBackState("/sdsec/web/respool/instance/deleteInstance", {'ids':ids}, this);
              this.$message({
                type: 'success',
                message: "Success"
              });
              // this.$store.dispatch('reloadTable', this.tableId);
                this.refreshTable();
            })
          },
        showResourceDetail: function (row) {
            this.$router.push({path: 'instanceDetail/'+row.id})
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
        typeStateFmt:function(type){
            var str = '';
            if(type){
              if(type == 'UserVm'){
                str = 'UserVm';
              }else if(type == 'ApplianceVm'){
                str = 'ApplianceVm';
              }
            }
            return str;
          },
          statusStateFmt: function (deliverableStatus) {
              var str = '';
              if (deliverableStatus) {
                  if ('Deploying' === deliverableStatus) {
                      str = '部署中';
                  } else if ('Deployed-success' === deliverableStatus) {
                      str = '部署成功';
                  } else if ('Deployed-fail' === deliverableStatus) {
                      str = '部署失败';
                  } else if ('Delete-fail' === deliverableStatus) {
                      str = '删除失败';
                  }else if ('Additional-recording' === deliverableStatus) {
                      //Delete-fail, Additional-recording之后要改统一起来
                      // 演示临时修改一下 ------
                      // 补录是什么意思？ 换一个词
                      str = '运行中';
                  }
              }
              return str;
          },
        sizeFormat:function(byte){
            var size = "";
            size = (byte/(1024 * 1024 * 1024)).toFixed(2) + "GB";
            return size;
        },
          refreshTable(){
              var tableConf = {
                  total: 0,
                  tableData: [],
                  pageSize: 10,
                  pageIndex: 1,
                  load : true,
                  tableUrl: "/sdsec/web/respool/instance/pageQueryInstancesDetail",
                  params: {
                      "orderBy":["create_time"],
                      "orderType":"desc"
                  },
                  multipleSelection: [],
              }
              this.$store.commit('registerConf', [this.tableId, tableConf]);
              this.tableConf = this.$store.state.context[this.tableId];
              this.$store.dispatch('reloadTable', this.tableId);

          }
      },

      created:function () {
          this.refreshTable();

        // console.log(this.tableId);


      }
    }
</script>

<style scoped>

</style>
