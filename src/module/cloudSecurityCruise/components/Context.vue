<template>
  <body id="bigscreen1">
    <div id="app">
        <header  class="header">
    	    <h2 class="header-title" @click="setUrl">{{this.placename}}—云安全巡航</h2>
    	</header>
    	<div class="announcement">
    		 <span class="tip-left"></span><span  class="tip-right"></span>
    		 <!-- <marquee direction="left" behavior="scroll" scrollamount="30" scrolldelay="200" onMouseOut="this.start()"  onMouseOver="this.stop()">通知通报：{{notice}}</marquee> -->
    	</div>
    	<section class="container-wrap">
    	    <el-row :gutter="20">
    	    	<el-col :span="17">
    				<div class="el-panel-bigscreen">
    					<el-row :gutter="20">
    					 <div class="color-divider vertical-line po-line1"></div>
    						<el-col :span="8">
    							<div class="el-panel-bigscreen-heading">
    							    <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>安全概况</h4>
    							</div>
    							<div class="el-panel-bigscreen-body">
    								<div class="echartsbox1" id="pieboxD">
                      <chart :options="option15"></chart>
                    </div>
    								<ul class="situation">
    									<li><label>新增漏洞</label> <span>{{newVulnerabilities}}</span></li>
    									<li><label>涉及资产</label> <span>{{involvingAssets}}</span></li>
    									<li><label>新增预警</label> <span>{{newEarlyWarning}}</span></li>
    								</ul>
    							</div>
    						</el-col>
    						<el-col :span="16">
    							<div class="el-panel-bigscreen-heading">
    								 <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>脆落性关联</h4>
    							</div>
    							<el-row>
    								<el-col :span="13">
                      <div class="echartsbox5" id="Graphbox">
                        <chart :options="option22"></chart>
                      </div>
                    </el-col>
    								<el-col :span="11">
                      <div class="echartsbox5" id="Bar4">
                        <chart :options="option8"></chart>
                      </div>
                    </el-col>
    							</el-row>
    						</el-col>
    					</el-row>
    					<div class="color-divider"></div>
    					<el-row>
                <!-- 中间部分，先不写 -->
    					    <div class="color-divider vertical-line po-line1"></div>
    					    <div class="color-divider vertical-line po-line2"></div>
    						<el-col :span="8">
    						    <div class="el-panel-bigscreen-heading">
    							    <h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>WEB漏洞</h4>
    							</div>
    							<div class="el-panel-bigscreen-body">
    							    <div class="clearfloat">
    									<div class="echartsbox" id="pieboxB1">
                        <chart :options="option33"></chart>
                      </div>
    									<dl class="describe">
    										<dt>{{WebMax}}<span>/&nbsp;{{WebVulAssetsNumber}}</span></dt>
    										<dd>总数<span>涉及网站</span></dd>
    									</dl>
    							    </div>
    							    <div class="echartsbox7" id="Bar1">
                        <chart :options="option5"></chart>
                      </div>
    							</div>
    						</el-col>
    						<el-col :span="8">
    							<div class="el-panel-bigscreen-heading">
    							<h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>主机漏洞</h4>
    							</div>
    							<div class="el-panel-bigscreen-body">
    							   <div class="clearfloat">
    							       <div class="echartsbox" id="pieboxB2">
                           <chart :options="option34"></chart>
                         </div>
    								   <dl class="describe">
    									  <dt>{{HostMax}}<span>/&nbsp;{{HostVulAssetsNumber}}</span></dt>
    									  <dd>总数<span>涉及资产</span></dd>
    								   </dl>
    							   </div>
    							   <div class="echartsbox7" id="Bar2">
                       <chart :options="option6"></chart>
                     </div>
    							</div>
    						</el-col>
    						<el-col :span="8">
    							<div class="el-panel-bigscreen-heading">
    							<h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>弱口令</h4>
    							</div>
    							<div class="el-panel-bigscreen-body">
    							     <div class="clearfloat">
    							       <div class="echartsbox" id="pieboxB3">
                           <chart :options="option35"></chart>
                         </div>
    								   <dl class="describe">
    									  <dt>{{WeakMax}}<span>/&nbsp;{{WeakPassAssetsNumber}}</span></dt>
    									  <dd>总数<span>涉及网站</span></dd>
    								   </dl>
    							     </div>
    							     <div class="echartsbox7" id="Bar3">
                         <chart :options="option7"></chart>
                       </div>
    							</div>
    						</el-col>
    					</el-row>
    				</div>
        		</el-col>
    	    	<el-col :span="7">
    				<div class="el-panel-bigscreen">
    					<div class="el-panel-bigscreen-heading">
    						<h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>钓鱼网站</h4>
    					</div>
    					<div class="el-panel-bigscreen-body">
    					    <el-row :gutter="30">
    					    	<el-col :span="10">
    							   <div class="" id="Radar" style="height: 180px">
                       <chart :options="option2"></chart>
                     </div>
    				    		</el-col>
    					    	<el-col :span="14">
    							    <ul class="total-ul spite-soft">
                        <li v-for="(item,index) in top5"><div class="square">{{index+1}}</div><p>{{item.name}}</p><span>{{item.number}}</span></li>
    							  	</ul>
    				    		</el-col>
    					    </el-row>
    						<div class="echartsbox1" id="line1">
                  <chart :options="option3"></chart>
                </div>
    					</div>
    				</div>
       				<div class="el-panel-bigscreen">
    					<div class="el-panel-bigscreen-heading">
    						<h4 class="el-panel-bigscreen-title"><i class="el-titleicon"></i>域名监控</h4>
    					</div>
    					<div class="el-panel-bigscreen-body">
    					    <el-row :gutter="20" style="margin:auto 10px 20px;">
    					    	<el-col :span="10">
    							   <div class="el-box">
    							   	  <span class="el-box-tl"></span><span class="el-box-tr"></span>
    							   	  <span class="el-box-bl"></span><span class="el-box-br"></span>
    							   	  <div class="echartsbox2" id="slmap">
                          <chart :options="option12"></chart>
                        </div>
    							   </div>
    				    		</el-col>
    					    	<el-col :span="14">
    						   	  <div class="el-box m-b-6">
    							   	  <span class="el-box-tl"></span><span class="el-box-tr"></span>
    							   	  <span class="el-box-bl"></span><span class="el-box-br"></span>
    							   	  <div class="echartsbox2">
    							   	  	<img src="/static/images/cd/www.png" alt="3w">
    							   	  	<div class="monitor">
    										    <p class="digital">{{TotalHijacking}}</p>
    					   	  				被劫持总数
    						   	  		</div>
    							   	  </div>
    							   </div>
    						   </el-col>
    					    </el-row>
    						<div class="echartsbox1" id="bar">
                  <chart :options="option4"></chart>
                </div>
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
    import {EcharPatternSrc} from '../js/option'
    import {EcharbluePatternSrc} from '../js/option'
    import {EchargreenPatternSrc} from '../js/option'
    import {EcharyellowPatternSrc} from '../js/option'
    import {EcharskybluePatternSrc} from '../js/option'
    import {EcharPatternSrc2} from '../js/option'
    import {Echarbaselabels} from '../js/option'
    import {Echaroption15} from '../js/option'
    import {Echaroption2} from '../js/option'
    import {Echaroption3} from '../js/option'
    import {Echaroption33} from '../js/option'
    import {Echaroption34} from '../js/option'
    import {Echaroption35} from '../js/option'
    import {Echaroption5} from '../js/option'
    import {Echaroption6} from '../js/option'
    import {Echaroption7} from '../js/option'
    import {Echaroption4} from '../js/option'
    import {Echaroption12} from '../js/option'
    import {Echargraphdata} from '../js/option'
    import {Echaroption22} from '../js/option'
    import {Echarreldata} from '../js/option'
    import {Echaroption8} from '../js/option'


    export default{
      components: {
        chart
      },
      data () {
        return {
          //图片
          PatternSrc : EcharPatternSrc,
          bluePatternSrc : EcharbluePatternSrc,
          greenPatternSrc : EchargreenPatternSrc,
          yellowPatternSrc : EcharyellowPatternSrc,
          skybluePatternSrc : EcharskybluePatternSrc,
          PatternSrc2 : EcharPatternSrc2,

          /**************参数***************/
          //地点名
          placename:'',
          //地点
          place:'',
          //通知
          notice:'',
          //ajax参数
          params:'',

          /**************安全概况*************/
          baselabels :Echarbaselabels,
          option15 : Echaroption15,
          //新增漏洞
          newVulnerabilities:0,
          //涉及资产
          involvingAssets:0,
          //新增预警
          newEarlyWarning:0,

          /**************钓鱼网站*************/
          option2 : Echaroption2,
          option3 : Echaroption3,
          top5:[{
            name:'',
            number:''
          }],
          lastWeek:[],

          /************Web漏洞、主机漏洞、弱口令饼图****************/
          PatternImg : new Image(),
          //大屏
          color : ['#8f0103','#ff0307','#ff9a23','#e7ff04'],
          basetooltip : {show:false},
          labelData : [],
          option33 : Echaroption33,
          option34 : Echaroption34,
          option35 : Echaroption35,
          datavalue33:[4,3,2,1],
          datavalue34:[],
          datavalue35:[],

          /************Web漏洞、主机漏洞、弱口令柱状图****************/
          //WEB漏洞
          webPatternImg : new Image(),
          option5 : Echaroption5,
          WebMax :0,
          WebVulAssetsNumber:0,
          WebData :[],
          WebNumber : [],
          //主机漏洞
          hostPatternImg : new Image(),
          option6 : Echaroption6,
          HostMax :0,
          HostVulAssetsNumber:0,
          HostData : [],
          HostNumber : [],
          //弱口令
          weakPatternImg : new Image(),
          option7 : Echaroption7,
          WeakMax :0,
          WeakPassAssetsNumber:0,
          WeakData : [],
          WeakNumber : [],

          /************域名监控****************/
          PatternImg1 : new Image(),
          option4 : Echaroption4,
          option12 : Echaroption12,
          TotalHijacking : 0,

          /***********脆弱性关联-关系图****************/
          graphdata : Echargraphdata,
          option22 : Echaroption22,


          /***********脆弱关系柱状图****************/
          //漏洞总数
          LoopholeNumber : 0,
          LoopholeMax : 0,
          loopholePatternImg : new Image(),
          //端口总数
          portPatternImg : new Image(),
          //服务总数
          servicePatternImg : new Image(),
          //主机总数
          hostPatternImg : new Image(),
          reldata : Echarreldata,
          option8 : Echaroption8,



          objWin:null,

        }
      },
      methods: {
        //获取地区参数
        getParams(){
          var params = window.location.search;
          this.placename = decodeURI(params.substr(params.indexOf("=")+1,params.length));
          //调试用的参数
          this.placename = "成都市"
          this.place = pinyin.getFullChars(this.placename.substr(0,this.placename.length-1));
          this.params = {
            params:this.place
          }
        },
        //获取通知
        getNotice(){
          this.notice = '月的微软补丁今天发布，经过 360 安全专家研判确认以下两个漏洞需要紧急处置:”震网三代”LNK 文件远程代码执行漏';
        },
        /**************安全概况*************/
        getPieboxD(){
          this.common.req("/ssa/CloudSecurityCruise/getNewVulnerabilities.do",this.params).then(data => {
            this.newVulnerabilities = data[0].number;
          });
          this.common.req("/ssa/CloudSecurityCruise/getAssetsNumber.do",this.params).then(data => {
            this.involvingAssets = data[0].number;
          });
          this.common.req("/ssa/CloudSecurityCruise/getWarningNumber.do",this.params).then(data => {
            this.newEarlyWarning = data[0].number;
          });
        },
        getOption15(){
          this.option15.series[0].label.normal = this.baselabels;
          this.option15.series[0].label.emphasis = this.baselabels;
        },

        /************钓鱼网站****************/
        getTop5(){
          // 从数据库获取时便排序(由大到小)
          this.common.req("/ssa/CloudSecurityCruise/getFishData.do",this.params).then(data => {
            this.top5 = data;
            for(var i=0;i<this.top5.length;i++){
              this.option2.radar.indicator[i].max = this.top5[0].number;
              this.option2.series[0].data[0].value[i] = this.top5[i].number;
            }
          });
        },
        //折线图
        getAttackInvasion(){
          var xparam = [];
          var yparam = [];
          var ymax = 1;
          this.common.req("/ssa/CloudSecurityCruise/getNearlySevenDays.do",this.params).then(data => {
            this.lastWeek = data;
            for(var i=0;i<data.length;i++){
              this.lastWeek[i].date = this.lastWeek[i].date.replace('-','.');
              if(this.lastWeek[i].date.substr(0, 1) == '0'){
                xparam[i] = this.lastWeek[i].date.substr(1,5);
              }else{
                xparam[i] = this.lastWeek[i].data;
              }
              yparam[i] = this.lastWeek[i].count;
            }
            //获取参数里面的最大值
            for(var i=0;i<this.lastWeek.length;i++){
              if(ymax < this.lastWeek[i].count){
                ymax = this.lastWeek[i].count;
              }
            }
            //设置y轴的最大值和间隔量
            this.option3.yAxis[0].max = ymax;
            this.option3.yAxis[0].splitNumber = 5;
            //设置x轴日期111
            this.option3.xAxis[0].data = xparam; //[12.05,12.06,12.07,12.08,12.09,12.10,12.11]
            //设置y轴衡量值
            this.option3.series[0].data = yparam;
          });

        },

        /************Web漏洞、主机漏洞、弱口令饼图****************/
        setPieStyle(datavalue){
          this.labelData = [];
          var sum = 0;
          var pervalue = 50;
          var perent = [];
          for(var x=0;x<datavalue.length;x++){
            sum+=datavalue[x];
          };
          sum = sum>0?sum:1;
          for(x=0;x<datavalue.length;x++){
            perent[x]=datavalue[x]/sum;
          };
          for (var i = 0; i < pervalue; ++i) {
            if(i < perent[0]*pervalue) {
                this.labelData.push({
                  value: 1,
                  name: i,
                  itemStyle:{normal:{color: this.color[0]}},
                  tooltip:this.basetooltip
                });
            }else if (i >= (perent[0]*pervalue) && i < (perent[0]+perent[1])*pervalue) {
                this.labelData.push({
                  value: 1,
                  name: i,
                  itemStyle:{normal:{color: this.color[1]}},
                  tooltip:this.basetooltip
                });
            }else if(i >= (perent[0]+perent[1])*pervalue && i < (perent[0]+perent[1]+perent[2])*pervalue) {
                this.labelData.push({
                  value: 1,
                  name: i,
                  itemStyle:{normal:{color: this.color[2]}},
                  tooltip:this.basetooltip
                });
            }else if( i >= (perent[0]+perent[1]+perent[2])*pervalue && i < (perent[0]+perent[1]+perent[2]+perent[3])*pervalue){
                this.labelData.push({
                  value: 1,
                  name: i,
                  itemStyle:{normal:{color: this.color[3]}},
                  tooltip:this.basetooltip
                });
            }
          }
        },

        getWEBVulnerabilityPie(){
          this.common.req("/ssa/CloudSecurityCruise/getWEBVulnerabilityPie.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.datavalue33[i] = data[i].number;
            }
            this.setPieStyle(this.datavalue33)
            this.option33.series[0].data = this.labelData;
            for(var i=0;i<this.datavalue33.length;i++){
              if(this.datavalue33[i]!=0){
                this.option33.series[1].data[i].value = this.datavalue33[i];
                this.option33.series[1].data[i].itemStyle.normal.color = this.color[i];
              }
            }
          });
          //web漏洞涉及资产
          this.common.req("/ssa/CloudSecurityCruise/getWebVulAssetsNumber.do",this.params).then(data => {
            this.WebVulAssetsNumber = data[0].number;
          });
        },

        getHostVulnerabilityPie(){
          this.common.req("/ssa/CloudSecurityCruise/getHostVulnerabilityPie.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.datavalue34[i] = data[i].number;
            }
            this.setPieStyle(this.datavalue34)
            this.option34.series[0].data = this.labelData;
            for(var i=0;i<this.datavalue34.length;i++){
              if(this.datavalue34[i]!=0){
                this.option34.series[1].data[i].value = this.datavalue34[i];
                this.option34.series[1].data[i].itemStyle.normal.color = this.color[i];
              }
            }
          });
          //主机漏洞涉及资产
          this.common.req("/ssa/CloudSecurityCruise/getHostVulAssetsNumber.do",this.params).then(data => {
            this.HostVulAssetsNumber = data[0].number;
          });
        },

        getWeakPasswordPie(){
          this.common.req("/ssa/CloudSecurityCruise/getWeakPasswordPie.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.datavalue35[i] = data[i].number;
            }
            this.setPieStyle(this.datavalue35)
            this.option35.series[0].data = this.labelData;
            for(var i=0;i<this.datavalue35.length;i++){
              if(this.datavalue35[i]!=0){
                this.option35.series[1].data[i].value = this.datavalue35[i];
                this.option35.series[1].data[i].itemStyle.normal.color = this.color[i];
              }
            }
          });
          //弱口令涉及资产
          this.common.req("/ssa/CloudSecurityCruise/getWeakPassAssetsNumber.do",this.params).then(data => {
            this.WeakPassAssetsNumber = data[0].number;
          });
        },

        /************Web漏洞、主机漏洞、弱口令柱状图****************/
        //web漏洞
        getWebBar(){
          this.PatternImg.src = this.PatternSrc;
          this.webPatternImg.src = this.skybluePatternSrc;
          //获取上限
          this.common.req("/ssa/CloudSecurityCruise/getAllNumberWebVulnerability.do",this.params).then(data => {
            this.WebMax = data[0].number;
            //下一行为顺便设置安全概况
            this.option15.series[0].data[0].value = this.WebMax;
            var max = [];
            var param = 0;
            //如果数据库没有数据则设置上限为1以显示柱条
            if (this.WebMax==0) {
              param = 1;
            }else{
              param = this.WebMax
            }
            for(var i=0;i<5;i++){
              max[i] = param;
            }
            this.option5.series[1].data = max;
            this.LoopholeNumber += this.WebMax;
          });
          //获取前五条数据
          this.common.req("/ssa/CloudSecurityCruise/getTopFiveWebVulnerability.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.WebData[data.length - i -1] = data[i].name;
              this.WebNumber[data.length - i -1] = data[i].number;
            }
            this.option5.yAxis.data  = this.WebData;
            this.option5.series[0].data = this.WebNumber;
          });
          this.option5.series[0].itemStyle.normal.color.image = this.webPatternImg;
          this.option5.series[1].itemStyle.normal.color.image = this.PatternImg;
        },

        //主机漏洞
        getHostBar(){
          this.PatternImg.src = this.PatternSrc;
          this.hostPatternImg.src = this.greenPatternSrc;
          //获取上限
          this.common.req("/ssa/CloudSecurityCruise/getAllNumberHostVulnerability.do",this.params).then(data => {
            this.HostMax = data[0].number;
            //下一行为顺便设置安全概况
            this.option15.series[0].data[1].value = this.HostMax;
            var max = [];
            var param = 0;
            //如果数据库没有数据则设置上限为1以显示柱条
            if (this.HostMax==0) {
              param = 1;
            }else{
              param = this.HostMax
            }
            for(var i=0;i<5;i++){
              max[i] = param;
            }
            this.option6.series[1].data = max;
          });
          //获取前五条数据
          this.common.req("/ssa/CloudSecurityCruise/getTopFiveHostVulnerability.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.HostData[data.length - i -1] = data[i].name;
              this.HostNumber[data.length - i -1] = data[i].number;
            }
            this.option6.yAxis.data  = this.HostData;
            this.option6.series[0].data = this.HostNumber;
          });
          this.option6.series[0].itemStyle.normal.color.image = this.hostPatternImg;
          this.option6.series[1].itemStyle.normal.color.image = this.PatternImg;
        },

        //弱口令
        getWeakBar(){
          this.PatternImg.src = this.PatternSrc;
          this.weakPatternImg.src = this.yellowPatternSrc;
          //获取上限
          this.common.req("/ssa/CloudSecurityCruise/getAllNumberWeakPassword.do",this.params).then(data => {
            this.WeakMax = data[0].number;
            //下一行为顺便设置安全概况
            this.option15.series[0].data[2].value = this.WeakMax;
            var max = [];
            var param = 0;
            //如果数据库没有数据则设置上限为1以显示柱条
            if (this.WeakMax==0) {
              param = 1;
            }else{
              param = this.WeakMax
            }
            for(var i=0;i<5;i++){
              max[i] = param;
            }
            this.option7.series[1].data = max;
          });
          //获取前五条数据
          this.common.req("/ssa/CloudSecurityCruise/getTopFiveWeakPassword.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.WeakData[data.length - i -1] = data[i].name;
              this.WeakNumber[data.length - i -1] = data[i].number;
            }
            this.option7.yAxis.data  = this.WeakData;
            this.option7.series[0].data = this.WeakNumber;
          });
          this.option7.series[0].itemStyle.normal.color.image = this.weakPatternImg;
          this.option7.series[1].itemStyle.normal.color.image = this.PatternImg;
        },

        /************域名监控****************/
        domainNameMonitoring(){
          this.PatternImg1.src = this.PatternSrc2;
          this.option4.series[0].itemStyle.normal.color.image = this.PatternImg1;
          var name = [];
          var number = [];
          this.common.req("/ssa/CloudSecurityCruise/getDNS.do",this.params).then(data => {
            for(var i=0;i<data.length;i++){
              this.TotalHijacking += data[i].number;
            }
            for(var i=0;i< (data.length>5?5:data.length) ;i++){
              name[i] = data[i].name;
              number[i] = data[i].number;
            }
            this.option4.xAxis[0].data = name;
            this.option4.series[0].data = number;
          });
        },

        /****************地图********************/
        getMap(){
          this.option12.geo.map = this.place;
        },

        /****************脆弱性关联-关系图********************/
        dlinks() {
            for(var i = 0; i < this.graphdata.length; i+=2) {
              for(var j = i + 1; j < this.graphdata.length; j+=5) {
                this.option22.series[0].links.push({
                  source: this.graphdata[i].name,
                  target: this.graphdata[j].name,
                  value: this.graphdata[j].value,
                });

              };
            };
            this.option22.series[0].data = this.graphdata;
        },

        /***********脆弱关系柱状图****************/
        getVulnerableRelationHistogram(){
          this.loopholePatternImg.src = this.greenPatternSrc;
          this.portPatternImg.src = this.yellowPatternSrc;
          this.servicePatternImg.src = this.skybluePatternSrc;
          this.hostPatternImg.src = this.bluePatternSrc;
          this.reldata[0].itemStyle.normal.color.image = this.loopholePatternImg;
          this.reldata[1].itemStyle.normal.color.image = this.portPatternImg;
          this.reldata[2].itemStyle.normal.color.image = this.servicePatternImg;
          this.reldata[3].itemStyle.normal.color.image = this.hostPatternImg;
          this.option8.series[0].data = this.reldata;
          this.option8.series[1].itemStyle.normal.color.image = this.PatternImg;
          //漏洞总数
          this.common.req("/ssa/CloudSecurityCruise/getLoopholeNumber.do",this.params).then(data => {
            this.LoopholeMax = data[0].nearlydata;
            this.LoopholeNumber = this.WebMax + this.HostMax + this.WeakMax;
            this.option8.series[0].data[3].value = this.LoopholeNumber;
            this.option8.series[1].data[3] = this.LoopholeMax;
          });
          for(var i=0;i<3;i++){
            this.option8.series[1].data[i] = 150;
          }
        },

      },
      mounted: function() {
        // this.getNotice();
        //安全概况
        this.getPieboxD();
        this.getOption15();
        //钓鱼网站
        this.getTop5();
        //Web漏洞、主机漏洞、弱口令
        this.getWEBVulnerabilityPie();
        this.getHostVulnerabilityPie();
        this.getWeakPasswordPie();
        this.getWebBar();
        this.getHostBar();
        this.getWeakBar();
        //域名监控
        this.domainNameMonitoring();
        //地图
        this.getMap();
        //脆弱性关联-关系图
        this.dlinks();
        //脆弱关系柱状图
        this.getVulnerableRelationHistogram();
      },
      created:function() {
        this.getParams();
        this.getAttackInvasion();
      }

    }
</script>
