//定义全局变量
var identity = null;
var iden = null;
var id = null;
var userName = null;
var eMail;
var identifyingCode;

//重置密码页面初始化
$(".retrieveBody_1").show();

//选择身份
$("#loginCheckUser").off("click").on("click",function () {
    $(this).addClass('beChecked');
    $("#loginCheckManager").removeClass('beChecked');
    identity = 1;
    iden = '用户';
});
$("#loginCheckManager").off("click").on("click",function () {
    $(this).addClass('beChecked');
    $("#loginCheckUser").removeClass('beChecked');
    identity = 2;
    iden = '管理员';
});

//填写邮箱并在失去焦点时判断邮箱是否存在
$("#eMailText").blur(function () {
	if (identity == null) {
		alert("请选择您的身份！");
	} else {
		var mail = $("#eMailText").val();
		eMail = mail;
		var jqXHR=$.ajax({
			url:"/CollegeTuitionManageSys/user/isExistUser.do",
			method:"POST",
			data:{
				flag:identity,
				email:mail
			}
		});
		jqXHR.then(function(data){
			if (data == "0") {
				alert("邮箱为"+mail+"的"+iden+"不存在，请确认邮箱和身份！");
			} else {
				var data = JSON.parse(data);
				identity = data.flag;
				id = data.id;
				userName = data.userName;
			}
		},
		function(){
			
		});
	}
});

//发送验证码
$("#sendNum").off("click").on("click",function () {
	var jqXHR=$.ajax({
		url:"/CollegeTuitionManageSys/user/securityCode.do",
		method:"POST",
		data:{
			receiveMail:eMail,
			userName:userName
		}
	});
	jqXHR.then(function(data){
		console.log(data)
		identifyingCode = data;
	},
	function(){
		
	});
});

//滑块验证验证码
var drag = document.getElementById("drag");
var drag_btn = document.getElementById("drag_btn");
var progress = document.getElementById("progress");
var ismove = false;
drag_btn.onmousedown = function () {
    ismove = true;
};

drag_btn.onmousemove = function (e) {
    var _event =  e || window.e;
    if( ismove && drag_btn.offsetLeft < ( drag.offsetWidth-drag_btn.offsetWidth )){
        progress.style.width = drag_btn.style.left  =  _event.clientX-530 +'px';
        drag_btn.style.borderRadius = '0 5px 5px 0';
    }
};
drag_btn.onmouseout = function () {
    ismove = false;
    if(drag_btn.offsetLeft >= (drag.offsetWidth-drag_btn.offsetWidth)){
        var odiv = drag_btn.classList;
        var identifying = $("#identifyingCodeText").val();
        if (identifying == identifyingCode) {
            $(".retrieveBody_1").hide();
            $(".retrieveBody_2").show();
            $(".show_2").addClass('active');
            odiv.remove('btn_bg');
            odiv.add('btn_ok');
        } else {
        	drag_btn.style.left = 0;
            progress.style.width = 0;
            drag_btn.style.borderRadius = '5px';
        	alert("验证码不正确！");
        }
    }else{
        drag_btn.style.left = 0;
        progress.style.width = 0;
        drag_btn.style.borderRadius = '5px';
    }
};

//重复密码
$("#currentPWD").blur(function () {
	var currentPWD = $("#currentPWD").val();
	var sureCurrentPWD = $("#sureCurrentPWD").val();
	if (sureCurrentPWD != '') {
		if (currentPWD == sureCurrentPWD) {
			$(".suc").show();
		} else {
			$(".err").show();
		}
	}
});
$("#sureCurrentPWD").blur(function () {
	var currentPWD = $("#currentPWD").val();
	var sureCurrentPWD = $("#sureCurrentPWD").val();
	if (currentPWD == sureCurrentPWD) {
		$(".suc").show();
	} else {
		$(".err").show();
	}
});

// 确认修改密码
$("#sureChange").off('click').on('click',function () {
	var currentPWD = $("#currentPWD").val();
	var jqXHR=$.ajax({
		url:"/CollegeTuitionManageSys/user/changePWD.do",
		method:"POST",
		data:{
			id:id,
			flag:identity,
			currentPWD:currentPWD
		}
	});
	jqXHR.then(function(data){
		console.log(data);
		if (data == "1") {
		    $(".retrieveBody_2").hide();
		    $(".retrieveBody_3").show();
		    $(".show_3").addClass('active');
		}
	},
	function(){
		
	});
});

// 返回登录
$("#backToLog").off('click').on('click',function () {
    window.location.href = '../login.html';
});
$(".backTo").off('click').on('click',function () {
    window.location.href = '../login.html';
});

//    xiaoxiaolePlus@163.com