<template>
  <div id="app">
    <header>
        <a href="" class="logo">
        	<img src="/../static/images/cd/console/images/LOGO.png" alt="logo">
        	<span class="logo-text">成都市信息安全公共服务平台</span>
        </a>
        <el-button type="deepblue" icon="el-icon-edit" size="small" >编辑</el-button>
        <el-dropdown size="medium" class="user-info">
    		<span class="el-dropdown-link">Asiainfo<i class="el-icon-arrow-down el-icon--right"></i></span>
    		<el-dropdown-menu slot="dropdown" >
    			<el-dropdown-item>修改密码</el-dropdown-item>
    			<el-dropdown-item>退出</el-dropdown-item>
    		 </el-dropdown-menu>
        </el-dropdown>
    </header>
    <nav class="left-panel">
    	<ul class="navigation">
    	 	 <li class="sy-console">控制台</li>
    		 <li class="is-active"><a href=""><i class="el-icon-menu"></i>首页</a></li>
    		 <li><a href=""><i class="el-icon-news"></i>深度威胁感知</a></li>
    		 <li><a href=""><i class="el-icon-view"></i>安全巡航视图</a></li>
    		 <li><a href=""><i class="el-icon-sort"></i>钓鱼网站监控</a></li>
    		 <li><a href=""><i class="el-icon-sold-out"></i>恶意域名监控</a></li>
    		 <li><a href=""><i class="el-icon-service"></i>威胁情报</a></li>
    	 </ul>
    </nav>
    <section class="content">
  	 <div class="container-fluid">
  		 <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
  			  <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
  			  <el-breadcrumb-item>首页</el-breadcrumb-item>
  		 </el-breadcrumb>
  		 <div class="top-panel clearfloat">
  		  	 <div class="blocks">
  			     <table class="blocks-inner">
  			     	<tr>
  			     	   <td><img src="/../static/images/cd/console/images/top-panel01.png" width="62" height="62"></td>
  			     	   <td><h3>系统安全指数</h3><p class="text-999">今日</p></td>
  			     	   <td><el-tooltip placement="bottom">
  							<div slot="content"  class="blocks-inner-tooltip">
  							   <h3>系统安全指数</h3>
  							   <p>时间：<span>累计至今</span></p>
  							   <p>指数：<span>{{index1}}</span></p>
  							</div>
  							<span>{{SystemSafetyIndex}}</span>
  						</el-tooltip></td>
  			     	</tr>
  			     </table>
  	  	 	 </div>
  		  	 <div class="blocks">
  		     	 <table  class="blocks-inner">
  			     	<tr>
  			     	   <td><img src="/../static/images/cd/console/images/top-panel02.png" width="62" height="62"></td>
  			     	   <td>
                   <h3>威胁检测数量</h3>
                   <p class="text-999">
                     <span :class="{'text-info':chooseParams[0].boolean}" @click="choose1(0)" style="cursor:pointer">7天</span>
                     &nbsp;|&nbsp;
                     <span :class="{'text-info':chooseParams[1].boolean}" @click="choose1(1)" style="cursor:pointer">30天</span>
                   </p>
                 </td>
  			     	   <td><el-tooltip placement="bottom">
  							<div slot="content"  class="blocks-inner-tooltip">
  							   <h3>威胁检测数量</h3>
  							   <p>时间：<span>累计至今</span></p>
  							   <p>指数：<span>{{index2}}</span></p>
  							</div>
  							<span>{{ThreatDetectionNum}}</span>
  					  </el-tooltip></td>
  			     	</tr>
  			     </table></div>
  		  	 <div class="blocks">
  			 	 <table  class="blocks-inner">
  			     	<tr>
  			     	   <td><img src="/../static/images/cd/console/images/top-panel03.png" width="62" height="62"></td>
  			     	   <td>
                   <h3>环比威胁数量</h3>
                   <p class="text-999">
                     <span :class="{'text-info':chooseParams[2].boolean}" @click="choose1(2)" style="cursor:pointer">7天</span>
                     &nbsp;|&nbsp;
                     <span :class="{'text-info':chooseParams[3].boolean}" @click="choose1(3)" style="cursor:pointer">30天</span>
                   </p>
                 </td>
  			     	   <td>
                    <img src="/../static/images/cd/console/images/upicon.png" alt="up" class="m-r-15" v-if="isUp">
  			     	   		<img src="/../static/images/cd/console/images/downicon.png" alt="up" class="m-r-15" v-if="!isUp">
  			     	   		<el-tooltip placement="bottom">
  							<div slot="content"  class="blocks-inner-tooltip">
  							   <h3>环比威胁数量</h3>
  							   <p>时间：<span>累计至今</span></p>
  							   <p>指数：<span>{{index3}}</span></p>
  							</div>
  							<span>{{CycleThreatNum}}</span>
  					  </el-tooltip>
  			     	   </td>
  			     	</tr>
  			     </table>
           </div>
  		  </div>
  		 <div class="el-panel">
  			<div class="el-panel-heading">
  				<h3 class="el-panel-title">威胁预警</h3>
  			</div>
  			<div class="el-panel-body">
  				<el-row :gutter="60">
  					<el-col :span="10" style="position:relative">
  						 <h3 class="el-panel-subtitle">
                 <i class="el-icon-caret-right m-r-8 text-primary">
                 </i>最新预警TOP
                 <el-button @click="toAlarmTable" type="text" size="medium" class="float-r text-info btn-submore">更多</el-button>
               </h3>
  						 <ul class="ul-top">
  						 	<li v-for="item in ThreatWarningTop5">
  						 		<span class="circle circle-location" :class="{'circle-low':item.alarm_grade==1,'circle-medium':item.alarm_grade==2,'circle-high':item.alarm_grade==3,'circle-urgent':item.alarm_grade==4}"></span>
  						 		<label class="tname">{{item.alarm_desc}}</label>
  						 		<label class="m-auto-20">{{item.name}}</label>
  						 		<span class="float-r">{{item.alarm_time}}</span>
  						 	</li>
  						 </ul>
  						 <div class="line"></div>
  					</el-col>
  					<el-col :span="7" style="position:relative">
  					     <h3 class="el-panel-subtitle"><i class="el-icon-caret-right m-r-8 text-primary"></i>风险级别占比</h3>
  						 <div class="echartsbox2" id="pie1">
                 <chart :options="option2"></chart>
               </div>
  					   <div class="line"></div>
  					</el-col>
  					<el-col :span="7">
  					     <h3 class="el-panel-subtitle"><i class="el-icon-caret-right m-r-8 text-primary"></i>预警分布</h3>
  						<div class="echartsbox2" id="pie2">
                <chart :options="option3"></chart>
              </div>
  					</el-col>
  				</el-row>
  			</div>
  		</div>
  		 <div class="el-panel">
  			<div class="el-panel-heading">
  				<h3 class="el-panel-title">开通服务</h3>
  			</div>
  			<div class="el-panel-body clearfloat">
  				<div class="service-panel">
  				   <div class="service-panel-inner">
  						<a href="#">
  						   <h3>深度威胁检测</h3>
  						   <p>使用中</p>
  						</a>
  					</div>
  				</div>
  				<div class="service-panel">
  					<div class="service-panel-inner serviceicon2">
  						<a href="#">
  						   <h3>漏洞监控</h3>
  						   <p>使用中</p>
  						</a>
  					</div>
  				</div>
  				<div class="service-panel">
  					<div class="service-panel-inner serviceicon3">
  						<a href="#">
  						   <h3>反钓鱼网站监测</h3>
  						   <p class="text-danger">可订购</p>
  						</a>
  					</div>
  				</div>
  				<div class="service-panel">
  					<div class="service-panel-inner serviceicon4">
  					    <a href="#">
  						   <h3>域名解析监控</h3>
  						   <p>使用中</p>
  						</a>
  					</div>
  				</div>
  				<div class="service-panel">
  					<div class="service-panel-inner serviceicon5">
  						<a href="#">
  						   <h3>威胁情报</h3>
  						   <p>使用中</p>
  						</a>
  					</div>
  				</div>
  			</div>
  		</div>
  		 <el-row :gutter="16">
  		 	 <el-col :span="12">
  				 <div class="el-panel">
  					 <div class="el-panel-heading">
  						 <h3 class="el-panel-title">资产</h3>
  					 </div>
  					 <div class="el-panel-body">
  						<ul class="asset clearfloat">
  							<li :class="{abnomaly:item.isAbnormal}" v-for="item in Assets">
  								<label>{{item.AssetsName}}</label>
  								<span class="float-r circle circle-location" :class="{'ab-circle':item.isAbnormal,'circle-primary':!item.isAbnormal}"></span>
  								<label class="float-r m-auto-20" :class="{'ab-name':item.isAbnormal}">{{item.stateName}}</label>
  							</li>
  						</ul>
  					 </div>
  				</div>
  		 	 </el-col>
  		 	 <el-col :span="12">
  				 <div class="el-panel">
  					 <div class="el-panel-heading">
  						 <h3 class="el-panel-title">威胁趋势<span class="text-999">（近6月） </span></h3>
  					 </div>
  					 <div class="el-panel-body">
  						 <div class="echartsbox4" id="line1">
                 <chart :options="option1"></chart>
               </div>
  					 </div>
  			     </div>
  		 	 </el-col>
  		 </el-row>
  	 </div>
    </section>
  </div>
</template>

<script type="text/javascript">
    import chart from 'components/vue-echarts/ECharts.vue'
    import {Echaroption1} from '../js/option'
    import {Echaroption2} from '../js/option'
    import {Echaroption3} from '../js/option'

    export default{
      components: {
        chart
      },
      data () {
        return {
          //组织id
          orgId:'',
          params:{},
          //系统安全指数
          SystemSafetyIndex:0,
          index1:0,
          //威胁检测数量
          ThreatDetectionNum:0,
          index2:0,
          //环比威胁数量
          isUp:true,
          CycleThreatNum:0,
          index3:0,
          //选择天数的参数
          chooseParams:[{
            boolean:true
          },{
            boolean:false
          },{
            boolean:true
          },{
            boolean:false
          }],
          //威胁预警
          ThreatWarningTop5:[],
          //风险级别占比
          RiskLevelRatio:[{
            level:'',
            value:'',
            name:''
          }],
          option2:Echaroption2,
          //预警分布
          EarlyWarningDistribution:[{
            value:'',
            name:''
          }],
          option3:Echaroption3,
          //资产数据
          Assets:[{
            isAbnormal:'',
            AssetsName:'',
            stateName:''
          }],
          //威胁趋势
          option1:Echaroption1,


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
        //获取系统安全指数
        getSystemSafetyIndex(){
          this.SystemSafetyIndex = 11243;
          this.index1 = 98;
        },
        //获取威胁检测数量
        gerThreatDetectionNum(){
          this.ThreatDetectionNum = 42435;
          this.index2 = 98;
        },
        //获取环比威胁数量
        getCycleThreatNum(){
          this.isUp = true;
          this.CycleThreatNum = 30256;
          this.index3 = 98;
        },
        //切换威胁检测数量的数据
        choose1(params){
          if(params == 0){
            this.chooseParams[0].boolean = true;
            this.chooseParams[1].boolean = false;
          }else if(params == 1){
            this.chooseParams[0].boolean = false;
            this.chooseParams[1].boolean = true;
          }else if(params == 2){
            this.chooseParams[2].boolean = true;
            this.chooseParams[3].boolean = false;
          }else if(params == 3){
            this.chooseParams[2].boolean = false;
            this.chooseParams[3].boolean = true;
          }
        },
        //获取威胁预警数据
        getThreatWarningTop5(){
          this.common.req("/ssa/index/getThreatWarningTop5.do",this.params).then(data => {
            this.ThreatWarningTop5 = data;
          });
        },
        //风险级别占比
        getRiskLevelRatio(){
          this.common.req("/ssa/index/getRiskLevelRatio.do",this.params).then(data => {
            this.RiskLevelRatio = data;
            this.option2.series[0].data = this.RiskLevelRatio;
          });
        },
        //预警分布
        getEarlyWarningDistribution(){
          this.EarlyWarningDistribution = [{value:10,name:'漏洞检测'},{value:35, name:'钓鱼网站'},{value:50, name:'域名解析'},{value:64, name:'深度威胁'}];
          this.option3.series[0].data = this.EarlyWarningDistribution;
        },
        //资产数据
        getAssets(){
          this.Assets = [{
            isAbnormal:true,
            AssetsName:'思科汇聚层交换机',
            stateName:'异常'
          },{
            isAbnormal:false,
            AssetsName:'个人计算机C',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'SQL 服务器',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'Firewall SRX 1400防火墙',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'思科接入交换机',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'邮件网关Palo atto',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'网络协议威胁分析',
            stateName:'正常'
          },{
            isAbnormal:false,
            AssetsName:'公司网站',
            stateName:'正常'
          }]
        },
        getThreatTrend(){
          //深度威胁数据
          var depthThreat = [5,7,4,8,5,6];
          this.option1.series[0].data = depthThreat;
          //漏洞检测数据
          this.common.req("/ssa/index/getVulDetection.do",this.params).then(data => {
            var vulDetection = [];
            var xAxis = [];
            for(var i=0;i<6;i++){
              vulDetection[i] = data[i].number;
              xAxis[i] = data[i].date + '月';
            }
            this.option1.xAxis[0].data = xAxis;
            this.option1.series[1].data = vulDetection;

          });
          //钓鱼网站数据
          this.common.req("/ssa/index/getFishingSite.do",this.params).then(data => {
            var fishingSite = [];
            for(var i=0;i<6;i++){
              fishingSite[i] = data[i].number
            }
            this.option1.series[2].data = fishingSite;
          });
          //域名解析数据
          this.common.req("/ssa/index/getDomainNameReso.do",this.params).then(data => {
            var domainNameReso = [];
            for(var i=0;i<6;i++){
              domainNameReso[i] = data[i].number
            }
            this.option1.series[3].data = domainNameReso;
          });
        },
        toAlarmTable(){
          this.$router.push({
            name:'alarmTable',
            params:{
              orgId:this.orgId
            }
          })
        },

      },
      mounted: function() {
        this.getSystemSafetyIndex();
        this.gerThreatDetectionNum();
        this.getCycleThreatNum();
        this.getThreatWarningTop5();
        this.getRiskLevelRatio();
        this.getEarlyWarningDistribution();
        this.getAssets();
        this.getThreatTrend();
      },
      created:function() {
        this.getParams();
      }

    }
</script>
