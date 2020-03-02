<template>
  <div id="app">
    <header>
        <a href="" class="logo">
        	<img src="/../static/images/cd/console/images/LOGO.png" alt="logo">
        	<span class="logo-text">成都市信息安全公共服务平台</span>
        </a>
        <el-button type="deepblue" icon="el-icon-edit" size="small" @click="dialogEdit=true">编辑</el-button>
        <el-dropdown size="medium" class="user-info">
    		<span class="el-dropdown-link">Asiainfo<i class="el-icon-arrow-down el-icon--right"></i></span>3
    		<el-dropdown-menu slot="dropdown" >
    			<el-dropdown-item>修改密码</el-dropdown-item>
    			<el-dropdown-item>退出</el-dropdown-item>
    		 </el-dropdown-menu>
        </el-dropdown>
    </header>
    <nav class="left-panel">
    	 <ul class="navigation">
    	 	 <li class="sy-console">控制台</li>
    		 <li><a href=""><i class="el-icon-menu"></i>首页</a></li>
    		 <li><a href=""><i class="el-icon-news"></i>深度威胁感知</a></li>
    		 <li  class="is-active"><a href=""><i class="el-icon-view"></i>安全巡航视图</a></li>
    		 <li><a href=""><i class="el-icon-sort"></i>钓鱼网站监控</a></li>
    		 <li><a href=""><i class="el-icon-sold-out"></i>恶意域名监控</a></li>
    		 <li><a href=""><i class="el-icon-service"></i>威胁情报</a></li>
    		 <li><a href=""><i class="el-icon-service"></i>资讯管理</a></li>
    	 </ul>
    </nav>
    <section class="content">
    	 <div class="container-fluid">
    		 <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
    			  <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
    			  <el-breadcrumb-item>漏洞监控</el-breadcrumb-item>
    		 </el-breadcrumb>
    			 <el-row :gutter="16">
    				 <el-col :span="10">
    					 <div class="el-panel">
    						 <div class="el-panel-heading">
    							 <h3 class="el-panel-title">威胁占比</h3>
                   <el-tabs class="float-r day-tabs"  v-model="threatTab" @tab-click="getThreat">
                      <el-tab-pane label="近1周" name="7"></el-tab-pane>
                      <el-tab-pane label="近1月" name="30"></el-tab-pane>
                      <el-tab-pane label="近3月" name="90"></el-tab-pane>
                   </el-tabs>
    						 </div>
    						 <div class="el-panel-body">
    							<el-row>
    								<el-col :span="14">
    									<div class="echartsbox2" id="pie1" :class="{hidden:!isOption3}">
                        <chart :options="option3"></chart>
                      </div>
    									<!--图表无数据的时候显示下面图形-->
    									<div class="echartsbox2 p-t-45" :class="{hidden:isOption3}">
    										<div class="out-circle"><div class="inner-circle"></div></div>
    									</div>
    								</el-col>
    								<el-col :span="10">
    									<div class="echartsbox2" id="pie2" :class="{hidden:!isOption3}">
                        <chart :options="option4"></chart>
                      </div>
    								    <!--图表无数据的时候显示下面图形-->
                        <div class="echartsbox2 p-t-45" :class="{hidden:isOption3}">
      										<div class="out-circle"><div class="inner-circle"></div></div>
      									</div>
    								</el-col>
    							</el-row>
    						 </div>
    					</div>
    				 </el-col>
    				 <el-col :span="14">
    					 <div class="el-panel">
    						 <div class="el-panel-heading">
    							 <h3 class="el-panel-title">漏洞分布</h3>
                   <el-tabs class="float-r day-tabs"  v-model="loopholeTab" @tab-click="getVuldis">
                      <el-tab-pane label="近1周" name="7"></el-tab-pane>
                      <el-tab-pane label="近1月" name="30"></el-tab-pane>
                      <el-tab-pane label="近3月" name="90"></el-tab-pane>
                   </el-tabs>
    						 </div>
    						 <div class="el-panel-body">
    							  <div class="echartsbox2" id="bar1">
                      <chart :options="option2"></chart>
                    </div>
    						 </div>
    					</div>
    				 </el-col>
    			 </el-row>
    			 <div class="el-panel hidden">
    				<div class="el-panel-heading">
    					<h3 class="el-panel-title">挂马</h3>
    					<el-button type="text" size="medium" class="float-r btn-more text-info">更多</el-button>
    				</div>
    				<div class="el-panel-body">
    				   <el-row :gutter="20">
    					<el-col :span="5" class="text-center">
    						<div class="md-circle m-20-auto">
                  <p class="wordA">{{hangingHorseNumber}}</p>
                  <p>挂马总数</p>
                </div>
    					</el-col>
    					<el-col :span="19">
    						  <!-- <el-table :data="hangingHorseData"  class="white-table m-20-auto">
    							  <el-table-column  prop="url"  label="挂马URL" min-width="120"></el-table-column>
    							<el-table-column  prop="describe"  label="描述" show-overflow-tooltip="true"></el-table-column>
    							<el-table-column  prop="time"  label="发生时间">
    							</el-table-column>
    						 </el-table> -->
    					</el-col>
    				   </el-row>
    				</div>
    			</div>
    			 <div class="el-panel">
    				<div class="el-panel-heading">
    					<h3 class="el-panel-title">漏洞趋势</h3>
    					<el-tabs class="float-r day-tabs"  v-model="daytabs" @tab-click="getOption1">
    						 <el-tab-pane label="近60天" name="60"></el-tab-pane>
    						 <el-tab-pane label="近180天" name="180"></el-tab-pane>
    					</el-tabs>
    				</div>
    				<div class="el-panel-body">
    					<div class="echartsbox3" id="line1">
                <chart :options="option1"></chart>
              </div>
    				</div>
    			</div>
    			 <div class="el-panel">
    				<div class="el-panel-heading">
    					<h3 class="el-panel-title">漏洞列表</h3>
    					<div class="btn-handle">
    						<el-button type="text" size="medium" class="text-info btn-download" @click="dialogDown=true"><i class="imgicon download-icon"></i>报告下载</el-button>
    					</div>
    				</div>
    				<div class="el-panel-body">
    					 <div class="search-form">
    						 <!--普通搜索-->
    						 <div class="ordinary-search" v-show="!isMoreSearch">
    							 <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
    								  <el-form-item>
                        <el-input v-model="searchParams.taskName" placeholder="全部任务名称" size="mini"></el-input>
    								  </el-form-item>
    								  <el-form-item><el-button type="primary" size="mini" @click="getDetailLoopholeData(true)">搜索</el-button></el-form-item>
    							 </el-form>
    							 <el-button type="text" id="search-tag1" @click="isMoreSearch=true" class="btn-search text-info"><i class="imgicon search-icon"></i>高级搜索</el-button>
    						 </div>
    						 <!--高级搜索-->
    						 <div class="senior-search" v-show="isMoreSearch">
    							 <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
    								  <el-form-item label="任务名称">
                        <el-input v-model="searchParams.taskName" placeholder="全部名称" size="mini"></el-input>
    								  </el-form-item>
    								  <el-form-item label="任务类型">
      									<el-select v-model="searchParams.taskType" placeholder="所有类型"  size="mini" clearable >
      									  <el-option v-for="item in ScanType" :label="item.name" :value="item.value"></el-option>
      									</el-select>
    								  </el-form-item>
    								  <el-form-item label="策略名称">
                        <el-input v-model="searchParams.strategyName" placeholder="所有名称" size="mini"></el-input>
    								  </el-form-item>
      								  <el-form-item label="状态">
      									<el-select v-model="searchParams.state" placeholder="所有状态" size="mini" clearable>
      									  <el-option v-for="item in ScanState" :label="item.name" :value="item.value"></el-option>
      									</el-select>
    								  </el-form-item>
    								  <el-form-item>
    									  <el-button type="primary" size="mini" @click="getDetailLoopholeData(true)">搜索</el-button>
    								  </el-form-item>
    							 </el-form>
    							 <el-button type="text" id="search-tag2" @click="showLessSearch" class="btn-search text-info"><i class="imgicon search-icon2"></i>普通搜索</el-button>
    						</div>
    					 </div>
    					 <div :class="{hidden:!isloopholeData}">
                  <el-table :data="loopholeData"  style="width: 100%" class="white-table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column  prop="taskId"  label="执行ID" min-width="80" align="center"></el-table-column>
                    <el-table-column  prop="taskName"  label="任务名称" min-width="100"></el-table-column>
                    <el-table-column  prop="taskTypeName"  label="任务类型" min-width="80"></el-table-column>
                    <el-table-column  prop="strategyName"  label="策略名字"></el-table-column>
                    <el-table-column  prop="stateName"  label="状态" min-width="80"></el-table-column>
                    <el-table-column   label="操作" width="200">
                      <template scope="scope">
                        <el-button type="text"  @click="showDetail(scope.row)" class="text-info">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagelocation">
                    <span>每页显示</span>
                    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next">
                    </el-pagination>
                  </div>
    				  	</div>
    					  <!--表格无数据时显示-->
    					 <div class="wrapper-page animated fadeInDown" :class="{hidden:isloopholeData}">
    						<div class="error-page animated flipInX">
    						   <img src="/../static/images/cd/console/images//nodate.png" alt="none">
    						   <div class="error-page-content">
    							   <label class="text-999">安全状态良好，无任何攻击</label>
    						   </div>
    						</div>
    					</div>
    				</div>
    			</div>
    	</div>
    </section>
    	<!--下载弹框-->
    	<el-dialog title="报告下载" :visible.sync="dialogDown" width="30%" class="dialog-panel">
         <div class="p-l-18">
       		 <h4>请选择下载类型：</h4>
       		 <el-radio-group v-model="radiofile" class="down-filetype">
    			 <el-radio :label="1">Word模板.doc</el-radio>
    			 <el-radio :label="2">Excel模板.xsls</el-radio>
    			 <el-radio :label="3">Pdf模板.pdf</el-radio>
    		 </el-radio-group>
         </div>
         <div slot="footer" class="dialog-footer">
    		  <el-button type="primary" class="dialog-button-padding">下载</el-button>
    		  <el-button type="graywhite" class="dialog-button-padding" @click="dialogDown=false">取消</el-button>
         </div>
    	</el-dialog>
  </div>
</template>

<script type="text/javascript">
    import chart from 'components/vue-echarts/ECharts.vue'
    import {Echaroption1} from '../js/option'
    import {Echaroption2} from '../js/option'
    import {Echaroption3} from '../js/option'
    import {Echaroption4} from '../js/option'


    export default{
      components: {
        chart
      },
      data () {
        return {
          //标签页参数
          daytabs:'60',
          //组织id
          orgId:'',
          //挂马
          hangingHorseNumber:0,
          hangingHorseData:[{
            url:'',
            describe:'',
            time:'30'
          }],
          //漏洞趋势
          option1:Echaroption1,
          //漏洞分布
          loopholeTab:'30',
          option2:Echaroption2,
          //威胁占比
          threatTab:'30',
          option3:Echaroption3,
          isOption3:true,
          option4:Echaroption4,
          //报告下载
          dialogDown:false,
          radiofile:1,
          //漏洞列表
          loopholeData:[{
            taskId:'',
            taskName:'',
            taskType:'',
            taskTypeName:'',
            strategyId:'',
            state:'',
            stateName:'',
            strategyName:''
          }],
          isloopholeData:true,
          //表格搜索参数
          isMoreSearch:false,
          searchParams:{
            taskName:'',
            taskType:'',
            strategyName:'',
            state:'',
          },
          //全局数据获取参数
          params:{
            orgId:'',
            time:''
          },
          //多选框的数据
          multipleSelection:[],
          /****** 分页参数 ******/
          //当前页数
          pageIndex: 1,
          //每页条数
          pageSize: 10,
          //总数据数
          total: 0,
          //任务类型
          ScanType:[],
          //任务状态
          ScanState:[],

        }
      },
      methods: {
        //获取组织参数
        getParams(){
          //获取组织id
          this.orgId = 27;
          //设置全局参数
          this.params = {
            orgId:this.orgId,
            time:''
          }
        },
        //获取漏洞趋势折线图
        getOption1(tab, event){
          var date = [];
          var lownum = [];
          var middlenum = [];
          var highnum = [];
          var urgentnum = [];
          var params = {
            orgId:this.orgId,
            days:this.daytabs
          };
          this.common.req("/ssa/loophole/getLoopholeData.do",params).then(data => {
            for(var i=0;i<data.length;i++){
              date[i] = data[i].date;
              lownum[i] = data[i].lownum;
              middlenum[i] = data[i].middlenum;
              highnum[i] = data[i].highnum;
              urgentnum[i] = data[i].urgentnum;
            }
            //设置x轴坐标
            this.option1.xAxis.data = date;
            this.option1.series[0].data = urgentnum;
            this.option1.series[1].data = highnum;
            this.option1.series[2].data = middlenum;
            this.option1.series[3].data = lownum;
          });
        },
        //获取漏洞分布
        getVuldis(tab,event){
          var params = {
            orgId:this.orgId,
            time:this.loopholeTab
          }
          this.common.req("/ssa/loophole/getVuldis.do",params).then(data => {
            var xdata = [];
            var number = []
            for(var i=0;i<data.length;i++){
              xdata[i] = data[i].name;
              number[i] = data[i].number;
            }
            this.option2.xAxis[0].data = xdata;
            this.option2.series[0].data = number;

          })
        },
        //切换标签获取威胁占比数据的方法
        getThreat(tab,event){
          this.getThreatName();
          this.getThreatOccupationRatio();
        },
        //威胁占比第一个饼图
        getThreatName(){
          var params = {
            orgId:this.orgId,
            time:this.threatTab
          }
          this.common.req("/ssa/loophole/getThreatName.do",params).then(data => {
            // var data1 = [];
            var data2 = [];
            //option3有数据则显示数据
            if(data.length>0){
              for(var i=0;i<data.length;i++){
                // if(i%2==0){
                //   data1.push(data[i]);
                // }else{
                  data2.push(data[i]);
                // }
              }
              //内圈
              // this.option3.series[0].data = data1;
              //外圈
              this.option3.series[1].data = data2;
              this.isOption3 = true;
            }else{
              this.isOption3 = false;
            }
          });
        },
        //威胁占比第二个饼图
        getThreatOccupationRatio(){
          var params = {
            orgId:this.orgId,
            time:this.threatTab
          }
          this.common.req("/ssa/loophole/getThreatOccupationRatio.do",params).then(data => {
            console.log(data);
            this.option4.series[0].data = data;
          });
        },
        getHangingHorse(){
          this.hangingHorseNumber = 15;
          this.hangingHorseData = [{
            url:'http://gallery.echartsjs.com/editor.html?p=xSkv7HzPkZ',
            describe:'于“TROJ_IFRAME.CP”木马威胁..',
            time:'2017-11-23  0:58:58'
          },{
            url:'http://gallery.echartsjs.com/editor.html?p=xSkv7HzPkZ',
            describe:'于“TROJ_IFRAME.CP”木马威胁..',
            time:'2017-11-23  0:58:58'
          },{
            url:'http://gallery.echartsjs.com/editor.html?p=xSkv7HzPkZ',
            describe:'于“TROJ_IFRAME.CP”木马威胁..',
            time:'2017-11-23  0:58:58'
          }];
        },
        //换页
        handleCurrentChange(pageIndex){
          this.pageIndex = pageIndex;
          this.getDetailLoopholeData();
        },
        //换一页显示的数据量
        handleSizeChange(pageSize){
          this.pageSize = pageSize;
          this.getDetailLoopholeData();
        },
        //显示较少的搜索项
        showLessSearch(){
          this.isMoreSearch = false;
          this.searchParams.taskType = '';
          this.searchParams.strategyName = '';
          this.searchParams.state = '';
        },
        //获取表格数据
        getDetailLoopholeData(isSearch){
          if(isSearch==true){
            this.pageIndex = 1;
          }
          this.searchParams.params = this.params;
          var params = {
            ...this.searchParams,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            orgId:this.orgId
          }
          this.common.req("/ssa/loophole/getDetailLoopholeData.do",params).then(data => {
            //表格有数据则显示数据
            if(data.rowData.length>0){
              this.loopholeData = data.rowData;
              this.total = data.total
              this.isloopholeData=true;
            }else{
              this.isloopholeData=false;
            }
          });
        },
        //显示任务详情
        showDetail(data){
          this.$router.push({
            name: 'detail',
            params: {
              data:data
            }
          });
        },
        //存储多选框选中数据
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //获取任务类型
        getScanType(){
          this.common.req("/ssa/loophole/getScanType.do",null).then(data => {
            this.ScanType = data;
          });
        },
        //获取任务状态
        getScanState(){
          this.common.req("/ssa/loophole/getScanState.do",null).then(data => {
            this.ScanState = data;
          });
        },

      },
      mounted: function() {
        this.getOption1();
        this.getVuldis();
        this.getThreatName();
        this.getThreatOccupationRatio();
        this.getHangingHorse();
        this.getScanType();
        this.getScanState();
        this.getDetailLoopholeData();

      },
      created:function() {
        this.getParams();
      }

    }
</script>
