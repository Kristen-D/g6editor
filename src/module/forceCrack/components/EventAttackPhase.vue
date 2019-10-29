<template >
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">暴破概况</h3>
      <el-tabs class="float-r day-tabs" @tab-click="changeTime" v-model="activeName">
         <el-tab-pane label="今天" name="1"></el-tab-pane>
         <el-tab-pane label="近7天" name="2"></el-tab-pane>
         <el-tab-pane label="近30天" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-white-body clearfloat" style="height:400px;!important" >
     <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top1" style="margin: 30px 10px 35px 5%;">
         <p>被盗账户数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail1}}</p>
       </div>
       </div>
       <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top2" style="margin: 30px 10px 35px 5%;">
         <p>暴破账户数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail2}}</p>
       </div>
       </div>
       <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top3" style="margin: 30px 10px 35px 5%;">
         <p>暴破IP数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail3}}</p>
       </div>
       </div>
       <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top4" style="margin: 30px 10px 35px 5%;">
         <p>通报账户数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail4}}</p>
       </div>
       </div>
       <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top5" style="margin: 30px 10px 35px 5%;">
         <p>挽回账户数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail5}}</p>
       </div>
       </div>
       <div class="index-top-panel" style="width:50%;!important">
         <div class="hit-top6" style="margin: 30px 10px 35px 5%;">
         <p>暴破累计次数</p>
         <p class="digital" style="font-size: 30px;!important">{{detailList.detail2*5}}</p>
       </div>
       </div>

  </div>
    <el-dialog :title="ipTitle" :visible.sync="ipShow" width="85%"  @close="onCloseIp()">
          <div style="height:300px">
        <ipTable :id="ipTableId" :tableUrl="tableUrl" :params="params"></ipTable>
        </div>
    </el-dialog>
    <el-dialog :title="accountTitle" :visible.sync="accountShow" width="85%" @close="onCloseAccount()">
      <div style="height:300px">
      <accountTable :id="accountTableId" :tableUrl="tableUrl" :params="params"></accountTable>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
import ipTable from './IpTable.vue'
import accountTable from './AccountTable.vue'
export default {
  components: {ipTable,accountTable},
   data(){
   				 return {
              params:{dateRange:'month'},
              detailList:[],
              activeName:'3',
              ipTitle:"IP详情",
              accountTitle:"账户详情",
              ipShow:false,
              accountShow:false,
              ipTableId:"eventIpId",
              accountTableId:"eventAccountId",
              tableUrl:"/ssa/forceCrack/getDetail1Detail.do",
   				 }
  },

    methods: {
      onCloseIp(){

      },
      onCloseAccount(){

      },
      showIpDetail(){
        this.ipTitle="撞库IP数详情";
        this.tableUrl="/ssa/forceCrack/getDetail3Detail.do";
        // this.ipShow=true;
        this.params = {...this.params};
      },
      showAccountDetail(value){
        if(value==1){
          this.tableUrl="/ssa/forceCrack/getDetail1Detail.do";
          this.accountTitle="被盗账户数详情";
        }else if(value==2){
          this.tableUrl="/ssa/forceCrack/getDetail2Detail.do";
          this.accountTitle="撞库账户数详情";
        }else if(value==4){
          this.tableUrl="/ssa/forceCrack/getDetail4Detail.do";
          this.accountTitle="通报账户数详情";
        }else if(value==5){
          this.tableUrl="/ssa/forceCrack/getDetail5Detail.do";
          this.accountTitle="挽回账户数详情";
        }
        // this.accountShow=true;
        this.params = {...this.params};
      },
      changeTime(value){
        if (value.name==1){
          this.params.dateRange="day";
        }else if(value.name==2){
          this.params.dateRange="week";
        }else if(value.name==3){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },

      async loadMapChart(){

        var data = await this.commonAjax.req("/ssa/forceCrack/getDetail.do", this.params);
        this.detailList=data;


      }

    },
  created :function() {

  },
  mounted: async function() {
      // this.$store.dispatch('reloadTable',this.ipTableId);
    this.loadMapChart();
    $(".tabs-panel > li").click(function(){
       $(this).addClass("active").siblings("li").removeClass();
    });
  }

}
</script>
