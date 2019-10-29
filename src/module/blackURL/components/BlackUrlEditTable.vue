<template>
  <div  class="">
    <el-table    :data="tableData" ref="URLTable"  style="width: 100%" class="blue-table"  >
      <!-- <el-table-column  show-overflow-tooltip="true" :label="item.label" v-for="item in checkList"  align="left" >

        <template   scope="scope">
            <a v-if="item.value==='url'"><i class="circle circle-green"></i>
					                               <span >{{fmtColumn(scope.row,item.value)}} </span></a>
            <a v-else>   {{fmtColumn(scope.row,item.value)}}  </a>
        </template>
      </el-table-column> -->
      <el-table-column  prop="url"  label="url"  show-overflow-tooltip>
        <template scope="scope">
								 <i class="circle circle-green"></i>
								 <span>{{ scope.row.url }}</span>
							</template>
      </el-table-column>
      <el-table-column  label="类型" prop="type" show-overflow-tooltip >
      </el-table-column>
      <el-table-column  label="来源"  prop="source" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="等级"   show-overflow-tooltip >
        <template scope="scope">
            <div>
              <span style="margin-left: 10px">{{ fmtLevel(scope.row.level) }}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column  label="得分" prop="score"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column  label="首次出现时间"  prop="firstSeen"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column  label="采集时间"  prop="collect_date" show-overflow-tooltip >
      </el-table-column>
      <el-table-column label="操作" align="left" width="100"  >
        <template scope="scope">
             <el-button type="text"  @click="showDetail(scope.row) ">查看</el-button>
        </template>
      </el-table-column>

      <div slot="empty" >
              <div class="" v-if="(!this.tableData || this.tableData.length === 0) && 'loaded' === this.loading">
                <i class="el-icon-document"></i> 没有相关数据！
              </div>
              <div class="" v-if="'wrong' === this.loading">
                <i class="el-icon-warning"></i> 数据加载错误！ 点击
                <el-button type="text" @click="refresh">刷新</el-button>
              </div>
              <div class="" v-if="'load' === this.loading">
                <i class="el-icon-loading"></i> 正在读取数据，请稍后...
              </div>
      </div>
  </el-table>
    <div class="pagelocation m-b-100 ">
  					   <span>每页显示</span>
  					   <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="sizes, prev, pager, next"
               :total="total" class="pagination" :page-size="params.pageSize" :current-page.sync="params.pageIndex" background>
                </el-pagination>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import tableCommon from 'components/table/tableCommon.js'
export default {
  components: { },
    data(){
        return {
          row:{},
          detail:false,
        }

    },
  props:['params','checkList'],
  mixins:[tableCommon],
  computed:{
    ...mapState({

   })
  },
   methods:{
     fmtColumn(row,key){
       var col = row[key];

       return col;
     },
     showDetail(row) {
       this.$router.push({name:'urlInfoForm', params:row });
     },
     getTableColunms(){
       let poi_columns =  this.common.getTableColunms(this.$refs.URLTable) ;
       return poi_columns;
     },
     //处理翻页时候的事件
     handleCurrentChange(pageIndex){
       this.params.pageIndex = pageIndex;
       this.loadTable();
     },
     handleSizeChange(val) {
      //  this.$store.dispatch('handleSizeChange', [this.id, val]);
       this.params.pageSize = val;
       this.loadTable();
     },
     fmtLevel(val){
       if (val==0){return ""};
       if(val===1){return '低'};
       if(val===2){return '中'};
       if(val===3){return '高'};
       if(val===4|| val==5){return '极高'};

     },
     loadTable(){
        this.loading = true;
        var params=this.params;
        if(params.collect_date){
        params.st=this.common.formatDate(params.collect_date[0]);
        params.et=this.common.formatDate(params.collect_date[1]);
      }
      if(params.first_seen){
        params.firstSeenSt=this.common.formatDate(params.first_seen[0]);
        params.firstSeenEt=this.common.formatDate(params.first_seen[1]);
      }
        this.common.req( this.tableUrl,this.params).then(data=>{
           this.tableData = data.rowData;
           this.total = data.total;
           this.loading = false;
        });
     },
     closeDialog(){
       this.detail = false;
     },

   },
   created :function() {
     // var defConf = {
     //   total: 0,
     //   loading: false,
     //   tableData: [],
     //   pageSize: 10,
     //   pageIndex: 1,
     //   editRowIndex: -1,
     //   editRowTemp: {},
     //   multipleSelection: [],
     //   //默认ajax属性
     //   tableUrl: "/ssa/blackURL/getListToGrid.do",
     //   params: {},
     // };
     // this.$store.commit('registerConf', [this.id, defConf]);
     // this.defConf = this.$store.state.editTable[this.id];
     // this.$store.dispatch('reloadTable', this.id);
     this.$watch('params', params => {
       this.params = params;
     }, { deep:true })
     this.tableUrl = "/ssa/blackURL/getListToGrid.do";
     this.loadTable();

  }
}
</script>
<style>

.dialog-table{color: #47a8f1;line-height: 30px;border-collapse: collapse;border-top: 1px solid #2d6a98;font-size: 12px;margin: 30px 0;}
.dialog-table tr{border-bottom: 1px solid #2d6a98;}
.dialog-table tr:nth-child(odd){background-color: #0c2e49;}
.dialog-table tr td{padding-left: 20px;}
.dialog-table tr td:first-child{border-right: 1px solid #2d6a98;text-align: right;padding-right: 20px;}

</style>
