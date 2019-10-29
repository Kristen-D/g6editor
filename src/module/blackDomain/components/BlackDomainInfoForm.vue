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
                        <span class="text-danger">{{blackDomainInfoForm.domain}}</span>
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
                								<span>{{blackDomainInfoForm.firstSeen}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>末次出现</label>
                								<span class="">{{blackDomainInfoForm.lastSeen}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>得分</label>
                								<span class="">{{blackDomainInfoForm.score}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>级别</label>
                								<span class="">{{blackDomainInfoForm.levelName}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>分类</label>
                								<span class="">{{blackDomainInfoForm.category}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>类别</label>
                								<span class="">{{blackDomainInfoForm.type}}</span>
                							 </li>
                							  <li>
                								<span class="circle circle-green"></span>
                								<label>Suffix</label>
                								<span class="">{{blackDomainInfoForm.suffix}}</span>
                							 </li>
                						</ul>
                					</el-tab-pane>
                					<el-tab-pane label="端口与服务" name="second">
                						 <ul class="search-list">
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>端口</label>
                								<span>{{blackDomainInfoForm.ports}}</span>
                							 </li>
                							 <li>
                								<span class="circle circle-green"></span>
                								<label>服务</label>
                								<span class="">{{blackDomainInfoForm.service}}</span>
                							 </li>
                						</ul>
                					</el-tab-pane>
                          <el-tab-pane label="whois历史记录" name="third">
                                <el-table :data="blackDomainInfoForm.whoIsData"  style="width: 100%" class="blue-table">

                                      <el-table-column label="更新时间"  prop="updated_date" align="center" show-overflow-tooltip >
                                        <template   scope="scope">
                                           <el-button    type="text" @click="showDetail(scope.row,blackDomainInfoForm)" >{{fmtColumn(scope.row,"updated_date")}}</el-button>
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
      blackDomainInfoForm:'',

    }
  },
  methods: {
    fmtColumn(row,key){
      var col = row[key];
      return col;
    },
    showDetail(row,blackDomainInfoForm) {
      this.$router.push({name:'whoIsForm', params:{whoIsData:row,domainData:blackDomainInfoForm} })
    },

  },
  created: function() {
    // if (sessionStorage.blackDomainInfoFormData) {
    //   this.blackDomainInfoForm = JSON.parse(sessionStorage.blackDomainInfoFormData);
    // }else{
    this.blackDomainInfoForm = this.$route.params
    let blackIpInfo = JSON.stringify(this.blackDomainInfoForm);
    sessionStorage.blackDomainInfoFormData = blackIpInfo;
    // }
  },
  destroyed: function() {
    sessionStorage.removeItem('blackDomainInfoFormData');
  }

}
</script>

<style scoped="">

</style>
