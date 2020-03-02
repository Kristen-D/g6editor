// JavaScript Document	
						   
$(document).ready(function () {
	var series=[];
	var legendData=[];
	var yAxisData=[];

	/*第一次读取最新通知*/
	setTimeout(function() {
			load_1();
			load_2();
			load_3();load_4();load_5();load_6();
		},
		200);
	/*30轮询读取函数*/
	setInterval(function() {

		load_1();
		load_2();
		load_3();load_4();load_5();load_6();
		},
		30000);

	function load_1() {
		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getBarDataList.do",
			dataType: "json",
			success: function (data) {
				series.length=0;
				legendData.length=0;

				var barList = data.data.barDataList;

				for (var i = 0; i < barList.length; i++) {
					var bar = barList[i]

					var item = {
						type: 'bar',
						stack: '总量',
						barWidth: 24,
						itemStyle: {normal: {label: {show: false, position: 'insideRight'}}}
					}


					item.name = bar.name;
					item.data = bar.data;
					series.push(item);
				}


				var legendList = data.data.legendData;

				for (var i = 0; i < legendList.length; i++) {
					var legend = legendList[i]

					var item = {
						name: '违规操作',
						icon: 'rectangle'
					}

					item.name = legend;
					item.icon = "rectangle";

					legendData.push(item);
				}

				yAxisData = data.data.yAxisData;

				loadA();


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});

	}
	
	
	
	
	
	
	
	var loadFirst=true;
	function load_2() {

		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getDetailedByEventType.do",
			dataType: "json",
			success: function (data) {
				$("#alarm_list").empty();
				var alarmList = data.data.high;
				for (var i = 0; i < alarmList.length; i++) {
					var alarm = alarmList[i]


					$("#alarm_list").append("<tr><td width='30%'>" + alarm.threat_desc + "</td><td width='20%'>" + alarm.grade_desc + "</td><td width='20%'>" + alarm.areaname + "分公司</td><td width='30%'>" + alarm.product_ip + "</td></tr>");

				}

				// loadAsset();
               if(loadFirst){  
   				//table滚动
   				$(function () {
   					$("div.list_lh").myScroll({
   						speed: 40, //数值越大，速度越慢
   					});
   				});
   				loadFirst=false;
               }


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});


	}
	
	
	
	
	
	
var placeList =[];
var geoData=[];
	function load_3() {
		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getGeoMapData.do",
			dataType: "json",
			success: function (data) {

				geoData.length = 0;
				placeList.length=0;
				var geoDataList = data.data.geoDataList;
				for (var i = 0; i < geoDataList.length; i++) {
					var geo = geoDataList[i]

					var item = {
						name: '违规操作',
						geoCoord: 'rectangle'
					}

					item.name = geo.name;
					item.geoCoord = geo.value;

					geoData.push(item);


				}


				var allChinaData = data.data.allChinaData;
				for (var i = 0; i < allChinaData.length; i++) {
					var chinaData = allChinaData[i]

					var item = {
						name: '违规操作',
						geoCoord: 'rectangle'
					};
					var geoCoordList = [];
					geoCoordList[0] = chinaData.lng;
					geoCoordList[1] = chinaData.lat;

//                                                                var result="";
//	                                                            result = "";
//	                                                            result += "'";
//	                                                            result += ; 
//	                                                            result += "'"; 
					item.name = chinaData.name;
					item.geoCoord = geoCoordList;
					placeList.push(item);


				}

				loadMapA();
				//取出list中的值
				var json = "";
				for (var i = 0; i < placeList.length; i++) {
					json = json + "" + placeList[i].geoCoord + "--";
				}
//				console.log(placeList);
//														    placeList=[{name:"'海门'", geoCoord:["121.15, 31.89"]},
//															{name:"'鄂尔多斯'", geoCoord:[109.781327, 39.608266]},
//															{name:"'招远'", geoCoord:["120.38, 37.35"]},]
//														    console.log(placeList);

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});


	}

	
	
	
	function load_4() {

		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getDataSource.do",
			dataType: "json",
			success: function (data) {
				$("#flowDayBarAsset").empty();

				var productList = data.data;
				for (var i = 0; i < productList.length; i++) {
					var product = productList[i]

					if (i == 3 || i == 7 || i == 11) {
						$("#flowDayBarAsset").append("<li style='background:" + getColor() + "'>" + product.type_name + "<p>" + product.total + "</p></li>");
					} else if (i <= 11) {
						$("#flowDayBarAsset").append("<li style='background:" + getColor() + "'>" + product.type_name + "<p>" + product.total + "</p></li><img src='/static/images/list_bg.png' width='15' height='71'  alt=''/>");
					}
				}

				// loadAsset();

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});


	}
	
	
	
	var PienameList=[];
	var PieList=[];
	function load_5() {
		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getThreatInfo.do",
			dataType: "json",
			success: function (data) {
				PienameList.length=0;
				PieList.length=0;
				var monthList = data.data.month;
				for (var i = 0; i < monthList.length; i++) {
					var item = monthList[i]
					PienameList.push(item.name);
					PieList.push(item);
				}


				loadPieA();


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});


	}
	var timer11;
	function load_6() {


		$.ajax({
			type: "post",
			url: "/ssa/alarmMap/getAreaSafeList.do",
			dataType: "json",
			success: function (data) {

				$("#flowDayLineList").empty();
				$("#flowDayLineList").append(" <span class='box_tl'></span><span class='box_tr'></span><span class='box_bl'></span><span class='box_br'></span>");
				var dataList = data.data;
				for (var i = 0; i < dataList.length; i++) {
					var item = dataList[i];
					var xAxisData = [];
					var yAxisData = [];
					var textName = item.name;

					for (var j = 0; j < item.data.length; j++) {
						xAxisData.push(item.data[j].time);
						yAxisData.push(item.data[j].value);

//						console.log(item.data[j].value);
					}
					var lineId = "flowDayLine" + item.product_area_code;
					$("#flowDayLineList").append("<div class='oneByOne_item'><div class='echarts_box2' id='" + lineId + "'></div></div>");

					setLineList(lineId, xAxisData, yAxisData, textName);
				}


				//div切换
				var index = 0;

				function divqh() {

					if (index >= dataList.length - 1) {
						index = 0;
					} else {
						index = index + 1;
					}

					$(".oneByOne_item").hide().eq(index).show();
				}
				if(timer11){
					clearInterval(timer11);
				}
				timer11 = setInterval(divqh, 3000);

				$(".oneByOne_item").hover(function () {
					window.clearInterval(timer11);   //鼠标移上去的时候就不会自动播放了
				}, function () {
					if(timer11)	clearInterval(timer11);
					timer11 = setInterval(divqh, 3000); //鼠标移开的时候继续等2秒钟换一次
				});


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("出现错误");
			}
		});

	}
	function setLineList(lineId,xAxisData,yAxisData,textName){
		
		
		
		//line01
		 require.config({paths: { 'echarts': '/static/js'}});
		 require(['echarts','echarts/theme/shine','echarts/chart/line'],
		     function (ec,theme) {
		         var myChart = ec.init(document.getElementById(lineId),theme); 
		         var option = {
						color: [
						'#4ec5f4',
						],
						    tooltip : {
										trigger: 'axis',
										textStyle: {
													fontSize:16,
												},
									},
									 title : {
										text: textName,
										textStyle:{
										color:'#fff',
										},
										//subtext: '纯属虚构',
										x:'center'
									},
									legend: {
										textStyle:{
										color:'#fff',
										},
										x:"340",
										y:"10",
										data:['威胁总量']
									},
									grid: {
									x:50,
									y:35,
									x2:40,
									y2:44,
									borderWidth:1,
									borderColor:'#1f2569',
									},
									calculable : true,
									xAxis : [
										{
											type : 'category',
											boundaryGap : false,
											data : xAxisData,
											splitLine:{
									        lineStyle:{
									         color:'#66739a'
												}
											},
											axisLabel:{
												textStyle: {
													color:"#fff",
													fontSize:16,
												},
											},	
											splitArea:{show:true,areaStyle:{color: ['rgba(23,40,121,0.3)','#17297c']
		}}	
										}
									],
									yAxis : [
										{
											type : 'value',
											splitLine:{
									        lineStyle:{
									        color:'#66739a'
												}
											},
											axisLabel:{
										        textStyle: {
													color:"#a9ad9f",
													fontSize:14,
															},
									        },
										}
									],
									series : [
										{
											name:'威胁总量',
											type:'line',
											stack: '总量',
											data:yAxisData
										},
									]
						     };
		         myChart.setOption(option); 
		     }
		 );	
		
		
		
	}
	

		
		
		
		
		
	//显示隐藏
	 $(function(){ 
		 setTimeout('$(".box1").show("slow")',3000);
		 setTimeout('$(".box1").hide("slow")',10000);
		 setTimeout('$(".box2").show("slow")',3000);
		 setTimeout('$(".box2").hide("slow")',10000);
		 setTimeout('$(".line").show("slow")',3000);
		 setTimeout('$(".line").hide("slow")',10000);
		 setTimeout('$(".box3").show("slow")',12000);
		 setTimeout('$(".box3").hide("slow")',20000);
		 setTimeout('$(".line3").show("slow")',12000);
		 setTimeout('$(".line3").hide("slow")',20000);
		 setTimeout('$(".box4").show("slow")',22000);
		 setTimeout('$(".box4").hide("slow")',30000);
		 setTimeout('$(".line4").show("slow")',22000);
		 setTimeout('$(".line4").hide("slow")',30000);
		 setTimeout('$(".box5").show("slow")',30000);
		 setTimeout('$(".box5").hide("slow")',32000);
		 setTimeout('$(".line5").show("slow")',30000);
		 setTimeout('$(".line5").hide("slow")',32000);
		 
		});

  
  function getColor() {
          return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
          //return "#cee3f6";
  }
  
  
  function loadMapA(){
	
		//中国地图01
	               require.config({ paths: {'echarts': '/static/js'}});
	                require(
	                    ['echarts','echarts/theme/shine', 'echarts/chart/map'],
	                    function (ec,theme) {
	                        var myChart = ec.init(document.getElementById('flowDayMapA'),theme); 
	                        
								option = {
									color: [
										'rgba(255, 255, 255, 0.8)',
										'rgba(14, 241, 242, 0.8)',
										'rgba(37, 140, 249, 0.8)',
										'#ff8900'
									],
									title : {
										text: '',
										subtext: '',
										x:'center',
										textStyle : {
											color: '#fff'
										}
									},
									legend: {
										x:'center',
										y:'-20px',
										data:['强','中','弱','防御圈'],
										textStyle : {
											color: '#FFB400'
										},
									},
									series : [
										{
											name: '弱',
											type: 'map',
											mapType: 'china',
											itemStyle:{
												normal:{
													borderColor: (function () {
														 var zrColor = require('zrender/tool/color');
														 return zrColor.getLinearGradient(
															 200, 300, 400, 0,
															 [[0, '#6495ed'], [1, '#8de1fd']]
														 )
													 })() ,
													borderWidth:2,
													areaStyle:{
														color: '#040c30'
													}
												}
											},
											data : [],
											markPoint : {
												symbolSize: 2,
												large: true,
												effect : {
													show: true
												},
												data : (function(){
													var data = [];
													var len = placeList.length;
													var geoCoord;
													while(len--) {
														geoCoord = placeList[len].geoCoord;
														data.push({
															name : placeList[len].name,
															value : 10,
															geoCoord : placeList[len].geoCoord
														})
													}
													return data;
										})()
									}
								},
								{
									name: '中',
									type: 'map',
									mapType: 'china',
									data : [],
									markPoint : {
										symbolSize: 3,
										large: true,
										effect : {
											show: true
										},
										data : (function(){
											var data = [];
											var len = placeList.length;
											while(len--) {
												data.push({
													name : placeList[len].name,
													value : 50,
													geoCoord : placeList[len].geoCoord
												})
											}
											return data;
										})()
									}
								},
								{
									name: '强',
									type: 'map',
									mapType: 'china',
									hoverable: false,
									roam:true,
									data : [],
									markPoint : {
										symbol : 'diamond',
										symbolSize: 6,
										large: true,
										effect : {
											show: true
										},
										data : (function(){
											var data = [];
											var len = placeList.length;
											while(len--) {
												data.push({
													name : placeList[len].name,
													value : 90,
													geoCoord : placeList[len].geoCoord
												})
											}
											return data;
										})()
									}
								},
								{
									name: '防御圈',
									type: 'map',
									mapType: 'china',
									hoverable: false,
									roam:true,
									data : [],
									markPoint : {
									symbol:'emptyCircle',
									symbolSize : 22,
									effect : {
										show: true,
										shadowBlur : 0
									},
									itemStyle:{
										normal:{
											label:{show:false}
										},
										emphasis: {
											label:{position:'top'}
										}
									},
									data :geoData
								}
								},
								
							]
						};
								 myChart.setOption(option); 
									 }
									  );
		
  }
  
  
  
  
  
  
  
  
  function loadA() {
 
	//柱状图01
      require.config({paths: {'echarts': '/static/js' } });
      require(['echarts','echarts/theme/shine','echarts/chart/bar'],
           function (ec,theme) {
               var myChart = ec.init(document.getElementById('flowDayBarA'),theme); 
               var option = {
						color: ['#b7dffc','#ea4b69','#90ff00','#fbb150','#0170c1',],
					  tooltip : {
								trigger: 'axis',
								axisPointer : {            // 坐标轴指示器，坐标轴触发有效
									type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
								},
								 textStyle:{
								fontSize:16,
								}
							},
							grid: {
							x:102,
							y:14,
							x2:110,
							y2:15,
							borderWidth:0,
						    },
							legend: {
								orient: 'vertical',
								x:'330',
							    y:'center',
								backgroundColor:'rgba(30,39,73,0.7)',
								textStyle:{
									color:'#fff',
									},
								data:legendData
							},
							calculable : true,
							xAxis : [
								{
									type : 'value',
									show :false
								}
							],
							yAxis : [
								{
									type : 'category',
									data : yAxisData,
									splitLine:{
									show: false,
										},
										axisLabel:{
									textStyle: {
										color:"#fff",
										fontSize:14,
									},
								},
								}
							],
							series : series
                    };
					 myChart.setOption(option); } );   
  }
  
  
  
  
  
  
  
  
  
  
                
                
                
                

  
  
 function loadPieA(){

//饼图01
               require.config({paths: {'echarts': '/static/js'}});
                require(['echarts','echarts/theme/shine', 'echarts/chart/pie'],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieA'),theme); 
                        var option = {
							        color: [
									'#c35353',
									'#90ed7d',
									'#f7a35c',
									'#7cb5ec',
									],
									 title : {
											//text: '南丁格尔玫瑰图',
											//subtext: '纯属虚构',
											x:'center'
										},
										tooltip : {
											trigger: 'item',
											formatter: "{a} <br/>{b} : {c} ({d}%)",
											textStyle:{
											  fontSize:16,
											  color:"#fff",
											  },
										},
										legend: {
											x : 'center',
											y : '180',
											data:PienameList,
											textStyle:{
											  fontSize:13,
											  color:"#fff",
											  },
										},
										calculable : false,
										series : [
										   
											{
												name:'面积模式',
												type:'pie',
												radius : [8, 80],
												center : ['50%', 80],
												roseType : 'area',
												x: '50%',               // for funnel
												max: 40,                // for funnel
												sort : 'ascending',     // for funnel
												 itemStyle : {
													normal : {
														label : {
															show : true,
															formatter: "({d}%)",
															textStyle:{
														  fontSize:15,
														  },
														},
														labelLine : {
															show : true,
															length:1,
														}
													},
													
												},
												data:PieList
											}
										]
								
							     };
							 myChart.setOption(option); 
								 }
								  );	
                
 }              
                
                
                


					
//星星
}); 

