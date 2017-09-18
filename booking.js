$(function(){
	var aPopup = $('.rules-wrap');
	$('.btn-rules').click(function(){
		var btnnum = $(this).index('.btn-rules');
		aPopup.eq(btnnum).show().siblings('.rules-wrap').hide();
	})
	$('.btn-close').click(function(){
		$('.rules-wrap').hide();
	})
	
	$('.tab-tag li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');	
		var tabnum = $(this).index('.tab-tag li')
		$('.tab-con').eq(tabnum).show().siblings('.tab-con').hide();
	})
	
	
	var peoplenum=1;
	var totalchilden=$(".row5 .travelpersonnel").find(".peoplegroup");
	var totallength=totalchilden.length;

	$('.addtrainee').on("click",function(){
		
		peoplenum++;
		if(peoplenum>=2){
			$(".minustrainnee").show();
		}
		var template='<ul class="f-cb peoplegroup">'+'<li>出行人姓名'+peoplenum+'</li>'+
			'<li><input type="text"'+'name="mem_name[]"'+'/></li>'+
			'<li>出生年月</li>'+
			'<li><input type="text" '+ 'placeholder="Y-m-d" '+'name = "birthday[]"'+ '/></li>'+'</ul>';
		
		$('.travelpersonnel').append(template);
		totalchilden=$(".row5 .travelpersonnel").find(".peoplegroup");
		totallength=totalchilden.length;
	})
	

	$(".minustrainnee").on("click",function(){
		if(peoplenum<=2){
			$(".minustrainnee").hide();
		}
		if(peoplenum<=1){
			
			return false;

		}
		$(".peoplegroup:last").remove()
		
		peoplenum--;
		if(peoplenum<=0){
			peoplenum=0;
		}

	})
	// }
	var oRoomnum =1;
	var oBtnminus = $('.roominus');
	var oBtnplus = $('.roomplus');
	
	$(oBtnplus).click(function(){
		var len=$(".travelpersonnel input").length/2;
		oRoomnum++;
		if(oRoomnum>len){
			alert("数量应小于等于出行人数，不能选择多于人数的房间")
		}
		if(oRoomnum>=len){
			oRoomnum=len;
		}
		$('.roomnum').val(oRoomnum);
		
	})
	$(oBtnminus).click(function(){
		oRoomnum--;
		if(oRoomnum<=1){
			oRoomnum=1;
		}
		$('.roomnum').val(oRoomnum);
	})
	
	show("accompany",".accompany-con")
	show("invoice",".invoice-con")
	function show(name,ele){
		$("input[name="+name+"]").click(function(){
			var flag=$(this).attr("data-flag");
			switch(flag){
				case "y":
				$(ele).show();
				break;
				case "n":
				$(ele).hide();
				break;
				default:
				break;
			}
		});
	}

	// error
	//$(".btn").click(function(event) {
	//	var origincityval=$(".origincity").val();
	//	if($.trim(origincityval)==""){
	//		$(".origincityerror").html("请填写您要出发的城市");
	//	}else{
	//		$(".origincityerror").html("");
	//	}
	//	$(".travelpersonnel input").each(function(index, el) {
	//		var peopleinfoval=$(this).val();
	//		console.log(peopleinfoval)
	//		if($.trim(peopleinfoval)==""){
	//			$(".peopleinfomation").html("请填写完整出行人信息");
	//		}else{
	//			$(".peopleinfomation").html("");
	//		}
	//	});
	//	$(".relation :text").each(function(index, el) {
	//		var relationval=$(this).val();
	//		if($.trim(relationval)==""){
	//			$(".relationerrorval").html("请填写完整联系人信息");
	//		}else{
	//			$(".relationerrorval").html("")
	//		}
	//	});
	//	var radioval=$('.row5 .isradio:checked').val();
	//	if(radioval!=null){
    //
	//		$(".invoice-con input").each(function(index, el) {
	//			var invoiceval=$(this).val();
	//			if($.trim(invoiceval)==""){
	//				$(".invoiceerrorval").html("请填写完整发票信息");
	//			}else{
	//				$(".invoiceerrorval").html("")
	//			}
	//		});
    //
	//	}
    //
    //
	//})
})
function checkForm(){
	var flag=0;
	var origincityval=$(".origincity").val();
	if($.trim(origincityval)==""){
		$(".origincityerror").html("请填写您要出发的城市");
		flag++;
		console.log(origincityval)
	}else{
		$(".origincityerror").html("");
	}
	$(".travelpersonnel input").each(function(index, el) {
		var peopleinfoval=$(this).val();
		if($.trim(peopleinfoval)==""){
			$(".peopleinfomation").html("请填写完整出行人信息");
			flag++;
			console.log(peopleinfoval)
		}else{
			$(".peopleinfomation").html("");
		}
	});
	$(".relation :text").each(function(index, el) {
		var relationval=$(this).val();
		if($.trim(relationval)==""){
			$(".relationerrorval").html("请填写完整联系人信息");
			console.log(relationval)
			flag++;
		}else{
			$(".relationerrorval").html("")
		}
	});
	var radioval=$('.row5 .isradio:checked').val();
	if(radioval!=null){

		$(".invoice-con input").each(function(index, el) {
			var invoiceval=$(this).val();
			if($.trim(invoiceval)==""){
				$(".invoiceerrorval").html("请填写完整发票信息");
				console.log(invoiceval)
				flag++;
			}else{
				$(".invoiceerrorval").html("")
			}
		});

	}
	if(!$('.agree').is(":checked")){
		flag++
	}

	if(flag>0){
		return false;
	}else{
		return true;
	}

}
