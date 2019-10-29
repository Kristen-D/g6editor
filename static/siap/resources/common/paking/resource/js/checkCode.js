var code; //在全局定义验证码 
$(function(){
  createCode();
});
//产生验证码
function createCode() {
	code = "";
	var codeLength = 4;//验证码的长度
	var random = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D',
			'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q',
			'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
	for ( var i = 0; i < codeLength; i++) {//循环操作
		var index = Math.floor(Math.random() * 32);//取得随机数的索引（0~31）
		code += random[index];//根据索引取得随机数加到code上
	}
	$("#code").val(code);//把code值赋给验证码
};
//校验验证码
function validateCheckCode() {
	var inputCode = $("#checkCodeInput").val().toUpperCase(); //取得输入的验证码并转化为大写      
	if (inputCode.length <= 0) { //若输入的验证码长度为0
		return false;
	} else if (inputCode != code) { //若输入的验证码与产生的验证码不一致时
		createCode();//刷新验证码
		$("#checkCodeInput").val("");//清空文本框
		return false;
	} else { //输入正确时
		return true;
	}
}