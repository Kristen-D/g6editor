jQuery.fn.extend({
	autoHeight : function() {
		return this.each(function() {
			var $this = jQuery(this);
			
	
		
			if (!$this.attr('_initAdjustHeight')) {
				$this.attr('_initAdjustHeight', $this.height());
			}
			if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
				var elem=document.getElementById("queryCon");
				$this.focus(function() {
					$(elem).css({
						height : elem.scrollHeight,
						'overflow-y' : 'hidden'
					});
				});
				$('.g_input_bg').css('min-height',"35px");
				_adjustH8(elem);
				this.onkeydown= function() {
					var thisobj=document.getElementById("queryCon");
					var $obj = jQuery(thisobj);
			
					setTimeout(function(){
						var value =$obj.val();
						if(value !=value.replace(/[\n\t\r]/g, "")){
							$obj.val($obj.val().replace(/[\n\t\r]/g, ""));
						}
						$obj.css({
							height : thisobj.scrollHeight,
							'overflow-y' : 'hidden'
						});					
						}, 5);
				};
				$this.blur(function(){
					setTimeout(function(){
					$this.height($this.attr('_initAdjustHeight'));
					}, 15);
				});
				$(this).height(32);
			}else {
				$this.focus(function() {
					_adjustH(this);
				});
				_adjustH(this).on('input', function() {
					_adjustH(this);
				});
				$this.blur(function(){
					$this.height($this.attr('_initAdjustHeight'));
				});
			}
			$(".time_l_n,.index_l_n,.b_l_n").height($(".queryCon_div").height()+6);
			$(".search_button").css({
				'height' : $(".queryCon_div").height()+6+'px',
				'line-height' :$(".queryCon_div").height()+6+'px'
			});
		});
		function _adjustH(elem) {
			var $obj = jQuery(elem);
			//$obj.val($obj.val().replace(/[\n\t\r]/g, "")); //20160713 huangq mark AUS-1613
			//begin
			var value =$obj.val();
			if(value !=value.replace(/[\n\t\r]/g, "")){
				$obj.val($obj.val().replace(/[\n\t\r]/g, ""));
			}			
			//20160713 huangq modi AUS-1613
			return $obj.css({
				height : $obj.attr('_initAdjustHeight'),
				'overflow-y' : 'hidden'
			}).height(elem.scrollHeight).attr('scorll_height',elem.scrollHeight);
		}
		function _adjustH8(elem) {
			elem = document.getElementById("queryCon");
			var $obj = jQuery(elem);
			var value =$obj.val();
			if(value !=value.replace(/[\n\t\r]/g, "")){
				$obj.val($obj.val().replace(/[\n\t\r]/g, ""));
			}
			$obj.css({
				height : document.getElementById("queryCon").scrollHeight,
				'overflow-y' : 'hidden'
			});
		}
	}
});