// 选择身份
var identity = null;
$("#loginCheckUser").off("click").on("click",function () {
    $(this).addClass('beChecked');
    $("#loginCheckManager").removeClass('beChecked');
    identity = 1;
});
$("#loginCheckManager").off("click").on("click",function () {
    $(this).addClass('beChecked');
    $("#loginCheckUser").removeClass('beChecked');
    identity = 2;
});

// 点击登陆
function login() {
	var jobNum = $("#jobNum").val();
	var password = $("#password").val();
	if (jobNum == '' || password == '') {
		alert('账号和密码均不能为空!');
	} else if (identity == null) {
        alert('请选择身份!');
    } else {
		var jqXHR=$.ajax({
			url:"user/login.do",
			method:"POST",
			data:{
				jobNum:jobNum,
				password:password,
				flag:identity
			}
		});
		jqXHR.then(function(data){
			if (data == "0" || data == 0) {
				
			} else {
				var name = JSON.parse(data);
				
				if (name == '0') {
					alert("登录失败，请确认后重新登录！");
					jobNum = '';
					password = '';
					$("#loginCheckUser").removeClass('beChecked');
					$("#loginCheckManager").removeClass('beChecked');
				} else {

					if (name.flag == '1') {
						window.location.href = 'html/master_user.html?userName=' + name.userName;
					} else {
						window.location.href = 'html/master_manager.html?userName=' + name.userName;
					}
				}
			
			}
		},
		function(){
			
		});
	}
}