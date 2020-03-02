var timezone="CST";
var gmt="GMT+0800";
var timeoffset=8*3600000;
/*var param = {"handler":"QueryTimeZoneHandler"};
ajaxPost("/felix", param, function(rs) {
	if(rs["result"]=="OK"){
	     timezone = rs["timeZone"];
	     if(timezone!="CST"){
	    	 gmt="GMT";
	    	 timeoffset=0;
	     }
	}
		},function() {
			alert("查询超时");
});*/
var Query = function (){
	this.startDate = "";
	this.startTime = "";
	this.endDate = "";
	this.endTime = "";
	//时间戳
	this.startDateTime = 0;
	this.endDateTime = 0;
	this.key = "";
	this.isStartOpposite="false";
	this.oppositeStart="";
	this.isEndOpposite="false";
	this.oppositeEnd="";
	this.tips;
	this._init = function(){
		this.startDate = "";
		this.startTime = "";
		this.endDate = "";
		this.endTime = "";
		this.startDateTime = 0;
		this.endDateTime = 0;
		this.key = "";
		this.oppositeStart="";
		this.oppositeEnd="";
		this.isStartOpposite="false";
		this.isEndOpposite="false";
	};
	this.getStartDateTime = function(){
		if(this.isStartOpposite){
			return this.oppositeStart;
		}else{
			return this.startDate.replaceAll("/","-")+" "+this.startTime;
		}
	};
	this.getEndDateTime = function(){
		if(this.isEndOpposite){
			return this.oppositeEnd;
		}else{
			return this.endDate.replaceAll("/","-")+" "+this.endTime;
		}
	};
	//将事件转换为时间戳,方便在url中传输
	this._transToUnixTime = function (){
		var $startDatum = new Date(Date.parse(this.startDate+" "+this.startTime+" " +gmt));
		var $endDatum = new Date(Date.parse(this.endDate+" "+this.endTime+" " +gmt));
		this.startDateTime = $startDatum.getTime();
		this.endDateTime = $endDatum.getTime();
	};
	//将时间戳转换为时间
	this._transToDate = function (){
		 var $startTime = new Date(parseInt(this.startDateTime) +timeoffset); 
		 var $endTime = new Date(parseInt(this.endDateTime) +timeoffset); 
		 this.startDate = $startTime.getUTCFullYear()+"/"+formatData($startTime.getUTCMonth()+1)+"/"+formatData($startTime.getUTCDate());
		 this.startTime = formatData($startTime.getUTCHours())+":"+formatData($startTime.getUTCMinutes())+":"+formatData($startTime.getUTCSeconds());
		 this.endDate = $endTime.getUTCFullYear()+"/"+formatData($endTime.getUTCMonth()+1)+"/"+formatData($endTime.getUTCDate());
		 this.endTime = formatData($endTime.getUTCHours())+":"+formatData($endTime.getUTCMinutes())+":"+formatData($endTime.getUTCSeconds());
	};
	//将时间转换为当前对象支持的时间
	this._transDateToStartDateTime = function (date){
		 this.startDate = date.getUTCFullYear()+"/"+formatData(date.getUTCMonth()+1)+"/"+formatData(date.getUTCDate());
		 this.startTime = formatData(date.getUTCHours())+":"+formatData(date.getUTCMinutes())+":"+formatData(date.getUTCSeconds());
	};
	//将时间转换为当前对象支持的时间
	this._transDateToEndDateTime = function (date){
		 this.endDate = date.getUTCFullYear()+"/"+formatData(date.getUTCMonth()+1)+"/"+formatData(date.getUTCDate());
		 this.endTime = formatData(date.getUTCHours())+":"+formatData(date.getUTCMinutes())+":"+formatData(date.getUTCSeconds());
	};
	//格式化显示
	this._formatDateToDateTime = function (date){
		return date.getUTCFullYear()+"/"+formatData(date.getUTCMonth()+1)+"/"+formatData(date.getUTCDate())+" " +
		formatData(date.getUTCHours())+":"+formatData(date.getUTCMinutes())+":"+formatData(date.getUTCSeconds());
	};
	//将个位数的时间日期前加0
	function formatData($str){
		return parseInt($str)<10?"0"+$str:$str;
	}
};
//实例化Query
var $query = new Query();
var TimePicker = function (applyCallback){
	var $errorMsg = "";
	var clickRealTimeFlag=false;
	var $date = new Date();
	if(timezone=="CST"){
		$date.setTime($date.getTime()+8*3600000);
	};
	//时间单位的选择
	//默认都是秒
	var $timeBasis = {
		oppositeTime : "s",
		realTime : "s"
	};
	this._init = function (){
		//初始化布局
		this._initLayOut();
		//初始化数据
		this._initData();
		//预设模块
		this._initPreSet();
		//相对时间模块
		this._initOppositeTime();
		//实时模块
		this._initRealTime();
		//日期选择模块
		this._initDateRange();
		//日期和时间范围模块
		this._initDateTimeRange();
		//高级模块
		this._initHighLevel();
		this.add_daterange_click();
	};
	this._initLayOut = function (){
		$('.timerangepicker-dialog').find('.shared-timerangepicker-dialog').hide();
		$('.timerangepicker-dialog').find('.shared-timerangepicker-dialog').eq(0).show();
		$('.accordion-heading').click(function() {
			$(this).siblings('.accordion-heading').find('span.accordion-toggle-active').removeClass().addClass('accordion-toggle');
			$(this).siblings('.accordion-heading').find('i.icon-down-small').removeClass().addClass('icon-right-small');
			$(this).find('span').removeClass().addClass('accordion-toggle-active');;
			$(this).find('i').removeClass().addClass('icon-down-small');
		    $(this).children().find(".shared-timerangepicker-dialog").slideUp('normal');
		    $('.timerangepicker-dialog').find('.shared-timerangepicker-dialog').hide();
		    $(this).next().slideToggle('slow');
	     });
		 $('.timerangepicker-range_unit').click(function(event) {
				$(this).parents().siblings('.edit-wrap').toggle();
				$('.timerangepicker-range_unit').addClass('active');
			});
		    //选中状态
		$(".draghandle_b li:first").addClass("active");
	};
	this._initData = function (){
		$(".s_curr_time").html($query._formatDateToDateTime($date));
		initValue();
	};
	this._initPreSet = function (){
		//相对时间
		$(".a_opposite").click(function(){
			var id = $(this).attr("id").split("_")[1];
			$query.isEndOpposite=true;
			$query.oppositeEnd="NOW";
			setOppositeTime(id);
		});
		//其它
		$(".a_other").click(function(){setOtherTime()});
	};
	this._initOppositeTime = function(){
		$(".a_opposite_time_choose").click(function(){oppositeTimeChooseClick($(this))});
		$("#in_opposite_time_start").keyup(function(){checkOppositeTime()});
		$(".in_opposite_time_early").click(function(){oppositeTimeClick()});
		$(".in_opposite_time_late").click(function(){oppositeTimeClick()});
		$("#a_opposite_time_apply").click(function(){oppositeTimeApplyClick()});
	};
	this._initRealTime = function (){
		$("#b_real_time").click(function(event){
			chooseClick(event,$(this));
			clickRealTimeFlag=true;
		});
		$(".a_real_time_choose").click(function(){realTimeChooseClick($(this))});
		$("#in_real_time_start").keyup(function(){checkRealTime($(this))});
		$("#a_real_time_apply").click(function(){realTimeApplyClick()});
	};
	this._initDateRange = function (){
		startDatePicker("#in_date_range_startDate",'#in_date_range_endDate');
		endDatePicker("#in_date_range_startDate",'#in_date_range_endDate');
		$("#b_date_range_choose").click(function(event){chooseClick(event,$(this))});
		$("#a_between").click(function(){betweenClick($(this))});
		$("#a_before").click(function(){beforeClick($(this))});
		$("#a_after").click(function(){afterClick($(this))});
		$("#b_date_range_apply").click(function(){dateRangeApplyClick()});
	};
	this._initDateTimeRange = function (){
		startDatePicker("#in_range_startDate",'#in_range_endDate');
		endDatePicker("#in_range_startDate",'#in_range_endDate');
		$("#in_range_startTime,#in_range_endTime").datetimepicker({
			datepicker:false,
			format:'H:i:s',
			allowBlank : 'true'
		});
		//apply点击事件
		$("#b_range_apply").click(function(){rangeApplyClick()});
	};
	this._initHighLevel = function (){
		$("#in_high_startDateTime,#in_high_endDateTime").keyup(function(){
			if(isNaN($(this).val())){
				$errorMsg = "invalid date";
				$("#high_msg").html($errorMsg);
			}else{
				$("#high_msg").html();
			}
		});
		$("#b_high_apply").click(function(){
			highApplyClick();
		});
	};
	//开始事件控件参数设置
	function startDatePicker($startDate,$endDate){
		$($startDate).datetimepicker({
			timepicker:false,
			format:'Y/m/d',
			lang:'ch',
			allowBlank : 'true',
			onShow:function( ct ){
				   this.setOptions({
				    maxDate:$($endDate).val()?$($endDate).val():0
				 })
			}
		});
	};
	//结束时间控件参数设置
	function endDatePicker($startDate,$endDate){
		$($endDate).datetimepicker({
			timepicker:false,
			format:'Y/m/d',
			lang:'ch',
			allowBlank : 'true',
			onShow:function( ct ){
				   this.setOptions({
				    minDate:$($startDate).val()?$($startDate).val():false,
				    //最大时间设为今天
				    maxDate:0
				   })
			 }
		});
	};
	//选择时间单位事件处理函数
	function oppositeTimeChooseClick($this){
		$("#s_opposite_time_choose").html($this.html());
		$timeBasis.oppositeTime = $this.attr("name").split("_")[1];
		$this.addClass("active").siblings("li").removeClass();
		$this.parents().find('.edit-wrap').hide();
		$("#s_opposite_time_start_msg").html($this.attr("start-data"));
		$("#s_opposite_time_end_msg").html($this.attr("end-data"));
		showOppositeTimeDateMsg();
	};
	function checkOppositeTime(){
		if(isNaN($("#in_opposite_time_start").val())){
			$("#s_opposite_time_start").html("invalid date");
			return;
		}else{
			showOppositeTimeDateMsg();
		}
	};
	function oppositeTimeClick(){
		checkOppositeTime();
	};
	function oppositeTimeApplyClick(){
		checkOppositeTime();
		if(isNaN($("#in_opposite_time_start").val()) || $("#in_opposite_time_start").val() == ""){
			$("#s_opposite_time_start").html("invalid date");
			return;
		}else{
			//转时间戳
			$("#d_datetimepicker").hide();
			//点击应用后的回调函数，针对不同界面设定不同的功能
			applyCallback();
		}
	};
	function showOppositeTimeDateMsg(){
		$query.isStartOpposite=true;
		$query.isEndOpposite=true;
		if($("#in_opposite_time_start").val() == ""){
			$("#s_opposite_time_start").html("");
		}else{
			$num = parseInt($("#in_opposite_time_start").val());			
			//根据选择确定开始结束时间
			if($(".in_opposite_time_early:checked").attr("id")=="in_opposite_time_from_now"){
				//距离当前时间
				transTimeBasisToDate($num,$timeBasis.oppositeTime,"oppositenow");
			}else{
				//距离当前时间且时间为开始
				transTimeBasisToDate($num,$timeBasis.oppositeTime,"oppositepast");
			}	
			if($(".in_opposite_time_late:checked").attr("id")=="in_opposite_time_now"){
				$query.oppositeEnd="*";
			}else{
				transTimeBasisToDate($num,$timeBasis.oppositeTime,"oppositenowstart");
			}
//			$("#s_opposite_time_start").html($query.startDate+" "+$query.startTime);
//			$("#s_opposite_time_end").html($query.endDate+" "+$query.endTime);
		}
	};
	function realTimeChooseClick($this){
		$("#s_real_time_choose").html($this.html());
		$timeBasis.realTime = $this.attr("name").split("_")[1];
		$this.addClass("active").siblings("li").removeClass();
		$this.parents().find('.edit-wrap').hide();
		showRealTimeDateMsg();
	};
	function checkRealTime($this){
		if(isNaN($this.val())){
			$("#s_real_time_curr").html("invalid date");
		}else{
			showRealTimeDateMsg();
		}
	};
	//实时点击应用后的处理函数
	function realTimeApplyClick(){
		if(isNaN($("#in_real_time_start").val()) || $("#in_real_time_start").val() == ""){
			$("#s_real_time_curr").html("invalid date");
			return;
		}else{
			if(!clickRealTimeFlag){
				showRealTimeDateMsg();
			}
			//转时间戳
			$query._transToUnixTime();
//			initValue();
			$("#d_datetimepicker").hide();
			//点击应用后的回调函数，针对不同界面设定不同的功能
			applyCallback();
		}
	};
	//显示提示的日期
	function showRealTimeDateMsg(){
		if($("#in_real_time_start").val() == ""){
			$("#s_real_time_curr").html("");
		}else{
			$num = parseInt($("#in_real_time_start").val());
			var date =new Date();
			date.setTime(date.getTime()+timeoffset)
			$query._transDateToEndDateTime(date);	
			$query.isEndOpposite=true;
			$query.oppositeEnd="NOW";
			transTimeBasisToDate($num,$timeBasis.realTime,"oppositenow");
		}
	}
	//将单位时间转换为时间
	function transTimeBasisToDate($num,$str,$oppo){
		$date = "NOW";
		switch ($str){
		case "s" :
			//距离现在
			if($oppo=="oppositenow"){
				$date+="-"+$num+"SECOND";
			}else if($oppo=="oppositepast"){
				//距离过去
				$date+="-"+$num+"SECOND";
			}else{
				//距离现在开始
				//当前秒
			}
			break;
		case "mm" :
			if($oppo=="oppositenow"){
				$date+="-"+$num+"MINUTE";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"MINUTE/MINUTE";
			}else{
				$date+="/MINUTE";
			}
			break;
		case "h" :
			if($oppo=="oppositenow"){
				$date+="-"+$num+"HOUR";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"HOUR/HOUR";
			}else{
				$date+="/HOUR";
			}
			break;
		case "d" :
			if($oppo=="oppositenow"){
				$date+="-"+$num+"DAY";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"DAY/DAY";
			}else{
				$date+="/DAY";
			}
			break;
		case "w" : 
			if($oppo=="oppositenow"){
				$date+="-"+$num+"WEEK";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"WEEK/WEEK";
			}else{
				$date+="/WEEK";
			}
			break;
		case "m" : 
			if($oppo=="oppositenow"){
				$date+="-"+$num+"MONTH";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"MONTH/MONTH";
			}else{
				$date+="/MONTH";
			}
			break;
		case "se" :
			if($oppo=="oppositenow"){
				$date+="-"+$num+"SEASON";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"SEASON/SEASON";
			}else{
				$date+="/SEASON";
			}
			break;
		case "y" :
			if($oppo=="oppositenow"){
				$date+="-"+$num+"YEAR";
			}else if($oppo=="oppositepast"){
				$date+="-"+$num+"YEAR/YEAR";
			}else{
				$date+="/YEAR";
			}
			break;
		}
		if($oppo=="oppositenow" || $oppo=="oppositepast"){
			$query.isStartOpposite=true;
			$query.oppositeStart=$date;
		}else{
			$query.isEndOpposite=true;
			$query.oppositeEnd=$date;
		}
	};
	function betweenClick(){
		$('#b_data_range_td').css("width","220px");
		$("#d_date_range_all").hide();
		$("#td_date_range_startDate").show();
		$("#td_date_range_endDate").show();
		$("#s_date_range").html($("#a_between").html());
		$("#a_between").addClass("active").siblings("li").removeClass();
		$("#a_between").parents().find('.edit-wrap').hide();
	};
	function beforeClick(){
		$('#b_data_range_td').css("width","340px");
		$("#d_date_range_all").hide();
		$("#td_date_range_startDate").hide();
		$("#in_date_range_startDate").val("");
		$("#td_date_range_endDate").show();
		$("#s_date_range").html($("#a_before").html());
		$("#a_before").addClass("active").siblings("li").removeClass();
		$("#a_before").parents().find('.edit-wrap').hide();
	};
	function afterClick(){
		$('#b_data_range_td').css("width","340px");
		$("#d_date_range_all").hide();
		$("#td_date_range_startDate").show();
		$("#td_date_range_endDate").hide();
		$("#in_date_range_endDate").val("");
		$("#s_date_range").html($("#a_after").html());
		$("#a_after").addClass("active").siblings("li").removeClass();
		$("#a_after").parents().find('.edit-wrap').hide();
	};
	//日期范围点击应用后处理函数
	function dateRangeApplyClick(){
		$query.startTime ="00:00:00";
		$query.endTime = "00:00:00";
		if (timezone=="CST"){
			if($("#in_date_range_startDate").val()=="1970/01/01"){
				$query.startTime ="08:00:00";
			}else{
				$query.startTime ="00:00:00";
			}
		}
		if($("#s_date_range").html() == $("#a_between").html()){
			$query.isStartOpposite=false;
			$query.isEndOpposite=false;
			$query.startDate = $("#in_date_range_startDate").val();
			$query.endDate = $("#in_date_range_endDate").val();
		}else if($("#s_date_range").html() == $("#a_before").html()){
//			$query.startDate = "1970/01/01";
//			if (timezone=="CST"){
//				$query.startTime ="08:00:00";
//			}else{
//				$query.startTime ="00:00:00";
//			}
			$query.isStartOpposite=true;
			$query.isEndOpposite=false;
			$query.oppositeStart="*";
			$query.endDate = $("#in_date_range_endDate").val();
		}else if($("#s_date_range").html() == $("#a_after").html()){
			$query.startDate = $("#in_date_range_startDate").val();
			$query.isStartOpposite=false;
			$query.isEndOpposite=true;
			$query.oppositeEnd="*";
		}
		if(!validateDate()){
			$("#date_range_msg").html($errorMsg);
			//如果不符合条件，则清空存的值
			$query._init();
			return;
		}else{
			$("#d_datetimepicker").hide();
			$("#date_range_msg").html("");
		}
		//点击应用后的回调函数，针对不同界面设定不同的功能
		applyCallback();
	};
	//相对时间
	function setOppositeTime($str){
		$query.isStartOpposite = true;
		$query.isEndOpposite = true;
		switch($str){
		//今天
		case "t" : 
			$query.oppositeStart="NOW/DAY";
			break;
		//一周迄今
		case "ow" :
			$query.oppositeStart="NOW/WEEK";
			break;
		//一个月迄今
		case "om" :
			$query.oppositeStart="NOW/MONTH";
			break;
		//年度迄今
		case "oy" :
			$query.oppositeStart="NOW/YEAR";
			break;
		//昨天
		case "y" :
			$query.oppositeStart="NOW/DAY-1DAY";
			$query.oppositeEnd="NOW/DAY"
			break;
		//前一周
		case "lw" :
			$query.oppositeStart="NOW/WEEK-7DAY";
			$query.oppositeEnd="NOW/WEEK"
			break;
		//上月
		case "lm" :
			$query.oppositeStart="NOW/MONTH-1MONTH";
			$query.oppositeEnd="NOW/MONTH"
			break;
		//上一年
		case "ly" :
			$query.oppositeStart="NOW/YEAR-1YEAR";
			$query.oppositeEnd="NOW/YEAR"
			break;
		//前 15 分钟
		case "m15" :
			$query.oppositeStart="NOW-15MINUTE";
			break;
		//前 60 分钟
		case "h1" :
			$query.oppositeStart="NOW-1HOUR";
			break;
		//前4小时
		case "h4" :
			$query.oppositeStart="NOW-4HOUR";
			break;
		//前1天
		case "d1" :
			$query.oppositeStart="NOW-1DAY";
			break;
		//前7天
		case "d7" :
			$query.oppositeStart="NOW-7DAY";
			break;
		//前30天
		case "d30" :
			$query.oppositeStart="NOW-30DAY";
			break;
		}
		$("#d_datetimepicker").hide();
		//点击应用后的回调函数，针对不同界面设定不同的功能
		applyCallback();
	};
	function setOtherTime(){
		$query.isStartOpposite = true;
		$query.isEndOpposite = true;
		$query.oppositeStart ="*";
		$query.oppositeEnd ="*";
		$("#d_datetimepicker").hide()
		//点击应用后的回调函数，针对不同界面设定不同的功能
		applyCallback();
	};
	//js date对象不支持week
	//得到一周第一天
	function getWeekFirstDay(){  
		var $nowdate=new Date();
		$nowdate.setTime($nowdate.getTime()+timeoffset)
		var $weekFirstDay=new Date($nowdate-($nowdate.getUTCDay()-1)*86400000);  
		return $weekFirstDay;  
	}; 
	//得到上一个月
	function getLastMonth(){
		var $date = new Date();
		$date.setTime($date.getTime()+timeoffset)
		if($date.getUTCMonth() == 0){
			$date.setUTCFullYear($date.getUTCFullYear()-1);
			$date.setUTCMonth(11);
		}else{
			$date.setUTCMonth($date.getUTCMonth()-1);
		}
		return $date;
	};
	//日期范围选择点击事件处理函数
	function chooseClick(event,$this){
		event.stopPropagation();
		$this.next().toggle();
	};
	//初始化值
	function initValue(){
		//给日期范围赋值
		//之间
		betweenClick();
		$("#in_date_range_startDate").val($query.startDate);
		checkdaterange();
		$("#in_date_range_endDate").val($query.endDate);	
		//给日期事件范围赋值
		$("#in_range_startDate").val($query.startDate);
		$("#in_range_endDate").val($query.endDate);
		$("#in_range_startTime").val($query.startTime);
		$("#in_range_endTime").val($query.endTime);
		$("#in_high_startDateTime").val(0);
		$("#in_high_endDateTime").val(parseInt(new Date().getTime()/1000));
	};
	//range apply事件处理函数
	function rangeApplyClick(){
		$query.isStartOpposite=false;
		$query.isEndOpposite=false;
		$query.startDate = $("#in_range_startDate").val();
		$query.startTime = $("#in_range_startTime").val() == ""?"00:00:00" : $("#in_range_startTime").val();
		$query.endDate = $("#in_range_endDate").val();
		$query.endTime = $("#in_range_endTime").val() == ""?"00:00:00" : $("#in_range_endTime").val();
		if(!validateDate()){
			$("#range_msg").html($errorMsg);
			//如果不符合条件，则清空存的值
			$query._init();
			return;
		}else{
			//转时间戳
			$query._transToUnixTime();
			$("#d_datetimepicker").hide();
			$("#range_msg").html("");
		}
		//重新初始化值
//		initValue();
		//点击应用后的回调函数，针对不同界面设定不同的功能
		applyCallback();
	};
	//高级应用点击事件
	function highApplyClick(){
		$query.isStartOpposite=false;
		$query.isEndOpposite=false;
		$query.startDateTime = $("#in_high_startDateTime").val().trim();
		$query.endDateTime = $("#in_high_endDateTime").val().trim();
		if($query.startDateTime == ""){
			$("#high_msg").html("start date can not be null");
			return;
		}
		if($query.endDateTime == ""){
			$("#high_msg").html("end date can not be null");
			return;
		}
		$query.startDateTime=$query.startDateTime*1000;
		$query.endDateTime=$query.endDateTime*1000;
		if(isNaN($query.startDateTime) || isNaN($query.endDateTime)){
			$("#high_msg").html("invalid date");
			return;
		}
		$query._transToDate();
		if(!validateDate()){
			$("#high_msg").html($errorMsg);
			//如果不符合条件，则清空存的值
			$query._init();
			return;
		}else{
			//转时间戳
			$query._transToUnixTime();
			$("#d_datetimepicker").hide();
			$("#high_msg").html("");
		}
		//重新初始化值
//		initValue();
		//点击应用后的回调函数，针对不同界面设定不同的功能
		applyCallback();
	};
	//检查有效性
	function validateDate(){
		//不能为空
		
		if($query.startDate+"" == ""&&!$query.isStartOpposite){
			$errorMsg = "start date can not be null";
			return false;
		}
		if($query.endDate+"" ==""&&!$query.isEndOpposite){
			$errorMsg = "end date can not be null";
			return false;
		}
		//开始时间不能大于结束时间  
		var $tempStartDateTime = new Date(Date.parse($query.startDate+" "+$query.startTime+" " +gmt));
		var	$tempEndDateTime = new Date(Date.parse($query.endDate+" "+$query.endTime+" "+gmt));
		var $firstDate = new Date();
		$firstDate.setTime(0);
		if($tempStartDateTime < $firstDate){
			if(timezone =="CST"){
				$errorMsg = "start date must later than 1970/01/01 08:00:00";
			}else{
				$errorMsg = "start date must later than 1970/01/01 00:00:00";
			}
			return false;
		}
		
		if($tempStartDateTime > $tempEndDateTime&&!$query.isEndOpposite&&!$query.isStartOpposite){
			$errorMsg = "start date must earlier than end date";
			return false;
		}
		//最晚时间不能超过当前时间
			if($tempEndDateTime.getTime() > new Date().getTime()){
				$errorMsg = "end date must earlier than current date";
				return false;
			}	
		return true;
	};
	this.add_daterange_click = function(){
		$(".xdsoft_calendar").click(function(){
			setTimeout(checkdaterange, 50);
		});
	}
	function checkdaterange(){
			if(timezone=="CST"){
				if($("#in_date_range_startDate").val()=="1970/01/01"){
					$("#td_date_range_startDate >span").html("08:00:00")
				}else{
					$("#td_date_range_startDate >span").html("00:00:00")
				}
			}
	}
}