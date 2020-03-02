<template>
  <div>
    <div class = "el-panel-heading flexBetween">
      <label class = "el-panel-title">物理主机列表</label>
<!--      <div>-->
<!--        <el-button type = "primary" size = "small" plain @click = "addResource">创建</el-button>-->
<!--        <el-button type = "primary" size = "small" plain @click = "deleteResourceBatch">删除</el-button>-->
<!--      </div>-->
    </div>
<!--表格布局-->
    <el-table :id = "tableId" :data = "tableConf.tableData" v-loading = "tableConf.load"
              element-loading-spinner = "el-icon-loading" stripe @selection-change = "handleSelectionChange">
      <el-table-column type = "selection">
      </el-table-column>
      <el-table-column label = "名称" align = "center" prop = "name">
<!--        <template slot-scope="scope">-->
<!--          <div style = "cursor: pointer;color: #409eff" @click = "showResourceDetail(scope.row)">-->
<!--            {{scope.row.name}}-->
<!--          </div>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="管理节点ip" align="center" prop="manageIp">
      </el-table-column>
      <el-table-column label="虚拟化类型" align="center" prop="hypervisorType">
      </el-table-column>
      <el-table-column label="总CPU核心数" align="center" prop="totalCpuCapacity">
      </el-table-column>
      <el-table-column label="可用CPU核心数" align="center" prop="availableCpuCapacity">
      </el-table-column>
      <el-table-column label="总内存容量" align="center" prop="totalMemoryCapacity">
        <template slot-scope="scope">
          {{sizeFormat(scope.row.totalMemoryCapacity)}}
        </template>
      </el-table-column>
      <el-table-column label="可用内存容量" align="center" prop="availableMemoryCapacity">
        <template slot-scope="scope">
          {{sizeFormat(scope.row.availableMemoryCapacity)}}
        </template>
      </el-table-column>
      <el-table-column label="物理CPU核心数" align="center" prop="cpuNum">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
<!--      <el-table-column label="更新时间" align="center" prop="updateTime">-->
<!--        <template slot-scope="scope">-->
<!--          {{dateTimeFormat(scope.row.updateTime)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="同步时间" align="center" prop="syncTime">-->
<!--        <template slot-scope="scope">-->
<!--          {{dateTimeFormat(scope.row.syncTime)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" align="center">-->
<!--        <template scope="scope">-->
<!--          <span title="修改" @click="updateResource(scope.row)" style="cursor: pointer;"><i class="el-icon-edit"></i></span>-->
<!--          <span class="vert-bar-color">|</span>-->
<!--          <span title="删除" @click="deleteResourceBatch" style="cursor: pointer;"><i class="el-icon-delete"></i></span>-->
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
        addResource: function(){
          var params = {};
          params.handle = 'add';
          this.$router.push({
            name : "hostForm",
          })
        },
        updateResource: function(row){
          // console.log(id)
          var params = {id : row.id};
          // console.log(params)
          params.handle = 'update';
          this.$router.push({
            name : 'hostForm',
            params : params
          })
            // console.log('up:', params)

        },
        deleteResourceBatch: function () {
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
                let param = {
                    'ids': ids,
                    "deleted":1};
              var msg = await this.utils.reqObjBackState("/sdsec/web/respool/resourcepool/batchUpdate", param);
              this.$message({
                type: 'success',
                message: "Success"
              });
              this.$store.dispatch('reloadTable', this.tableId);
            })
          },
        showResourceDetail: function (row) {
            this.$router.push({path: 'hostDetail/'+row.id})
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

        sizeFormat:function(byte){
            var size = "";
            size = (byte/(1024 * 1024 * 1024)).toFixed(2) + "GB";
            return size;
        },
      },

      created:function () {
        var tableConf = {
          total: 0,
          tableData: [],
          pageSize: 10,
          pageIndex: 1,
          load : true,
          tableUrl: "/sdsec/web/respool/host/pageQuery",
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
    }
</script>

<style scoped>

</style>
