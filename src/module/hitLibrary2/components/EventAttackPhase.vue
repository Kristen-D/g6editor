<template >
  <div>
  <div class="el-panel">
			<div class="el-panel-heading">
				<h4 class="el-panel-title">攻击阶段</h4>
				<el-tabs class="float-r day-tabs"  @tab-click="changeTime" v-model="activeName">
					 <el-tab-pane label="今天" name="day"></el-tab-pane>
					 <el-tab-pane label="近7天" name="week"></el-tab-pane>
					 <el-tab-pane label="近30天" name="month"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="el-panel-body">
				 <ul class="ul-hit clearfloat">
           <li>
 						<div class="data">
 							 <div class="data-left icon4"></div>
 							 <div class="data-right">
 								<p>撞库累计次数</p>
 								<p class="digital" @click="showDetail(5)"  style="cursor:pointer;!important"><span class="figure">{{detailList.detail5}}</span></p>
 							 </div>
 						</div>
 					</li>

					<li>
						<div class="data">
							 <div class="data-left icon1"></div>
							 <div class="data-right">
								<p>撞库账户数</p>
								<p class="digital" @click="showDetail(2)"  style="cursor:pointer;!important" ><span class="figure">{{detailList.detail2}}</span></p>
							 </div>
						</div>
					</li>
					<li>
						<div class="data">
							 <div class="data-left icon2"></div>
							 <div class="data-right">
								<p>撞库IP数</p>
								<p class="digital" @click="showDetail(3)"  style="cursor:pointer;!important"><span class="figure">{{detailList.detail3}}</span></p>
							 </div>
						</div>
					</li>
          <li>
						<div class="data">
							 <div class="data-left"></div>
							 <div class="data-right">
								<p>撞库成功数</p>
                <p class="digital" @click="showDetail(1)"  style="cursor:pointer;!important"><span class="figure">{{detailList.detail1}}</span></p>
							 </div>
						</div>
					</li>
					<li>
						<div class="data">
							 <div class="data-left icon3"></div>
							 <div class="data-right">
								<p>撞库失败数</p>
								<p class="digital" @click="showDetail(7)"  style="cursor:pointer;!important"><span class="figure">{{this.detail7}}</span></p>
							 </div>
						</div>
					</li>


				</ul>
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
              params:{dateRange:'week'},
              detailList:[],
              detail7:'',
              activeName:'week',
              ipTitle:"IP详情",
              accountTitle:"账户详情",
              ipShow:false,
              accountShow:false,
              ipTableId:"eventIpId",
              accountTableId:"eventAccountId",
              tableUrl:"",
   				 }
  },

    methods: {
      onCloseIp(){

      },
      onCloseAccount(){

      },

      showDetail(value){
        if(value==1){
          this.tableUrl="/ssa/hitLibrary2/getDetail1value.do";
          this.accountTitle="撞库成功数详情";
          this.accountShow=true;
        }else if(value==2){
          this.tableUrl="/ssa/hitLibrary2/getDetail2value.do";
          this.accountTitle="撞库账户数详情";
          this.accountShow=true;
        }else if(value==3){
          this.ipTitle="撞库IP数详情";
          this.tableUrl="/ssa/hitLibrary2/getDetail3value.do";
          this.ipShow=true;
        }else if(value==5){
          this.tableUrl="/ssa/hitLibrary2/getDetail5value.do";
          this.accountTitle="撞库累计次数详情";
          this.ipShow=true;
        }else if(value==7){
          this.tableUrl="/ssa/hitLibrary2/getDetail7value.do";
          this.accountTitle="撞库失败数详情";
          this.accountShow=true;
        }

        this.params = {...this.params};
      },
      changeTime(){
        this.params={dateRange:this.activeName};
        this.loadMapChart();
      },

      async loadMapChart(){

        var data = await this.commonAjax.req("/ssa/hitLibrary2/getDetail.do", this.params);
        this.detailList=data;
        this.detail7 = this.detailList.detail5-this.detailList.detail1;

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
