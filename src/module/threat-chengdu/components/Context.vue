<template>
  <div id="app">
  	<div class="container-fluid">
  		<el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item>威胁情报</el-breadcrumb-item>
  		</el-breadcrumb>
  		<div class="top-tip text-center">
  			本情报以CNCERT监测数据和亚信安全病毒监控中心数据作为主要依据，对我国互联网面临的病毒威胁进行总体态势分析。
      </div>
  		<div class="el-panel">
  			<div class="el-panel-heading">
  				<h3 class="el-panel-title">
  					病毒情报<span class="text-999">(近7天)</span>
  				</h3>
  				<el-button type="text" @click="getVirus(false,true)" size="medium" class="float-r text-info btn-more">更多</el-button>
  			</div>
  			<div class="el-panel-body">
  				<el-row :gutter="16"> <el-col :span="4">
    				<h3 class="el-panel-subtitle">
    					<i class="el-icon-caret-right m-r-8 text-primary"></i>国内感染病毒
    				</h3>
    				<div class="el-panel-subbody">
    					<div class="view">
    						<div class="view-left viewicon1"></div>
    						<div class="view-right">
    							<span class="figure">{{terminalsNum}}</span>
    							<p>终端总数</p>
    						</div>
    					</div>
    					<ul class="up-down">
    						<li>
                  <label>环比</label>
                  <span class="text-danger">
                    <img src="/../static/images/cd/console/images/upicon.png" class="m-r-15">{{ringRatio}}
                  </span>
                </li>
    						<li>
                  <label>同比</label>
                  <span class="text-green">
                    <img src="/../static/images/cd/console/images/downicon.png" class="m-r-15">{{yearOnYear}}
                  </span>
                </li>
    					</ul>
    				</div>
    				</el-col>
            <el-col :span="20">
      				<h3 class="el-panel-subtitle">
      					<i class="el-icon-caret-right m-r-8 text-primary"></i>活跃病毒TOP
      				</h3>
      				<div class="el-panel-subbody">
      					<el-table :data="virusTopFive" class="white-table" style="width: 100%">
                  <el-table-column prop="name" label="病毒名称"></el-table-column>
                  <el-table-column prop="type" label="威胁类型"></el-table-column>
                  <el-table-column prop="level" label="风险等级">
                    <template scope="scope">
                      <i v-if="scope.row.level==='高危'" class="circle circle-high"></i>
                      <i v-if="scope.row.level==='中危'" class="circle circle-medium"></i>
                      <i v-if="scope.row.level==='低危'" class="circle circle-low"></i>
                      <span>{{ scope.row.level}}</span>
                    </template>
      					  </el-table-column>
                  <el-table-column prop="trend" label="趋势" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
      				</div>
    				</el-col>
          </el-row>
  			</div>
  		</div>

  		<div class="el-panel">
  			<div class="el-panel-heading">
  				<h3 class="el-panel-title">
  					漏洞情报
            <span class="text-999">(近7天)</span>
  				</h3>
  				<el-button type="text" @click="getLoophole(false,true)" size="medium" class="float-r text-info btn-more">更多</el-button>
  			</div>
  			<div class="el-panel-body">
  				<el-table :data="loopholeTopFive" class="white-table" style="width: 100%">
            <el-table-column prop="name" label="漏洞名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="type" label="漏洞类型"></el-table-column>
            <el-table-column prop="level" label="风险等级">
              <template scope="scope">
                <i v-if="scope.row.level==='紧急'" class="circle circle-urgent"></i>
                <i v-if="scope.row.level==='高危'" class="circle circle-high"></i>
                <i v-if="scope.row.level==='中危'" class="circle circle-medium"></i>
                <i v-if="scope.row.level==='低危'" class="circle circle-low"></i>
                <span>{{ scope.row.level}}</span>
              </template> </el-table-column>
  				  <el-table-column prop="patch" label="补丁下载" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
  			</div>
  		</div>

  		<div class="el-panel">
  			<div class="el-panel-heading">
  				<h3 class="el-panel-title">安全资讯</h3>
  				<el-button type="text" size="medium" @click="getSecurityList(false,true)" class="float-r text-info btn-more">更多</el-button>
  			</div>
  			<div class="el-panel-body m-20-auto">
  				<el-row :gutter="40">
            <el-col :span="7">
      				<div class="info-img">
      					<img src="/../static/images/cd/console/images/Banner.png" alt="资讯">
      				</div>
    				</el-col>
            <el-col :span="17">
      				<ul class="information">
      					<li v-for="item in securityTopTen">
      						<div class="circle circle-location"></div>
                  <label @click="showContent">{{item.title}}</label>
                  <span class="float-r">{{item.date}}</span>
      					</li>
      				</ul>
    				</el-col>
          </el-row>
  			</div>
  		</div>
  	</div>

    <!-- 更多活跃病毒 -->
    <el-dialog title="活跃病毒列表" :visible.sync="dialogmoreViruses" width="36%" class="dialog-paneltable">
      <el-table :data="virusList" class="white-table" style="width: 100%">
        <el-table-column prop="name" label="病毒名称"></el-table-column>
        <el-table-column prop="type" label="威胁类型"></el-table-column>
        <el-table-column prop="level" label="风险等级">
          <template scope="scope">
            <i v-if="scope.row.level==='高危'" class="circle circle-high"></i>
            <i v-if="scope.row.level==='中危'" class="circle circle-medium"></i>
            <i v-if="scope.row.level==='低危'" class="circle circle-low"></i>
            <span>{{ scope.row.level}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="trend" label="趋势" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <div class="pagelocation">
        <span>每页显示</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="sizes, prev, pager, next" :total="50" class="pagination"></el-pagination>
      </div>
    </el-dialog>

    <!-- 更多漏洞 -->
    <el-dialog title="最新漏洞列表" :visible.sync="dialogmoreLoophole" width="36%" class="dialog-paneltable">
      <el-table :data="loopholeList" class="white-table" style="width: 100%">
        <el-table-column prop="name" label="漏洞名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="type" label="漏洞类型"></el-table-column>
        <el-table-column prop="level" label="风险等级">
          <template scope="scope">
            <i v-if="scope.row.level==='紧急'" class="circle circle-urgent"></i>
            <i v-if="scope.row.level==='高危'" class="circle circle-high"></i>
            <i v-if="scope.row.level==='中危'" class="circle circle-medium"></i>
            <i v-if="scope.row.level==='低危'" class="circle circle-low"></i>
            <span>{{ scope.row.level}}</span>
          </template> </el-table-column>
        <el-table-column prop="patch" label="补丁下载" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <div class="pagelocation">
        <span>每页显示</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="sizes, prev, pager, next" :total="50" class="pagination"></el-pagination>
      </div>
    </el-dialog>

    <!--更多资讯弹框-->
    <el-dialog title="资讯列表" :visible.sync="dialogmoreinfo" width="36%" class="dialog-paneltable">
      <el-table :data="securityList" class="white-table" style="width: 100%">
        <el-table-column  prop="title"  label="资讯标题" :show-overflow-tooltip="true">
          <template scope="scope">
            <i class="circle"></i>
            <span style="cursor:pointer" @click="showContent">{{ scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="time"  label="发布时间" min-width="30"></el-table-column>
      </el-table>
      <div class="pagelocation">
        <span>每页显示</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="sizes, prev, pager, next" :total="50" class="pagination"></el-pagination>
      </div>
    </el-dialog>

  	<!-- 查看表格弹框-->
    <el-dialog title="资讯详情" :visible.sync="dialoginfomation" width="50%" class="dialog-panel p-info">
      <div class="dialog-infomation">
        <div class="dialog-infomatin-header text-center">
          <h2>“坏兔子”竟患“多洞症”，多国企业已遭感染</h2>
          <small class="text-999" style="line-height: 34px"><i class="el-icon-time m-r-8"></i>2017-11-24</small>
        </div>
        <div class="dialog-infomatin-content">
          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。</p>
          <p>当攻击出现时，研究人员发现感染始于中毒俄罗斯媒体网站的偷渡式下载（drive-by download），利用假Flash播放程序来安装恶意软件。乍看起来，“坏兔子”的勒索攻击确实来势汹涌，但随着安全研究人员的逐步深入，一个“声东击西”的阴谋慢慢浮出水面。 </p>
          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。 </p>
          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。 </p>
          <p>当攻击出现时，研究人员发现感染始于中毒俄罗斯媒体网站的偷渡式下载（drive-by download），利用假Flash播放程序来安装恶意软件。乍看起来，“坏兔子”的勒索攻击确实来势汹涌，但随着安全研究人员的逐步深入，一个“声东击西”的阴谋慢慢浮出水面。 </p>
          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。 </p>


          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。</p>
          <p>当攻击出现时，研究人员发现感染始于中毒俄罗斯媒体网站的偷渡式下载（drive-by download），利用假Flash播放程序来安装恶意软件。乍看起来，“坏兔子”的勒索攻击确实来势汹涌，但随着安全研究人员的逐步深入，一个“声东击西”的阴谋慢慢浮出水面。 </p>
          <p>据统计，“坏兔子”仅在俄罗斯和乌克兰就感染了超过200个企业。“坏兔子”利用了NSA被Shadow Brokers黑客集团外流的漏洞攻击码，迅速地渗透受害者的网络并进行扩散。它所攻击的是微软Windows服务器信息内存块（SMB）的漏洞，标识为CVE-2017-0145。这个漏洞会影响Windows端点间的数据传输，并且让黑客可以绕过安全协定来进行远端代码执行。 </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default{
    data () {
      return {
        //组织id
        orgId:'',
        params:{},
        //分页
        pageIndex:1,
        pageSize:10,
        total:0,
        //国内病毒感染
        terminalsNum:0,
        ringRatio:0,
        yearOnYear:0,
        /*********** 活跃病毒 ***********/
        //更多病毒
        dialogmoreViruses:false,
        virusTopFive:[],
        //活跃病毒数据
        virusList:[],
        /*********** 漏洞情报 ***********/
        //更多漏洞
        dialogmoreLoophole:false,
        loopholeTopFive:[],
        //全部漏洞情报
        loopholeList:[],
        /*********** 安全资讯 ***********/
        //显示详情
        dialoginfomation:false,
        //显示更多
        dialogmoreinfo:false,
        securityTopTen:[],
        //全部安全资讯
        securityList:[],

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
      //切换一页显示的条数
      handleSizeChange(pageSize){
        this.pageSize = pageSize;
        this.pageIndex = 1;
        if(this.dialogmoreViruses){
          this.getVirus(false,false);
        }else if(this.dialogmoreLoophole){
          this.getLoophole(false,false);
        }else if(this.dialogmoreinfo){
          this.getSecurityList(false,false);
        }
      },
      //换页
      handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex;
        if(this.dialogmoreViruses){
          this.getVirus(false,false);
        }else if(this.dialogmoreLoophole){
          this.getLoophole(false,false);
        }else if(this.dialogmoreinfo){
          this.getSecurityList(false,false);
        }
      },
      //国内病毒感染
      getDomesVirusInfec(){
        this.common.req('/ssa/threat/getDomesVirusInfec.do',this.params).then(data => {
          console.log(data);
          this.terminalsNum = 9999;
          this.ringRatio = 1200;
          this.yearOnYear = 1000;
        });
      },
      //获取病毒数据
      getVirus(isFive,isOpenMore){
        if(isFive){
          this.pageIndex = 1;
        }else {
          if(isOpenMore){
            this.pageIndex = 1;
          }
          this.dialogmoreViruses = true;
        }
        var params = {
          ...this.params,
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        }
        this.common.req('/ssa/threat/getVirus.do',params).then(data => {
          console.log(data);
          this.virusList = [{
  					  name:'Moxa NPort W2150A and W2250A',
  					  type:'僵尸',
  					  level:'高危',
  					  trend:'关于“WannaCry”勒索软件漏洞威胁'
  				  },{
  					  name:'Libsndfile（CNVD-2017-38214）',
  					  type:'木马',
  					  level:'低危',
  					  trend:'关于“TROJ_IFRAME.CP”木马威胁'
  				  },{
  					  name:'Bitdefender Internet Security',
  					  type:'蠕虫',
  					  level:'中危',
  					  trend:'关于“WORM_DOWNAD”蠕虫威胁'
  				  },{
  					  name:'GraphicsMagick（CNVD-2017-38119）',
  					  type:'木马',
  					  level:'高危',
  					  trend:'关于“Bitdefender Internet Security”勒索软件漏洞威胁'
  				  },{
  					  name:'IKARUS anti.virus ntguard.sys',
  					  type:'蠕虫',
  					  level:'中危',
  					  trend:'关于“IKARUS anti.virus ntguard.sys”勒索软件漏洞威胁'
  				  },{
  					  name:'IKARUS anti.virus ntguard.sys',
  					  type:'蠕虫',
  					  level:'中危',
  					  trend:'关于“IKARUS anti.virus ntguard.sys”勒索软件漏洞威胁'
  				  },{
  					  name:'IKARUS anti.virus ntguard.sys',
  					  type:'蠕虫',
  					  level:'中危',
  					  trend:'关于“IKARUS anti.virus ntguard.sys”勒索软件漏洞威胁'
  				  },{
  					  name:'IKARUS anti.virus ntguard.sys',
  					  type:'蠕虫',
  					  level:'中危',
  					  trend:'关于“IKARUS anti.virus ntguard.sys”勒索软件漏洞威胁'
  				  }
          ];
          if(isFive){
            this.virusTopFive = this.virusList.slice(0,5);
          }
        });
      },
      //获取漏洞情报
      getLoophole(isFive,isOpenMore){
        if(isFive){
          this.pageIndex = 1;
        }else{
          if(isOpenMore){
            this.pageIndex = 1;
          }
          this.dialogmoreLoophole = true;
        }
        var params = {
          ...this.params,
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        }
        this.common.req('/ssa/threat/getLoophole.do',this.params).then(data => {
          console.log(data);
          this.loopholeList = [{
    				  name:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  type:'权限许可和访问控制',
    				  level:'高危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  type:'权限许可和访问控制',
    				  level:'低危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'IKARUS anti.virus ntguard.sys驱动程序任意修改漏洞',
    				  type:'权限许可和访问控制',
    				  level:'紧急',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'Bitdefender Internet Security整数溢出漏洞',
    				  type:'权限许可和访问控制',
    				  level:'高危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'GraphicsMagick缓冲区溢出漏洞（CNVD-2017-38119）',
    				  type:'权限许可和访问控制',
    				  level:'中危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'GraphicsMagick缓冲区溢出漏洞（CNVD-2017-38119）',
    				  type:'权限许可和访问控制',
    				  level:'中危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  },{
    				  name:'GraphicsMagick缓冲区溢出漏洞（CNVD-2017-38119）',
    				  type:'权限许可和访问控制',
    				  level:'中危',
    				  patch:'https://source.android.com/security/bulletin/2017-08-01'
    			  }
    		  ];
          if(isFive){
            this.loopholeTopFive = this.loopholeList.slice(0,5);
          }
        });
      },
      //获取安全资讯
      getSecurityList(isTen,isOpenMore){
        if(isTen){
          this.pageIndex = 1;
        }else{
          if(isOpenMore){
            this.pageIndex = 1;
          }
          this.dialogmoreinfo = true;
        }
        var params = {
          ...this.params,
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        }
        this.common.req('/ssa/threat/getSecurityList.do',this.params).then(data => {
          console.log(data);
          this.securityList = [{
    				  title:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'IKARUS anti.virus ntguard.sys驱动程序任意修改漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'Bitdefender Internet Security整数溢出漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'GraphicsMagick缓冲区溢出漏洞（CNVD-2017-38119）',
    				  time:'2017-11-24'
    			   },{
    				  title:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'Moxa NPort W2150A and W2250A未授权访问漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'IKARUS anti.virus ntguard.sys驱动程序任意修改漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'Bitdefender Internet Security整数溢出漏洞',
    				  time:'2017-11-24'
    			   },{
    				  title:'GraphicsMagick缓冲区溢出漏洞（CNVD-2017-38119）',
    				  time:'2017-11-24'
    			   },
    		  ];
          if(isTen){
            this.securityTopTen = this.securityList.slice(0,10);
          }
        });

      },
      //显示安全资讯的详细内容
      showContent(){
        this.dialoginfomation=true;
      },


    },
    mounted: function() {
      this.getDomesVirusInfec();
      this.getVirus(true,false);
      this.getLoophole(true,false);
      this.getSecurityList(true,false);
    },
    created:function() {
      this.getParams();
    }

  }
</script>
