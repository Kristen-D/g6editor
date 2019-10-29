<template>
<div class="">
    <el-table :data="defConf.tableData"  style="width: 100%" class="blue-table">

          <el-table-column  :label="item.label" v-for="item in checkList" show-overflow-tooltip  align="center" >

            <template   scope="scope">
              <a v-if="item.value==='ip'"><i class="circle circle-green"></i>
                                           <span>{{fmtColumn(scope.row,item.value)}} </span></a>
                <a v-else>   {{fmtColumn(scope.row,item.value)}}  </a>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="260" >
                 <template scope="scope">
                      <el-button type="text" @click="showDetail(scope.row) " style="color:#00a0fe; ">查看</el-button>
                 </template>
          </el-table-column>

          <div slot="empty" >
                  <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
                    <i class="el-icon-document"></i> 没有相关数据！
                  </div>

                  <div class="" v-if="'wrong' === defConf.loading">
                    <i class="el-icon-warning"></i> 数据加载错误！ 点击
                    <el-button type="text" @click="refresh">刷新</el-button>
                  </div>

                  <div class="" v-if="'load' === defConf.loading">
                    <i class="el-icon-loading"></i> 正在读取数据，请稍后...
                  </div>
          </div>

  </el-table>
  <div class="pagelocation m-b-100">
					   <span>每页显示</span>
					   <el-pagination :current-page.sync="defConf.pageIndex" @size-change="handleSizeChange" @current-change="handleCurrentChange"  background  layout="sizes, prev, pager, next" :total="defConf.total" class="pagination" :page-size="defConf.pageSize" >
              </el-pagination>
  </div>


  <!-- <el-dialog title="恶意域名" style="overflow:inherit" @close="closeDialog" :visible.sync="dialogVisible"class="dialog-panel">
    <div class="dialog-Container shine" >
                <table class="dialog-table" cellSpacing="0" cellPadding="0" width="100%">
                          <tr>
                                <td width="50%">域名</td>
                                <td>{{blackDomainInfoForm.domain}}</td>
                          </tr>
                          <tr>
                                <td width="50%">来源</td>
                                <td>{{blackDomainInfoForm.source}}</td>
                          </tr>
                          <tr>
                                <td width="50%">采集时间</td>
                                <td>{{blackDomainInfoForm.collectDate}}</td>
                          </tr>
                          <tr>
                                <td width="50%">更新时间</td>
                                <td>{{blackDomainInfoForm.updateDate}}</td>
                          </tr>
                          <tr>
                                <td width="50%">分类</td>
                                <td>{{blackDomainInfoForm.type}}</td>
                          </tr>
                          <tr>
                                <td width="50%">风险等级</td>
                                <td>{{blackDomainInfoForm.levelName}}</td>
                          </tr>
                          <tr>
                                <td width="50%">得分</td>
                                <td>{{blackDomainInfoForm.score}}</td>
                          </tr>
                          <tr>
                                <td width="50%">首次出现时间</td>
                                <td>{{blackDomainInfoForm.firstSeen}}</td>
                          </tr>
                          <tr>
                                <td width="50%">末次出现时间</td>
                                <td>{{blackDomainInfoForm.lastSeen}}</td>
                          </tr>
                </table>
    </div>
  </el-dialog> -->
</div>
</template>

<script>

export default {
  components: {},
  props: ['checkList', 'id'],
  computed: {

  },
  data() {
    return {
      defConf: {},
      addShow:false,
      blackDomainInfoForm:'',

    }
  },
  methods: {
    fmtColumn(row,key){
      var col = row[key];
      if(key==='level'){
        col = this.fmtLevel(row)
      }
      return col;
    },
    fmtLevel(row){
      if(row.level===0){return ''};
      if(row.level===1){return '低'};
      if(row.level===2){return '中'};
      if(row.level===3){return '高'};
      if(row.level===4 || row.level===5){return '极高'};
    },
    closeDialog() {
      this.addShow = false;
    },
  async  showDetail(row){
      if(row.level===0){row.levelName=""};
      if(row.level===1){row.levelName="低"};
      if(row.level===2){row.levelName="中"};
      if(row.level===3){row.levelName="高"};
      if(row.level===4 || row.level===5){row.levelName="极高"};
    let data = await this.common.req("/ssa/blackDomain/getSolrQuery.do", {"domain": row.domain}, this);//测试域名"bashas.com"

      this.$router.push({name:'blackDomainInfoForm', params:{...row,whoIsData:data} })

    },

    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },
    filterType(value, row) {
      return row.type === value;
    },
    //默认的方法,基本无需修改

    cancelEdit() {
      this.$store.commit('cancelEdit', this.id);
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },
    handleSizeChange(val) {
      this.$store.dispatch('handleSizeChange', [this.id, val]);
    },

  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/blackDomain/queryBlackDomainInfo.do",
      params: {},
    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>

<style scoped="">

</style>
