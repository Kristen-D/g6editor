<template id="">
  <body id="bigscreen1">
    <div id="app">
      <header  class="header">
  	    <h2 class="header-title">深度威胁感知</h2>
    	</header>
      <div class="announcement">
         <span class="tip-left"></span><span  class="tip-right"></span>
         <marquee direction="left" behavior="scroll" scrollamount="30" scrolldelay="200" onMouseOut="this.start()"  onMouseOver="this.stop()"></marquee>
      </div>
    	<section class="container-wrap">
    		<el-row :gutter="20">
    			<el-col :span="4">
    			   <div class="el-panel-bigscreen">
    			   	   <div class="el-panel-bigscreen-body">
    			   	       <div class="echartsbox7"  id="pie1">
                       <chart :options="option1"></chart>
                     </div>
    			   	       <ul class="tabsbuttom clearfloat">
    			   	           <li :class="{active:chooseTable[0].boolean}" @click="getData('all')">
                           <div class="el-box">
            							   <span class="el-box-tl"></span>
            							   <label>累计</label>
    		   	               </div>
                         </li>
  		   	               <li :class="{active:chooseTable[1].boolean}" @click="getData('month')">
                           <div class="el-box">
  						  	           <span class="el-box-tr"></span>
  	   	                	   <label>近30天</label>
    		   	               </div>
                         </li>
    			   	       </ul>
    			   	       <div class="echartsbox7" id="pie2" >
                       <chart :options="option2"></chart>
    			   	       </div>
    			   	       <div>
    							<h3 class="el-panel-bigscreen-title" ><i class="el-titleicon"></i>攻击阶段</h3>
    							<ul class="total-ul entrance">
    							   <li><div class="diamond cricle-c1"></div><label>情报刺探</label><span>{{attack1}}</span></li>
    							   <li><div class="diamond cricle-c1"></div><label>弱点攻击</label><span>{{attack2}}</span></li>
    							   <li><div class="diamond cricle-c1"></div><label>命令控制</label><span>{{attack3}}</span></li>
                     <li><div class="diamond cricle-c1"></div><label>渗透感染</label><span>{{attack4}}</span></li>
                     <li><div class="diamond cricle-c1"></div><label>资料发掘</label><span>{{attack5}}</span></li>
                     <li><div class="diamond cricle-c1"></div><label>攻击窃取</label><span>{{attack6}}</span></li>
    							 </ul>
    					   </div>
    					   <!-- <div>
    							<h3 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>横向和数据窃取</h3>
    							<ul class="total-ul entrance"   style="margin-bottom: 10px;">
    							   <li><div class="diamond cricle-c1"></div><label>横向移动</label><span>{{crosswiseAndDataTheft.one}}</span></li>
    							   <li><div class="diamond cricle-c1"></div><label>命令与控制</label><span>{{crosswiseAndDataTheft.two}}</span></li>
    							   <li><div class="diamond cricle-c1"></div><label>零日志恶意软件</label><span>{{crosswiseAndDataTheft.three}}</span></li>
    							 </ul>
    					   </div> -->
    			   	   </div>
    			   </div>
    			</el-col>
    			<el-col :span="16">
    				 <div class="el-panel-bigscreen">
    			   	   <div class="el-panel-bigscreen-heading">
    			   	   	  <h3 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>攻击阶段图</h3>
    			   	   </div>
    			   	   <div class="el-panel-bigscreen-body clearfloat">
    						<ul class="float-l attackphase">
    							<li><span class="cricle">1</span>情报刺探</li>
    							<li><span class="cricle">2</span>弱点攻击</li>
    							<li><span class="cricle">3</span>命令控制</li>
    							<li><span class="cricle">4</span>渗透感染</li>
    							<li><span class="cricle">5</span>资料发掘</li>
    							<li><span class="cricle">6</span>攻击窃取</li>
    						</ul>
    						<div class="attackphase-img">
    							<img src="/static/images/cd/phase-of-attack.png" alt="攻击阶段图">
    						</div>
    			   	   </div>
    			     </div>
    			     <el-row :gutter="20">
    			     	<el-col :span="6">
    					      <div class="el-panel-bigscreen" style="height:385px;">
    							   <div class="el-panel-bigscreen-heading">
    								  <h3 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>受威胁主机</h3>
    								  <a class="el-panel-bigscreen-more" @click="toDetails(0)">更多<i class="more-icon">&gt;&gt;&gt;</i></a>
    							   </div>
    							   <div class="el-panel-bigscreen-body">
    									<div class="el-box hostIp-digtal">
    										<span class="el-box-stl"></span><span class="el-box-str"></span>
    										<span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    										<p class="number">{{numberOfViolations}}</p><p class="name">评估期威胁数</p>
    									 </div>
                       <!-- <div class="hostIp-vertical"> -->
                      <ul v-show="nullIpsShow"  style="text-align: center; margin-top:80px;">暂无数据</ul>
    									<ul class="total-ul hostIp">
                        <li v-for="(item,index) in ips"><div class='square'>{{index+1}}</div><label>{{item.ip}}</label></li>
    									</ul>
                        <!-- </div> -->
    							   </div>
    						  </div>
    		     		</el-col>
    			     	<el-col :span="8">
    	   		   	   	     <div class="el-panel-bigscreen" style="height:165px">
    							<div class="el-panel-bigscreen-heading">
    								 <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>恶意软件排名</h4>
    								  <a class="el-panel-bigscreen-more" @click="toDetails(2)">更多<i class="more-icon">&gt;&gt;&gt;</i></a>
    							</div>
    							<div class="el-panel-bigscreen-body">
                    <ul v-show="nullMalwareRankingShow" style="text-align: center; margin-top:20px;">暂无数据</ul>

    								<ul class="total-ul spite-soft">
                      <li v-for="(item,index) in MalwareRanking"><div class="square">{{index+1}}</div><p>{{item.malwareName}}</p><span>{{item.count}}</span></li>
    							  </ul>

    							</div>
    						</div>
    						 <div class="el-panel-bigscreen">
    							 <div class="el-panel-bigscreen-heading">
    								 <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>漏洞利用</h4>
    								<a class="el-panel-bigscreen-more" @click="toDetails(1)">更多<i class="more-icon">&gt;&gt;&gt;</i></a>
    							 </div>
    							 <div class="el-panel-bigscreen-body clearfloat">
    							 	<ul class="float-l malware" style="width: 45%">
    									<li><div class="el-box">
    									    <span class="el-box-stl"></span><span class="el-box-str"></span>
    									    <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    										  <label>主机</label><span>{{ipData}}</span>
    									</div></li>
    									<li><div class="el-box">
    									    <span class="el-box-stl"></span><span class="el-box-str"></span>
    									    <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    									    <label>漏洞</label><span>{{msgDataCount}}</span>
    									</div></li>
    								</ul>
                    <!-- <div class="malware-vertical"> -->
                    <ul v-show="nullMsgDataShow"  style="text-align: center; margin-top:40px;">暂无数据</ul>
    								<ul class="float-r total-ul malwaretable">
                      <li v-for="(item,index) in msgData"><div class="square">{{index+1}}</div><label style="display: inline-block;max-width: 110px ;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;margin-bottom: -5px;">{{item.eventMsg}}</label></li>
    							  </ul>
                   <!-- </div> -->
    							 </div>
    						 </div>
    	   		   	    </el-col>
    	   		   	    <el-col :span="10">
    	   		   	   	     <div class="el-panel-bigscreen">
    							<div class="el-panel-bigscreen-heading">
    								<h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>C2侦测</h4>
    								<!-- <a class="el-panel-bigscreen-more" @click="toDetails(4)">更多<i class="more-icon">&gt;&gt;&gt;</i></a> -->
    							</div>
    							<div class="el-panel-bigscreen-body">
    							  <ul class="digital C2 set-w30 clearfloat">
    								  <li><div class="el-box">
    									  <span class="el-box-stl"></span><span class="el-box-str"></span>
    									  <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    									  <p class="number">{{addressLinkCount}}</p><p class="name">地址链接数</p>
    								   </div></li>
    								  <li><div class="el-box">
    									  <span class="el-box-stl"></span><span class="el-box-str"></span>
    									  <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    								      <p class="number">{{communicationCount}}</p><p class="name">通信事件数</p>
    								  </div></li>
    								  <li><div class="el-box">
    									  <span class="el-box-stl"></span><span class="el-box-str"></span>
    									  <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
    								      <p class="number">{{threatCount}}</p><p class="name">受威胁数</p>
    								  </div></li>
    							   </ul>
    							</div>
    						</div>
    						 <div class="el-panel-bigscreen">
    							 <div class="el-panel-bigscreen-heading">
    								 <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>告警分布协议TOP</h4>
    								 <!-- <a class="el-panel-bigscreen-more" @click="toDetails(5)">更多<i class="more-icon">&gt;&gt;&gt;</i></a> -->
    							 </div>
    							 <div class="el-panel-bigscreen-body clearfloat">
    								  <div class="float-l echartsbox2" id="pie3"  style="width: 45%;">
                        <chart :options="option3"></chart>
                      </div>
                      <!-- <div class="alarmdistribution-vertical"> -->
                      <ul v-show="nullAlarmDataShow"  style="text-align: center; margin-top:40px;">暂无数据</ul>
    								  <ul class="float-l total-ul alarmdistribution">
                        <li v-for="(item,index) in alarmDataDetail"><div :class="'diamond cricle-c'+(index+1)"></div><label>{{item.name}}</label><span>{{item.percent}}</span></li>
    								 </ul>
                     <!-- </div> -->
    							</div>
    						 </div>
    	   		   	   </el-col>
    			     </el-row>
    			</el-col>
    			<el-col :span="4">
    			    <div class="el-panel-bigscreen">
    			    	<div class="el-panel-bigscreen-heading">
    			    		<h3 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>受威胁区域</h3>
    			    		<!-- <a class="el-panel-bigscreen-more" @click="toDetails(3)">更多<i class="more-icon">&gt;&gt;&gt;</i></a> -->
    			    	</div>
    			    	<div class="el-panel-bigscreen-body">
  		    		     <ul class="threatened-user" id="clampjs">
      		    		     	<li v-for="(item,index) in threatRegion"><div class="el-box">
      							   <span class="el-box-stl"></span><span class="el-box-str"></span>
      							   <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
      							   <p class="number">{{index+1}}</p>
      							   <label class="name">{{item.name}}</label>
      							   <span class="digital">{{item.count}}</span>
      						    </div></li>
  		    		     </ul>
    			    	</div>
    			    </div>
    			</el-col>
    		</el-row>
    	</section>
    </div>
  </body>
</template>

<script type="text/javascript">
  import chart from 'components/vue-echarts/ECharts.vue'
  import {echartOption1} from './ChartOptions.js'
  import {echartOption2} from './ChartOptions.js'
  import {echartOption3} from './ChartOptions.js'
  export default{
    components: {
      chart
    },

    data () {
      return {
        getRiskDataUrl:"/ssa/depThreatPerception/getRiskData.do",
        getAttackDataUrl:"/ssa/depThreatPerception/getAttackData.do",
        getThreatDataUrl:"/ssa/depThreatPerception/getThreatData.do",
        getThreatDataTop5Url:"/ssa/depThreatPerception/getThreatDataTop5.do",
        getMalwareDataUrl:"/ssa/depThreatPerception/getMalwareData.do",
        getMsgDataUrl:"/ssa/depThreatPerception/getMsgData.do",
        getIpDataUrl:"/ssa/depThreatPerception/getIpData.do",
        getMsgDataCountUrl:"/ssa/depThreatPerception/getMsgDataCount.do",
        getCommunicationDataUrl:"/ssa/depThreatPerception/getCommunicationData.do",
        getAddressLinkDataUrl:"/ssa/depThreatPerception/getAddressLinkData.do",
        getAlarmTotalUrl:"/ssa/depThreatPerception/getAlarmTotal.do",
        getAlarmDataUrl:"/ssa/depThreatPerception/getAlarmData.do",
        getThreatCountUrl:"/ssa/depThreatPerception/getThreatCount.do",
        getThreatRegionUrl:"/ssa/depThreatPerception/getThreatRegion.do",
        threatRegion:[],
        nullMalwareRankingShow:false,
        nullIpsShow:false,
        nullMsgDataShow:false,
        nullAlarmDataShow:false,
       threatRegionStatic:[
         {
           name:'彭州市',
           count:'0'
         },
         {
           name:'邛崃市',
           count:'0'
         },
         {
           name:'蒲江县',
           count:'0'
         },
         {
           name:'温江区',
           count:'0'
         },
         {
           name:'新都区',
           count:'0'
         }
       ],
        threatCount:'',
        alarmDataDetail:[],
        alarmData:'',
        addressLinkCount:'',
        communicationCount:'',
        msgDataCount:'',
        ipData:'',
        attackData:[],
        attack1:'',
        attack2:'',
        attack3:'',
        attack4:'',
        attack5:'',
        attack6:'',
        entryPoint:'',
        crosswiseAndDataTheft:'',
        numberOfViolations:'',
        ips:[],
        HostNumber:'',
        NonDeploymentNumber:'',
        ZeroDayMalware:'',
        AddressLinkNumber:'',
        CommunicationEventsNumber:'',
        ThreatenedNumber:'',
        AlarmDistributionProtocol:'',
        msgData:'',
        ThreatenedUser:[{
            name:'',
            number:''
        }],
        allOrMonth:'',
        /************威胁评估总分****************/
        data : [],
        labelData : [],
        MalwareRanking:[],
        chooseTable:[
          {
            boolean:true
          },
          {
            boolean:false
          }
        ],

        labelBottom1 : {
      		normal: {
      			color: 'rgba(0,0,0,0)',
      			borderColor:'#060b17',
      			borderWidth:5,
      			label: {show: false},
      			labelLine: { show: false}
      		},
      		emphasis: {
      			color: 'rgba(0,0,0,0)'
      		}
      	},
      	labelBottom2 : {
      		 normal: {
      			color: 'rgba(0,0,0,0)',
      			label: {show: false},
      			labelLine: {show: false}
      		},
      		emphasis: {color: 'rgba(0,0,0,0)'}
      	},
        option1:echartOption1,
        option2 : echartOption2,
        option3 : echartOption3,
	       /************威胁评估划分****************/
         color:['#028bff','#12cbf6','#89c559','#f6b70a'],
         dataValue:[],
         labelBottom : {
       	    normal:{
       				   color:'#fff'
       			}
     		 },
          basetooltip:{
            show:false
          },
          sum:0,
          perent:[]


      }
    },

    methods:{
      //查询受威胁区域
      getThreatRegion(param){
        var params = {day:param};
          this.common.reqDef(this.getThreatRegionUrl, params).then(data => {
            for(var i=0;i<data.data.length;i++){
              data.data[i].name=data.data[i].name.slice(11);
            }
            if(data.data.length===5){
                this.threatRegion = data.data;
            }else {
              this.threatRegion = data.data;
              for(var i=data.data.length;i<5;i++){
                this.threatRegion[i] = this.threatRegionStatic[i];
              }
            }
          });
      },
      //查询受威胁数
      getThreatCount(param){
        var params = {day:param};
          this.common.reqDef(this.getThreatCountUrl, params).then(data => {
            if(data.data[0] === null || data.data[0] === ''){
              this.threatCount = 0;
            }else {
              this.threatCount = data.data[0].count;
            }
          });
      },
      //查询地址链接数
      getAddressLinkData(param){
        var params = {day:param};
          this.common.reqDef(this.getAddressLinkDataUrl, params).then(data => {
            if(data.data[0] === null || data.data[0] === ''){
              this.addressLinkCount = 0;
            }else {
              this.addressLinkCount = data.data[0].count;
            }
          });
      },
      // 查询通信事件数
      getCommunicationData(param){
        var params = {day:param};
          this.common.reqDef(this.getCommunicationDataUrl, params).then(data => {
            if(data.data[0] === null || data.data[0] === ''){
              this.communicationCount = 0;
            }else {
              this.communicationCount = data.data[0].count;
            }
          });
      },
      //查询漏洞利用漏洞数量
      getMsgDataCount(param){
        var params = {day:param};
          this.common.reqDef(this.getMsgDataCountUrl, params).then(data => {
            if(data.data[0] === null || data.data[0] === ''){
              this.msgDataCount = 0;
            }else {
              this.msgDataCount = data.data[0].count;
            }
          });
      },
      //查询漏洞利用主机数量
      getIpData(param){
        var params = {day:param};
          this.common.reqDef(this.getIpDataUrl, params).then(data => {
            if(data.data[0] === null || data.data[0] === ''){
              this.ipData = 0;
            }else {
              this.ipData = data.data[0].count;
            }
          });
      },
      //查询漏洞利用数据
      getMsgData(param){
        var params = {day:param};
          this.common.reqDef(this.getMsgDataUrl, params).then(data => {
            this.msgData =[];
            if(data.data.length===0){
              this.nullMsgDataShow = true;
            }else {
            this.msgData = data.data;
            this.nullMsgDataShow = false;
            }

          });
      },
      //查询攻击阶段数据
      getAttackData(param){
        var params = {day:param};

          this.common.reqDef(this.getAttackDataUrl, params).then(data => {
            this.attackData = data.data;
            for(var i=0;i<this.attackData.length;i++){
              if(this.attackData[i].attackName==="命令控制"){
                this.attack3 = this.attackData[i].count;
              }else if(this.attackData[i].attackName==="情报刺探"){
                this.attack1 = this.attackData[i].count;
              }else if(this.attackData[i].attackName==="弱点攻击"){
                this.attack2 = this.attackData[i].count;
              }else if(this.attackData[i].attackName==="渗透感染"){
                this.attack4 = this.attackData[i].count;
              }else if(this.attackData[i].attackName==="资料发掘"){
                this.attack5 = this.attackData[i].count;
              }else if(this.attackData[i].attackName==="攻击窃取"){
                this.attack6 = this.attackData[i].count;
              }
            }
            if(this.attack1===''){this.attack1=0;}else
            if(this.attack2===''){this.attack2=0;}else
            if(this.attack3===''){this.attack3=0;}else
            if(this.attack4===''){this.attack4=0;}else
            if(this.attack5===''){this.attack5=0;}else
            if(this.attack6===''){this.attack6=0;}
          });

      },
      //横向和数据窃取
      getCrosswiseAndDataTheft(){
        this.crosswiseAndDataTheft = {
          one:16,
          two:13,
          three:12
        }
      },
      //查询威胁总数
      getNumberOfViolations(param){
        //this.numberOfViolations = 32;
        var params = {day:param};
          this.common.reqDef(this.getThreatDataUrl, params).then(data => {
            if(data.data[0].count !== null  && data.data[0].count !== ''){
              this.numberOfViolations = data.data[0].count;
            }else {
              this.numberOfViolations = 0;
            }

          });
      },
      //查询威胁ipTop5
      getIps(param){
        var params = {day:param};
          this.common.reqDef(this.getThreatDataTop5Url, params).then(data => {
            this.ips = [];
            if(data.data.length === 0){
              this.nullIpsShow = true;
            }else {
              this.ips = data.data;
              this.nullIpsShow = false;
            }
          });
      },
      //查询恶意软件
      getMalwareRanking(param){
        var params = {day:param};
          this.common.reqDef(this.getMalwareDataUrl, params).then(data => {
            this.MalwareRanking = [];
            if(data.data.length === 0){
              this.nullMalwareRankingShow = true;
            }else {
              this.MalwareRanking = data.data;
              this.nullMalwareRankingShow = false;
            }
          });
      },


      //受威胁用户
      getThreatenedUser(){
        this.ThreatenedUser = [
          {
            file:'四川省成都市双流县黄龙溪古镇景区管理局',
            number:16
          },{
            file:'四川省双流县地方税务局',
            number:12
          },{
            file:'四川省双流县地方税务局',
            number:9
          },{
            file:'双流县科学技术局',
            number:6
          },{
            file:'双流县安全生产监督管理局',
            number:5
          }
        ]
      },

      pie1(){
        this.labelData = [];

        for (var i = 0; i < 100; ++i) {
          this.labelData.push({
            value:1,
          });
        }
        var value = [20,80,20,80];
        this.option1.series[1].data[0].value = value[0];
        this.option1.series[1].data[1].value = value[1];
        this.option1.series[2].data[0].value = value[2];
        this.option1.series[2].data[1].value = value[3];

        this.option1.series[0].data = this.labelData;
        this.option1.series[1].data[1].itemStyle = this.labelBottom1;
        this.option1.series[2].data[0].itemStyle = this.labelBottom2;
        //数据
        this.option1.title[0].text = '81';
      },

  //获取风险等级数据
      pie2(param){
        for(var x=0;x<this.data.length;x++){
    			this.sum+=this.data[x];
    		}
        for(x=0;x<this.data.length;x++){
          this.perent[x]=this.data[x]/this.sum;
        }
        this.labelData = [];
        for (var i = 0; i < 100; ++i) {
          this.labelData.push({
             value: 1,
             name: [],
          });
          this.labelData[i].name = i;
          this.labelData[i].itemStyle = this.labelBottom;
          this.labelData[i].tooltip = this.basetooltip;
    		}
        for (var j = 1; j < this.labelData.length; ++j) {
          if (j < this.perent[0]*100) {
             this.labelData[j].itemStyle.normal.color=this.color[0];
          } else if (j >= (this.perent[0]*100) && j < (this.perent[0]+this.perent[1])*100) {
             this.labelData[j].itemStyle.normal.color=this.color[1];
          } else if (j >= (this.perent[0]+this.perent[1])*100 && j < (this.perent[0]+this.perent[1]+this.perent[2])*100) {
             this.labelData[j].itemStyle.normal.color=this.color[2];
          }else{
            this.labelData[j].itemStyle.normal.color=this.color[3];
          }
        }
        this.option2.series[0].data = this.labelData;

        var params = {day:param};

          this.common.reqDef(this.getRiskDataUrl, params).then(data => {

            this.dataValue = data.data[0];
            var a=[];
            a[0] = data.data[0].gfx;
            a[1] = data.data[0].zfx;
            a[2] = data.data[0].dfx;
            a[3] = data.data[0].xxx;
            this.dataValue = a;
            //数据
            for (var i = 0; i < this.dataValue.length; i++) {
              this.option2.series[1].data[i].value = this.dataValue[i];
              this.option2.series[1].data[i].itemStyle.normal.color = this.color[i];
            }


          });

        //标题
      //  this.option2.title.text = "共检测1次";
      },
      pie3(param){
        var params = {day:param};
          this.common.reqDef(this.getAlarmTotalUrl, params).then(data => {
             this.option3.title.text= data.data[0].count;
             this.getAlarmData(params);

          });
      },
      getAlarmData(params){
        this.alarmDataDetail = [];
        this.option3.series[0].data = [{
                      value: [],
                      name: [],
                      itemStyle:{
                        normal:{
                          color:'#028bff'
                        }
                      }
                    }, {
                      value: [],
                      name: [],
                      itemStyle:{
                        normal:{
                          color:'#12cbf6'
                        }
                      }
                    }, {
                      value: [],
                      name: [],
                      itemStyle:{
                        normal:{
                          color:'#f9b607'
                        }
                      }
                    }, {
                      value: [],
                      name: [],
                      itemStyle:{
                        normal:{
                          color:'#9fe060'
                        }
                      }
                    }, {
                      value: [],
                      name: [],
                      itemStyle:{
                        normal:{
                          color:'#2bede6'
                        }
                      }
        }];
        this.common.reqDef(this.getAlarmDataUrl, params).then(data => {
          if(data.data.length === 0){
            this.nullAlarmDataShow = true;
          }else {
            this.alarmData = data.data;
            this.nullAlarmDataShow = false;
          }

           for(var i=0;i<this.alarmData.length;i++){
             var object =   {
                 name:'Network Virus',
                 value:335,
                 percent:'49%'
               }
            object.name = this.alarmData[i].protocolName;
            object.value = this.alarmData[i].count;
            object.percent = parseInt(this.alarmData[i].count/this.option3.title.text*100) + '%';
            this.alarmDataDetail.push(object);
            this.option3.series[0].data[i].name = this.alarmData[i].protocolName;
            this.option3.series[0].data[i].value = this.alarmData[i].count;
           }

        });
      },

      //页面跳转
      toDetails(params){
        this.$router.push({
          name: 'table2',
          params: {
            chooseParams: params,
            date:this.allOrMonth.params
          }
        })
      },

      //按照情况传递不同的参数去获取累计数据或者是近30天的数据
      getData(param){
        if(param == "all"){
          this.allOrMonth = {
            params:'all'
          };
          this.getThreatRegion();
          this.getThreatCount();
          this.getAddressLinkData();
          this.getCommunicationData();
          this.getMsgDataCount();
          this.getIpData();
          this.getMsgData();
          this.getAttackData();
          this.pie1();
          this.pie2();
          this.pie3();
          this.getThreatenedUser();
          this.getCrosswiseAndDataTheft();
          this.getNumberOfViolations();
          this.getIps();
          this.getMalwareRanking();
          this.chooseTable[0].boolean = true;
          this.chooseTable[1].boolean = false;
        }else if(param == "month"){
          this.allOrMonth = {
            params:'month'
          };
          this.getThreatRegion(30);
          this.getThreatCount(30);
          this.getAddressLinkData(30);
          this.getCommunicationData(30);
          this.getMsgDataCount(30);
          this.getIpData(30);
          this.getMsgData(30);
          this.getAttackData(30);
          this.pie1();
          this.pie2(30);
          this.pie3(30);
          this.getThreatenedUser();
          this.getCrosswiseAndDataTheft();
          this.getNumberOfViolations(30);
          this.getIps(30);
          this.getMalwareRanking(30);
          this.chooseTable[0].boolean = false;
          this.chooseTable[1].boolean = true;
        }
      },
      //获取URL中的参数
      getUrlParam(){
        var params = window.location.search;
        var placename = decodeURI(params.substr(params.indexOf("=")+1,params.length));
      }

    },
    mounted: function() {
      this.getData('month');
      this.getUrlParam();


    },
  }

</script>
