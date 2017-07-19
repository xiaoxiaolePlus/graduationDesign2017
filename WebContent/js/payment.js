var payNum;
var feeName;
var payDur;

$("#paymentMoney").blur(function () {
	var paymentMoney = $(this).val();
	payNum = paymentMoney;
});
$("#paymentYear").blur(function () {
	var paymentYear = $(this).val();
	payDur = paymentYear;
});
$("#paymentFeeName").click(function () {
	var paymentFeeName = $(this).val();
	if (paymentFeeName == '1') {
		$("#paymentFeeNameOther").show();
	} else if (paymentFeeName == '0') {
		feeName = '';
		$("#paymentFeeNameOther").hide();
	} else {
		feeName = paymentFeeName;
		$("#paymentFeeNameOther").hide();
	}
});
$("#paymentFeeNameOther").blur(function () {
	var paymentFeeNameOther = $(this).val();
	feeName = paymentFeeNameOther;
});
$("#paymentSure").click(function () {
	var jqXHR=$.ajax({
		url:"/CollegeTuitionManageSys/student/pay.do",
		method:"POST",
		data:{
			payNum:payNum,
			feeName:feeName,
			payDur:payDur
		}
	});
	jqXHR.then(function(data){
		if (data == '1') {
			alert("缴费成功！");
		} else {
			alert("请填写完整的缴费信息！");
		}
	},
	function(){
		
	});
});
