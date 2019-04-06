$(function(){
	clipboard = null;
	/*本地图片转Bsae64*/
	window.addBase64ImgBox = function(suc){
		var str = "";
		str += "<div class='imgItemBox'>";
		str += "<div class='left'>";
		str += "<div class='showImg'>";
		str += "<img src='' />";
		str += "</div>";
		str += "</div>";
		str += "<div class='right'>";
		str += "<div class='top'>";
		str += "<div class='imgName'></div>";
		str += "<div class='imgSize'>Source Size: <span class='imgStartSize'></span></div>";
		str += "</div>";
		str += "<div class='middle'>";
		str += "<div class='base64Img' id='a1'></div>";
		str += "</div>";
		str += "<div class='bottom'><div class='copybtn' data-clipboard-action='copy' data-clipboard-target='#a1'>复制</div></div>";
		str += "</div>";
		str += "</div>";
		$(".showBox .show").html(str);
		if(suc){
			suc();
		}
		if(!clipboard){
			clipboard = new Clipboard('.copybtn');
				clipboard.on('success', function(e) {
		        alert("复制成功")
		    });
		    clipboard.on('error', function(e) {
		        alert("复制失败")
		    });
		}
		
		
	}
	window.imgToBase64Img=function(){
		var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = $("#imageInput")[0].files[0];
        var imgName = file["name"];
        var imgStartSize = file["size"];
        var imgUrlBase64;
        if (file) {
            //将文件以Data URL形式读入页面  
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
                if(AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                    alert( '上传失败，请上传不大于2M的图片！');
                    return;
                }else{
                    //执行上传操作
                    console.log(e);
                    if(e.target.result.indexOf("data:image")==0){
                    	$(".imgItemBox .showImg img").attr("src", e.target.result);
                    }else{
                    	$(".imgItemBox .showImg img").attr("src", "../img/default.jpg");
                    }
                    
                    $(".imgItemBox .imgName").text(imgName);
                    $(".imgItemBox .imgStartSize").text((imgStartSize/1024).toFixed(2)+"K");
                    $(".imgItemBox .base64Img").html(reader.result);
                }
            }
        }
	}




	/*网络图片转Base64*/
	window.addBase64ImgBoxNet = function(url,suc){
		var str = "";
		str += "<div class='imgItemBox netImgBox'>";
		str += "<div class='left'>";
		str += "<div class='showImg'>";
		str += "<img src='"+url+"' />";
		str += "</div>";
		str += "</div>";
		str += "<div class='right'>";
		str += "<div class='middle'>";
		str += "<div class='base64Img'></div>";
		str += "</div>";
		str += "<div class='bottom'><div class='copybtn'>复制</div></div>";
		str += "</div>";
		str += "</div>";
		$(".showBox .show").html(str);
		if(suc){
			suc();
		}
	}
	
	
	
	window.urlImgToBase64Img = function(imgurl){
		var img = imgurl;
		function getBase64Image(img) {  
		     var canvas = document.createElement("canvas");  
		     canvas.width = img.width;  
		     canvas.height = img.height;  
		     var ctx = canvas.getContext("2d");  
		     ctx.drawImage(img, 0, 0, img.width, img.height);  
		     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
		     console.log(ext);
		     var dataURL = canvas.toDataURL("image/"+ext);  
		     return dataURL;  
		}  
		
		var image = new Image();  
		image.src = img;  
		image.setAttribute("crossOrigin",'Anonymous')
		image.onload = function(){  
			var base64 = getBase64Image(image);  
			console.log(base64);  
		}
	}




	/*二维码生成*/
	window.createCode = function(size,con){
		$("#output").html("");
		$("#output").qrcode({ 
		    render: "canvas", //table方式 
		    width: size, //宽度 
		    height:size, //高度 
		    text: con //任意内容 
		}); 
	}
	
	window.base64Img2Blob = function(code) {
		var parts = code.split(';base64,');
		var contentType = parts[0].split(':')[1];
		var raw = window.atob(parts[1]);
		var rawLength = raw.length;
	
		var uInt8Array = new Uint8Array(rawLength);
	
		for(var i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		}
	
		return new Blob([uInt8Array], {
			type: contentType
		});
	}
	
	window.downloadFile = function(fileName, content) {
		var aLink = document.createElement('a');
		var blob = base64Img2Blob(content); //new Blob([content]);
		console.log(blob)
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
		aLink.download = fileName;
		aLink.href = URL.createObjectURL(blob);
		aLink.click();
	}    
	
	/*色值转换工具*/
	/*rgba转十六进制*/
	window.rgbToHexColor = function(rgb){
		var rRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,r, g, b, a,rsa = rgb.replace(/\s+/g, "").match(rRgba);
	    if (rsa) {
	        r = (+rsa[1]).toString(16);
	        r = r.length == 1 ? "0" + r : r;
	        g = (+rsa[2]).toString(16);
	        g = g.length == 1 ? "0" + g : g;
	        b = (+rsa[3]).toString(16);
	        b = b.length == 1 ? "0" + b : b;
	        a = (+(rsa[5] ? rsa[5] : 1)) * 100
	        return {hex: "#" + r + g + b, alpha: Math.ceil(a)};
	    } else {
	        return {hex: rgb, alpha: 100};
	    }
	}
	/*十六进制转rgba*/
	window.hexToRgbaColor = function(hex, al) {
	    var hexColor = /^#/.test(hex) ? hex.slice(1) : hex,alp = hex === 'transparent' ? 0 : Math.ceil(al),r, g, b;
	    hexColor = /^[0-9a-f]{3}|[0-9a-f]{6}$/i.test(hexColor) ? hexColor : 'fffff';
	    if (hexColor.length === 3) {
	        hexColor = hexColor.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
	    }
	    r = hexColor.slice(0, 2);
	    g = hexColor.slice(2, 4);
	    b = hexColor.slice(4, 6);
	    r = parseInt(r, 16);
	    g = parseInt(g, 16);
	    b = parseInt(b, 16);
	    return {
	        hex: '#' + hexColor,
	        alpha: alp,
	        rgba: 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alp / 100).toFixed(2) + ')'
	    };
	};
	
	console.log(hexToRgbaColor("#000",50))
	console.log(rgbToHexColor("rgba(0, 0, 0, 0.50)"))
})
