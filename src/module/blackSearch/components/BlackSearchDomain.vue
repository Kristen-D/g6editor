<template>
  <div class="content">
<div class="container-fluid">
            <div class="el-panel">
                 <span class="left-top"></span><span class="left-bottom"></span>
                 <span class="right-top"></span><span class="right-bottom"></span>
                 <div class="el-panel-body shine">
                    <ul class="search-list">
                       <li>
                        <span class="circle circle-green"></span>
                        <label>Domain</label>
                        <span class="text-danger">{{DomainInfo.domain}}</span>
                       </li>
                    </ul>
                 </div>
          </div>

          <div class="el-panel">
                	<span class="left-top"></span><span class="left-bottom"></span>
      		         <span class="right-top"></span><span class="right-bottom"></span>
               	<div class="el-panel-body shine">
                				<el-tabs v-model="activeName" class="labeltabs tabottom m-b-40">
                					<el-tab-pane label="威胁情报" name="first">
                					    <ul class="search-list">
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>首次出现</label>
                								<span>{{DomainInfo.first_seen}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>末次出现</label>
                								<span class="">{{DomainInfo.last_seen}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>得分</label>
                								<span class="">{{DomainInfo.score}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>级别</label>
                								<span class="">{{fmtLevel(DomainInfo.level)}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>分类</label>
                								<span class="">{{DomainInfo.category}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>类别</label>
                								<span class="">{{DomainInfo.type}}</span>
                							 </li>
                							  <li>
                								<span class="circle circle-green"></span>
                								<label>Suffix</label>
                								<span class="">{{DomainInfo.suffix}}</span>
                							 </li>
                						</ul>
                					</el-tab-pane>
                					<el-tab-pane label="端口与服务" name="second">
                						 <ul class="search-list">
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>端口</label>
                								<span>{{DomainInfo.ports}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>服务</label>
                								<span class="">{{DomainInfo.service}}</span>
                							 </li>
                						</ul>
                					</el-tab-pane>
                          <el-tab-pane label="whois历史记录" name="third">
                            <el-table :data="whoIsData"  style="width: 100%" class="blue-table">

                                  <el-table-column label="更新时间"  prop="updated_date" align="center" show-overflow-tooltip >
                                    <template   scope="scope">
                                       <el-button    type="text" @click="showDetail(scope.row,data)" >{{fmtColumn(scope.row,"updated_date")}}</el-button>
                                    </template>
                                  </el-table-column>

                                  <el-table-column label="注册人"  prop="registrant_name" align="center" show-overflow-tooltip >  </el-table-column>

                                  <el-table-column label="注册人电话"  prop="registrant_phone" align="center" show-overflow-tooltip  > </el-table-column>

                                  <el-table-column label="注册人邮箱"  prop="registrant_email" align="center" show-overflow-tooltip  >    </el-table-column>
                           </el-table>
                					</el-tab-pane>
                				</el-tabs>
               	</div>
       </div>
</div>
</div>
</template>

<script>

export default {
  components: {},
  computed: {

  },
  data() {
    return {
      activeName:'first',
      DomainInfo:{},
      whoIsData:[],
      data:{},

    }
  },
  methods: {
    fmtColumn(row,key){
      var col = row[key];
      return col;
    },
    showDetail(row,data){
        this.$router.push({name:'searchWhoIsForm', params:{whoIsData:row,data:data} })

      },
    fmtLevel(level){
      if(level===1){return '低'};
      if(level===2){return '中'};
      if(level===3){return '高'};
      if(level===4){return '极高'};
    },

  },
  created: function() {

    if (this.$route.params) {
    this.data = this.$route.params
    this.DomainInfo = this.$route.params.domainData;
    this.whoIsData = this.$route.params.whoIsData
    if (this.DomainInfo==null) {
      this.DomainInfo = {}
    }
    let DomainInfo = JSON.stringify(this.DomainInfo);
    sessionStorage.DomainInfoData = DomainInfo;
    }
  },
  destroyed: function() {
    sessionStorage.removeItem('DomainInfoData');
  }

}
</script>

<style scoped="">

</style>
