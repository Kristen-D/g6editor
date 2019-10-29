<template>
  <body id="bigscreen2">
  <div id="app">
  	<header  class="header">
  	    <h2 class="header-title">深度威胁识别服务详情</h2>
  	    <i class="el-icon-arrow-left header-return" @click="backMainView"></i>
  	</header>
  	<br>
  	<section class="container-wrap">
  	    <ul class="navtabs clearfloat">
          <li :class="{active:chooseTable[0].boolean}" @click="choose(0)">受威胁资产</li>
          <li :class="{active:chooseTable[1].boolean}" @click="choose(1)">威胁告警</li>
  		</ul>
  		<div class="el-panel-bigscreen" v-if="alarmShow">
  		     <el-table :data="alarmData" height="800" style="width: 100%" class="deep-table2 moretable">
  				<!-- <el-table-column prop="file" label="文件" width="460"></el-table-column>
  				<el-table-column prop="number" label="受威胁数" ></el-table-column> -->
          <el-table-column prop="alarmDesc" label="内容" show-overflow-tooltip width="440"></el-table-column>
          <el-table-column prop="dstIp" label="ip地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="威胁类型"></el-table-column>
          <el-table-column prop="time" label="时间" width="200"></el-table-column>
  		    </el-table>

          <div class="pagelocation">
            <el-pagination  :current-page.sync="currentPage1" @current-change="handleCurrentChange"  :page-size="pageSize"  :current-page="pageIndex"   layout=" prev, pager, next" :total="total" class="pagination"></el-pagination>
          </div>
  		</div>


      <div class="el-panel-bigscreen" v-if="threatShow">
           <el-table :data="threatData" height="800" style="width: 100%" class="deep-table2 moretable">
          <!-- <el-table-column prop="file" label="文件" width="460"></el-table-column>
          <el-table-column prop="number" label="受威胁数" ></el-table-column> -->
          <el-table-column prop="destIp" label="目标IP" show-overflow-tooltip width="440"></el-table-column>
          <el-table-column prop="srcIp" label="源IP" show-overflow-tooltip></el-table-column>
          <el-table-column prop="count" label="数量"></el-table-column>
          <el-table-column prop="threatName" label="威胁类型" width="200"></el-table-column>
          </el-table>

          <div class="pagelocation">
            <el-pagination  :current-page.sync="currentPage1" @current-change="handleCurrentChange"  :page-size="pageSize"  :current-page="pageIndex"   layout=" prev, pager, next" :total="total" class="pagination"></el-pagination>
          </div>
      </div>
  	</section>
  </div>

  </body>


</template>

<script>

export default {

  data(){
    return {
      getAlarmDataUrl:"/ssa/netSeSituAwareness/getAlarmData.do",
      getAlarmDataByPageUrl:"/ssa/netSeSituAwareness/getAlarmDataByPage.do",
      getThreatDataAllUrl:"/ssa/netSeSituAwareness/getThreatDataAll.do",
      //判断选择
      chooseTable:[
        {boolean:false},
        {boolean:false}
      ],
      alarmData:[],
      threatData:[],
      pageSize: 18,
      pageIndex: 1,
      total:0,
      alarmShow:false,
      threatShow:false,
      index: ''


  }
},
  methods:{
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      if(this.index === 1){
          this.getAlarmData();
      }else if(this.index === 0){
        this.getThreatDataAll();
      }

    },
    getAlarmData(){

      var params = {pageSize:this.pageSize, pageIndex:this.pageIndex};
      this.common.reqDef(this.getAlarmDataByPageUrl, params).then(data => {

      this.alarmData = data.data.rowData;

      this.total = data.data.total;
     })
   },
   getThreatDataAll(){
     var params = {pageSize:this.pageSize, pageIndex:this.pageIndex};
     this.common.reqDef(this.getThreatDataAllUrl, params).then(data => {

     this.threatData = data.data.rowData;

     this.total = data.data.total;
    })
   },

    backMainView(){
       this.$router.push({name:'mainview'});
    },
    //选择表格
    choose(params){
      this.pageIndex= 1;
      this.index =params;
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
      if(params==0){
        this.threatShow = true;
        this.alarmShow = false;
        this.getThreatDataAll();

      }else if(params==1){
        //this.getAllAlarmData();
        this.alarmShow = true;
        this.threatShow = false;
        this.getAlarmData();
      }


    },
    // getAllAlarmData(){
    //   var params = {};
    //     this.common.reqDef(this.getAlarmDataUrl, params).then(data => {
    //       this.alarmData = data.data;
    //
    //     });
    // }




},
	created: function() {
    this.index = this.$route.params.chooseParams;
    this.choose(this.index);




}
}
</script>

<style >
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
