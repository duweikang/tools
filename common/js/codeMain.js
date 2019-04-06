$(function(){
	$(".searchBtn").click(function(){
		var size = $(".codeSize").val();
		var con = $(".codeCon").val();
		if(!con){
			alert("链接不能为空");
			return false;
		}
		if(!size){
			size = 200;
		}
		createCode(size,con);
	})
	
	$(".downloadImg").click(function(){
		if(!$("#output").find("canvas")[0]){
			alert("生成二维码");
			return false;
		}
		var canvas = $("#output").find("canvas")[0];
		downloadFile('code.png', canvas.toDataURL("image/png"));
	})
})


