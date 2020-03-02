<template>
<body id="bigscreen1">
  <div id="app">
      <header  class="header">
  	    <h2 class="header-title">成都市网络安全态势感知</h2>

  	</header>
  	<div class="announcement">
  		 <span class="tip-left"></span><span  class="tip-right"></span>
  		 <marquee direction="left" behavior="scroll" scrollamount="30" scrolldelay="200" onMouseOut="this.start()"  onMouseOver="this.stop()">通知通报：月的微软补丁今天发布，经过 360 安全专家研判确认以下两个漏洞需要紧急处置:”震网三代”LNK 文件远程代码执行漏</marquee>
  	</div>
  	<section class="container-wrap">
  		<el-row :gutter="20">
  			<el-col :span="7">
  			  <ul class="circlepr clearfloat">
  				 <li>
  					     <cir :dataRatio="attackDataRatio" :data="attackData[0]" :name="attackName"></cir>
     				 </li>
     				 <li>
  					     <cir :dataRatio="vulDataRatio" :data="vulData[0]" :name="vulName"></cir>
     				 </li>
             <li>
  					     <cir :dataRatio="fishUrlDataRatio" :data="fishUrlData[0]" :name="fishName"></cir>
             </li>
     				 <li>
  					     <cir :dataRatio="dnsDataRatio" :data="dnsData[0]" :name="dnsName"></cir>
     				 </li>
     			  </ul>
  			  <div class="el-panel-bigscreen border">
  				  <span class="left"></span><span class="right"></span>
  				  <div class="el-panel-bigscreen-heading">
  					   <div class="echartsbox3" style="height: " id="sankeybox">
                 <chart :options="options3"></chart>
               </div>
  				  </div>
  			  </div>
  			</el-col>
  			<el-col :span="10" style="position: relative;">
  			     <div id="cdmap" style="height:570px" >
               <chart :options="optionsMap" @click="selectMap"></chart>
             </div>
  			     <div class="map-right-info">
  			     	<label class="float-l digital">98</label>
  			     	<label class="content">安全指数<br><small class="info-mark"><i class="el-icon-caret-top m-r-8"></i>15</small></label>
  			     </div>

  				 <div class="el-box map-abutton">
  					 <span class="el-box-stl"></span><span class="el-box-str"></span>
  					 <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
  					 <el-button type="text" id="select" @click="allSelect()"><i id="icon" class="icon-selected" flag="1"></i></el-button>
  				 </div>
  			</el-col>
  			<el-col :span="7">
  				   <div style="height: 146px;" id="main">
                 <chart :options="optionsMain" ></chart>
             </div>

             <div class="el-panel-bigscreen" style="margin-top:50px;">
               <div class="el-panel-bigscreen-heading">
                 <h3 class="el-panel-bigscreen-title">
                   <i class="el-titleicon"></i>受威胁资产TOP</h3>
                   <a href="#" class="el-panel-bigscreen-more" @click="toDetails(0)">更多<i class="more-icon">&gt;&gt;&gt;</i></a>
               </div>
               <div class="el-panel-bigscreen-body">
                 <el-row :gutter="10">
                   <el-col :span="8" class="text-center">
                     <p class="digit2">{{threatDataAll}}</p>
                     <p>资产总量</p>
                   </el-col>
                   <el-col :span="16" style="margin:-10px auto auto">
                     <div class="">
                       <div class="progress-text">
                         <div class="square">1</div>
                         <label>{{threatDataIp1}}</label>
                         <span class="ipadress">{{threatDataCount1}}</span>
                       </div>
                       <div class="progress">
                         <div class="progress-bar progress-bar_warning" :style="{width:threatDataRate1 +'%'}"></div>
                       </div>
                     </div>
                     <div class="">
                       <div class="progress-text">
                         <div class="square">2</div>
                         <label>{{threatDataIp2}}</label>
                         <span class="ipadress">{{threatDataCount2}}</span>
                       </div>
                       <div class="progress">
                         <div class="progress-bar progress-bar_warning" :style="{width:threatDataRate2 +'%'}"></div>
                       </div>
                     </div>
                     <div class="">
                       <div class="progress-text">
                         <div class="square">3</div>
                         <label>{{threatDataIp3}}</label>
                         <span class="ipadress">{{threatDataCount3}}</span>
                       </div>
                       <div class="progress">
                         <div class="progress-bar progress-bar_warning" :style="{width:threatDataRate3 +'%'}"></div>
                       </div>
                     </div>
                     <div class="">
                       <div class="progress-text">
                         <div class="square">4</div>
                         <label>{{threatDataIp4}}</label>
                         <span class="ipadress">{{threatDataCount4}}</span>
                       </div>
                       <div class="progress">
                         <div class="progress-bar progress-bar_warning" :style="{width:threatDataRate4 +'%'}"></div>
                       </div>
                     </div>
                     <div class="">
                       <div class="progress-text">
                         <div class="square">5</div>
                         <label>{{threatDataIp5}}</label>
                         <span class="ipadress">{{threatDataCount5}}</span>
                       </div>
                       <div class="progress">
                         <div class="progress-bar progress-bar_warning" :style="{width:threatDataRate5 +'%'}"></div>
                       </div>
                     </div>

                   </el-col>
                 </el-row>
               </div>
             </div>
  			</el-col>
  		</el-row>

  		<el-row :gutter="20">
  			<el-col :span="10">
  				<div class="el-panel-bigscreen">
  					<div class="el-panel-bigscreen-heading">
  						<h3 class="el-panel-bigscreen-title">
  						    <i class="el-titleicon"></i>事件趋势</h3>
  						<!-- <a href="#" class="el-panel-bigscreen-more">更多<i class="more-icon">&gt;&gt;&gt;</i></a> -->
  					</div>
  					<div class="echartsbox7" id="line">
              <chart :options="options7" ></chart>
            </div>
  				</div>
  			</el-col>
  			<el-col :span="14">
  				<div class="el-panel-bigscreen" style="height:295px;">
  					<div class="el-panel-bigscreen-heading">
  						<h3 class="el-panel-bigscreen-title">
  							<i class="el-titleicon"></i>告警TOP</h3>
  						<a href="#" class="el-panel-bigscreen-more" @click="toDetails(1)">更多<i class="more-icon">&gt;&gt;&gt;</i></a>
  					</div>
  					<div class="el-panel-bigscreen-body">

              <el-table :data="alarmData"  style="width: 100%" class="deep-table2" max-height="200">
								<el-table-column prop="alarmDesc" label="内容" show-overflow-tooltip width="440"></el-table-column>
								<el-table-column prop="dstIp" label="ip地址" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="威胁类型"></el-table-column>
								<el-table-column prop="time" label="时间" width="200"></el-table-column>
							</el-table>
  					</div>
  				</div>
  			</el-col>
  		</el-row>
  	</section>

  </div>
</body>


</template>

<script>
import chart from 'components/vue-echarts/ECharts.vue'
import {eventTrend} from './ChartOptions.js'
import {harmfulProcedure} from './ChartOptions.js'
import {regionalIndex} from './ChartOptions.js'
import {map} from './ChartOptions.js'
import cir from './Circle'


export default {
  components: {chart , cir},
  data(){
    return {
      sel:1,
      getFishUrlDataUrl:"/ssa/netSeSituAwareness/getFishUrlData.do",
      getFishUrlDataByThrUrl:"/ssa/netSeSituAwareness/getFishUrlDataByThr.do",
      getVulDataUrl:"/ssa/netSeSituAwareness/getVulData.do",
      getVulDataByThrUrl:"/ssa/netSeSituAwareness/getVulDataByThr.do",
      getDnsDataUrl:"/ssa/netSeSituAwareness/getDnsData.do",
      getDnsDataByThrUrl:"/ssa/netSeSituAwareness/getDnsDataByThr.do",
      getAttackDataUrl:"/ssa/netSeSituAwareness/getAttackData.do",
      getAttackDataByThrUrl:"/ssa/netSeSituAwareness/getAttackDataByThr.do",
      getAlarmDataUrl:"/ssa/netSeSituAwareness/getAlarmData.do",
      getStatsDataUrl:"/ssa/netSeSituAwareness/getStatsData.do",
      getStatsDataDetailUrl:"/ssa/netSeSituAwareness/getStatsDataDetail.do",
      getStatsTypeDataUrl:"/ssa/netSeSituAwareness/getStatsTypeData.do",
      getThreatDataUrl:"/ssa/netSeSituAwareness/getThreatData.do",
      getThreatDataPartUrl:"/ssa/netSeSituAwareness/getThreatDataPart.do",
      statsData:[],
      statsDataDetail:[],
      statsTypeData:[],
      fishUrlData:[],
      fishUrlDataByThr:[],
      fishUrlDataRatio:'',
      fishName:'已发现钓鱼',
      vulName:'已发现漏洞',
      dnsName:'已发现域名',
      attackName:'已发现攻击',
      vulData:[],
      vulDataByThr:[],
      vulDataRatio:'',
      dnsData:[],
      dnsDataByThr:[],
      dnsDataRatio:'',
      attackData:[],
      attackDataByThr:[],
      attackDataRatio:'',
      options7: eventTrend,
      options3:harmfulProcedure,
      optionsMain:regionalIndex,
      optionsMap:map,
      alarmData:[],
      statsDataAll:[],
      statsDataLink:[],
      a:{},
      threatDataAll:[],
      threatData:[],
      threatDataCount1:'',
      threatDataCount2:'',
      threatDataCount3:'',
      threatDataCount4:'',
      threatDataCount5:'',
      threatDataIp1:'',
      threatDataIp2:'',
      threatDataIp3:'',
      threatDataIp4:'',
      threatDataIp5:'',
      threatDataRate1:'',
      threatDataRate2:'',
      threatDataRate3:'',
      threatDataRate4:'',
      threatDataRate5:'',
      objWin:null,
      b:{}

  }
},
  methods:{
//设置地图点击跳转Url
    setUrl(param){
      var zw = encodeURI(param);
      var html = "cloudSecurityCruise.html";
      var url = window.location.href;
      url = url.substr(0,url.lastIndexOf(".html"));
      url = url.substr(0,url.lastIndexOf("/")+1) + html + "?params=" + zw;
      window.open (url, "view_window");
    },
//获取受威胁的资产总数
    getThreatData(name){
      var params = {areaName:name};
        this.common.reqDef(this.getThreatDataUrl, params).then(data => {
          this.threatDataAll = data.data[0];
          this.getThreatDataPart("");
        });
    },
// 获取受威胁的资产TOP5
    getThreatDataPart(name){
      var params = {areaName:name};
        this.common.reqDef(this.getThreatDataPartUrl, params).then(data => {
          this.threatData = data.data;
          this.threatDataCount1 = this.threatData[0].count;
          this.threatDataIp1 = this.threatData[0].ip;
          this.threatDataCount2 = this.threatData[1].count;
          this.threatDataIp2 = this.threatData[1].ip;
          this.threatDataCount3 = this.threatData[2].count;
          this.threatDataIp3 = this.threatData[2].ip;
          this.threatDataCount4 = this.threatData[3].count;
          this.threatDataIp4 = this.threatData[3].ip;
          this.threatDataCount5 = this.threatData[4].count;
          this.threatDataIp5 = this.threatData[4].ip;
          this.threatDataRate1 = this.threatDataCount1/this.threatDataAll *100 ;
          this.threatDataRate2 = this.threatDataCount2/this.threatDataAll *100 ;
          this.threatDataRate3 = this.threatDataCount3/this.threatDataAll *100;
          this.threatDataRate4 = this.threatDataCount4/this.threatDataAll *100 ;
          this.threatDataRate5 = this.threatDataCount5/this.threatDataAll *100 ;

        });
    },

    processingPictures(){
    var PatternSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAIAAAHTqHJ0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUYzNjMwMUFBNzJCMTFFN0IxQzVCRTdEQjhGOTVDRjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUYzNjMwMTlBNzJCMTFFN0IxQzVCRTdEQjhGOTVDRjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ZmE4YzkxZS1lNzUyLTQxMWMtYmE1Yi05ZDQ3ODExYTViNzkiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxNjIyMWFhZi04ZDdkLTExZTctYmE2Ny04ZmNlZWEwZjU3OWYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rLQFrAAAAQ0lEQVR42mJk45NmYGAACCAGIAUQQIzK//8zgAFAADFCBKECAAGEEIcAJgZUABBAUNVQDrJiJpzaAAIM3Ux85lNDDgDeaAt2XGNXOwAAAABJRU5ErkJggg==';

      var PatternImg = new Image();
       PatternImg.src = PatternSrc;
       this.optionsMain.series[0].itemStyle.normal.color.image = PatternImg;
   },
   processingMap(){
     var data1=[
         {name:'成都市',value:10,selected:false},
         {name:'双流区',value:10,selected:true},
         {name:'锦江区',value:10,selected:false},
         {name:'成华区',value:10,selected:false},
         {name:'青羊区',value:10,selected:false},
         {name:'龙泉驿区',value:10,selected:false},
         {name:'武侯区',value:10,selected:false},
         {name:'温江区',value:10,selected:false},
         {name:'青白江区',value:10,selected:false},
         {name:'金堂县',value:10,selected:false},
         {name:'蒲江县',value:10,selected:false},
         {name:'新都区',value:10,selected:false},
         {name:'新津县',value:10,selected:false},
         {name:'郫县',value:10,selected:false},
         {name:'彭州市',value:10,selected:false},
         {name:'邛崃市',value:10,selected:false},
         {name:'崇州市',value:10,selected:false},
         {name:'金牛区',value:10,selected:false},
         {name:'大邑县',value:10,selected:false},
         {name:'简阳市',value:10,selected:false},
         {name:'都江堰市',value: 10,selected:false}
     ];

     var data = [{name:'双流区',value:10}];

     this.optionsMap.series[0].data = this.convertData(data);
     this.optionsMap.geo.regions = data1;

   },
   convertData(data){
     var res = [];
     var geoCoordMap = {
           "锦江区":[104.080989, 30.657689],
           "成华区":[104.103077, 30.660275],
           "青羊区":[104.055731, 30.667648],
           "龙泉驿区":[104.269181, 30.56065],
           "武侯区":[104.05167, 30.630862],
           "温江区":[103.836776, 30.697996],
           "青白江区":[104.25494, 30.883438],
           "金堂县":[104.415604, 30.858417],
           "蒲江县":[103.511541, 30.194359],
           "新都区":[104.16022, 30.824223],
           "新津县":[103.812449, 30.414284],
           "郫县":[103.887842, 30.808752],
           "彭州市":[103.941173, 30.985161],
           "邛崃市":[103.46143, 30.413271],
           "崇州市":[103.671049, 30.631478],
           "双流区":[103.922706, 30.573243],
           "金牛区":[104.043487, 30.692058],
           "大邑县":[103.522397, 30.586602],
           "简阳市":[104.550339, 30.390666],
           "都江堰市":[103.627898, 30.99114],
           "成都市":[104.072399,30.579117]
           //'四川省政府':[104.081703,30.65722]
     };

     for (var i = 0; i < data.length; i++) {
         var geoCoord = geoCoordMap[data[i].name];
         if (geoCoord) {
             res.push({
                 name: data[i].name,
                 symbol:data[i].symbol,
                 value: geoCoord.concat(data[i].value)
             });
         }
     }
     return res;

   },
   //跳转至更多页面
   toDetails(param){
     this.$router.push({name:'details' , params:{chooseParams: param}});
   },
//获取前十种不同的漏洞名称和其数量
   getStatsData(){

  //   this.a = this.options3;
     var params = {};
       this.common.reqDef(this.getStatsDataUrl, params).then(data => {
         this.statsData = data.data;


         for(var i=0; i<this.statsData.length;i++){
           var statsData1={
             "name": "漏洞1",
             "value": "20",
             "type": "tag1",
             "itemStyle": {
               "normal": {
                 "color": "#0254d5"
               }
             },
             "label": {
               "normal": {
                 "position": "left"
               }
             }
           }
           statsData1.name = this.statsData[i].eventMsg;
           statsData1.value = this.statsData[i].count;
           this.statsDataAll.push(statsData1);

         }


          this.getStatsTypeData();

       });
   },
//获取前十种不同的漏洞中所有的漏洞类型
   getStatsTypeData(){
     var params = {};
       this.common.reqDef(this.getStatsTypeDataUrl, params).then(data => {
         this.statsTypeData = data.data;

         for(var i=0; i<this.statsTypeData.length;i++){
           var statsData2 = {
             "name": "有害程序",
             "index": 0,
             "type": "source",
             "itemStyle": {
               "normal": {
                 "color": "#0ad6f0"
               }
             },
             "label": {
               "normal": {
                 "position": "right"
               }
             }
           }
           statsData2.name = this.statsTypeData[i].name;
           statsData2.index = i;
           if(i===1){
             statsData2.itemStyle.normal.color = "#1884df";
           }else if(i===2){
             statsData2.itemStyle.normal.color = "#50fca8";
           }
           this.statsDataAll.push(statsData2);

         }
        this.options3.series[0].data = this.statsDataAll;
       });
   },
   //获取前十种不同的漏洞名称对应的不同的漏洞类型的数量
   getStatsDataDetail(){
     var params = {};
       this.common.reqDef(this.getStatsDataDetailUrl, params).then(data => {
         this.statsDataDetail = data.data;


         for(var i=0; i<this.statsDataDetail.length;i++){
           var statsData3={
             "source": "信息破坏",
             "target": "漏洞12",
             "value": "1",
             "lineStyle": {
               "normal": {
                 "color": null,
                 "opacity": 0.5
               }
             }
           }
           statsData3.source = this.statsDataDetail[i].name;
           statsData3.target = this.statsDataDetail[i].eventMsg;
           statsData3.value = this.statsDataDetail[i].count;
           this.statsDataLink.push(statsData3);
         }

         this.options3.series[0].links = this.statsDataLink;
       });
   },

//查找告警内容
   getAlarmData(){
     var params = {};
       this.common.reqDef(this.getAlarmDataUrl, params).then(data => {
         this.alarmData = data.data;
       });
   },
   //获取攻击的全部数据
   getAttackData(name){
      var params = {areaName:name};
        this.common.reqDef(this.getAttackDataUrl, params).then(data => {
          this.attackData = data.data;
         if(Number(this.attackData[0]) !== 0){
           this.attackDataRatio = Number(this.attackData[1])/Number(this.attackData[0])*100;
           //this.reloadCircle(this.fishUrlDataRatio)
         }else if(this.attackData[0] === null || this.attackData[0] === 0){
           this.attackData[0] = 0;
           this.attackDataRatio = 0;
         }
        });
   },
   //获取域名的全部数据
   getDnsData(name){
     var params = {areaName:name};
       this.common.reqDef(this.getDnsDataUrl, params).then(data => {
         this.dnsData = data.data;
        if(Number(this.dnsData[0]) !== 0){
          this.dnsDataRatio = Number(this.dnsData[1])/Number(this.dnsData[0])*100;
          //this.reloadCircle(this.fishUrlDataRatio)
        }else if(this.dnsData[0] === null|| this.dnsData[0] === 0){
          this.dnsData[0] = 0;
          this.dnsDataRatio = 0;
        }
       });
   },
   //获取漏洞的全部数据
   getVulData(name){
     var params = {areaName:name};
       this.common.reqDef(this.getVulDataUrl, params).then(data => {
         this.vulData = data.data;
        if(Number(this.vulData[0]) !== 0){
          this.vulDataRatio = Number(this.vulData[1])/Number(this.vulData[0])*100;
          //this.reloadCircle(this.fishUrlDataRatio)
        }else if(this.vulData[0] === null|| this.vulData[0] === 0){
          this.vulData[0] = 0;
          this.dnsDataRatio = 0;
        }
       });
   },
   //获取反钓鱼的数据
   getFishUrlData(name){
     var params = {areaName:name};
       this.common.reqDef(this.getFishUrlDataUrl, params).then(data => {
         this.fishUrlData = data.data;
        if(Number(this.fishUrlData[0]) !== 0){
          this.fishUrlDataRatio = Number(this.fishUrlData[1])/Number(this.fishUrlData[0])*100;
          //this.reloadCircle(this.fishUrlDataRatio)
        }else if(this.fishUrlData[0] === null|| this.fishUrlData[0] === 0){
          this.fishUrlData[0] = 0;
          this.dnsDataRatio = 0;
        }
       });
   },
   // 获取域名的近三十天的每一天的数据
   getAttackDataByThr(name){
     var params = {areaName:name};
       this.common.reqDef(this.getAttackDataByThrUrl, params).then(data => {
         this.attackDataByThr = data.data;
        for(var i = 0;i < this.attackDataByThr.length; i++){
        if(this.attackDataByThr[i].date.substr(0,1) === "0"){
            this.attackDataByThr[i].date = this.attackDataByThr[i].date.substr(1,5).replace('-','.');
        }
      }
      var xAttackDataByThr = [];
      var yAttackDataByThr = [];
      for(var j = 0;j<this.attackDataByThr.length; j++){
        xAttackDataByThr[j] = this.attackDataByThr[j].date;
        yAttackDataByThr[j] = this.attackDataByThr[j].count;
      }
      this.options7.xAxis[0].data =  xAttackDataByThr;
      this.options7.series[0].data =  yAttackDataByThr;
       });
   },
   //获取近三十天每一天的域名的详细数据
   getDnsDataByThr(name){
     var params = {areaName:name};
       this.common.reqDef(this.getDnsDataByThrUrl, params).then(data => {
         this.dnsDataByThr = data.data;
        for(var i = 0;i < this.dnsDataByThr.length; i++){
        if(this.dnsDataByThr[i].date.substr(0,1) === "0"){
            this.dnsDataByThr[i].date = this.dnsDataByThr[i].date.substr(1,5).replace('-','.');
        }
      }
      var xDnsDataByThr = [];
      var yDnsDataByThr = [];
      for(var j = 0;j<this.dnsDataByThr.length; j++){
        xDnsDataByThr[j] = this.dnsDataByThr[j].date;
        yDnsDataByThr[j] = this.dnsDataByThr[j].count;
      }
      this.options7.xAxis[0].data =  xDnsDataByThr;
      this.options7.series[3].data =  yDnsDataByThr;
       });
   },
   //获取近三十天每一天的漏洞的详细数据
   getVulDataByThr(name){
     var params = {areaName:name};
       this.common.reqDef(this.getVulDataByThrUrl, params).then(data => {
         this.vulDataByThr = data.data;
        for(var i = 0;i < this.vulDataByThr.length; i++){
        if(this.vulDataByThr[i].date.substr(0,1) === "0"){
            this.vulDataByThr[i].date = this.vulDataByThr[i].date.substr(1,5).replace('-','.');
        }
      }
      var xVulDataByThr = [];
      var yVulDataByThr = [];
      for(var j = 0;j<this.vulDataByThr.length; j++){
        xVulDataByThr[j] = this.vulDataByThr[j].date;
        yVulDataByThr[j] = this.vulDataByThr[j].count;
      }
      this.options7.xAxis[0].data =  xVulDataByThr;
      this.options7.series[1].data =  yVulDataByThr;
       });
   },
   //获取近三十天每一天的反钓鱼的详细数据
   getFishUrlDataByThr(name){
     var params = {areaName:name};
       this.common.reqDef(this.getFishUrlDataByThrUrl, params).then(data => {
         this.fishUrlDataByThr = data.data;
        for(var i = 0;i < this.fishUrlDataByThr.length; i++){
        if(this.fishUrlDataByThr[i].date.substr(0,1) === "0"){
            this.fishUrlDataByThr[i].date = this.fishUrlDataByThr[i].date.substr(1,5).replace('-','.');
        }
      }
      var xfishUrlDataByThr = [];
      var yfishUrlDataByThr = [];
      for(var j = 0;j<this.fishUrlDataByThr.length; j++){
        xfishUrlDataByThr[j] = this.fishUrlDataByThr[j].date;
        yfishUrlDataByThr[j] = this.fishUrlDataByThr[j].count;
      }
      this.options7.xAxis[0].data =  xfishUrlDataByThr;
      this.options7.series[2].data =  yfishUrlDataByThr;
       });
   },

//选择地图
   selectMap(val){
     this.setUrl(val.name);
     this.getFishUrlData(val.name);
     this.getFishUrlDataByThr(val.name);
     this.getVulData(val.name);
     this.getVulDataByThr(val.name);
     this.getDnsData(val.name);
     this.getDnsDataByThr(val.name);
     var areaN = "中国"+" "+"四川省"+" "+"成都市"+" "+val.name;
     this.getAttackData(areaN);
     this.getAttackDataByThr(areaN);
     var selectname = val.name;
   	 var selectd = val.region.selected;
   	 this.optionsMap.series[0].name = selectname;
     	var obj = [];
     	var legobj = [];
     	this.optionsMap.geo.itemStyle.normal.areaColor="#eee";
     	this.optionsMap.geo.itemStyle.emphasis.areaColor="#eee";
     	for(var i = 0; i < this.optionsMap.geo.regions.length; i++) {
     		this.optionsMap.geo.regions[i].selected = false;
     		if(this.optionsMap.geo.regions[i].name == selectname) {
     			this.optionsMap.geo.regions[i].selected = selectd;
     			obj.push({
     				name: selectname,
     				value: this.optionsMap.geo.regions[i].value
     			});
     			legobj.push({
     				name: selectname,
     				icon:'image://../static/images/cd/shot-icon-a.gif'
     			});
     			this.optionsMap.geo.itemStyle.emphasis.areaColor="yellow";
     			this.optionsMap.geo.itemStyle.normal.areaColor="rgba(8,20,36, .1)";
     			this.optionsMap.geo.itemStyle.normal.borderColor="#09d8fd";
     			// this.optionsMap.geo.itemStyle.normal.borderColor="yellow";
     		};
     	};
     	this.optionsMap.series[0].data = this.convertData(obj);
     	this.optionsMap.legend.data = legobj;
   },
   //点击全选
   allSelect(){
     this.getFishUrlData("成都市");
     this.getFishUrlDataByThr("成都市");
     this.getVulData("成都市");
     this.getVulDataByThr("成都市");
     this.getDnsData("成都市");
     this.getDnsDataByThr("成都市");
     this.getAttackData("中国 四川省 成都市");
     this.getAttackDataByThr("中国 四川省 成都市");
     var flag = $(this).attr('flag');

      if(flag == 1) {

        var val = false;
        $(this).attr('flag', 0);
        $('#icon').removeClass("icon-selected");
        $('#icon').addClass("icon-notselect");
      } else {

        var val = true;
        $(this).attr('flag', 1);

        $('#icon').removeClass("icon-notselect");
        $('#icon').addClass("icon-selected");

      }
      var obj = [];
      var allobj = [];
      var legobj = [];
      for(var i = 0; i < this.optionsMap.geo.regions.length; i++) {
        obj.push({
          name: this.optionsMap.geo.regions[i].name,
          value: this.optionsMap.geo.regions[i].value
        });
        if(this.optionsMap.geo.regions[i].name == "成都市") {
          this.optionsMap.geo.regions[i].selected = val;
          if(val) {
            allobj = obj;
            //obj.push({
            //	name: option.geo.regions[i].name,
            //	value: option.geo.regions[i].value
            //});
            legobj.push({
              name: this.optionsMap.geo.regions[i].name,
              icon: 'image://../static/images/cd/shot-icon-a.gif'
            });
            this.optionsMap.series[0].name = this.optionsMap.geo.regions[i].name;
            this.optionsMap.geo.itemStyle.normal.areaColor = "#1dcfd2";
            this.optionsMap.geo.itemStyle.emphasis.areaColor = "#1dcfd2";
            this.optionsMap.geo.itemStyle.normal.borderColor = "#0c5657";
            //option.geo.itemStyle.normal.borderWidth=2;
          } else {
            //obj=[];
            legobj = [];
            this.optionsMap.series[0].name = "";
            this.optionsMap.geo.itemStyle.normal.areaColor = "rgba(8,20,36, .1)";
            this.optionsMap.geo.itemStyle.normal.borderColor = "#09d8fd";
            this.optionsMap.geo.itemStyle.emphasis.areaColor = "rgba(8,20,36, .1)";
          }
        };
      };
      this.optionsMap.series[0].data = this.convertData(allobj);
      this.optionsMap.legend.data = legobj;

   }

},
// computed:{
//     selectClass(){
//       if(this.sel === 1){
//         return {
//           "icon-selected"
//         }
//       }else {
//         return {
//           "icon-notselect"
//         }
//       }
//     }
// },
	  created: async function() {

    this.processingPictures();
    this.processingMap();
    this.getFishUrlData("双流区");
    this.getFishUrlDataByThr("双流区");
    this.getVulData("双流区");
    this.getVulDataByThr("双流区");
    this.getDnsData("双流区");
    this.getDnsDataByThr("双流区");
    this.getAttackData("双流区");
    this.getAttackDataByThr("双流区");
    this.getAlarmData();
    this.getStatsData();
    this.getStatsDataDetail();
    this.getThreatData("");

  // this.judge();
  //  this.handleFindVul();




},
destroyed: function() {
  sessionStorage.removeItem('objWin');
}
}
</script>

<style >


</style>
