<template>
  <div id="bigscreen2">
    <div id="app">
      <header  class="header">
        <h2 class="header-title">深度威胁识别服务详情</h2>
        <i class="el-icon-arrow-left header-return" @click="$router.go(-1)"></i>
      </header>
      <br>
      <section class="container-wrap">
        <ul class="navtabs clearfloat">
          <li :class="{active:chooseTable[0].boolean}" @click="choose(0)">受威胁主机</li>
          <li :class="{active:chooseTable[1].boolean}" @click="choose(1)">漏洞利用</li>
          <li :class="{active:chooseTable[2].boolean}" @click="choose(2)">恶意软件</li>
          <li :class="{active:chooseTable[3].boolean}" @click="choose(3)">受威胁用户</li>
        </ul>
        <!-- 违规主机 -->
        <div class="el-panel-bigscreen" v-if="chooseTable[0].boolean">
          <el-table :data="threatDataDetail" height="800" style="width: 100%" class="deep-table2 moretable">
            <el-table-column prop="ip" label="受威胁主机" width="460"></el-table-column>
            <el-table-column prop="count" label="受威胁数量"></el-table-column>
          </el-table>

          <div class="pagelocation">
            <el-pagination  :current-page.sync="currentPage1" @current-change="handleCurrentChange"  :page-size="pageSize"  :current-page="pageIndex"   layout=" prev, pager, next" :total="total" class="pagination"></el-pagination>
          </div>
        </div>
        <!-- 漏洞利用 -->
        <div class="el-panel-bigscreen" v-if="chooseTable[1].boolean">
          <el-table :data="msgDataDetail" height="800" style="width: 100%" class="deep-table2 moretable">
            <el-table-column prop="eventMsg" label="漏洞名称" width="460"></el-table-column>
            <el-table-column prop="count" label="漏洞数量"></el-table-column>
          </el-table>
          <div class="pagelocation">
            <el-pagination  :current-page.sync="currentPage1" @current-change="handleCurrentChange"  :page-size="pageSize"  :current-page="pageIndex"   layout=" prev, pager, next" :total="total" class="pagination"></el-pagination>
          </div>
        </div>
        <!-- 恶意软件  -->
        <div class="el-panel-bigscreen" v-if="chooseTable[2].boolean">
          <el-table :data="malwareDataDetail" height="800" style="width: 100%" class="deep-table2 moretable">
            <el-table-column prop="malwareName" label="恶意软件描述"  width="460"></el-table-column>
            <el-table-column prop="count" label="总计警告次数"  align="center"></el-table-column>
            <el-table-column prop="infected" label="受感染主机" align="center"></el-table-column>
          </el-table>
          <div class="pagelocation">
            <el-pagination  :current-page.sync="currentPage1" @current-change="handleCurrentChange"  :page-size="pageSize"  :current-page="pageIndex"   layout=" prev, pager, next" :total="total" class="pagination"></el-pagination>
          </div>
        </div>
        <!-- 受威胁用户 -->
        <div class="el-panel-bigscreen" v-if="chooseTable[3].boolean">
          <el-table :data="ThreatenedUser" height="800" style="width: 100%" class="deep-table2 moretable">
            <el-table-column prop="file" label="文件" width="460"></el-table-column>
            <el-table-column prop="number" label="受威胁数" ></el-table-column>
          </el-table>
        </div>
        <!-- C2侦测 -->
        <div class="el-panel-bigscreen" v-if="chooseTable[4].boolean">
          <el-table :data="CTowDetection" height="800" style="width: 100%" class="deep-table2 moretable">
            <!-- <el-table-column prop="file" label="文件" width="460"></el-table-column>
            <el-table-column prop="number" label="受威胁数" ></el-table-column> -->
          </el-table>
        </div>
        <!-- 告警分布协议 -->
        <div class="el-panel-bigscreen" v-if="chooseTable[5].boolean">
          <el-table :data="ThreatenedUser" height="800" style="width: 100%" class="deep-table2 moretable">
            <!-- <el-table-column prop="file" label="文件" width="460"></el-table-column>
            <el-table-column prop="number" label="受威胁数" ></el-table-column> -->
          </el-table>
        </div>
      </section>


    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      getThreatDataDetailUrl:"/ssa/depThreatPerception/getThreatDataDetail.do",
      getMalwareDataDetailUrl:"/ssa/depThreatPerception/getMalwareDataDetail.do",
      getMsgDataDetailUrl:"/ssa/depThreatPerception/getMsgDataDetail.do",
      date:'',
      pageSize: 18,
      pageIndex: 1,
      total:20,
      index:'',
      threatDataDetail:[],
      malwareDataDetail:[],
      msgDataDetail:[],
      //判断选择
      chooseTable:[
        {boolean:false},
        {boolean:false},
        {boolean:false},
        {boolean:false},
        {boolean:false},
        {boolean:false}],
      //违规主机参数
      IllegalHost:[
				{
					ip:'',
					quota:''
				}
			],
      ZeroDayMalware:[
        {
          file:'',
          sha1:'',
          infected:''
        }
      ],
      MaliciousSoftware:[{

      }],
      ThreatenedUser:[{
					file:'',
					number:''
			}],
      CTowDetection:[{

      }],
      AlarmDistributionProtocol:[{

      }],

    }
  },
  methods:{
    getMsgDataDetail(param){
      var params = {day:param, pageSize:this.pageSize, pageIndex:this.pageIndex};
      this.common.reqDef(this.getMsgDataDetailUrl, params).then(data => {
      this.msgDataDetail = data.data.rowData;
      this.total = data.data.total;
     })
    },

    getMalwareDataDetail(param){
      var params = {day:param, pageSize:this.pageSize, pageIndex:this.pageIndex};
      this.common.reqDef(this.getMalwareDataDetailUrl, params).then(data => {
      this.malwareDataDetail = data.data.rowData;
      this.total = data.data.total;
     })
    },
    getThreatDataDetail(param){

        var params = {day:param, pageSize:this.pageSize, pageIndex:this.pageIndex};
        this.common.reqDef(this.getThreatDataDetailUrl, params).then(data => {
        this.threatDataDetail = data.data.rowData;
        this.total = data.data.total;
       })
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      if(this.index === 0){

        this.getThreatDataDetail(this.date);
      }else if(this.index === 1){
        this.getMsgDataDetail(this.date);
      }else if (this.index === 2) {
        this.getMalwareDataDetail(this.date);
      }

    },


    getAllCTowDetection(){
      this.$message({
        message: '暂无数据',
        type: 'warning'
      });
    },
    getAllAlarmDistributionProtocol(){
      this.$message({
        message: '暂无数据',
        type: 'warning'
      });
    },

    //选择表格
    choose(params){
      this.index = params;
      //判断参数
      if(typeof(params) == 'undefined'){
        params = 0;
      }
      for(var i=0;i<this.chooseTable.length;i++){
        if(i != params){
          this.chooseTable[i].boolean = false;
        }else if (i == params) {
          this.chooseTable[i].boolean = true;
        }
      }
      if(this.$route.params.date === 'month'){
        if(params==0){
          this.getThreatDataDetail(30);
          this.date = 30;
        }else if(params==1){
          this.getMsgDataDetail(30);
          this.date = 30;
        }else if(params==2){
          this.getMalwareDataDetail(30);
          this.date = 30;
        }else if(params==3){

        }else if(params==4){

        }else if(params==5){

        }
      }else {
        if(params==0){
          this.getThreatDataDetail();
          this.date = '';
        }else if(params==1){
          this.getMsgDataDetail();
          this.date = '';
        }else if(params==2){
          this.getMalwareDataDetail();
          this.date = '';
        }else if(params==3){

        }else if(params==4){

        }else if(params==5){

        }
      }

    },

  },
  mounted: function() {
    this.choose(this.$route.params.chooseParams);
    this.index = this.$route.params.chooseParams;
    if(this.$route.params.date === 'month'){
      this.date = 30;
    }else{
      this.date = '';
    }

  }
}
</script>

<style>
/**********  Pagination **********/
.pagelocation{text-align: right;margin: 20px; margin-right: 10px; }
.pagination.el-pagination .el-pager li {
    margin: 0;
    background-color: #04060e;
    border: thin solid #139799;
    color: #1fe0e2;
    min-width: 26px;
    border-radius: 0;
}
.pagination.el-pagination .el-pager li.active {background-color: #38bcc3;color: #000;}
.pagination.el-pagination  .btn-prev,
.pagination.el-pagination .btn-next{margin:0; background-color: #15858c; border: thin solid #139799;}
.pagination.el-pagination .btn-prev >i,
.pagination.el-pagination .btn-next >i{color: #000;}
</style>
