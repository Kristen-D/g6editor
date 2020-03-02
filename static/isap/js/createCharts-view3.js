// JavaScript Document						   
$(document).ready(function () {
	$(".history_list li li").click(function(){
		$(this).addClass("hot").siblings("li").removeClass();
	});
	$("#flowDayPieAA").hover(
		function(){$(this).prev(".img_con dl").hide()},
		function(){$(this).prev(".img_con dl").show()}
	)
	//环形饼图011
     require.config({
                    paths: {
                        'echarts': './js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/pie'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayPieAA'),theme); 
                        
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
						  title : {
								text: '2016/5/9 17:15:00-17:30:00(实时排行榜47%已完成)',
								x:'center'
							},
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
                                                  fontSize : '24',
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
	
	//环形饼图01
     require.config({
                    paths: {
                        'echarts': './js'
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
                                                  fontSize : '12',
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
	  
	      
	//环形饼图02
     require.config({
                    paths: {
                        'echarts': './js'
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
                                                  fontSize : '12',
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
				
			
	//环形饼图03
     require.config({
                    paths: {
                        'echarts': './js'
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
                                                  fontSize : '12',
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
				
			
	//环形饼图04
     require.config({
                    paths: {
                        'echarts': './js'
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
                                                  fontSize : '12',
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
	
	         
	//环形饼图05
     require.config({
                    paths: {
                        'echarts': './js'
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
                                                  fontSize : '12',
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
	     
	
	

}); 

