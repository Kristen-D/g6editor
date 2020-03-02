// JavaScript Document						   
$(document).ready(function() {
	//搜索
 	$(".btn_srh").click(function() {
		var kcon = escape($(".inp_srh").val());
		if(kcon == ""){
			//alert("请输入查询条件");
			window.location.href="/search/main.html?q=*";
			return;
		}
		/*var index_selected = new Array();
		$(".index_chkbox").each(function() {
			if ($(this).is(':checked'))
				index_selected.push($(this).val());
		});*/		
		//pb
		//window.location.href="/search/main.html?q=*&index=&startdatetime=&enddatetime=";
		//20161220
		window.location.href="/search/main.html?q="+kcon;

	});
 	
 	//获取Flume进程数据
	var pie101=0;
	var pie102=0;
	var pie103=0;	
 	getFlumeData1();
	function getFlumeData(){
		var $data = {"handler":"HttpResStateHandler","action":"select"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){			
					initFlumeLayout(rs);
					//console.log(rs);
				}
			}, function() {
				//clearInterval($flumeStateTask);
		});
	}
	function initFlumeLayout(rs)
	{
		if(rs.states.length>0)
		{
			$.each(rs.states,function(i,n){
				
				/*if(n.states.state ==undefined){
					return true;
				}*/
				if(n.resType.toLowerCase().indexOf("Flume".toLowerCase())==0)
				{
					//状态
				    if(n.states.state!=undefined)//n.state=="EXCEPTIONAL"
				    {
				    	//console.log("fl-"+n.states.state.trim().replace( /^\s+|\s+$/g, "" ));
				    	if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="running")//运行		
				    	{		    		
				    		pie101=pie101+1;	
				    	}
				    	else if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="EXCEPTIONAL") // 异常 		
				    	{
				    		pie103=pie103+1;	
				    	}
				    	else
				    		pie102=pie102+1;//停止			    					    	
				    }			    
				}//if
			});//each
			
			{
				//alert(pie101+"-"+pie102+"-"+pie103);
				//画进程饼图1
			 	var $ResultDataArray1=[pie101,pie102,pie103];
			 	$("#pie1").html($ResultDataArray1[0]+$ResultDataArray1[1]+$ResultDataArray1[2]);
			 	$("#pie101").html("运行："+$ResultDataArray1[0]);
			 	//$("#pie102").html("停止："+$ResultDataArray1[1]);
			 	$("#pie103").html("异常："+$ResultDataArray1[2]);
			 	drawPie1($ResultDataArray1);
			}
		}//if
	}
	function getFlumeData1(){
		var $data = {"handler":"GetNumHandler2","action":"select"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "success"){			
					initFlumeLayout1(rs);
					//console.log(rs);
				}
			}, function() {
				//clearInterval($flumeStateTask);
		});
	}
	function initFlumeLayout1(msgObj) 
	{
		//alert("msgObj="+msgObj);
		var banddata = msgObj['data'];
		for ( var key in banddata) 
		{		
			pie101 = parseInt(banddata[key]["runCount"]);// 运行		
			pie103 =parseInt(banddata[key]["excepCount"]); // 异常	
			pie102 = parseInt(banddata[key]["stopCount"]);// 停止
	    }
			
		{
			//alert(pie101+"-"+pie102+"-"+pie103);
			//画进程饼图1
		 	var $ResultDataArray1=[pie101,pie102,pie103];
		 	$("#pie1").html($ResultDataArray1[0]+$ResultDataArray1[1]+$ResultDataArray1[2]);
		 	$("#pie101").html("运行："+$ResultDataArray1[0]);
		 	$("#pie102").html("停止："+$ResultDataArray1[1]);
		 	$("#pie103").html("异常："+$ResultDataArray1[2]);
		 	drawPie1($ResultDataArray1);
		}
		//console.log(msgObj);
		//console.log(banddata);
		
	}
	
 	
 	//获取DP进程数据
	var pie201=0;
	var pie202=0;
	var pie203=0;
	var bar01=0;
	var bar02=0;
	getDpData1();
	function getDpData()
	{
		var $data = {"handler":"HttpResStateHandler","action":"select"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK")
				{
					initDpLayout(rs);
					//console.log(rs);
				}
			}, function() {
				clearInterval($dataprocessStateTask);
		});
	}
	function initDpLayout(rs)
	{	
		if(rs.states.length>0)
		{
			$.each(rs.states,function(i,n){
	         /*if(n.states.state!=undefined&&n.states.state=="exit")
				{
					return true;
				}*/
	
				if(n.resType.toLowerCase().indexOf("DataProcess".toLowerCase())==0)
				{
					//状态
				    if(n.states.state!=undefined)//n.state=="EXCEPTIONAL"
				    {
				    	//console.log("dp-"+n.states.state.trim().replace( /^\s+|\s+$/g, "" ));
				    	if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="running")//运行		
				    	{
				    		pie201=pie201+1;	
				    	}
				    	else if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="EXCEPTIONAL") // 异常 		
				    	{
				    		pie203=pie203+1;	
				    	}
				    	else
				    		pie202=pie202+1;//停止			    					    	
				    }
				    
				    //个数
				    if(n.states.ReadCount!=undefined)
				    {
				    	bar01=bar01+parseInt(n.states.ReadCount);
				    }
				    if(n.states.ProcessCount!=undefined)
				    {
				    	bar02=bar02+parseInt(n.states.ProcessCount);
				    }			    
				}//if
			});//each
			
			{
				//alert(pie201+"-"+pie202+"-"+pie203+"*"+""+bar01+"-"+bar02);
			 	//画进程饼图2
			 	var $ResultDataArray2=[pie201,pie202,pie203];
			 	$("#pie2").html($ResultDataArray2[0]+$ResultDataArray2[1]+$ResultDataArray2[2]);
			 	$("#pie201").html("运行："+$ResultDataArray2[0]);
			 /*	$("#pie202").html("停止："+$ResultDataArray2[1]);*/
			 	$("#pie203").html("异常："+$ResultDataArray2[2]);
			 	drawPie2($ResultDataArray2);
			 	
			 	//画柱状图
				var $ResultDataArray3=[bar01,bar02];
			 	drawBar($ResultDataArray3);
			}
			
		}//if
	}
	function getDpData1()
	{
		var handledata = {"handler":"DataprocessHandler","action":"select"};
		ajaxPost("/felix", handledata, function(rs) {
				if(rs["result"] == "success"){
					 //console.log(rs);
					 initDpLayout1(rs);
					}
			}, function() {
			//	alert($.i18n.prop('aus_methodfail'));
			});
	}
	function initDpLayout1(msgObj) 
	{
		var banddata = msgObj['data'];
		for ( var key in banddata) 
		{
			if (banddata[key]["status"] == "running")// 运行
			{
				pie201 = pie201 + 1;
			} 
			else if (banddata[key]["status"] == "abnormal") // 异常
			{
				pie203 = pie203 + 1;
			} else if (banddata[key]["status"] == "stop") // 停止
			{
				pie202 = pie202 + 1;// 停止
			}
		}
		var $ResultDataArray2 = [ pie201, pie202, pie203 ];
		$("#pie2").html($ResultDataArray2[0] + $ResultDataArray2[1]+ $ResultDataArray2[2]);
		$("#pie201").html("运行：" + $ResultDataArray2[0]);
		$("#pie202").html("停止：" + $ResultDataArray2[1]);
		$("#pie203").html("异常：" + $ResultDataArray2[2]);
		drawPie2($ResultDataArray2);
	}
	//只绘制柱状图
	getDpData3();
	function getDpData3()
	{
		var $data = {"handler":"HttpResStateHandler","action":"select"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK")
				{
					initDpLayout3(rs);
				}
			}, function() {
				clearInterval($dataprocessStateTask);
		});
	}
	function initDpLayout3(rs)
	{	
		if(rs.states.length>0)
		{
			$.each(rs.states,function(i,n){
	         /*if(n.states.state!=undefined&&n.states.state=="exit")
				{
					return true;
				}*/
	
				if(n.resType.toLowerCase().indexOf("DataProcess".toLowerCase())==0)
				{
					/*//状态
				    if(n.states.state!=undefined)//n.state=="EXCEPTIONAL"
				    {
				    	//console.log("dp-"+n.states.state.trim().replace( /^\s+|\s+$/g, "" ));
				    	if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="running")//运行		
				    	{
				    		pie201=pie201+1;	
				    	}
				    	else if(n.states.state.trim().replace( /^\s+|\s+$/g, "" )=="EXCEPTIONAL") // 异常 		
				    	{
				    		pie203=pie203+1;	
				    	}
				    	else
				    		pie202=pie202+1;//停止			    					    	
				    }*/
				    
				    //个数
				    if(n.states.ReadCount!=undefined)
				    {
				    	bar01=bar01+parseInt(n.states.ReadCount);
				    }
				    if(n.states.ProcessCount!=undefined)
				    {
				    	bar02=bar02+parseInt(n.states.ProcessCount);
				    }			    
				}//if
			});//each
			
			{
				//alert(pie201+"-"+pie202+"-"+pie203+"*"+""+bar01+"-"+bar02);
			 	/*//画进程饼图2
			 	var $ResultDataArray2=[pie201,pie202,pie203];
			 	$("#pie2").html($ResultDataArray2[0]+$ResultDataArray2[1]+$ResultDataArray2[2]);
			 	$("#pie201").html("运行："+$ResultDataArray2[0]);
			 	$("#pie202").html("停止："+$ResultDataArray2[1]);
			 	$("#pie203").html("异常："+$ResultDataArray2[2]);
			 	drawPie2($ResultDataArray2);*/
			 	
			 	//画柱状图
				var $ResultDataArray3=[bar01,bar02];
			 	drawBar($ResultDataArray3);
			}
			
		}//if
	}

	/*
	//获取场景列表
	var $data = {"handler":"SceneHandler"};
	ajaxPost("/felix", $data, function(rs) {
		if(rs.result = "success")
		{		
			if(rs.data.length>0)
			{
				//$('#all_scene').css('display','block');
				$.each(rs.data,function(i,n){
					var list="<p><a href='"+n.url+"' style='color:#888'>"+decodeURIComponent(n.sceneName).replace(/\+/g,' ')+"</a></p>";
					//list=list+list;
					$(".cjBox1").append(list);
				});
			}
		}
	});//获取场景列表*
	*/
	
	//获取场景列表
	var $data1 = {"handler":"MenuHandler","action":"getScene"};
	ajaxPost("/felix", $data1, function(rs) {
		if(rs.result = "success")
		{		
			if(rs.data.length>0)
			{
				//$('#all_scene').css('display','block');
				$.each(rs.data,function(i,n){
					var list="<p><a href='"+n.url+"' style='color:#888'>"+decodeURIComponent(n.sceneName).replace(/\+/g,' ')+"</a></p>";
					//list=list+list;
					$(".cjBox1").append(list);
				});
			}
		}
	});
	


});