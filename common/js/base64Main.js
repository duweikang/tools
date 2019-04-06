$(function(){
	$(".chooseBox .choose .btn").click(function(){
		$(".imageInput").trigger("click");
	})
	$(".imageInput").change(function(){
		//调用转换base64方法
		addBase64ImgBox(function(){
			imgToBase64Img();
		})
	})
	
	$(".btnLineBox  .searchBtn").click(function(){
		var imgUrl = $(".imgUrl").val();
		addBase64ImgBoxNet(imgUrl,function(){
			urlImgToBase64Img(imgUrl);
		})
	})
	
	
//	$("body").on("click",".copybtn",function(){
//	    clipboard.on('success', function(e) {
//	        console.log(e);
//	        alert("复制成功")
//	    });
//	    clipboard.on('error', function(e) {
//	        console.log(e);
//	        alert("复制失败")
//	    });
//	})
})
