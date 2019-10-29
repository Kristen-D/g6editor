// JavaScript Document						   
$(document).ready(function () {
	//弹登录
	$('#add_test').click(function(){
		$('.ss-add-app-modal-mask,#unsaved_changes').show();
	});
	$('.add_close').click(function(){
		$('.ss-add-app-modal-mask').hide();
		$(this).parent().hide();
	});
	
	//
	$("#flowDayPieA").hover(
		function(){$(this).prev(".pieOutBox dl").hide()},
		function(){$(this).prev(".pieOutBox dl").show()}
	)
	//环形饼图01
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieA'),theme); 
                        
                        var option = {
													color: [
															'#c1232b',
															'#b5c334',
															'#fcce10',
															'#e87c25',
															'#27727b',
															'#fe8463',
															'#9bca63',
															'#fad860',
															'#f3a43b',
															'#60c0dd',
													],
                          tooltip : {
															show:false,
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)",
                          },
                         
                          calculable :false,
                          series : [
                              {
                                  name:'访问来源',
                                  type:'pie',
                                  center : ['50%', '48%'], 
                                  radius : ['57%', '75%'],
                                  itemStyle : {
                                      normal : {
                                          borderWidth: 0,
                                          label : {
                                              show : false
                                          },
                                          labelLine : {
                                              show : false
                                          }
                                      },
                                      emphasis : {
                                          label : {
                                              show : true,
                                              position : 'center',
																							formatter: "{b} :\n{c}\n({d}%)",
                                              textStyle : {
                                                  fontSize : '18',
                                              }
                                          }
                                      }
                                  },
                                  data:[
                                      {value:335, name:'扬声器01'},
                                      {value:310, name:'扬声器02'},
                                      {value:234, name:'扬声器03'},
                                      {value:635, name:'扬声器04'},
                                      {value:357, name:'扬声器05'},
                                      {value:432, name:'扬声器06'},
                                      {value:510, name:'扬声器07'}
                                  ]
                              }
                          ]
                      };
                        myChart.setOption(option); 
                    }
                );
	  
	       $("#flowDayPieB").hover(
		   function(){$(this).prev(".pieOutBox dl").hide()},
		   function(){$(this).prev(".pieOutBox dl").show()}
	        )
	//环形饼图02
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieB'),theme); 
                        
                        var option = {
													color: [
															'#c1232b',
															'#b5c334',
															'#fcce10',
															'#e87c25',
															'#27727b',
															'#fe8463',
															'#9bca63',
															'#fad860',
															'#f3a43b',
															'#60c0dd',
													],
                          tooltip : {
															show:false,
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)",
                          },
                         
                          calculable :false,
                          series : [
                              {
                                  name:'访问来源',
                                  type:'pie',
                                  center : ['50%', '48%'], 
                                  radius : ['57%', '75%'],
                                  itemStyle : {
                                      normal : {
                                          borderWidth: 0,
                                          label : {
                                              show : false
                                          },
                                          labelLine : {
                                              show : false
                                          }
                                      },
                                      emphasis : {
                                          label : {
                                              show : true,
                                              position : 'center',
																							formatter: "{b} :\n{c}\n({d}%)",
                                              textStyle : {
                                                  fontSize : '18',
                                              }
                                          }
                                      }
                                  },
                                  data:[
                                      {value:335, name:'扬声器01'},
                                      {value:310, name:'扬声器02'},
                                      {value:234, name:'扬声器03'},
                                      {value:635, name:'扬声器04'},
                                      {value:357, name:'扬声器05'},
                                      {value:432, name:'扬声器06'},
                                      {value:510, name:'扬声器07'}
                                  ]
                              }
                          ]
                      };
                        myChart.setOption(option); 
                    }
                );
				
				 $("#flowDayPieC").hover(
		   function(){$(this).prev(".pieOutBox dl").hide()},
		   function(){$(this).prev(".pieOutBox dl").show()}
	        )
	//环形饼图03
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieC'),theme); 
                        
                        var option = {
													color: [
															'#c1232b',
															'#b5c334',
															'#fcce10',
															'#e87c25',
															'#27727b',
															'#fe8463',
															'#9bca63',
															'#fad860',
															'#f3a43b',
															'#60c0dd',
													],
                          tooltip : {
															show:false,
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)",
                          },
                         
                          calculable :false,
                          series : [
                              {
                                  name:'访问来源',
                                  type:'pie',
                                  center : ['50%', '48%'], 
                                  radius : ['57%', '75%'],
                                  itemStyle : {
                                      normal : {
                                          borderWidth: 0,
                                          label : {
                                              show : false
                                          },
                                          labelLine : {
                                              show : false
                                          }
                                      },
                                      emphasis : {
                                          label : {
                                              show : true,
                                              position : 'center',
																							formatter: "{b} :\n{c}\n({d}%)",
                                              textStyle : {
                                                  fontSize : '18',
                                              }
                                          }
                                      }
                                  },
                                  data:[
                                      {value:335, name:'扬声器01'},
                                      {value:310, name:'扬声器02'},
                                      {value:234, name:'扬声器03'},
                                      {value:635, name:'扬声器04'},
                                      {value:357, name:'扬声器05'},
                                      {value:432, name:'扬声器06'},
                                      {value:510, name:'扬声器07'}
                                  ]
                              }
                          ]
                      };
                        myChart.setOption(option); 
                    }
                );
				
				$("#flowDayPieD").hover(
		   function(){$(this).prev(".pieOutBox dl").hide()},
		   function(){$(this).prev(".pieOutBox dl").show()}
	        )
	//环形饼图04
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieD'),theme); 
                        
                        var option = {
													color: [
															'#c1232b',
															'#b5c334',
															'#fcce10',
															'#e87c25',
															'#27727b',
															'#fe8463',
															'#9bca63',
															'#fad860',
															'#f3a43b',
															'#60c0dd',
													],
                          tooltip : {
															show:false,
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)",
                          },
                         
                          calculable :false,
                          series : [
                              {
                                  name:'访问来源',
                                  type:'pie',
                                  center : ['50%', '48%'], 
                                  radius : ['57%', '75%'],
                                  itemStyle : {
                                      normal : {
                                          borderWidth: 0,
                                          label : {
                                              show : false
                                          },
                                          labelLine : {
                                              show : false
                                          }
                                      },
                                      emphasis : {
                                          label : {
                                              show : true,
                                              position : 'center',
																							formatter: "{b} :\n{c}\n({d}%)",
                                              textStyle : {
                                                  fontSize : '18',
                                              }
                                          }
                                      }
                                  },
                                  data:[
                                      {value:335, name:'扬声器01'},
                                      {value:310, name:'扬声器02'},
                                      {value:234, name:'扬声器03'},
                                      {value:635, name:'扬声器04'},
                                      {value:357, name:'扬声器05'},
                                      {value:432, name:'扬声器06'},
                                      {value:510, name:'扬声器07'}
                                  ]
                              }
                          ]
                      };
                        myChart.setOption(option); 
                    }
                );
	
	           $("#flowDayPieE").hover(
		   function(){$(this).prev(".pieOutBox dl").hide()},
		   function(){$(this).prev(".pieOutBox dl").show()}
	        )
	//环形饼图05
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieE'),theme); 
                        
                        var option = {
													color: [
															'#c1232b',
															'#b5c334',
															'#fcce10',
															'#e87c25',
															'#27727b',
															'#fe8463',
															'#9bca63',
															'#fad860',
															'#f3a43b',
															'#60c0dd',
													],
                          tooltip : {
															show:false,
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)",
                          },
                         
                          calculable :false,
                          series : [
                              {
                                  name:'访问来源',
                                  type:'pie',
                                  center : ['50%', '48%'], 
                                  radius : ['57%', '75%'],
                                  itemStyle : {
                                      normal : {
                                          borderWidth: 0,
                                          label : {
                                              show : false
                                          },
                                          labelLine : {
                                              show : false
                                          }
                                      },
                                      emphasis : {
                                          label : {
                                              show : true,
                                              position : 'center',
																							formatter: "{b} :\n{c}\n({d}%)",
                                              textStyle : {
                                                  fontSize : '18',
                                              }
                                          }
                                      }
                                  },
                                  data:[
                                      {value:335, name:'扬声器01'},
                                      {value:310, name:'扬声器02'},
                                      {value:234, name:'扬声器03'},
                                      {value:635, name:'扬声器04'},
                                      {value:357, name:'扬声器05'},
                                      {value:432, name:'扬声器06'},
                                      {value:510, name:'扬声器07'}
                                  ]
                              }
                          ]
                      };
                        myChart.setOption(option); 
                    }
                );
	      //仪表盘01
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeA'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['56%', '58%'],    // 默认全局居中
													radius : 100,
												    detail : {textStyle: {fontSize:22,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                    color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 15}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '低';
															case '50': return '中';
															case '90': return '高';
															default: return '';
														}},
														textStyle: {fontSize:18,}

														},
														pointer: {
														width:7,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
														
									 //仪表盘02
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeB'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                     color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']],  
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
	
	                       //仪表盘03
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeC'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                     color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
								//仪表盘04
								 require.config({
												paths: {
													'echarts': '/static/isap/js'
												}
											});
											require(
												[
													'echarts',
													'echarts/theme/shine',
													'echarts/chart/gauge'
												],
												function (ec,theme) {
													var myChart = ec.init(document.getElementById('flowDaygaugeD'),theme); 
													
													var option = {
															backgroundColor:"#f3f2f2",
															
																		   tooltip : {
																				formatter: "{a} <br/>{b} : {c}%",
																						},
								
																		   series : [
																			{
																				name:'速率',
																				type:'gauge',
																				startAngle:200,
																				endAngle:-20,
																				data:[{value: 185.898, name: '速率'}],
																				center : ['67%', '75%'],    // 默认全局居中
																				radius : 38,
																				detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
																				axisLine: {lineStyle: {      
																				 color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
																				   width: 8}
																				},
																				axisLabel:{
																					formatter: function(v){
																					switch (v+''){
																						case '10': return '';
																						case '50': return '';
																						case '90': return '';
																						default: return '';
																					}},
																					textStyle: {fontSize:12,}
							
																					},
																					pointer: {
																					width:3,
																					length: '90%',
																				},
																				 
									  
																				
																			}
									
																		]
																	
																						  };
																						  
																							myChart.setOption(option); 
																						}
																					);
		                  //仪表盘05
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeE'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                    color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
	
	                         //仪表盘06
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeF'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                     color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
							//仪表盘07
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeG'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
       
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                     color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
							//仪表盘08
     require.config({
                    paths: {
                        'echarts': '/static/isap/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/gauge'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDaygaugeH'),theme); 
                        
                        var option = {
							                        backgroundColor:"#f3f2f2",
													
											   tooltip : {
						                          	formatter: "{a} <br/>{b} : {c}%",
					                                       	},
    
											   series : [
												{
													name:'速率',
													type:'gauge',
													startAngle:200,
													endAngle:-20,
													data:[{value: 185.898, name: '速率'}],
													center : ['67%', '75%'],    // 默认全局居中
													radius : 38,
												    detail : {textStyle: {fontSize:12,},formatter:'{value} kbit/秒'},
													axisLine: {lineStyle: {      
                                                     color: [[0.2, '#b5c334'],[0.8, '#60c0dd'],[1, '#ffa500']], 
                                                       width: 8}
													},
													axisLabel:{
														formatter: function(v){
														switch (v+''){
															case '10': return '';
															case '50': return '';
															case '90': return '';
															default: return '';
														}},
														textStyle: {fontSize:12,}

														},
														pointer: {
														width:3,
														length: '90%',
													},
													 
          
													
												}
		
											]
										
															  };
															  
																myChart.setOption(option); 
															}
														);
	
	
	
								
	
	
	
	
	
	

}); 

